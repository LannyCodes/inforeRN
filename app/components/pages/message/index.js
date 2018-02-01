/**
 * Created by coderxuan on 2017/5/6.
 */
import React, {Component} from 'react';
import {
    View, ScrollView, ListView, Text, TouchableOpacity,
    TouchableHighlight, RefreshControl, Image
} from 'react-native';
import TitleBar from '../../widget/TitleBar'
import SearchView from '../../widget/SearchView'
import styles from './MessageStyles'
import {DeleteMessageRequest} from '../../../api/message/QueryMsgRequest'
import {SwipeListView} from 'react-native-swipe-list-view';
import * as messageCountActions from '../../../actions/message/MessageCountAction'
import {connect} from 'react-redux';
import MuliImage from '../../widget/MutliImage'
import Toast from 'react-native-root-toast'
import * as messageActions from '../../../actions/message/MessageAction';
import {bindActionCreators} from 'redux';
import JPushModule from 'jpush-react-native';
let messages = [];
let pageNo = 1;
class MessageScene extends Component {

    constructor(props: Object) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }

    componentDidMount() {
        this._onRefresh();
        // if (_IOS_) {
        //     JPushModule.setBadge(0, () => {
        //     })
        // }
    }

    /**
     * refresh
     * @private
     */
    _onRefresh() {
        pageNo = 1;
        messages = [];
        let self = this;
        // 获取数据
        let params = {userName: _USERNAME_, pageSize: _PAGESIZE_, pageNo: pageNo};
        let {fetchMessages} = this.props.messageActions;
        fetchMessages(params, true);
    }

    _loadMore() {
        let self = this;
        // 获取数据
        let params = {userName: _USERNAME_, pageSize: _PAGESIZE_, pageNo: ++pageNo};
        let {fetchMessages} = this.props.messageActions;
        fetchMessages(params, false);
    }

    renderPlaceHolder = () => {
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.props.isFetching}
                        onRefresh={() => this._onRefresh()}
                        tintColor="#3ca8fe"
                        colors={['#3ca8fe']}
                        progressBackgroundColor="#f1f1f1"
                    />
                }>
                <View
                    style={styles.holderContainer}>
                    <Image
                        resizeMode='cover'
                        style={styles.holderImage}
                        source={require('../../../images/common/icon_holder_message.png')}/>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={styles.holderMessage}>未查询到结果</Text>
                </View>
            </ScrollView>
        )
    };

    deleteRow(data, secId, rowId, rowMap) {
        let self = this;
        rowMap[`${secId}${rowId}`].closeRow();
        let params = {messageId: data.id, userName: _USERNAME_};
        new DeleteMessageRequest(params).start(function (body) {
            self._onRefresh();
            if (data.messageStatus != 1) {
                let {messageReaded} = self.props.messageActions;
                messageReaded(rowId);
            }
        }, function (error) {
        }, function (error) {
            Toast.show('删除失败，请稍后重试')
        })
    }

    closeRow(secId, rowId, rowMap) {
        rowMap[`${secId}${rowId}`].closeRow();
    }

    renderList = (messages) => {
        let self = this;
        return (
            <SwipeListView
                refreshControl={
                    <RefreshControl
                        refreshing={this.props.isFetching}
                        onRefresh={() => this._onRefresh()}
                        tintColor="#3ca8fe"
                        colors={['#3ca8fe']}
                        progressBackgroundColor="#f1f1f1"
                    />
                }
                onEndReachedThreshold={16}
                onEndReached={() => this._loadMore()}
                disableRightSwipe={true}
                directionalDistanceChangeThreshold={10}
                dataSource={self.ds.cloneWithRows(messages)}
                renderRow={ this.renderMsgItemView.bind(this)}
                renderHiddenRow={ (data, secId, rowId, rowMap) => (
                    <View style={styles.rowBack}>
                        <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]}
                                          onPress={ _ => this.deleteRow(data, secId, rowId, rowMap) }>
                            <Text style={styles.backTextWhite}>删除</Text>
                        </TouchableOpacity>
                    </View>
                )}
                leftOpenValue={75}
                rightOpenValue={-75}/>
        )
    };

    render() {
        messages = this.props.messageList;
        return (
            <View style={styles.container}>
                <TitleBar navigation={this.props.navigation}
                          title='消息'/>
                <SearchView navigation={this.props.navigation} scene={'SearchMessage'}/>
                {
                    ((messages.length === 0 || !messages) && this.props.isFetching === false) ? this.renderPlaceHolder() : this.renderList(messages)
                }
            </View>
        );
    }

    _msgRowSeparator = () => {
        return <View style={styles.msgRowSeparator}/>;
    };

    _keyExtractor = (item, index) => index;

    //返回itemView
    renderMsgItemView(rowData, sectionID, rowID) {
        let createUserColor = rowData.messageStatus === 1 ? '#999999' : '#333333'
        let messageColor = rowData.messageStatus === 1 ? '#999999' : '#333333'
        return (
            <TouchableHighlight underlayColor={'#cccccc'}
                                onPress={() => this.jumpTargetPage('MessageDetail', rowData, rowID)}>
                <View style={styles.msgContainer}>
                    <View style={styles.msgSubContainer}>
                        {this.renderMsgImg(rowData)}
                        <View style={styles.msgText}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flex: 1
                            }}>
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                      style={[styles.msgName, {color: createUserColor}]}
                                      numberOfLines={1} ellipsizeMode={'tail'}>
                                    {rowData.nickName}
                                </Text>
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                      style={[styles.msgTime, {color: messageColor}]}>
                                    {rowData.createTime !== null && rowData.createTime.split(' ', 1)}
                                </Text>
                            </View>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                  style={[styles.msgContent, {color: messageColor}]}
                                  numberOfLines={1} ellipsizeMode={'tail'}>
                                {rowData.messageContent}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>

        );
    }

    renderMsgImg(item) {
        return (
            <MuliImage
                resizeMode='cover'
                style={styles.msgIcon}
                uri={item.headImage}
            />
        )
    }

    /**
     * 跳到指定页面
     * @param routeName
     * @param item
     */
    jumpTargetPage(routeName, item, index) {
        this.props.navigation.navigate(routeName, {item: item, index: index});
    }
}

function mapStateToProps(state) {
    return {
        msgCount: state.message.saveMsgCount,
        messageList: state.message.messageData.messageList,
        isFetching: state.message.messageData.isFetching,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        messageActions: bindActionCreators(messageActions, dispatch),
        messageCountActions: bindActionCreators(messageCountActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageScene);