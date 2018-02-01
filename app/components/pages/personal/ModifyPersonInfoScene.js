/**
 * Created by coderxuan on 2017/6/1.
 */
import React, {Component} from 'react';
import {View, TextInput, DeviceEventEmitter} from 'react-native';
import {USER_KEY} from '../../../constants/ContextConst'
import Toast from 'react-native-root-toast'
import TitleBar from '../../widget/TitleBar'
import DialogBox from '../../widget/DialogBox'
import {isTel, isMail, isDeskTel} from '../../../utils/Common'
import {UpdateUserInfoRequest} from '../../../api/personal/PersonalRequests'
const StyleSheet = require('../../../base/StyleSheet')
let title = '修改信息';
let placeHolder = '请输入修改信息';
let keyboard = 'default';
let inputInfo = '';
let maxLength = 11;
let modifyValues = '';
class ModifyPersonInfoScene extends Component {

    constructor(props: Object) {
        super(props)
    }

    componentWillMount() {
        let {params} = this.props.navigation.state;
        modifyValues = params.values;
        switch (params.fromTask) {
            case 'tel':
                title = '修改手机号';
                placeHolder = '请输入手机号';
                keyboard = 'numeric';
                maxLength = 11;
                break;
            case 'email':
                title = '修改邮箱';
                placeHolder = '请输入邮箱';
                keyboard = 'email-address';
                maxLength = 31;
                break;
            case 'desktel':
                title = '修改座机号';
                placeHolder = '请输入座机号';
                keyboard = 'numeric';
                maxLength = 15;
                break;
        }
    }

    /**
     * 提交信息
     * email/tel/mobile （email:邮箱 tel:座机，mobile:手机号）
     * @param fromRoute
     * @returns {boolean}
     * @private
     */
    _commitInfo(fromRoute, userId) {
        let self = this;
        switch (fromRoute) {
            case 'tel':  //手机号
                if (isTel(inputInfo)) {
                    let params = {'userId': userId, 'mobile': inputInfo}
                    new UpdateUserInfoRequest(params).start(function (data) {
                        storage.save({
                            key: USER_KEY.USER_CANMODIFY_INFO_KEY.TEL,
                            data: {
                                userTelephone: inputInfo, //手机号
                            }
                        });
                        Toast.show('修改成功');
                        DeviceEventEmitter.emit('MODIFY_SUCCESS', null);
                        self.props.navigation.goBack();
                    });
                } else {
                    Toast.show('请输入正确的手机号');
                }
                break;
            case 'email':  //邮箱
                if (isMail(inputInfo)) {
                    let params = {'userId': userId, 'email': inputInfo}
                    new UpdateUserInfoRequest(params).start(function (data) {
                        storage.save({
                            key: USER_KEY.USER_CANMODIFY_INFO_KEY.EMAIL,
                            data: {
                                userEmail: inputInfo,
                            }
                        });
                        Toast.show('修改成功');
                        DeviceEventEmitter.emit('MODIFY_SUCCESS', null);
                        self.props.navigation.goBack();
                    });
                } else {
                    Toast.show('请输入正确邮箱');
                }
                break;
            case 'desktel':   //座机号
                if (isDeskTel(inputInfo)) {
                    let params = {'userId': userId, 'tel': inputInfo};
                    new UpdateUserInfoRequest(params).start(function (data) {
                        storage.save({
                            key: USER_KEY.USER_CANMODIFY_INFO_KEY.DESKPHONE,
                            data: {
                                userDeskPhone: inputInfo,
                            }
                        });
                        Toast.show('修改成功');
                        DeviceEventEmitter.emit('MODIFY_SUCCESS', null);
                        self.props.navigation.goBack();
                    });
                } else {
                    Toast.show('座机号必须是7-12位数字');
                }
                break
        }
        return false
    }

    _updateInfo() {
        this.dialogbox.confirm({
            content: ['是否确认修改？'],
            ok: {
                text: '是',
                callback: () => {
                    if (inputInfo && inputInfo !== '') {
                        let {params} = this.props.navigation.state;
                        this._commitInfo(params.fromTask, params.userId);
                    } else {
                        Toast.show('请输入信息')
                    }
                },
            },
            cancel: {
                color: '#cccccc',
                text: '否',
            },
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <TitleBar navigation={this.props.navigation}
                          title={title}
                          rightText={'确定'}
                          leftImage={require('../../../images/common/icon_bar_left.png')}
                          onRightPress={() => this._updateInfo()}
                          onLeftPress={() => this.props.navigation.goBack()}/>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input}
                               placeholder={placeHolder}
                               maxLength={maxLength}
                               onChangeText={(text) => inputInfo = text}
                               defaultValue={modifyValues}
                               keyboardType={keyboard}
                               underlineColorAndroid="transparent"
                               autoFocus={true}/>
                </View>
                <DialogBox ref={(dialogbox) => {
                    this.dialogbox = dialogbox
                }}/>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inputContainer: {
        padding: 3,
        backgroundColor: 'white'
    },
    input: {
        textAlign: 'left',
        height: 40,
        fontSize: 16,
        color: '#333333'
    }
});

export default ModifyPersonInfoScene;
