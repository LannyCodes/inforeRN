/**
 * Created by Lanny on 2017/5/25.
 */
'use strict';
import React, {Component} from 'react';
import {
    Text, View, Image, TouchableHighlight, Dimensions
} from 'react-native';
const StyleSheet = require('../../../base/StyleSheet');
let state;
let status;
export default class AuditManageItem extends Component {
    constructor(props) {
        super(props)
    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        const {id, processId, targeApprovalUser, processName, applyUser, approvalTime, processStatus, processType} = this.props;
        if (processStatus === 1 || processStatus === '1') {//已通过
            state = require('../../../images/auditmanage/icon_ytg.png');
        } else if (processStatus === 2 || processStatus === '2') {//未通过
            state = require('../../../images/auditmanage/icon_wtg.png');
        } else if (processStatus === 0 || processStatus === '0') {//待审核
            state = require('../../../images/auditmanage/icon_dsh.png');
        }

        if (processType === 0 || processType === '0') {
            status = '历史项目审核'
            // status = '变更审核'
        } else if (processType === 3 || processType === '3') {
            status = '项目延期审核'
            // status = '延期审核'
        } else if (processType === 5 || processType === '5') {
            status = '项目流程审核'
            // status = '流程审批'
        } else if (processType === 1 || processType === '1') {
            status = '计划任务审核'
            // status = '计划审核'
        }
        return (
            <TouchableHighlight
                underlayColor={'#f1f1f1'}
                onPress={() => {
                    if (processType === 5 || processType === '5') {//流程审批
                        this.props.navigation.navigate('AuditProcess', {
                            'processId': processId,
                            'projectStage': processStatus,
                            'processType': processType,
                            'id': id
                        })
                    } else if (processType === 0 || processType === '0') {//变更审批=历史项目审核
                        this.props.navigation.navigate('ProjectChangeScene', {
                            'processId': processId,
                            'projectStage': processStatus,
                            'processType': processType,
                            'id': id,
                            'processName': processName //历史项目审核多传一个processName，因为对于变更审批不属于项目后台无法获取titleBar里的项目信息。
                        })
                    } else if (processType === 3 || processType === '3') {//延期审批
                        this.props.navigation.navigate('ProjectDelayScene', {
                            'processId': processId,
                            'projectStage': processStatus,
                            'processType': processType,
                            'id': id
                        })
                    } else if (processType === 1 || processType === '1') {//计划审批
                        this.props.navigation.navigate('ProjectSchedule', {
                            'processId': processId,
                            'projectStage': processStatus,
                            'processType': processType,
                            'id': id
                        })
                    }

                }}>
                <View style={styles.container}>
                    <View style={[styles.item, {paddingRight: 0, paddingTop: 0, paddingBottom: 0}]}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.name}
                              numberOfLines={1}>
                            {processName}
                        </Text>
                        <Image style={styles.mark_image} source={state}/>
                    </View>
                    <View style={styles.separate_line}/>
                    <View style={styles.item}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.name}>流程类型</Text>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                              style={styles.right_name}>{status}</Text>
                    </View>
                    <View style={styles.separate_line}/>
                    <View style={styles.item}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.name}>{'申请人'}</Text>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                              style={styles.right_name}>{applyUser}</Text>
                    </View>
                    <View style={styles.separate_line}/>
                    <View style={styles.item}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.name}>{'审核人'}</Text>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                              style={styles.right_name}>{targeApprovalUser}</Text>
                    </View>
                    <View style={styles.separate_line}/>
                    {processStatus !== 0 && <View style={styles.item}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.name}>{'审核时间'}</Text>
                        {processStatus !== 0 &&
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                              style={styles.right_name}>{approvalTime}</Text>}
                    </View>}
                    <View style={styles.separate_line}/>

                    <View style={styles.touch_view}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.touch_text}>
                            查看详情
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: 2
    },
    content_text: {
        fontSize: 14,
        color: 'black'
    },
    item: {
        paddingRight: 10,
        paddingLeft: 10,
        flexDirection: 'row',
        paddingTop: 14,
        paddingBottom: 14,
    },
    name: {
        alignSelf: 'center',
        fontSize: 16,
        color: 'rgb(51,51,51)',
        alignItems: 'center',
        flex: 1
    },
    mark_image: {
        width: 39,
        height: 39,

    },
    right_name: {
        fontSize: 16,
        color: 'rgb(153,153,153)',
    },
    touch_view: {
        paddingTop: 14,
        paddingBottom: 13,
        alignItems: 'center',
        justifyContent: 'center',

    },
    touch_text: {
        fontSize: 14,
        color: 'rgb(41,161,247)',
        textAlign: 'center'
    },
    separate_line: {
        height: 0.5,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: 'rgb(231,231,231)'
    }
});