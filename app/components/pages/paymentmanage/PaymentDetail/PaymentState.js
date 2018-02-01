/** 
 * Created by Infore.Wlun. 
 */

import React, { Component } from 'react'
import {
    View,
    Text,
    ScrollView,
    RefreshControl,
} from "react-native"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as paymentActions from '../../../../actions/payment/PaymentAction';
const StyleSheet = require('../../../../base/StyleSheet');

class PaymentState extends Component {
    constructor(props) {
        super(props)
    }

    componentWillReceiveProps(newProps){
        console.log(newProps);
    }

    _onRefresh = () => {
        let { fetchPaymentDetail } = this.props.paymentDetailActions;
        fetchPaymentDetail({
            contractId: this.props.contractId,
        })
    }

    render() {
        let item = this.props.listData[0];
        let contractMoney = isNull(item)||isNull(item.contractMoney)?0:item.contractMoney;
        let paymentTotalMoney = isNull(item)||isNull(item.paymentTotalMoney)?0:item.paymentTotalMoney;
        let paymentBalance = contractMoney - paymentTotalMoney;
        let invoicetTotalMoney = isNull(item)||isNull(item.invoicetTotalMoney)?0:item.invoicetTotalMoney;
        let invoiceBalance = contractMoney - invoicetTotalMoney;
        return (
            <View style={styles.container}>
                <ScrollView 
                    style={styles.scrollview}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.isFetching}
                            onRefresh={() => this._onRefresh()}
                            tintColor="#3ca8fe"
                            colors={['#3ca8fe']}
                            progressBackgroundColor="#f1f1f1"
                        />
                    }>
                    <View style={styles.item_container}>
                        <Text style={styles.title}>项目名称</Text>
                        <Text style={styles.content}>{isNull(item)||isNull(item.projectName)?'':item.projectName}</Text>
                    </View>
                    <View style={styles.seperation_line} />
                    <View style={styles.item_container}>
                        <Text style={styles.title}>合同编号</Text>
                        <Text style={[styles.content, styles.contract]}>{isNull(item)||isNull(item.contractNo)?'':item.contractNo}</Text>
                    </View>
                    <View style={styles.seperation_line} />
                    <View style={styles.item_container}>
                        <Text style={styles.title}>合同总金额</Text>
                        <Text style={styles.content}>{contractMoney}万</Text>
                    </View>
                    <View style={styles.seperation_line} />
                    <View style={styles.item_container}>
                        <Text style={styles.title}>累计回款金额</Text>
                        <Text style={styles.content}>{paymentTotalMoney}万</Text>
                    </View>
                    <View style={styles.seperation_line} />
                    <View style={styles.item_container}>
                        <Text style={styles.title}>回款余额</Text>
                        <Text style={styles.content}>{paymentBalance}万</Text>
                    </View>
                    <View style={styles.seperation_line} />
                    <View style={styles.item_container}>
                        <Text style={styles.title}>累积开票金额</Text>
                        <Text style={styles.content}>{invoicetTotalMoney}万</Text>
                    </View>
                    <View style={styles.seperation_line} />
                    <View style={styles.item_container}>
                        <Text style={styles.title}>开票余额</Text>
                        <Text style={styles.content}>{invoiceBalance}万</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'rgb(231,231,231)',
    },
    scrollview: {
        marginTop:10,
        backgroundColor: 'white',
    },
    item_container: {
        flexDirection: 'row',
        marginLeft: 15,
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 14, paddingBottom: 14,
    },
    seperation_line: {
        height: 0.5,
        marginLeft: 15,
        backgroundColor: 'rgb(231,231,231)'
    },
    title: {
        flex: 1,
        fontSize: 16,
        color: 'rgb(51,51,51)'
    },
    content: {
        flex: 1,
        fontSize: 16,
        textAlign: 'right',
        color: 'rgb(153,153,153)'
    },
    contract: {
        color: 'rgb(41,161,247)'
    },
})

function mapStateToProps(state) {
    return {
        isFetching: state.paymentDetail.paymentDetail.isFetching,
        listData: state.paymentDetail.paymentDetail.listData,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        paymentDetailActions: bindActionCreators(paymentActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentState)