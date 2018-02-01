/**
 * Created by Infore.Wlun.
 */

import React, {Component} from 'react'
import {
    View,
    Text,
    FlatList,
    ScrollView,
    RefreshControl,
    TouchableOpacity
} from "react-native"
import PaymentPlanItem from './PaymentPlanItem';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as paymentActions from '../../../../actions/payment/PaymentAction';
const StyleSheet = require('../../../../base/StyleSheet');

class PaymentPlan extends Component {
    constructor(props) {
        super(props)
        this.isShowNoti = true;
    }

    renderItemView({item, index}) {
        return <PaymentPlanItem item={item} index={index} isShowSelect={this.isShowNoti}
                                navigation={this.props.navigation}/>
    }

    _onRefresh = () => {
        let {fetchPaymentDetail} = this.props.paymentDetailActions;
        fetchPaymentDetail({
            contractId: this.props.contractId,
        })
    }

    _remindClick = () => {
        if (this.props.selectedItem) {
            this.props.navigation.navigate('PaymentRemind', {projectId: this.props.listData[0].projectId})
        } else {
            this.props.alert('请选择要提醒的回款')
        }
    }

    render() {
        let isShowNoti = true;
        let item = {};
        if (this.props.listData && this.props.listData.length > 0) {
            item = this.props.listData[0];
        }
        if (item && ((item.contractMoney <= item.paymentTotalMoney) || (item.processStatus != "1"))) {
            isShowNoti = false;
        }
        this.isShowNoti = isShowNoti;
        return (
            <View style={styles.container}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.isFetching}
                            onRefresh={() => this._onRefresh()}
                            tintColor="#3ca8fe"
                            colors={['#3ca8fe']}
                            progressBackgroundColor="#f1f1f1"
                        />
                    }>
                    <FlatList
                        style={{flex: 1}}
                        keyExtractor={this._keyExtractor.bind(this)}
                        data={this.props.listData}
                        renderItem={this.renderItemView.bind(this)}
                    />
                </ScrollView>
                <View style={styles.seperation_line}/>
                {
                    isShowNoti ?
                        <TouchableOpacity
                            onPress={this._remindClick}>
                            <View style={styles.remind_container}>
                                <Text style={styles.remind_text}>提醒回款</Text>
                            </View>
                        </TouchableOpacity> : <View />
                }
            </View>
        )
    }

    _keyExtractor = (item, index) => index;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'red',
        backgroundColor: 'rgb(231,231,231)',
    },
    seperation_line: {
        height: 1,
        backgroundColor: 'rgb(231,231,231)'
    },
    remind_container: {
        height: 44,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    remind_text: {
        fontSize: 16,
        color: 'rgb(41,161,247)',
    },
    vertical_line: {
        width: 1,
        height: 200,
        marginLeft: 22.5,
        backgroundColor: '#29a1f7',
    },

})

function mapStateToProps(state) {
    return {
        isFetching: state.paymentDetail.paymentDetail.isFetching,
        listData: state.paymentDetail.paymentDetail.listData,
        selectedItem: state.paymentDetail.paymentDetail.selectItem,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        paymentDetailActions: bindActionCreators(paymentActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentPlan)