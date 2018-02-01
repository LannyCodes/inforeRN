/**
 * Created by InforeXuan on 2017/5/23.
 */
import React, {Component} from 'react'

import {
    View, Text, TextInput, TouchableOpacity, DeviceEventEmitter
}from "react-native"
import TitleBar from '../../../widget/TitleBar'
import {CommitAuditResultRequest} from '../../../../api/auditmanage/AuditManageRequests'
import {USER_KEY} from '../../../../constants/ContextConst'
import Toast from 'react-native-root-toast'
const StyleSheet = require('../../../../base/StyleSheet');
let bgColorBtn1 = {backgroundColor: '#f1f1f1'};
let bgColorBtn2 = {backgroundColor: '#f1f1f1'};
let bgColorBtn3 = {backgroundColor: '#f1f1f1'};

class ApprovalReasonScene extends Component {

    constructor(props) {
        super(props);
        this.placeholder = this.props.navigation.state.params.placeholder,
            this.state = {
                comment: '',
                userId: ''
            }
    }

    /**
     * 提交审核结果
     * @param comment
     * @private
     */
    _commit(comment) {
        let self = this;
        let {checkStatus, approvalId} = this.props.navigation.state.params;
        if (checkStatus === 2) {
            if (comment === '') {
                Toast.show('请输入拒绝理由!');
                return;
            }
        }
        storage.load({
            key: USER_KEY.USERSTAGE_KEY,
        }).then(data => {
            //项目ID，通过或拒绝，审核内容，实际审核人
            let params = {
                'checkStatus': checkStatus,
                'approvalId': approvalId,
                'content': comment,
                'realApprovalUser': data.userName
            };
            new CommitAuditResultRequest(params).start(function (data) {
                log(data)
                if (data === null) {
                    DeviceEventEmitter.emit('NEED_REFRESH', checkStatus, 1);
                    // self.props.navigation.state.params.onGoBack(checkStatus, 1)
                } else {
                    DeviceEventEmitter.emit('NEED_REFRESH', checkStatus, 0);
                    // self.props.navigation.state.params.onGoBack(checkStatus, 0)
                }
                self.props.navigation.goBack()
            }, function (error) {
                log(error)
                DeviceEventEmitter.emit('NEED_REFRESH', checkStatus, 0);
                // self.props.navigation.state.params.onGoBack(checkStatus, 1);
                // self.props.navigation.goBack()
            })
        }).catch(err => {
            log(err.message);
        });

    }

    render() {
        return (
            <View style={styles.container}>
                <TitleBar navigation={this.props.navigation}
                          title='处理意见'
                          leftImage={require('../../../../images/common/icon_bar_left.png')}
                          onLeftPress={() => this.props.navigation.goBack()}
                          rightText={'确定'}
                          onRightPress={() => {
                              this._commit(this.state.comment);
                          }}/>

                <View style={styles.approvalInput}>
                    <TextInput
                        style={styles.input}
                        multiline={true}
                        defaultValue={this.state.comment}
                        onChangeText={(text) =>
                            this.setState({
                                comment: text
                            })
                        }
                        placeholder={this.placeholder}
                        placeholderTextColor="#cccccc"
                        underlineColorAndroid='transparent'
                    />
                </View>
                {this.props.navigation.state.params.checkStatus === 2 &&
                <View style={styles.bottomSuggestion}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => {
                        bgColorBtn1.backgroundColor = '#ffffff';
                        isNull(this.state.comment) ?
                            this.setState({
                                comment: this.state.comment + '时间节点不一致;'
                            }) :
                            this.setState({
                                comment: this.state.comment + ';时间节点不一致;'
                            })
                    }} style={[styles.touchOpacity, bgColorBtn1]}>
                        <View style={styles.itemContainer}>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemSuggestion}>
                                时间节点不一致
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => {
                        bgColorBtn2.backgroundColor = '#ffffff';
                        isNull(this.state.comment) ?
                            this.setState({
                                comment: this.state.comment + '档案不齐全;'
                            }) :
                            this.setState({
                                comment: this.state.comment + '档案不齐全;'
                            })
                    }} style={[styles.touchOpacity, bgColorBtn2]}>
                        <View style={styles.itemContainer}>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemSuggestion}>
                                档案不齐全
                            </Text>
                        </View>

                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => {
                        bgColorBtn3.backgroundColor = '#ffffff';
                        isNull(this.state.comment) ?
                            this.setState({
                                comment: this.state.comment + '流程问题;'
                            }) :
                            this.setState({
                                comment: this.state.comment + '流程问题;'
                            })
                    }} style={[styles.touchOpacity, bgColorBtn3]}>
                        <View style={styles.itemContainer}>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemSuggestion}>
                                流程问题
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>}
            </View>
        )
    }
}

// define your styles
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e7e7e7',
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    approvalInput: {
        flexDirection: 'column',
        height: 200,
        backgroundColor: 'white',
        padding: 15
    },
    input: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flex: 1,
        fontSize: 14,
        color: '#333333',
    },
    bottomSuggestion: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    itemContainer: {
        width: 105,
        height: 28,
        borderRadius: 4,
        // backgroundColor: '#f7f7f7',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemSuggestion: {
        color: '#333333',
        fontSize: 12
    },
    touchOpacity: {
        marginLeft: 15,
    }
});

export default ApprovalReasonScene;