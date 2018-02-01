/**
 * Created by InforeXuan on 2017/5/19.
 */
import React, {Component} from 'react'

import {
    View, Text, TouchableOpacity, TouchableHighlight,
    Image, Dimensions, FlatList, RefreshControl, DeviceEventEmitter, ScrollView
}from "react-native"
import TitleBar from '../../widget/TitleBar'
import AuditmanagePart from "./AuditmanagePart";
import AuditManageItem from './AuditManageItem';
import {AuditManageRequest} from '../../../api/auditmanage/AuditManageRequests'
let leftItemBgColor = -1;
let rightItemBgColor = -1;
const StyleSheet = require('../../../base/StyleSheet');
let flowStyles = ['-1', '0', '1', '3', '5'];//0-变更审批 1-计划审核 3-延期审核 5-流程审核 -1全部
let flowStates = [-1, 0, 1, 2];//-1全部
const screenWidth = Dimensions.get('window').width;

let pageNo = 1;
let totalCount = 0;
let localCount = 0;
let canLoadMore = true; //默认可以上拉加载，（当筛选时不可以上拉加载）
class AuditManageScene extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            firstSelect: false,
            secondSelect: false,
            clickedItem: 0,
            isRefreshing: false,
        };
        this.store = [];
    }


    componentDidMount() {
        let self = this;
        this._onRefresh();
        this._subscription_needRefresh = DeviceEventEmitter.addListener('NEED_REFRESH', function (checkStatus, result) {
            self._onRefresh();
        });
    }

    componentWillUnmount() {
        this._subscription_needRefresh.remove();
    }

    fetchFromServer(pageNo) {
        let self = this;
        let params = {userName: _USERNAME_, pageNo: pageNo, pageSize: _PAGESIZE_};

        // 获取数据
        new AuditManageRequest(params).start(function (data) {
            if (data.list === null || data.list.length <= 0) {
                self.setState({
                    listData: [],
                    isRefreshing: false,
                })
            } else {
                localCount += data.list.length;
                totalCount = data.totalCount;
                self.store = self.store.concat(data.list);
                self.setState({
                    listData: self.store,
                    isRefreshing: false,
                });
            }

        }, function (error) {
            setTimeout(() => {
                self.setState({
                    listData: [],
                    isRefreshing: false,
                })
            }, _loading_)
        });
    }

    _onRefresh() {
        canLoadMore = true;
        pageNo = 1;
        this.store = [];
        localCount = 0;
        this.setState({isRefreshing: true});
        this.fetchFromServer(pageNo)

    }

    _loadMore() {
        if (canLoadMore) {
            if (localCount < totalCount) {
                this.fetchFromServer(++pageNo)
            }
        }
    }

    _leftCallback(item) {
        let i = 0;
        let array = [];
        for (let sub = 0; sub < this.store.length; sub++) {
            if (item === '-1') {
                array = this.store;
                break;
            }
            if (item === this.store[sub].processType) {
                array[i++] = this.store[sub];
            }
        }
        canLoadMore = false;
        this.setState({listData: array})
        log(this.state.listData)
    }

    _rightCallback(item) {
        let i = 0;
        let array = [];
        for (let sub = 0; sub < this.store.length; sub++) {
            if (item === -1) {
                array = this.store;
                break;
            }
            if (item === this.store[sub].processStatus) {
                array[i++] = this.store[sub];
            }
        }
        canLoadMore = false;
        this.setState({listData: array})
        log(this.state.listData)
    }

    _translateStyleNum(item) {
        if (item === '-1' || item === -1) {
            return '全部';
        } else if (item === '0' || item === 0) {
            // return '变更审核';
            return '历史项目审核';
        } else if (item === '3' || item === 3) {
            return '项目延期审核';
            // return '项目延期审核';
        } else if (item === '1' || item === 1) {
            return '计划任务审核';
            // return '计划审核';
        } else if (item === '5' || item === 5) {
            // return '流程审核';
            return '项目流程审核';
        }
    }

    _translateStatusNum(item) {
        switch (item) {
            case -1:
                return '全部';
            case 0:
                return '待审核';
            case 1:
                return '已通过';
            case 2:
                return '未通过';
        }
    }

    render() {
        let textStyle1 = this.state.firstSelect ? styles.top_text_selected : styles.top_text_unselect;
        let imageStyle1 = this.state.firstSelect ? styles.top_image_select : styles.top_image_unselect;
        let image1 = this.state.firstSelect ? require('../../../images/auditmanage/up_arrow.png') : require('../../../images/auditmanage/down_arrow.png');
        let textStyle2 = this.state.secondSelect ? styles.top_text_selected : styles.top_text_unselect;
        let imageStyle2 = this.state.secondSelect ? styles.top_image_select : styles.top_image_unselect;
        let image2 = this.state.secondSelect ? require('../../../images/auditmanage/up_arrow.png') : require('../../../images/auditmanage/down_arrow.png');

        let flowStyle = flowStyles.map((item, i) => {
            return (
                <TouchableHighlight
                    underlayColor='#dddddd'
                    onPress={() => {
                        // this.flatlist.scrollToOffset({offset: 0})
                        this.auditmanagePart.close();
                        leftItemBgColor = i;
                        this._leftCallback(item);
                    }} key={i} style={i === leftItemBgColor ? styles.gr : styles.wh}>
                    <View style={styles.content}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                              style={styles.contentText}>{this._translateStyleNum(item)}</Text>
                    </View>
                </TouchableHighlight>)
        });


        let flowState = flowStates.map((item, i) => {
            return (
                <TouchableHighlight
                    underlayColor='#dddddd'
                    onPress={() => {
                        this.auditmanagePart.close();
                        rightItemBgColor = i;
                        this._rightCallback(item);
                    }} key={i} style={i === rightItemBgColor ? styles.gr : styles.wh}>
                    <View style={styles.content}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                              style={styles.contentText}>{this._translateStatusNum(item)}</Text>
                    </View>
                </TouchableHighlight>)
        });
        return (
            <View style={styles.container}>
                <TitleBar navigation={this.props.navigation}
                          title='审核管理'
                          rightImage={require('../../../images/auditmanage/icon_find.png')}
                          leftImage={require('../../../images/common/icon_bar_left.png')}
                          onRightPress={() => this.props.navigation.navigate('AuditSearchScene')}
                          onLeftPress={() => this.props.navigation.goBack()}/>
                <View style={styles.top_part}>
                    <TouchableOpacity style={styles.touch} activeOpacity={1}
                                      onPress={() => {
                                          this.setState({clickedItem: 0, firstSelect: true, secondSelect: false});
                                          this.auditmanagePart.down();
                                          rightItemBgColor = -1;
                                      }}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={textStyle1}>流程类型</Text>
                        <Image style={imageStyle1} source={image1}/>
                    </TouchableOpacity>
                    <View style={styles.separate_line}/>
                    <TouchableOpacity style={styles.touch} activeOpacity={1}
                                      onPress={() => {
                                          this.setState({clickedItem: 1, firstSelect: false, secondSelect: true});
                                          this.auditmanagePart.down();
                                          leftItemBgColor = -1;
                                      }}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={textStyle2}>流程状态</Text>
                        <Image style={imageStyle2} source={image2}/>
                    </TouchableOpacity>
                </View>
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
                    onEndReachedThreshold={0.1}
                    onEndReached={() => this._loadMore()}
                    keyExtractor={this._keyExtractor.bind(this)}
                    data={this.state.listData}
                    renderItem={this._renderItem.bind(this)}/>
                {this.state.listData.length === 0 && this.state.isRefreshing === false && this.renderHolder()}

                <AuditmanagePart ref={(auditmanagePart) => {
                    this.auditmanagePart = auditmanagePart
                }} height={this.state.clickedItem === 0 ? 4.5 : 4}>
                    {this.state.clickedItem === 0 ? flowStyle : flowState}
                </AuditmanagePart>
            </View>
        )
    }

    renderHolder = () => {
        return (
            <ScrollView>
                <View style={styles.holderContainer}>
                    <Image
                        resizeMode='cover'
                        style={styles.holderImage}
                        source={require('../../../images/common/icon_holder_rw.png')}/>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={styles.holderMessage}>未查询到结果</Text>
                </View>
            </ScrollView>
        )
    };

    _renderItem({item, index}) {
        return <AuditManageItem {...item} {...this.props} key={index}/>
    }

    _keyExtractor = (item, index) => index;

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efefef'
    },
    top_part: {
        height: 40,
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    touch: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    top_text_selected: {
        fontSize: 14,
        color: 'rgb(41,161,247)',
        textAlign: 'center'
    },
    top_text_unselect: {
        fontSize: 14,
        color: 'rgb(153,153,153)',
        textAlign: 'center'
    },
    top_image_select: {
        width: 16,
        height: 16,
        marginLeft: 5
    },
    top_image_unselect: {
        width: 16,
        height: 16,
        marginLeft: 5
    },
    separate_line: {
        height: 24,
        width: 0.5,
        opacity: 1,
        backgroundColor: 'rgb(231,231,231)',
        alignSelf: 'center'
    },
    content: {
        width: screenWidth,
        alignItems: 'center',
        flexDirection: 'column',
    },
    contentText: {
        alignSelf: 'center',
        paddingTop: 12.5,
        paddingBottom: 13.5,
        fontSize: 14,
        color: 'rgb(51,51,51)',
    },
    click: {
        backgroundColor: 'rgb(255,255,255)'
    },
    wh: {
        flex: 1,
        backgroundColor: 'rgb(255,255,255)'
    },
    gr: {
        flex: 1,
        backgroundColor: 'rgb(247,247,247)'
    },
    holderContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    holderImage: {
        width: 80,
        height: 80,
    },
    holderMessage: {
        fontSize: 15,
        marginTop: 15,
        color: 'rgb(166,166,166)',
    }
})

export default AuditManageScene;