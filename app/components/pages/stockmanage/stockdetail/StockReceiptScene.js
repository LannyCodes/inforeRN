/**
 * Created by InforeXuan on 2017/5/19.
 */
import React, {Component} from 'react'

import {
    View,
    DeviceEventEmitter
}from "react-native"
import TitleBar from '../../../widget/TitleBar'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import {ScrollableTabBar} from '../../../widget/ScrollableTabViewBars'
import Toast from "react-native-root-toast";
import DialogBox from '../../../widget/DialogBox'
import ArrivedScene from './fragment/ArrivedScene'
import UnArrivedScene from './fragment/UnArrivedScene'
const StyleSheet = require('../../../../base/StyleSheet');
import {StockBatchConfirmRequest} from '../../../../api/stockmanage/StockManageRequests'
class StockReceiptScene extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {
        let self = this;
        this._subscription_stockSuccess = DeviceEventEmitter.addListener('STOCK_SUCCESS', function (event) {
            self.props.navigation.goBack();
        });
    }

    componentWillUnmount() {
        this._subscription_stockSuccess.remove();
    }

    render() {
        let {params} = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <TitleBar navigation={this.props.navigation}
                          title='采购管理'
                          leftImage={require('../../../../images/common/icon_bar_left.png')}
                          onLeftPress={() => this.props.navigation.goBack()}/>
                <ScrollableTabView renderTabBar={() => <ScrollableTabBar
                    locked={true}
                    scrollWithoutAnimation={true}
                    activeTextColor='rgb(41,161,247)'
                    inactiveTextColor='rgb(153,153,153)'
                    backgroundColor="#fff"
                    underlineStyle={{backgroundColor: 'rgb(41,161,247)'}}
                    underlineAlignLabel={true}
                />}>

                    <UnArrivedScene tabLabel="未到货" navigation={this.props.navigation}
                                    contractId={params.contractId}
                                    id={params.id}

                    />
                    <ArrivedScene tabLabel="已到货" navigation={this.props.navigation}
                                  contractId={params.contractId}
                                  remark={params.remark}
                                  image={params.image}
                                  onDialogClick={(childTrueId) => {
                                      this._photoUpdate(childTrueId);
                                  }}
                    />
                </ScrollableTabView>

                <DialogBox ref={(dialogbox) => {
                    this.dialogbox = dialogbox
                }}/>
            </View>
        )
    }

    _photoUpdate(childTrueId) {
        let {params} = this.props.navigation.state;
        this.dialogbox.confirm({
            content: ['是否确认未到货？'],
            ok: {
                text: '是',
                color: '#29a1f7',
                callback: () => {
                    /**
                     * status:确认到货1 -- 确认未到货0
                     * @type {{arr: *, content: string, file: Array, contractId: *, status: number}}
                     */
                    let requestparams = {arr: childTrueId, contractId: params.id, status: 0};
                    new StockBatchConfirmRequest(requestparams).start(function (data) {
                        Toast.show('确认未到货成功', {
                            duration: Toast.durations.LONG,
                            position: -100
                        });
                        DeviceEventEmitter.emit('STOCK_SUCCESS', null);
                    })
                },
            },
            cancel: {
                color: '#cccccc',
                text: '否',
            },
        })
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e7e7e7',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
});

export default StockReceiptScene;