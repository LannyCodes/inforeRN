/**
 * Created by coderxuan on 2017/5/6.
 */
import React, {Component} from 'react';
import {
    View,
    TextInput,
    Text,
    FlatList,
    StatusBar,
    TouchableOpacity,
    TouchableHighlight,
    RefreshControl,
    Image,
    ScrollView,
    DeviceEventEmitter,
    Dimensions,
} from 'react-native';
import styles from './WorkStyles'
import {CachedImage} from "react-native-img-cache";
import Toast from 'react-native-root-toast'
import {GetInforeTaskListRequest, QueryOrgList, GetAppProbudgetData} from '../../../api/work/WorkRequests'
import {UpdateMessageStatus2Done} from '../../../api/message/QueryMsgRequest'
import {GetProjectOverView} from '../../../api/projectmanage/ProjectManageRequests'
import ChartsElement from './ChartsElement'
import ProjectProfile from './projectProfile/ProjectProfile'
import Utils from '../../../utils/Utils'
const scale = Dimensions.get('window').width / 375.0;
const prourement = [{value: '项目管理', source: require('../../../images/work/icon_pm.png'), routeName: 'ProjectManage'},
    {value: '审核管理', source: require('../../../images/work/icon_sh.png'), routeName: 'AuditManage'},
    {value: '财务管理', source: require('../../../images/work/icon_hk.png'), routeName: 'Payment'},
    {value: '采购管理', source: require('../../../images/work/icon_bh.png'), routeName: 'StockManage'}];
const noProurement = [{value: '项目管理', source: require('../../../images/work/icon_pm.png'), routeName: 'ProjectManage'},
    {value: '审核管理', source: require('../../../images/work/icon_sh.png'), routeName: 'AuditManage'},
    {value: '财务管理', source: require('../../../images/work/icon_hk.png'), routeName: 'Payment'}
];
let pageNo = 1;
let totalCount = 0;
let localCount = 0;
let flag_MyTasksOrSearch = 1; //我的任务列表或者查询分页标志 1 我的任务 2 查询

/**
 * 代办信息跳转各个模块的sourceType，相对应的sourceId的类型。
 HIST_PROJECT_APPR("历史项目审核",1),  审核ID
 PLAN_TASK_APPR("计划任务审核",2),     审核ID
 PROJECT_DELAY_APPR("项目延期审核",3), 审核ID
 PROJECT_FLOW_APPR("项目流程审核",4),  审核ID
 PLAN_TASK("计划任务",5),
 PROJECT_PROBLEM("问题反馈",6),        问题ID
 RECEIVE_PAYMENT_REMIND("回款提醒",7), 合同ID
 PLAN_WARNING_REMIND("计划提醒",8)
 */
class WorkScene extends Component {

    componentDidMount() {
        let self = this;
        this._onRefresh(false);
        this._subscription_needRefresh = DeviceEventEmitter.addListener('NEED_REFRESH', function (checkStatus, result) {
            self._onRefresh(true);
        });
    }

    componentWillUnmount() {
        this._subscription_needRefresh.remove();
    }

    /**
     * refresh
     * @private
     */
    _onRefresh(isRefresh) {
        pageNo = 1;
        this.state.tasks = [];
        localCount = 0;
        let self = this;
        self.setState({isRefreshing: true});
        // 获取数据1
        let params = {userName: _USERNAME_, pageNo: pageNo, pageSize: _PAGESIZE_};
        this.requestTaskData(params, isRefresh, 1);
        if(_SHOW_PROBUGETDATA_){
            this._getProbudgetData();
        }
        if (self.state.orgList.length === 0) {
            self._queryOrgList();
        }
        this._getProjectOverView();
    }

    constructor(props: Object) {
        super(props);
        this.state = {
            isRefreshing: false,
            tasks: [],
            searchKey: '',
            orgList: [],
            probudgetData: null,
            projectOverView: [],//项目概况
            isHeaderShow: false,
            holderScrollStyle: {flex: 1},
        };
        this.tabList = _SHOW_PROCUREMENT_ ? prourement : noProurement
    }

