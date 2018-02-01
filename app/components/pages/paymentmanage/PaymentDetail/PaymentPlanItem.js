/** 
 * Created by Infore.Wlun. 
 */

import React, { Component } from 'react'
import {
    View,
    Image,
    Text,
    TouchableOpacity,
} from "react-native"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as paymentActions from '../../../../actions/payment/PaymentAction';
const StyleSheet = require('../../../../base/StyleSheet');

class PaymentPlanItem extends Component {
    constructor(props) {
        super(props)
    }

    _selectClick = () => {
        let { paymentPlanClick } = this.props.paymentDetailActions;
        paymentPlanClick(this.props.index);
    }

    render() {
        let item = this.props.item;
        if (isNull(item)) {
            return <View/>
        }
        let img = item.planPaymentMoney <= item.paymentMoney ? require('../../../../images/common/icon_right.png') : require('../../../../images/common/icon_wro.png');
        let selectImg = isNull(item.isSelected) || item.isSelected === false ? require('../../../../images/common/icon_cb_cancle.png') : require('../../../../images/common/icon_cb_ok.png');
        let paymentTime;
        if (!isNull(item.paymentTime)) {
            var tmp = item.paymentTime.split(':');
            if (tmp.length >= 3) {
                tmp.splice(tmp.length - 1, 1);
            }
            paymentTime = tmp.join(':')
        }

        return (
            <View style={styles.container}>
                <View style={styles.left_container}>
                    <View style={styles.vertical_line} />
                    <Image
                        resizeMode='contain'
                        style={styles.state_image}
                        source={img} />
                    {this.props.index === this.props.listData.length - 1 ? <View style={{ width: 1, height: 40, }} /> : <View style={styles.vertical_line} />}
                </View>
                <View style={[styles.content, { flexDirection: 'row-reverse' }]}>
                    <View style={[styles.content_message]}>
                        <View style={[styles.right_content]}>
                            {isNull(item.paymentMoney) || item.paymentMoney === 0 ?
                                <View style={{ alignItems: 'center' }}>
                                    <Image
                                        style={{ width: 24, height: 24, marginBottom: 4 }}
                                        resizeMode='contain'
                                        source={require('../../../../images/paymentmanage/icon_pmremind.png')} />
                                    <Text style={styles.sub_title}>暂无回款,提醒回款</Text>
                                </View> :
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={[styles.dot_view, { backgroundColor: 'rgb(252,145,83)' }]} />
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={styles.title}>
                                            实际回款<Text style={styles.actual_amount}>{isNull(item.paymentMoney) ? 0 : item.paymentMoney}万元</Text>
                                        </Text>
                                        <Text style={[styles.sub_title, { marginTop: 10 }]}>
                                            {isNull(paymentTime) ? '暂无回款时间' : paymentTime}
                                        </Text>
                                    </View>
                                </View>}
                        </View>
                    </View>
                    <View style={styles.content_seperation_line} />
                    <View style={styles.content_message}>
                        <View style={styles.left_content}>
                            <View style={styles.dot_view} />
                            <View style={{ marginLeft: 10 }}>
                                <Text style={styles.title}>
                                    计划回款<Text style={styles.plan_amount}>{item.planPaymentMoney}万元</Text>
                                </Text>
                                <Text style={[styles.sub_title, { marginTop: 10 }]}>
                                    {isNull(item.responsibleUser) ? '暂无' : item.responsibleUser}负责
                                 </Text>
                            </View>
                        </View>
                    </View>
                    {(item.planPaymentMoney === item.paymentMoney || !this.props.isShowSelect) ? <View /> :
                        <TouchableOpacity
                        style={{ alignItems: 'flex-end', alignSelf: 'flex-start', marginRight: 4, marginTop: 4, position: 'absolute', width: 50, height: 50}}
                            onPress={this._selectClick}>
                                <Image
                                    style={[styles.select_image]}
                                    resizeMode='contain'
                                    source={selectImg}
                                />
                        </TouchableOpacity>}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: 86,
        flexDirection: 'row',
        backgroundColor: 'rgb(231,231,231)',
    },
    left_container: {
        marginLeft: 15,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        marginRight: 10,
    },
    vertical_line: {
        width: 1,
        height: 35,
        backgroundColor: '#29a1f7',
    },
    state_image: {
        width: 16,
        height: 16,
    },
    content: {
        flex: 1,
        height: 76,
        flexDirection: 'row',
        borderRadius: 3,
        alignItems: 'center',
        backgroundColor: 'white',
        marginLeft: 15,
    },
    content_seperation_line: {
        height: 46,
        width: 1,
        backgroundColor: '#e5e5e5',
    },
    content_message: {
        flex: 1,
    },
    left_content: {
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 15,
        marginRight: 15,
        flexDirection: 'row',
    },
    right_content: {
        marginLeft: 15,
        marginRight: 10,
    },
    dot_view: {
        width: 10,
        height: 10,
        marginTop: 4,
        borderRadius: 24,
        backgroundColor: 'rgb(41,161,247)'
    },
    title: {
        fontSize: 14,
        color: 'rgb(51,51,51)',
    },
    plan_amount: {
        color: 'rgb(41,161,247)'
    },
    actual_amount: {
        color: 'rgb(252,145,83)',
    },
    sub_title: {
        fontSize: 12,
        color: 'rgb(153,153,153)',
    },
    select_image: {
        width: 16,
        height: 16,
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentPlanItem);