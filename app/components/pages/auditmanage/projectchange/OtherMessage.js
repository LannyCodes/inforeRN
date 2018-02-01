/**
 * Created by Lanny on 2017/6/8.
 */
'use strict';
import React, {Component, conslo} from 'react'

import {
    View, ListView, Image, Text, ScrollView
}from "react-native"
import {GetOtherMessageRequest} from '../../../../api/auditmanage/AuditManageRequests'
const StyleSheet = require('../../../../base/StyleSheet');
export default class OtherMessage extends Component {
    constructor(props) {
        super(props);
        this.processApprovalId = props.processApprovalId;
        this.receive = props.receive;
        this.state = {
            detailData: null
        }
    }

    componentDidMount() {
        let self = this;
        let params = {'processApprovalId': this.processApprovalId};
        new GetOtherMessageRequest(params).start(function (data) {
            if (data) {
                self.setState({
                    detailData: data
                })
            } else {
                self.setState({
                    detailData: null
                })
            }
        })
    }

    render() {
        let detailData = this.state.detailData;
        return (

            (detailData &&  (detailData.contractHistory !== null ||  detailData.contractHistoryTwoBak !== null)) &&
            <ScrollView style={styles.container}>
                <View style={styles.groupContainer}>
                    <View style={styles.itemContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            是否发涵
                        </Text>
                        {
                            this.compare('whetherSend')
                                ?
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                      style={styles.itemModifiedContent}>
                                    {detailData.contractHistoryTwoBak.whetherSend}
                                </Text>
                                :
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemContent}>
                                    {detailData.contractHistory.whetherSend}
                                </Text>
                        }

                    </View>
                    <View style={styles.projectDivider}/>
                    <View style={[styles.itemProjectNote, {marginTop: 0}]}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            项目详细情况
                        </Text>
                        {
                            this.compare('projectInfo')
                                ? <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                        style={styles.itemModifiedNote}>
                                {detailData.contractHistoryTwoBak.projectInfo}
                            </Text>
                                : <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemNote}>
                                {detailData.contractHistory.projectInfo}
                            </Text>
                        }

                    </View>
                    <View style={styles.projectDivider}/>
                    <View style={[styles.itemProjectNote, {marginTop: 0}]}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            法务意见
                        </Text>
                        {
                            this.compare('lawOpinion')
                                ? <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                        style={styles.itemModifiedNote}>
                                {detailData.contractHistoryTwoBak.lawOpinion}
                            </Text>
                                : <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemNote}>
                                {detailData.contractHistory.lawOpinion}
                            </Text>
                        }

                    </View>
                    <View style={styles.projectDivider}/>
                    <View style={[styles.itemProjectNote, {marginTop: 0}]}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            项目后续处理建议
                        </Text>
                        {
                            this.compare('projectEndInfo')
                                ? <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                        style={styles.itemModifiedNote}>
                                {detailData.contractHistoryTwoBak.projectEndInfo}
                            </Text>
                                : <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemNote}>
                                {detailData.contractHistory.projectEndInfo}
                            </Text>
                        }

                    </View>
                </View>
                <View style={styles.groupContainer}>
                    <View style={styles.itemContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            项目定性
                        </Text>
                        {
                            this.compare('projectQualitative')
                                ? <Text adjustsFontSizeToFit={false} numberOfLines={2} allowFontScaling={false}
                                        style={styles.itemModifiedContent}>
                                {detailData.contractHistoryTwoBak.projectQualitative}
                            </Text>
                                : <Text adjustsFontSizeToFit={false} numberOfLines={2} allowFontScaling={false}
                                        style={styles.itemContent}>
                                {detailData.contractHistory.projectQualitative}
                            </Text>
                        }

                    </View>
                    <View style={styles.projectDivider}/>
                    <View style={[styles.itemProjectNote, {marginTop: 0}]}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            备注
                        </Text>
                        {
                            this.compare('remarkOne')
                                ? <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                        style={styles.itemModifiedNote}>
                                {detailData.contractHistoryTwoBak.remarkOne}
                            </Text>
                                : <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemNote}>
                                {detailData.contractHistory.remarkOne}
                            </Text>
                        }

                    </View>
                </View>
            </ScrollView>
        )
    }

    /**
     * 比较是否内容有改动，true => 有改动，
     * @param object
     * @param field
     */
    compare(field) {
        let {contractHistory, contractHistoryTwoBak} = this.state.detailData;
        if (contractHistoryTwoBak === null) {
            return false;
        }
        if (contractHistory === null) {
            return true;
        }
        if (typeof contractHistoryTwoBak[field] === 'undefined') {
            return false;
        }
        if (contractHistoryTwoBak === '') {
            return false;
        }
        if (contractHistoryTwoBak[field] === '') {
            return false;
        }
        if (typeof contractHistory[field] === 'undefined') {
            return true;
        }
        if (contractHistory === '') {
            return true;
        }
        if (contractHistory[field] === '') {
            return true;
        }
        return (contractHistoryTwoBak[field] !== contractHistory[field]);
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
        marginTop: 10,
        paddingTop: 14,
        paddingLeft: 15,
        paddingBottom: 7,
        paddingRight: 18,
        // marginBottom: 11
    },
    itemName: {
        color: '#333333',
        fontSize: 16
    },
    itemContent: {
        // lineHeight:1.38 *16,
        width: 170 + 50,//再宽就超出剩余宽度了
        color: '#999999',
        fontSize: 16,
        textAlign: 'right'
    },
    itemModifiedContent: {
        // lineHeight:1.38 *16,
        width: 170 + 50,//再宽就超出剩余宽度了
        color: 'red',
        fontSize: 16,
        textAlign: 'right'
    },
    itemNote: {
        color: '#999999',
        fontSize: 16,
        marginTop: 10
    },
    itemModifiedNote: {
        color: 'red',
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