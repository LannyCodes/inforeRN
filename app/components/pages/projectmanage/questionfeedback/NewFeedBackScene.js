/**
 * Created by Lanny on 2017/5/23.
 */
'use strict';
import React, {Component} from 'react'

import {
    View, Image, Text, TextInput, TouchableWithoutFeedback, DeviceEventEmitter
} from "react-native"
import TitleBar from '../../../widget/TitleBar'
import DialogBox from '../../../widget/DialogBox';
import {connect} from 'react-redux';
import {saveQuestionbackPersons} from '../../../../actions/questionback/QuestionBackAction'
const StyleSheet = require('../../../../base/StyleSheet');
import {DatePicker} from 'rnkit-actionsheet-picker';
import {CreateProblemRequest} from '../../../../api/projectmanage/ProjectManageRequests'
import Toast from 'react-native-root-toast'
let navigateTitle = '新建问题';
let pics = [];

class NewFeedBackScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            problemName: '',
            problemDescription: '',
            planTime: ''
        }
    }

    /**
     * clear cache date
     */
    componentWillUnmount() {
        pics = [];
        this.props.dispatch(saveQuestionbackPersons([]))
    }

    _noticePersonsPage() {
        this.props.navigation.navigate('NoticePersons', {route: 'NoticePersons'})
    }

    _commitInfo() {
        if (isNull(this.state.problemName.trim())) {
            Toast.show('问题名称不能为空');
            return;
        }
        if (isNull(this.state.problemDescription.trim())) {
            Toast.show('问题描述不能为空');
            return;
        }
        if (!this.props.qbPersons || this.props.qbPersons.length === 0) {
            Toast.show('至少需要有一个发送对象');
            return;
        }
        if (isNull(this.state.planTime)) {
            Toast.show('请选择计划解决时间');
            return;
        }
        let userNames = [];
        for (var i = 0; i < this.props.qbPersons.length; i++) {
            userNames[i] = this.props.qbPersons[i].userName
        }

        let self = this;
        let {params} = this.props.navigation.state;
        this.dialogbox.confirm({
            content: ['是否确认提交反馈？'],
            ok: {
                text: '是',
                color: '#29a1f7',
                callback: () => {
                    // 获取数据
                    let requestparams = {
                        projectId: params.projectId,
                        loginUserName: _USERNAME_,
                        rightStatus: 1,
                        users: userNames,
                        problemName: self.state.problemName,
                        problemDescription: self.state.problemDescription,
                        planTime: self.state.planTime
                    };
                    new CreateProblemRequest(requestparams).start(function (solvedata) {
                        Toast.show('新建问题成功');
                        DeviceEventEmitter.emit('SAVEQUESTION_SUCCESS', null);
                        self.props.navigation.goBack()
                    });

                } //提交反馈
            },
            cancel: {
                text: '否',
                color: '#cccccc',
            }
        })
    }


    _planTime() {
        DatePicker.show({
            onPickerConfirm: (selectedDate) => {
                console.log(selectedDate);
                this.setState({
                    planTime: selectedDate
                })
            },
            onPickerCancel: () => {
                console.log('date picker canceled');
            },
            onPickerDidSelect: (selectedDate) => {
                console.log(selectedDate);
            }
        })

    }

    _renderPlanTime() {
        if (isNull(this.state.planTime)) {
            return (
                <View style={[styles.titleContainer, {height: 45}]}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.commonLabel}>
                        计划解决时间
                    </Text>
                    <View style={styles.rightChoose}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.nameValueTxt}>
                            请选择
                        </Text>
                        <Image
                            resizeMode='contain'
                            style={styles.bottomIcon}
                            source={require('../../../../images/common/icon_arrow_right.png')}/>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={[styles.titleContainer, {height: 45}]}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.commonLabel}>
                        计划解决时间
                    </Text>
                    <View style={styles.rightChoose}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.nameValueTxt}>
                            {this.state.planTime}
                        </Text>
                    </View>
                </View>
            )
        }
    }

    _renderSendPerson() {
        let personName = '';
        for (let value of this.props.qbPersons) {
            let name = isNull(value.nickName) ? value.userName : value.nickName
            personName = personName + '@' + name + ' ';
        }
        if (personName && personName !== '') {
            return (
                <View style={[styles.titleContainer, {marginTop: 0}]}>
                    <View>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.commonLabel}>
                            发送对象
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.sendPersontext}>
                                {'    ' + personName}
                            </Text>
                        </Text>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={[styles.titleContainer, {height: 44, marginTop: 0}]}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.commonLabel}>
                        发送对象
                    </Text>
                    <View style={styles.rightChoose}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.nameValueTxt}>
                            请选择
                        </Text>
                        <Image
                            resizeMode='contain'
                            style={styles.bottomIcon}
                            source={require('../../../../images/common/icon_arrow_right.png')}/>
                    </View>
                </View>
            )
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <TitleBar navigation={this.props.navigation}
                          title={navigateTitle}
                          leftImage={require('../../../../images/common/icon_bar_left.png')}
                          onLeftPress={() => this.props.navigation.goBack()}
                          rightText={'确定'}
                          onRightPress={() => {
                              this._commitInfo();
                          }}/>

                <View style={styles.titleContainer}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.commonLabel}>
                        标题
                    </Text>
                    <TextInput
                        style={styles.commonInput}
                        placeholder="请输入标题"
                        value={this.state.problemName}
                        onChangeText={(text) => {
                            this.setState({problemName: text});
                        }}
                        placeholderTextColor="#cccccc"
                        underlineColorAndroid='transparent'
                    />
                </View>
                <View style={styles.itemDivider}/>
                <View style={styles.proContent}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.commonLabel}>
                        内容
                    </Text>
                    <TextInput
                        style={styles.contentTxt}
                        value={this.state.problemDescription}
                        onChangeText={(text) => {
                            this.setState({problemDescription: text});
                        }}
                        placeholder="请输入内容"
                        placeholderTextColor="#cccccc"
                        multiline={true}
                        underlineColorAndroid='transparent'
                    />
                </View>
                <TouchableWithoutFeedback onPress={() => this._planTime()}>
                    {this._renderPlanTime()}
                </TouchableWithoutFeedback>
                <View style={styles.itemDivider}/>
                <TouchableWithoutFeedback onPress={() => this._noticePersonsPage()}>
                    {this._renderSendPerson()}
                </TouchableWithoutFeedback>
                <DialogBox ref={(dialogbox) => {
                    this.dialogbox = dialogbox
                }}/>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e7e7e7',
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: 14,
        paddingBottom: 14,
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 10
    },
    commonLabel: {
        fontSize: 16,
        color: '#333333'
    },
    commonInput: {
        fontSize: 16,
        padding: 0,
        width: '70%',
        textAlign: 'right'
    },
    itemDivider: {
        height: 0.5,
        marginLeft: 15,
        backgroundColor: '#e7e7e7'
    },
    proContent: {
        paddingTop: 14,
        paddingLeft: 15,
        paddingBottom: 17,
        paddingRight: 15,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: 'white'
    },
    contentTxt: {
        textAlignVertical: 'top',
        color: '#9b9b9b',
        fontSize: 16,
        padding: 0,
        marginTop: 10,
        height: 100
    },
    rightChoose: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    nameValueTxt: {
        fontSize: 16,
        color: '#999999'
    },
    bottomIcon: {
        width: 15,
        height: 15,
        marginLeft: 5
    },
    bottomPhoto: {
        height: 44,
        marginTop: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15
    },
    picText: {
        color: '#333333',
        fontSize: 16
    },
    photoPic: {
        width: 27,
        height: 27
    },
    imgInnerListView: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 6.5,
        marginBottom: 6.5,
        marginLeft: 15
    },
    imageContainer: {
        flexDirection: 'row'
    },
    imgIcon: {
        width: 108,
        height: 108,
        margin: 5
    },
    imgIconCancle: {
        width: 16,
        height: 16,
        marginLeft: -15
    },
    sendPersontext: {
        fontSize: 14,
        // textAlign: 'right',
        color: '#29a1f7',
        ios: {lineHeight: 20},
    },
});


function mapStateToProps(state) {
    return {
        qbPersons: state.questionBackPersons.saveQBPersons,
        qbRefreshTag: state.questionBackPersons.saveQBRefreshTag,
    }
}
export default connect(mapStateToProps)(NewFeedBackScene);
