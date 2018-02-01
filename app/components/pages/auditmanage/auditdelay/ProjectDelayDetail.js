/**
 * Created by Lanny on 2017/5/23.
 */
'use strict';
import React, {Component} from 'react'

import {
    View, ListView, Image, Text, ScrollView
}from "react-native"
import {SelectTaskPlanDelayRequest} from '../../../../api/auditmanage/AuditManageRequests'
const StyleSheet = require('../../../../base/StyleSheet');
import {formatDateTime} from '../../../../utils/Common'
export default class ProjectDelayDetail extends Component {
    constructor(props) {
        super(props);
        this.processApprovalId = props.processApprovalId;
        this.receive = props.receive;
        this.state = {
            detailData: {},
        }
    }

        // Date.prototype.format = function (fmt) { //author: meizz
        //     var o = {
        //         "M+": this.getMonth() + 1, //月份
        //         "d+": this.getDate(), //日
        //         "h+": this.getHours(), //小时
        //         "m+": this.getMinutes(), //分
        //         "s+": this.getSeconds(), //秒
        //         "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        //         "S": this.getMilliseconds() //毫秒
        //     };
        //     if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        //     for (var k in o)
        //         if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        //     return fmt;
        // }


    componentDidMount() {
        let self = this;
        let params = {processApprovalId: this.processApprovalId}
        new SelectTaskPlanDelayRequest(params).start(function (data) {
            self.setState({
                detailData: data
            })
        })
    }

    render() {
        let detailData = this.state.detailData;
        return (
            <ScrollView style={styles.container}>
                <View style={styles.groupContainer}>
                    <View style={styles.itemContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            项目名称
                        </Text>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemContent}>
                            {detailData.name}
                        </Text>
                    </View>
                    <View style={styles.projectDivider}/>
                    <View style={styles.itemContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            责任人
                        </Text>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemContent}>
                            {detailData.duty}
                        </Text>
                    </View>
                    <View style={styles.projectDivider}/>
                </View>
                <View style={styles.groupContainer}>
                    <View style={styles.itemContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            计划开始时间
                        </Text>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemContent}>
                            {!isNull(detailData.start) && formatDateTime(detailData.start)}
                        </Text>
                    </View>
                    <View style={styles.projectDivider}/>
                    <View style={styles.itemContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            计划结束时间
                        </Text>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemContent}>
                            {!isNull(detailData.end) && formatDateTime(detailData.end)}
                        </Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            实际开始时间
                        </Text>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemContent}>
                            {!isNull(detailData.actualStart) && formatDateTime(detailData.actualStart)}
                        </Text>
                    </View>
                    <View style={styles.projectDivider}/>
                    <View style={styles.itemContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            实际结束时间
                        </Text>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemContent}>
                            {!isNull(detailData.actualFinish) && formatDateTime(detailData.actualFinish)}
                        </Text>
                    </View>
                </View>
                <View style={styles.groupContainer}>
                    <View style={styles.itemContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            计划延期天数
                        </Text>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemContent}>
                            {detailData.day}天
                        </Text>
                    </View>
                    <View style={styles.projectDivider}/>
                    <View style={styles.itemProjectNote}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            延期原因
                        </Text>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemNote}>
                            {detailData.cause}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e7e7e7',
        flexDirection: 'column'
    },
    groupContainer: {
        backgroundColor: 'white',
        flexDirection: 'column',
        marginTop: 10
    },
    projectDivider: {
        backgroundColor: '#e7e7e7',
        height: 0.5,
        marginLeft: 15
    },
    itemContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 14,
        paddingBottom: 14,
        paddingLeft: 15,
        paddingRight: 12
    },
    itemProjectNote: {
        backgroundColor: 'white',
        flexDirection: 'column',
        // marginTop: 10,
        paddingTop: 14,
        paddingLeft: 15,
        paddingBottom: 7,
        paddingRight: 18,
        marginBottom: 11
    },
    itemName: {
        color: '#333333',
        fontSize: 16
    },
    itemContent: {
        color: '#999999',
        fontSize: 16
    },
    itemNote: {
        color: '#999999',
        fontSize: 16,
        marginTop: 10
    },
    detailHeader: {
        height: 76,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 15,
        backgroundColor: 'white'
    },
    detailSubHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    headIcon: {
        width: 36,
        height: 36
    },
    textHeader: {
        marginLeft: 15,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    textName: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    userName: {
        color: '#999999',
        fontSize: 14
    },
    userReceive: {
        color: '#43cda8',
        fontSize: 14,
        marginLeft: 5
    },
    userRefuse: {
        color: '#ef5653',
        fontSize: 14,
        marginLeft: 5
    },
    userComment: {
        color: '#333333',
        fontSize: 14,
        marginTop: 8
    },
    userTime: {
        color: '#b2b2b2',
        fontSize: 12,
        marginRight: 8
    }
});