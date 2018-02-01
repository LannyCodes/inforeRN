/**
 * Created by Lanny on 2017/5/23.
 */
'use strict';
import React, {Component} from 'react'

import {
    View,
    FlatList,
    Text,
    Image,
    ScrollView,
    RefreshControl,
    TouchableWithoutFeedback,
    DeviceEventEmitter
}from "react-native"
import TitleBar from '../../../widget/TitleBar'
import {GetQuestionBackRequest, SolveProblemRequest} from '../../../../api/projectmanage/ProjectManageRequests'
import DialogBox from '../../../widget/DialogBox'
const StyleSheet = require('../../../../base/StyleSheet');
import {USER_KEY} from '../../../../constants/ContextConst'
let navigateTitle = '问题反馈';

class QuestionFeedBackScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionList: [],
            isRefreshing: false,
        }
    }

    componentDidMount() {
        this._onRefresh();
        let self = this;
        this._subscription_refreshquestion = DeviceEventEmitter.addListener('SAVEQUESTION_SUCCESS', function (event) {
            self._onRefresh();
        });
    }

    componentWillUnmount() {
        this._subscription_refreshquestion.remove();
    }

    /**
     * refresh
     * @private
     */
    _onRefresh() {
        let self = this;
        let {params} = this.props.navigation.state;
        self.setState({isRefreshing: true});
        // 获取数据
        let requestparams = {projectId: params.projectId};
        new GetQuestionBackRequest(requestparams).start(function (data) {
            log(data);
            self.setState({
                questionList: data.ProblemList
            });
            setTimeout(() => {
                self.setState({
                    isRefreshing: false,
                })
            }, _loading_)
        }, function (error) {
            setTimeout(() => {
                self.setState({
                    isRefreshing: false,
                })
            }, _loading_)
        });
    }

    render() {
        let {params} = this.props.navigation.state;
        let data = this.state.questionList;
        return (
            <View style={styles.container}>
                <TitleBar navigation={this.props.navigation}
                          title={navigateTitle}
                          leftImage={require('../../../../images/common/icon_bar_left.png')}
                          onLeftPress={() => this.props.navigation.goBack()}
                          rightText={'新建'}
                          onRightPress={() => {
                              this.props.navigation.navigate('NewFeedBackScene', {
                                  projectId: params.projectId
                              })
                          }}/>

                <View style={styles.container}>
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={() => this._onRefresh()}
                                tintColor="#3ca8fe"
                                colors={['#3ca8fe']}
                                progressBackgroundColor="#f1f1f1"
                            />
                        }
                        keyExtractor={this._keyExtractor.bind(this)}
                        data={data}
                        renderItem={this.renderItemView.bind(this)}
                        ItemSeparatorComponent={this._itemRowSeparator}
                        contentContainerStyle={styles.listMarginTop}
                    />
                </View>

                <DialogBox ref={(dialogbox) => {
                    this.dialogbox = dialogbox
                }}/>
            </View>

        )
    }

    //返回itemView
    renderItemView({item}) {
        return (
            <View key={item.key} style={styles.itemContainer}>
                <View style={styles.proCommonStyle}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.nameLabelTxt}>
                        问题
                    </Text>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.nameValueTxt}>
                        {item.problemName}
                    </Text>
                </View>
                <View style={styles.itemDivider}/>
                <View style={styles.proDescription}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.nameLabelTxt}>
                        问题内容
                    </Text>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.descriptionTxt}>
                        {item.problemDescription}
                    </Text>
                </View>
                <View style={styles.itemDivider}/>
                <View style={styles.proCommonStyle}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.nameLabelTxt}>
                        所属项目
                    </Text>
                    {!isNull(item.project) ?
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.nameValueTxt}>
                            【{item.project.projectName}】
                        </Text> : !isNull(item.projectName) ?
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.nameValueTxt}>
                                {item.projectName}
                            </Text> : <View/>
                    }
                </View>
                <View style={styles.itemDivider}/>
                <View style={styles.proCommonStyle}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.nameLabelTxt}>
                        协办人
                    </Text>
                    {this.renderItemMembers(item)}
                </View>
                <View style={styles.itemDivider}/>
                <View style={styles.proCommonStyle}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.nameLabelTxt}>
                        问题状态
                    </Text>
                    {this.renderStatus(item)}
                </View>
                <View style={styles.itemDivider}/>
                <View style={styles.proCommonStyle}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.nameLabelTxt}>
                        责任部门
                    </Text>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.nameValueTxt}>
                        {item.depName}
                    </Text>
                </View>
                <View style={styles.itemDivider}/>
                <View style={styles.proCommonStyle}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.nameLabelTxt}>
                        提出时间
                    </Text>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.nameValueTxt}>
                        {item.createTime}
                    </Text>
                </View>
                <View style={styles.itemDivider}/>
                <View style={styles.proCommonStyle}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.nameLabelTxt}>
                        提出人
                    </Text>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.nameValueTxt}>
                        {item.createUser}
                    </Text>
                </View>
                <View style={styles.itemDivider}/>
                {this.renderBottom(item)}
            </View>
        );
    }

    renderStatus(item) {
        if (item.problemStatus === 0) {
            return (
                <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.nameValueTxt}>
                    未解决
                </Text>
            );
        } else if (item.problemStatus === 1) {
            return (
                <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.nameValueTxt}>
                    已解决
                </Text>
            );
        }
    }

    renderItemMembers(item) {
        let problemMembers = '';
        if (item.projectProblemList) {
            for (var i = 0; i < item.projectProblemList.length; i++) {
                if (item.projectProblemList[i].userName !== item.createUser) {
                    problemMembers += item.projectProblemList[i].userName;
                    problemMembers += ","
                }
            }
            problemMembers = problemMembers.substring(0, problemMembers.length - 1);
        }
        return (
            <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.nameValueTxt}>
                {problemMembers}
            </Text>
        )
    }

    renderBottom(item) {
        if (isNull(_USERNAME_)) {
            return <View/>
        }
        let hasMe = false;
        if (_USERNAME_ === item.createUser) {
            hasMe = true;
        } else {
            if (item.projectProblemList) {
                for (var i = 0; i < item.projectProblemList.length; i++) {
                    if (item.projectProblemList[i].userName === _USERNAME_) {
                        if (item.projectProblemList[i].status !== 2) {
                            hasMe = true;
                        }
                    }
                }
            }
        }


        if (item.problemStatus === 0 && hasMe) {
            return (
                <View style={styles.proBottomContainerStyle}>
                    <TouchableWithoutFeedback onPress={() => {
                        this.requestSolveProblem(item);
                    }}>
                        <View style={styles.proBottomStyle}>
                            <Image
                                resizeMode='contain'
                                style={styles.bottomIcon}
                                source={require('../../../../images/projectmanage/icon_fkwt.png')}/>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.bottomtxt}>
                                立即处理
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.horizontalDivider}/>
                    <TouchableWithoutFeedback onPress={() => {
                        this.props.navigation.navigate('QuestionDetailScene', {problemId: item.id})
                    }}>
                        <View style={styles.proBottomStyle}>
                            <Image
                                resizeMode='contain'
                                style={styles.bottomIcon}
                                source={require('../../../../images/projectmanage/icon_detail.png')}/>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.bottomtxt}>
                                解决详情
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            )
        } else {
            return (
                <View style={styles.proBottomContainerStyle}>
                    <TouchableWithoutFeedback onPress={() => {
                        this.props.navigation.navigate('QuestionDetailScene', {problemId: item.id})
                    }}>
                        <View style={styles.proBottomStyle}>
                            <Image
                                resizeMode='contain'
                                style={styles.bottomIcon}
                                source={require('../../../../images/projectmanage/icon_detail.png')}/>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.bottomtxt}>
                                解决详情
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            )
        }
    }

    requestSolveProblem(item) {
        let self = this;
        self.dialogbox.confirm({
            content: ['是否立即处理？'],
            ok: {
                color: '#29a1f7',
                text: '是',
                callback: () => {
                    // 获取数据
                    let requestparams = {problemId: item.id, userName: _USERNAME_};
                    new SolveProblemRequest(requestparams).start(function (solvedata) {
                        self.dialogbox.alert('处理完成，点击解决详情查看处理情况');
                        self._onRefresh();
                    });
                },
            },
            cancel: {
                color: '#cccccc',
                text: '否'
            },
        });
    }

    _itemRowSeparator = () => {
        return <View style={styles._itemRowSeparator}/>;
    }

    _keyExtractor = (item, index) => index;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e7e7e7',
        flexDirection: 'column',
    },
    itemContainer: {
        backgroundColor: 'white',
        flexDirection: 'column',
    },
    _itemRowSeparator: {
        height: 10
    },
    proCommonStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 14,
        paddingBottom: 14,
        paddingLeft: 15,
        paddingRight: 12,
        backgroundColor: 'white'
    },
    nameLabelTxt: {
        fontSize: 16,
        color: '#333333'
    },
    nameValueTxt: {
        fontSize: 16,
        color: '#999999'
    },
    descriptionTxt: {
        color: '#9b9b9b',
        fontSize: 16,
        marginTop: 10
    },
    itemDivider: {
        height: 1,
        marginLeft: 15,
        backgroundColor: '#e7e7e7'
    },
    proDescription: {
        paddingTop: 14,
        paddingLeft: 15,
        paddingBottom: 17,
        paddingRight: 15,
        flexDirection: 'column',
    },
    statusValue: {
        fontSize: 16,
        color: '#29a1f7'
    },
    proBottomContainerStyle: {
        flex: 1,
        height: 41,
        flexDirection: 'row'
    },
    proBottomStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    horizontalDivider: {
        width: 1,
        marginTop: 10.5,
        marginBottom: 10.5,
        backgroundColor: '#e7e7e7'
    },

    bottomtxt: {
        fontSize: 14,
        color: '#999999',
        marginLeft: 6
    },
    bottomIcon: {
        width: 18,
        height: 18
    },
    listMarginTop: {
        marginTop: 10
    }
});

//make this component available to the app
export default QuestionFeedBackScene;