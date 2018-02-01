/**
 * Created by Lanny on 2017/6/8.
 */
/**
 * Created by Lanny on 2017/6/8.
 */
/**
 * Created by Lanny on 2017/6/8.
 */
/**
 * Created by Lanny on 2017/5/23.
 */
'use strict';
import React, {Component} from 'react'

import {
    View, Text, ScrollView
}from "react-native"
import {GetFinanceMessageRequest} from '../../../../api/auditmanage/AuditManageRequests'
const StyleSheet = require('../../../../base/StyleSheet');
export default class FinanceMessage extends Component {
    constructor(props) {
        super(props);
        this.approval = props.processApprovalId;
        this.receive = props.receive;
        this.state = {
            detailData: null
        }

    }

    componentDidMount() {
        let self = this;
        let params = {'processApprovalId': this.approval};
        new GetFinanceMessageRequest(params).start(function (data) {
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
            (detailData &&  (detailData.contractHistory !== null ||  detailData.contractHistoryTreeBak !== null)) &&
            <ScrollView style={styles.container}>

                {/*this.renderDetailHeader()*/}

                <View style={styles.groupContainer}>
                    <View style={styles.itemContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            回款责任人
                        </Text>
                        {
                            this.compare('returnedMan')
                                ? <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                        style={styles.itemModifiedContent}>
                                {detailData.contractHistoryTreeBak.returnedMan}
                            </Text>
                                :
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemContent}>
                                    {detailData.contractHistory.returnedMan}
                                </Text>
                        }

                    </View>
                    <View style={styles.projectDivider}/>
                    <View style={styles.itemContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            主要投入
                        </Text>
                        {
                            this.compare('putMoney')
                                ? <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                        style={styles.itemModifiedContent}>
                                {detailData.contractHistoryTreeBak.putMoney}
                            </Text>
                                :
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemContent}>
                                    {detailData.contractHistory.putMoney}
                                </Text>
                        }

                    </View>
                    <View style={styles.projectDivider}/>
                    <View style={styles.itemContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            回款时间计划
                        </Text>
                        {
                            this.compare('returnedTime')
                                ? <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                        style={styles.itemModifiedContent}>
                                {detailData.contractHistoryTreeBak.returnedTime}
                            </Text>
                                :
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemContent}>
                                    {detailData.contractHistory.returnedTime}
                                </Text>
                        }

                    </View>
                </View>
                <View style={styles.groupContainer}>
                    <View style={styles.itemContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            正常提成点位
                        </Text>
                        {
                            this.compare('point')
                                ? <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                        style={styles.itemModifiedContent}>
                                {detailData.contractHistoryTreeBak.point}
                            </Text>
                                :
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemContent}>
                                    {detailData.contractHistory.point}
                                </Text>
                        }

                    </View>
                    <View style={styles.projectDivider}/>
                    <View style={styles.itemContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            投入总点位
                        </Text>
                        {
                            this.compare('sumPoint')
                                ? <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                        style={styles.itemModifiedContent}>
                                {detailData.contractHistoryTreeBak.sumPoint}
                            </Text>
                                :
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemContent}>
                                    {detailData.contractHistory.sumPoint}
                                </Text>
                        }

                    </View>
                    <View style={styles.projectDivider}/>
                    <View style={styles.itemContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            在回款目标
                        </Text>
                        {
                            this.compare('returnedTarget')
                                ? <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                        style={styles.itemModifiedContent}>
                                {detailData.contractHistoryTreeBak.returnedTarget}
                            </Text>
                                :
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemContent}>
                                    {detailData.contractHistory.returnedTarget}
                                </Text>
                        }
                    </View>
                </View>
                <View style={styles.itemProjectNote}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                        执行方案
                    </Text>
                    {
                        this.compare('scheme')
                            ?
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemModifiedNote}>
                                {detailData.contractHistoryTreeBak.scheme}
                            </Text>
                            : <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemNote}>
                            {detailData.contractHistory.scheme}
                        </Text>
                    }

                </View>
                <View style={styles.itemProjectNote}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                        备注
                    </Text>
                    {
                        this.compare('remarkThree')
                            ?
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemModifiedNote}>
                                {detailData.contractHistoryTreeBak.remarkThree}
                            </Text>
                            : <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemNote}>
                            {detailData.contractHistory.remarkThree}
                        </Text>
                    }

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
        let {contractHistory, contractHistoryTreeBak} = this.state.detailData;
        if (contractHistoryTreeBak === null) {
            return false;
        }
        if (contractHistory === null) {
            return true;
        }
        if (typeof contractHistoryTreeBak[field] === 'undefined') {
            return false;
        }
        if (contractHistoryTreeBak === '') {
            return false;
        }
        if (contractHistoryTreeBak[field] === '') {
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
        return (contractHistoryTreeBak[field] !== contractHistory[field]);
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e7e7e7',
        flexDirection: 'column',
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
        color: '#999999',
        fontSize: 16
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