import React, {Component} from 'react'

import {
    View, Image, Text, TouchableHighlight, TextInput, ActivityIndicator, Modal,
} from "react-native"
import TitleBar from '../../widget/TitleBar'
import {connect} from 'react-redux';
import DialogBox from '../../widget/DialogBox';
import {saveQuestionbackPersons} from '../../../actions/questionback/QuestionBackAction';
import { saveTmpQuestionBackPersons } from '../../../actions/tmpQuesBack/TmpQuesBackAction';
import {SendRemindMessage} from '../../../api/payment/PaymentRequests';
import ModalHud from '../../widget/ModalHud'
const StyleSheet = require('../../../base/StyleSheet');

let personItem = [];
class PaymentRemindScene extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: '',
            isShowHud: false,
        }
    }

    componentWillUnmount() {
        this.props.dispatch(saveQuestionbackPersons([]))
        this.props.dispatch(saveTmpQuestionBackPersons([]));
    }

    _sureRemind = () => {
        if (!(this.state.comment && this.state.comment !== '')) {
            this.dialogbox.alert('请输入提醒内容')
        } else if (!(personItem && personItem !== [])) {
            this.dialogbox.alert('请输入要提醒的人')
        } else {
            this.dialogbox.confirm({
                content: ["是否确定提醒？"],
                ok: {
                    text: '是',
                    color: '#29a1f7',
                    callback: this._remindRequest
                },
                cancel: {
                    text: '否',
                    color: '#cccccc',
                }
            })
        }
    }

    _remindRequest = () => {
        // let createUser = this.props.selectItem.createUser;
        let projectId = this.props.selectItem.id;//回款计划id
        let params = {
            id: projectId,
            reminderSendText: this.state.comment,
            reminderSendUser: personItem.userName,
            reminderSendUserName: personItem.nickName,
            createUser: _USERNAME_,
        };
        this.setState({
            isShowHud: true,
        });
        new SendRemindMessage(params).start((data) => {
            this.setState({
                isShowHud: false,
            });
            // TODO 提醒回款成功
            this.props.navigation.goBack();
        }, (error) => {
            // TODO 提醒回款失败
            this.setState({
                isShowHud: false,
            });
            console.log(error);
        })
    }

    _goBack = () => {
        let self = this;
        if (!(this.state.comment && this.state.comment !== '') && !(personItem && personItem !== [])) {
            this.props.navigation.goBack()
        } else {
            this.dialogbox.confirm({
                content: ['有未完成编辑，确定退出吗？'],
                ok: {
                    text: '是',
                    color: '#29a1f7',
                    callback: self.props.navigation.goBack
                },
                cancel: {
                    text: '否',
                    color: '#cccccc',
                }
            })

        }
    }

    _renderSendPerson() {
        personItem = this.props.qbPersons[0];

        if (personItem && personItem !== []) {
            let name = isNull(personItem.nickName) ? personItem.userName : personItem.nickName
            let personName = '@' + name;
            return (
                <View>
                    <Text
                        numberOfLines={1}
                        style={styles.sendPersontext}>
                        {personName}
                    </Text>
                </View>
            )
        } else {
            return <View style={styles.object_choose}>
                <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.object_choose_text}>
                    请选择
                </Text>
                <Image
                    resizeMode='contain'
                    style={styles.object_choose_image}
                    source={require('../../../images/common/icon_arrow_right.png')}/>
            </View>
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TitleBar
                    navigation={this.props.navigation}
                    title='回款提醒'
                    leftImage={require('../../../images/common/icon_bar_left.png')}
                    rightText={'确定'}
                    onLeftPress={() => this._goBack()}
                    onRightPress={() => this._sureRemind()}/>
                <View style={styles.content_container}>
                    <View style={styles.content}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                              style={styles.content_text}>提醒内容</Text>
                        <TextInput
                            multiline={true}
                            autoFocus={true}
                            defaultValue={this.state.comment}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => {
                                this.setState({
                                    comment: text,
                                })
                            }}
                            style={styles.content_input}
                        />
                    </View>
                    <View style={styles.seperation_line}/>
                    <TouchableHighlight
                        underlayColor={'#f1f1f1'}
                        onPress={() => {
                            this.props.navigation.navigate('ProjectUserList', {route: 'repayment',projectId:this.props.navigation.state.params.projectId});
                        }}>
                        <View style={styles.object}>
                            <Text
                                style={styles.object_text}>提醒对象</Text>
                            {this._renderSendPerson()}
                        </View>
                    </TouchableHighlight>
                </View>
                <DialogBox ref={(dialogbox) => {
                    this.dialogbox = dialogbox
                }}/>
                <ModalHud
                    visible={this.state.isShowHud}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e7e7e7',

    },
    content_container: {
        backgroundColor: 'white',
    },
    content: {
        height: 123,
        paddingLeft: 15,
        paddingRight: 15,
    },
    content_text: {
        fontSize: 16,
        marginTop: 14,
        marginBottom: 10,
        color: 'rgb(51,51,51)',
    },
    content_input: {
        height: 66,
        fontSize: 16,
        color: 'rgb(155,155,155)',
    },
    seperation_line: {
        height: 0.5,
        marginLeft: 15,
        backgroundColor: 'rgb(231,231,231)'
    },
    object: {
        flexDirection: 'row',
        height: 44,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 14,
        paddingBottom: 14,
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 10
    },
    object_text: {
        fontSize: 16,
        color: 'rgb(51,51,51)',
    },
    object_choose: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    object_choose_text: {
        fontSize: 16,
        color: 'rgb(204,204,204)',
    },
    object_choose_image: {
        width: 16,
        height: 16,
    },
    sendPersontext: {
        marginLeft: 20,
        fontSize: 14,
        color: '#29a1f7',
    },
})

function mapStateToProps(state) {
    return {
        qbPersons: state.questionBackPersons.saveQBPersons,
        qbRefreshTag: state.questionBackPersons.saveQBRefreshTag,
        selectItem: state.paymentDetail.paymentDetail.selectItem,
    }
}

export default connect(mapStateToProps)(PaymentRemindScene);