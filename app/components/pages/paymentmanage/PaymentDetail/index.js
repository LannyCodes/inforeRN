/**
 * Created by Infore.Wlun.
 */

import React, {Component} from 'react'
import {
    View,
    Text
} from "react-native"
import TitleBar from '../../../widget/TitleBar'
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {ScrollableTabBar} from '../../../widget/ScrollableTabViewBars'
import PaymentState from './PaymentState'
import PaymentPlan from './PaymentPlan'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as paymentActions from '../../../../actions/payment/PaymentAction';
import DialogBox from '../../../widget/DialogBox';
import ModalHud from '../../../widget/ModalHud';
const StyleSheet = require('../../../../base/StyleSheet');

class PaymentDetailScene extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        let {fetchPaymentDetail} = this.props.paymentDetailActions;
        fetchPaymentDetail({
            contractId: this.props.navigation.state.params.contractId,
        })
    }

    _goBack = () => {
        let {clearPaymentDetail} = this.props.paymentDetailActions;
        clearPaymentDetail();
        this.props.navigation.goBack()
    }

    _alert = (text) => {
        this.dialogbox.alert(text);
    }

    render() {
        return (
            <View style={styles.container}>
                <TitleBar
                    navigation={this.props.navigation}
                    title='回款详情'
                    leftImage={require('../../../../images/common/icon_bar_left.png')}
                    onLeftPress={() => this._goBack()}/>
                <ScrollableTabView
                    initialPage={0}
                    renderTabBar={() => <ScrollableTabBar
                        scrollWithoutAnimation={true}
                        activeTab={0}
                        activeTextColor='rgb(41,161,247)'
                        inactiveTextColor='rgb(153,153,153)'
                        backgroundColor="#fff"
                        underlineAlignLabel={true}
                        underlineStyle={{backgroundColor: 'rgb(41,161,247)',height:3}}/>
                    }
                >
                    <PaymentState
                        tabLabel='回款详情'
                        navigation={this.props.navigation}
                        contractId={this.props.navigation.state.params.contractId}/>
                    <PaymentPlan
                        tabLabel='回款计划'
                        alert={this._alert}
                        navigation={this.props.navigation}
                        contractId={this.props.navigation.state.params.contractId}/>
                </ScrollableTabView>
                <DialogBox ref={(dialogbox) => {
                    this.dialogbox = dialogbox
                }}/>
                <ModalHud
                    visible={this.props.listData.length === 0 && this.props.isFetching}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efefef'
    },
    tabBarUnderlineStyle: {
        backgroundColor: 'rgb(41,161,247)'
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentDetailScene);