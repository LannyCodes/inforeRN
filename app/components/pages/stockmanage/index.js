/**
 * Created by InforeXuan on 2017/5/19.
 */
import React, {Component} from 'react'

import {
    View, Text, FlatList, TouchableOpacity, RefreshControl, DeviceEventEmitter, ScrollView, Image
}from "react-native"
import TitleBar from '../../widget/TitleBar'
import SearchView from '../../widget/SearchView'
const StyleSheet = require('../../../base/StyleSheet');
import {StockManageRequest} from '../../../api/stockmanage/StockManageRequests'
let pageNo = 1;
let totalCount = 0;
let localCount = 0;
class StockManageScene extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            isRefreshing: false
        }
    }

    componentDidMount() {
        this._onRefresh();
    }

    componentWillMount() {
        let self = this;
        this._subscription_stockSuccess = DeviceEventEmitter.addListener('STOCK_SUCCESS', function (event) {
            self._onRefresh();
        });
    }

    componentWillUnmount() {
        this._subscription_stockSuccess.remove();
    }

    fetchFromServer(pageNo) {
        let self = this;
        let params = {
            pageNo: pageNo,
            pageSize: _PAGESIZE_,
            userName: _USERNAME_,
        };
        // 获取数据
        new StockManageRequest(params).start(function (data) {
            if (!isNull(data.list)) {

                localCount += data.list.length;
                totalCount = data.totalCount;
                self.setState({
                    listData: self.state.listData.concat(data.list),
                    isRefreshing: false,
                });
            }
        }, function (error) {
            setTimeout(() => {
                self.setState({
                    isRefreshing: false,
                })
            }, _loading_)
        });
    }

    /**
     * refresh
     * @private
     */
    _onRefresh() {
        pageNo = 1;
        localCount = 0;
        this.state.listData = [];
        this.setState({
            isRefreshing: true,
        });
        this.fetchFromServer(pageNo)
    }

    _loadMore() {
        if (localCount < totalCount) {
            this.fetchFromServer(++pageNo)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TitleBar navigation={this.props.navigation}
                          title='采购管理'
                          leftImage={require('../../../images/common/icon_bar_left.png')}
                          onLeftPress={() => this.props.navigation.goBack()}/>
                <SearchView navigation={this.props.navigation} scene={'SearchStock'} searchText={'请输入项目名称搜索'}/>
                {
                    (this.state.listData && this.state.listData.length > 0) && this._renderList()
                }
                {
                    (!this.state.isRefreshing && this.state.listData.length <= 0) && this._renderHolder()
                }

            </View>
        )
    }

    _renderList() {
        return (<FlatList
            refreshControl={
                <RefreshControl
                    refreshing={this.state.isRefreshing}
                    onRefresh={() => this._onRefresh()}
                    tintColor="#3ca8fe"
                    colors={['#3ca8fe']}
                    progressBackgroundColor="#f1f1f1"
                />
            }
            onEndReachedThreshold={0.1}
            onEndReached={() => this._loadMore()}
            keyExtractor={this._keyExtractor.bind(this)}
            data={this.state.listData}
            renderItem={this.renderItemView.bind(this)}
            ItemSeparatorComponent={this._itemRowSeparator}
            contentContainerStyle={styles.innerContainerStyle}
        />)
    }


    _renderHolder = () => {
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={() => this._onRefresh()}
                        tintColor="#3ca8fe"
                        colors={['#3ca8fe']}
                        progressBackgroundColor="#f1f1f1"
                    />
                }>
                <View
                    style={styles.holderContainer}>
                    <Image
                        resizeMode='cover'
                        style={styles.holderImage}
                        source={require('../../../images/common/icon_holder_rw.png')}/>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={styles.holderMessage}>未查询到结果</Text>
                </View>
            </ScrollView>

        )
    }

    //返回itemView
    renderItemView({item}) {
        return (
            <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('StockReceipt', {
                    remark: item.stockoutDescription ? item.stockoutDescription : '无',
                    id: item.id,
                    contractId: item.contractNo,
                    image: item.image
                });
            }}>
                <View style={styles.itemContainer}>
                    <View style={styles.itemOneContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={[styles.itemNameText]}>
                            {item.projectName}
                        </Text>
                    </View>
                    <View style={styles.itemSubContainerdivider}/>
                    <View style={styles.itemTwoContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemNameText}>
                            合同编号
                        </Text>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemNumValue}>
                            {item.contractNo}
                        </Text>
                    </View>
                    <View style={styles.itemSubContainerdivider}/>
                    <View style={styles.itemTwoContainerQH}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemNameText}>
                            缺货情况
                        </Text>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                              style={[styles.itemNumValue, {marginTop: 10, justifyContent: 'flex-start'}]}>
                            {item.stockoutDescription ? item.stockoutDescription : '无'}
                        </Text>
                    </View>
                    <View style={styles.itemSubContainerdivider}/>
                    <View style={styles.itemThreeContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemButtonText}>
                            到货情况
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    _itemRowSeparator = () => {
        return <View style={styles.itemRowSeparator}/>;
    };

    _keyExtractor = (item, index) => index;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efefef'
    },
    innerContainerStyle: {
        marginTop: 6,
        marginLeft: 10,
        marginRight: 10,
    },
    itemRowSeparator: {
        height: 10
    },
    itemContainer: {
        backgroundColor: 'white',
        borderRadius: 3
    },
    itemOneContainer: {
        paddingRight: 5,
        paddingTop: 14,
        paddingBottom: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: 10
    },
    itemTwoContainer: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10
    },
    itemTwoContainerQH: {
        flexDirection: 'column',
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10
    },
    itemThreeContainer: {
        height: 41,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemSubContainerdivider: {
        height: 0.5,
        backgroundColor: '#e7e7e7',
        marginLeft: 10,
        marginRight: 10
    },
    itemNameText: {
        fontSize: 16,
        color: '#333333'
    },
    itemNumValue: {
        color: '#999999',
        fontSize: 16,
    },
    itemButtonText: {
        fontSize: 14,
        color: '#29a1f7'
    },
    holderContainer: {
        marginTop: 150,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
})

export default StockManageScene;