    renderHolder = () => {
        return (
            <ScrollView
                contentContainerStyle={this.state.isHeaderShow ? {} : {flex: 1}}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={() => this._onRefresh(true)}
                        tintColor="#3ca8fe"
                        colors={['#3ca8fe']}
                        progressBackgroundColor="#f1f1f1"
                    />
                }>
                {this._header()}
                <View
                    style={[styles.holderContainer,
                        this.state.isHeaderShow ? {
                            backgroundColor: 'white',
                            marginLeft: 10,
                            marginRight: 10,
                            paddingBottom: 10 + this.state.projectOverView.length ? 68 : 0,
                            paddingTop: 10
                        } : {}]}>
                    <Image
                        resizeMode='cover'
                        style={[styles.holderImage, this.state.isHeaderShow ? {width: 50, height: 50} : {}]}
                        source={require('../../../images/common/icon_holder_rw.png')}/>

                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={styles.holderMessage}>暂时没有待办任务</Text>
                </View>
            </ScrollView>
        )
    };

    _header = () => {
        if (this.state.probudgetData || this.state.orgList.length > 0) {
            return (
                <View style={{flex: 1, marginBottom: 10, marginLeft: 10, marginRight: 10}}>
                    <ChartsElement
                        orgList={this.state.orgList}
                        probudgetData={this.state.probudgetData}/>

                    {
                        this.state.projectOverView.length > 0 ? <View style={{marginTop: 10}}>
                            <ProjectProfile overViewData={this.state.projectOverView}
                                            navigation={this.props.navigation}/>
                        </View> : <View />
                    }
                </View>
            )
        } else {
            return (
                <View />
            )
        }
    };

    renderList = () => {
        if (!this.state.tasks || this.state.tasks.length === 0) {
            return (
                <View />
            );
        } else {
            return (
                <FlatList
                    ListHeaderComponent={this._header}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={() => this._onRefresh(true)}
                            tintColor="#3ca8fe"
                            colors={['#3ca8fe']}
                            progressBackgroundColor="#f1f1f1"
                        />
                    }
                    removeClippedSubviews={false}
                    onEndReachedThreshold={0.1}
                    onEndReached={() => this._loadMore()}
                    keyExtractor={this._keyExtractor.bind(this)}
                    data={this.state.tasks}
                    renderItem={this.renderTaskItemView.bind(this)}
                    ItemSeparatorComponent={this._taskRowSeparator}
                />
            )
        }
    };

    render() {
        let tabPadding = this.tabList.length === 4 ? 20 : 30;
        return (
            <View style={styles.container}>
                <StatusBar
                    translucent={true}
                    backgroundColor="transparent"
                    barStyle="light-content"/>
                <View style={styles.topContainer}>
                    <View style={styles.topSearchEdit}>
                        <View style={styles.searchEdit}>
                            <TouchableOpacity onPress={() => {

                            }}>
                                <CachedImage
                                    resizeMode='cover'
                                    style={styles.inputIcon}
                                    source={require('../../../images/common/icon_find_white.png')}
                                />
                            </TouchableOpacity>
                            <TextInput
                                style={styles.input}
                                onSubmitEditing={() => {
                                    let params = {
                                        userName: _USERNAME_,
                                        pageNo: 1,
                                        pageSize: _PAGESIZE_,
                                        messageTitle: this.state.searchKey
                                    };
                                    this.requestTaskData(params, false, 2);
                                }}
                                placeholder="请输入任务名称"
                                value={this.state.searchKey}
                                onChangeText={(text) => {
                                    if (isNull(text)) {
                                        this._onRefresh(false);
                                    }
                                    this.setState({searchKey: text});
                                }}
                                placeholderTextColor="#ffffffff"
                                underlineColorAndroid='transparent'
                                returnKeyType={'search'}
                                returnKeyLabel={'search'}
                            />
                        </View>
                    </View>
                    <FlatList
                        keyExtractor={this._keyExtractor.bind(this)}
                        contentContainerStyle={[styles.topFlatList, {padding: tabPadding * scale}]}
                        data={this.tabList}
                        renderItem={this._renderItemView.bind(this)}
                        horizontal={true}
                        ItemSeparatorComponent={this._taskColumnSeparator}
                    />
                </View>
                {
                    ((!this.state.tasks || this.state.tasks.length === 0) && this.state.isRefreshing === false) ? this.renderHolder() : this.renderList()
                }
            </View>
        );
    }

    requestTaskData(params, isRefresh, flag) {
        if (flag_MyTasksOrSearch !== flag) {
            flag_MyTasksOrSearch = flag;
            this.state.tasks = []; //当前数据不是同一个的，把已有的清空
            localCount = 0;
            totalCount = 0;
        }
        let self = this;
        new GetInforeTaskListRequest(params).start(function (data) {
            // log(data);
            localCount += data.list.length;
            totalCount = data.totalCount;
            console.log(data.list);

            self.setState({
                tasks: self.state.tasks.concat(data.list),
                isRefreshing: false,
            });
        }, function (error) {
            setTimeout(() => {
                self.setState({
                    isRefreshing: false,
                })
            }, _loading_);
        }, function (error) {
            setTimeout(() => {
                self.setState({
                    isRefreshing: false,
                })
            }, _loading_);
            if (isRefresh) {
                Toast.show('暂无最新数据')
            } else {
                Toast.show('获取数据失败')
            }
        });
    }

    _loadMore() {
        if (localCount < totalCount) {
            let params = {userName: _USERNAME_, pageNo: ++pageNo, pageSize: _PAGESIZE_};
            this.requestTaskData(params, false, 1)
        }
    }

    _queryOrgList = () => {
        let self = this;
        let params = {
            userId: _USERID_,
            userName: _USERNAME_,
        }
        new QueryOrgList(params).start((data) => {
            if (data) {
                self.setState({
                    orgList: data,
                    isHeaderShow: true,
                    // holderScrollStyle:{},
                })
            }
        }, (error) => {
            log('----error----下载失败')
        })
    }

    //根据用户查询事业部数据
    _getProbudgetData = () => {
        let self = this;
        let params = {
            userId: _USERID_,
            userName: _USERNAME_,
        }
        new GetAppProbudgetData(params).start((data) => {
            if (data) {
                self.setState({
                    probudgetData: data,
                    isHeaderShow: true,
                    // holderScrollStyle:{},
                })
            }
        }, (error) => {
            log('查询事业部数据失败')
        })
    }

    //获取项目概况
    _getProjectOverView = () => {
        let self = this;
        let params = {
            userName: _USERNAME_,
            userId: _USERID_,
        }
        new GetProjectOverView(params).start((data) => {
            if (data) {
                console.log('获取到的项目概况的数据是：', data);
                self.setState({
                    projectOverView: data
                })
            }
        }, (error) => {

        })
    }

    _keyExtractor = (item, index) => index;

    _taskRowSeparator = () => {
        return <View style={styles.taskRowSeperate}/>;
    };

    _taskColumnSeparator = () => {
        return <View style={styles.taskColumnSeperate}/>;
    };

    //返回itemView
    renderTaskItemView({item}) {
        return (
            <TouchableHighlight key={item.headerImg} underlayColor='#f7f7f7' onPress={() => {
                this._jumpLookMessage(item);
            }}>
                <View style={styles.taskContainer}>
                    <View style={styles.taskSubContainer}>
                        <View style={styles.taskUserInfo}>
                            <CachedImage
                                resizeMode={'cover'}
                                style={styles.taskIcon}
                                source={isNull(item.headImage)
                                    ? require('../../../images/icon_header_default.png') : {
                                        uri: item.headImage
                                    }}
                            />
                            <View style={styles.taskUserName}>
                                {this._renderName(item)}
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.taskTime}>
                                    {item.createTime}
                                </Text>
                            </View>
                        </View>

                        {this._renderMessageType(item)}
                    </View>

                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.taskContentText}
                          numberOfLines={2} ellipsizeMode={'tail'}>
                        【{item.messageTitle}】{item.messageContent}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }

    /**
     HIST_PROJECT_APPR("历史项目审核",1),  审核ID
     PLAN_TASK_APPR("计划任务审核",2),     审核ID
     PROJECT_DELAY_APPR("项目延期审核",3), 审核ID
     PROJECT_FLOW_APPR("项目流程审核",4),  审核ID
     PLAN_TASK("计划任务",5),
     PROJECT_PROBLEM("问题反馈",6),        问题ID
     RECEIVE_PAYMENT_REMIND("回款提醒",7), 合同ID
     PLAN_WARNING_REMIND("计划提醒",8)
     * @param item
     * @private
     */
    _jumpLookMessage(item) {
        if (Utils.isFastClick()) {
            return;
        }
        console.log(item)
        switch (item.sourceType) {
            case 1:
                //历史项目审核
                this.props.navigation.navigate('ProjectChangeScene', {
                    'processId': item.sourceId,
                    'projectStage': 0,
                    'processType': 0,
                    'processName': item.messageContent
                });
                break;
            case 2:
                //计划任务审核
                this.props.navigation.navigate('ProjectSchedule', {
                    'processId': item.sourceId,
                    'projectStage': 0,
                    'processType': 1,
                });
                break;
            case 3:
                //项目延期审核
                this.props.navigation.navigate('ProjectDelayScene', {
                    'processId': item.sourceId,
                    'projectStage': 0,
                    'processType': 3,
                });
                break;
            case 4:
                //项目流程审核
                this.props.navigation.navigate('AuditProcess', {
                    'processId': item.sourceId,
                    'projectStage': 0,
                    'processType': 5,
                });
                break;
            case 5:
                //计划任务
                break;
            case 6:
                //问题反馈
                this.props.navigation.navigate('QuestionDetailScene', {problemId: item.sourceId});
                break;
            case 7:
                //回款提醒
                this._updateMessageStatus2Done(item.id);
                this.props.navigation.navigate('PaymentDetail', {contractId: item.sourceId});
                break;
            case 8:
                //计划提醒
                this._updateMessageStatus2Done(item.id);
                this.props.navigation.navigate('ProjectDetail', {
                    projectId: item.sourceId,
                    index: 1
                });
                break;

        }
    }

    _updateMessageStatus2Done(id) {
        let params = {messageId: id, userName: _USERNAME_};
        new UpdateMessageStatus2Done(params).start(function (data) {
            log('待办消息为7或8调用UpdateMessageStatus2Done方法:', data)
        })
    }

    //返回itemView
    _renderName(item) {
        if (isNull(item.depName)) {
            return (
                <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.taskName}>
                    {item.createUser}
                </Text>
            )
        } else {
            return (
                <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.taskName}>
                    {item.depName}-{item.createUser}
                </Text>
            )
        }
    }

    //返回itemView
    _renderMessageType(item) {
        if (item.sourceType === 1 || item.sourceType === 2 || item.sourceType === 3 || item.sourceType === 4) {
            return (
                <View style={styles.taskApproveContainer}>
                    <View style={styles.taskApprove}>
                    </View>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.taskApproveFont}>
                        待审核
                    </Text>
                </View>
            );
        } else if (item.sourceType === 5) {
            return (
                <View style={styles.taskPlanContainer}>
                    <View style={styles.taskPlan}>
                    </View>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.taskPlanFont}>
                        计划任务
                    </Text>
                </View>
            );
        } else if (item.sourceType === 6) {
            return (
                <View style={styles.taskApproveContainer}>
                    <View style={styles.taskApprove}>
                    </View>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.taskApproveFont}>
                        问题反馈
                    </Text>
                </View>
            );
        } else if (item.sourceType === 7 || item.sourceType === 8) {
            return (
                <View style={styles.taskMsgContainer}>
                    <View style={styles.taskMsg}>
                    </View>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.taskMsgFont}>
                        预警通知
                    </Text>
                </View>
            );
        }
    }

    //返回itemView
    _renderItemView({item}) {
        return (
            <TouchableOpacity
                onPress={() => this.jumpTargetPage(item.routeName)}>
                <View style={styles.topItem}>
                    <CachedImage
                        resizeMode='contain'
                        style={styles.menuIcon}
                        source={item.source}/>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.menuTitle}>
                        {item.value}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    /**
     * 跳到指定页面
     * @param routeName
     */
    jumpTargetPage(routeName) {
        if (Utils.isFastClick()) {
            return;
        }
        this.props.navigation.navigate(routeName)
    }

}

export default WorkScene;