/**
 * Created by InforeXuan on 2017/5/19.
 */
import React, {Component} from 'react'

import {
    View, Text, ScrollView, TouchableOpacity, ListView, TouchableWithoutFeedback, Dimensions, DeviceEventEmitter, Image
}from "react-native"
import TitleBar from '../../../widget/TitleBar'
import PictureOverlay from "../../../widget/PictureOverlay";
import {StockDetailRequest} from '../../../../api/stockmanage/StockManageRequests'
import {CachedImage} from 'react-native-img-cache'
const screenWidth = Dimensions.get('window').width;
const StyleSheet = require('../../../../base/StyleSheet');
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
class StockDetailScene extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stockdetail: [],
            clickImageUri: '',
            refresh: true,
        }
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

    componentDidMount() {
        let self = this;
        // 获取数据
        let params = {contractNo: this.props.navigation.state.params.contractId};
        new StockDetailRequest(params).start(function (data) {
            self.setState({
                stockdetail: data
            })
        })
    }

    _onImageClick(rowData) {
        if (rowData !== null && rowData !== '') {
            if (rowData.startsWith('http')) {
                this.setState({
                    clickImageUri: rowData
                });
                this.po._showModal();
            }
        }
    }

    render() {
        let {params} = this.props.navigation.state;
        let images = params.image;
        let imageArr;
        if (!isNull(images)) {
            imageArr = images.split(',');
        }
        let stockDetail = this.state.stockdetail;
        return (
            <View style={styles.container}>
                <TitleBar navigation={this.props.navigation}
                          title='采购管理'
                          leftImage={require('../../../../images/common/icon_bar_left.png')}
                          onLeftPress={() => this.props.navigation.goBack()}/>
                <ScrollView contentContainerStyle={styles.svContainer}>
                    {!isNull(params.remark) && <View style={styles.qhmsContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.qhmsTitle}>
                            缺货描述
                        </Text>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.qhmsContent}>
                            {params.remark}
                        </Text>
                    </View>}
                    {imageArr && imageArr.length > 0 && <View style={styles.qhmsContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.qhmsTitle}>
                            出库单
                        </Text>
                        {this._renderImageList(imageArr)}
                    </View>}
                    {this._renderStockList(stockDetail)}
                </ScrollView>
                <PictureOverlay
                    ref={(po) => {
                        this.po = po
                    }}
                    url={this.state.clickImageUri}
                />
            </View>
        )
    }

    _renderStockList(stocks) {
        if (stocks && stocks.length > 0) {
            return (
                stocks.map((item, i) => {
                    return (
                        <TouchableOpacity key={i} onPress={() => {
                            this.props.navigation.navigate('StockReceipt', {
                                subStock: item.childrenList,
                                id: this.props.navigation.state.params.id
                            })
                        }}>
                            <View style={styles.fxContainer}>
                                <View style={styles.fxBox}>
                                    <View style={styles.fxDes}>
                                        <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                              style={styles.fxDesText}>{item.parentCode}</Text>
                                    </View>
                                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                          style={styles.fxContentText}>{item.parentDesc}</Text>
                                    <View style={styles.line}/>

                                    <View style={styles.sqzxButton}>
                                        <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                              style={styles.sqzxButtonText}>查看详情</Text>
                                    </View>

                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                })
            )
        } else {
            return (
                <View style={styles.holderContainer}>
                    <Image
                        resizeMode='cover'
                        style={styles.holderImage}
                        source={require('../../../../images/common/icon_holder_rw.png')}/>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={styles.holderMessage}>暂无缺货信息</Text>
                </View>
            )
        }
    }

    _renderImageList(pics) {
        if (pics && pics.length > 0) {
            return (
                <ListView
                    dataSource={ds.cloneWithRows(pics)}
                    renderRow={this._renderImgItemView.bind(this)}
                    contentContainerStyle={styles.imgInnerListView}/>
            )
        } else {
            return <View/>
        }
    }

    _renderImgItemView(rowData) {
        if (isNull(rowData) || !rowData.startsWith('http')) {
            return <View/>
        } else {
            return (
                <TouchableWithoutFeedback onPress={() => this._onImageClick(rowData)}>
                    <CachedImage
                        resizeMode='cover'
                        style={styles.imgIcon}
                        source={{uri: rowData}}
                    />
                </TouchableWithoutFeedback>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e7e7e7',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    svContainer: {
        paddingBottom: 10
    },
    qhmsContainer: {
        flex: 1,
        marginTop: 10,
        backgroundColor: 'white',
        padding: 15
    },
    qhmsTitle: {
        fontSize: 16,
        color: '#333333'
    },
    qhmsContent: {
        fontSize: 16,
        color: '#9b9b9b',
        marginTop: 10
    },
    imgInnerListView: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 6.5,
        marginBottom: 6.5,
    },
    imgColumnSeparator: {
        width: 4.5
    },
    bottomDivider: {
        backgroundColor: '#e7e7e7',
        width: 375,
        height: 0.5,
    },
    detailBottom: {
        width: '100%',
        height: 44,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    detailBottomChoose: {
        flexDirection: 'row',
        height: 44,
        flex: 1,
        alignItems: 'center'
    },
    detailChooseButton: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    detailChoosedivider: {
        width: 0.5,
        height: 24,
        backgroundColor: '#e7e7e7'
    },
    detailBottomFont: {
        fontSize: 16,
        color: '#29a1f7'
    },
    imgIcon: {
        width: 109,
        height: 109,
        margin: 3
    },
    fxContainer: {
        marginTop: 10,
        flex: 1
    },
    fxBox: {
        backgroundColor: 'white',
        paddingTop: 14,
        paddingLeft: 15,
        paddingRight: 14
    },
    fxDesText: {
        fontSize: 16,
        color: '#333333'
    },
    fxContentText: {
        fontSize: 16,
        color: '#9b9b9b',
        marginTop: 10,
        marginBottom: 10
    },
    fxDes: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    checkbox: {
        width: 18,
        height: 18
    },
    line: {
        height: 1,
        backgroundColor: '#e7e7e7'
    },
    zxContainer: {
        marginTop: 10,
        width: screenWidth
    },
    zxTextBox: {
        height: 44,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    zxText333: {
        color: '#333333',
        fontSize: 16
    },
    zxText999: {
        color: '#999999',
        fontSize: 16
    },
    sqzxButton: {
        height: 41,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sqzxButtonText: {
        color: '#29a1f7',
        fontSize: 14
    },
    holderContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 170
    },
    holderImage: {
        width: 80,
        height: 80,
    },
    holderMessage: {
        fontSize: 15,
        marginTop: 15,
        color: 'rgb(166,166,166)',
    }
});

export default StockDetailScene;