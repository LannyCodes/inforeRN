/**
 * Created by Lanny on 2017/6/8.
 */
'use strict';
import React, {Component} from 'react'

import {
    View, Text, ScrollView
}from "react-native"
import {GetBasicSituationRequest} from '../../../../api/auditmanage/AuditManageRequests'
const StyleSheet = require('../../../../base/StyleSheet');
import ErrorPage from '../../../widget/ErrorPage';
export default class BasicSituation extends Component {
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
        new GetBasicSituationRequest(params).start(function (data) {
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
        if (detailData === null) {
            return (
                <ErrorPage errorContent={'没有任何信息哟...'}/>
            )
        }
        return (

            (detailData &&  (detailData.contractHistory !== null ||  detailData.contractHistoryBak !== null)) &&
            <ScrollView style={styles.container}>
                <View style={styles.groupContainer}>
                    <View style={styles.itemContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            合同编号
                        </Text>
                        {
                            this.compare('contractNumber')
                                ?
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                      style={styles.itemModifiedContent}>
                                    {detailData.contractHistoryBak.contractNumber}
                                </Text>
                                :
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemContent}>
                                    {detailData.contractHistory.contractNumber}
                                </Text>
                        }

                    </View>
                    <View style={styles.projectDivider}/>

                    <View style={styles.itemContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            合同类型
                        </Text>
                        {
                            this.compare('contractType')
                                ? <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                        style={styles.itemModifiedContent}>
                                {detailData.contractHistoryBak.contractType}
                            </Text>
                                :
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemContent}>
                                    {detailData.contractHistory.contractType}
                                </Text>
                        }

                    </View>
                </View>
                <View style={styles.groupContainer}>
                    <View style={styles.itemContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            合同签订单位全称
                        </Text>
                        {
                            this.compare('contractClient')
                                ?
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                      style={styles.itemModifiedContent}>
                                    {detailData.contractHistoryBak.contractClient}
                                </Text>
                                :
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemContent}>
                                    {detailData.contractHistory.contractClient}
                                </Text>
                        }

                    </View>
                    <View style={styles.projectDivider}/>
                    <View style={styles.itemContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            签订日期
                        </Text>
                        {
                            this.compare('signed')
                                ?
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                      style={styles.itemModifiedContent}>
                                    {detailData.contractHistoryBak.signed}
                                </Text>
                                :
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemContent}>
                                    {detailData.contractHistory.signed}
                                </Text>
                        }

                    </View>
                    <View style={styles.projectDivider}/>
                    <View style={styles.itemContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            买方签订人
                        </Text>
                        {
                            this.compare('buyerSigner')
                                ?
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                      style={styles.itemModifiedContent}>
                                    {detailData.contractHistoryBak.buyerSigner}
                                </Text>
                                :
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemContent}>
                                    {detailData.contractHistory.buyerSigner}
                                </Text>
                        }

                    </View>
                    <View style={styles.projectDivider}/>
                    <View style={styles.itemContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            收到合同日期
                        </Text>
                        {
                            this.compare('received')
                                ?
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                      style={styles.itemModifiedContent}>
                                    {detailData.contractHistoryBak.received}
                                </Text>
                                :
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemContent}>
                                    {detailData.contractHistory.received}
                                </Text>
                        }

                    </View>
                </View>
                <View style={styles.groupContainer}>
                    <View style={styles.itemContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            买方联系方式
                        </Text>
                        {
                            this.compare('buyerMobile')
                                ?
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                      style={styles.itemModifiedContent}>
                                    {detailData.contractHistoryBak.buyerMobile}
                                </Text>
                                :
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemContent}>
                                    {detailData.contractHistory.buyerMobile}
                                </Text>
                        }

                    </View>
                    <View style={styles.projectDivider}/>
                    <View style={styles.itemContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            质保期
                        </Text>
                        {
                            this.compare('expirationDate')
                                ?
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                      style={styles.itemModifiedContent}>
                                    {detailData.contractHistoryBak.expirationDate}
                                </Text>
                                :
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemContent}>
                                    {detailData.contractHistory.expirationDate}
                                </Text>
                        }

                    </View>
                    <View style={styles.projectDivider}/>
                    <View style={styles.itemContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            行业
                        </Text>
                        {
                            this.compare('industry')
                                ?
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                      style={styles.itemModifiedContent}>
                                    {detailData.contractHistoryBak.industry}
                                </Text>
                                :
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemContent}>
                                    {detailData.contractHistory.industry}
                                </Text>
                        }

                    </View>
                    <View style={styles.projectDivider}/>
                    <View style={styles.itemContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            数量
                        </Text>
                        {
                            this.compare('number')
                                ?
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                      style={styles.itemModifiedContent}>
                                    {detailData.contractHistoryBak.number}
                                </Text>
                                :
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemContent}>
                                    {detailData.contractHistory.number}
                                </Text>
                        }

                    </View>
                    <View style={styles.projectDivider}/>
                    <View style={styles.itemContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            签订人
                        </Text>
                        {
                            this.compare('sellerSigner')
                                ?
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                      style={styles.itemModifiedContent}>
                                    {detailData.contractHistoryBak.sellerSigner}
                                </Text>
                                :
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemContent}>
                                    {detailData.contractHistory.sellerSigner}
                                </Text>
                        }

                    </View>
                    <View style={styles.projectDivider}/>
                    <View style={styles.itemContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            合同金额
                        </Text>
                        {
                            this.compare('contractMoney')
                                ?
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                      style={styles.itemModifiedContent}>
                                    {detailData.contractHistoryBak.contractMoney}
                                </Text>
                                :
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemContent}>
                                    {detailData.contractHistory.contractMoney}
                                </Text>
                        }

                    </View>
                </View>
                <View style={styles.itemProjectNote}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                        设备到货安装条款
                    </Text>
                    {
                        this.compare('facilityClause')
                            ?
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemModifiedNote}>
                                {detailData.contractHistoryBak.facilityClause}
                            </Text>
                            : <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemNote}>
                            {detailData.contractHistory.facilityClause}
                        </Text>
                    }

                </View>
                <View style={styles.itemProjectNote}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                        付款条款
                    </Text>
                    {
                        this.compare('payClause')
                            ?
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemModifiedNote}>
                                {detailData.contractHistoryBak.payClause}
                            </Text>
                            : <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemNote}>
                            {detailData.contractHistory.payClause}
                        </Text>
                    }

                </View>
                <View style={styles.groupContainer}>
                    <View style={styles.itemContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            申请人
                        </Text>
                        {
                            this.compare('applyUser')
                                ?
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                      style={styles.itemModifiedContent}>
                                    {detailData.contractHistoryBak.applyUser}
                                </Text>
                                :
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemContent}>
                                    {detailData.contractHistory.applyUser}
                                </Text>
                        }

                    </View>
                    <View style={styles.projectDivider}/>

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
        let {contractHistory, contractHistoryBak} = this.state.detailData;
        if (contractHistoryBak === null) {
            return false;
        }
        if (contractHistory === null) {
            return true;
        }
        if (typeof contractHistoryBak[field] === 'undefined') {
            return false;
        }
        if (contractHistoryBak === '') {
            return false;
        }
        if (contractHistoryBak[field] === '') {
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
        return (contractHistoryBak[field] !== contractHistory[field]);
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