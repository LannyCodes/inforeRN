/**
 * Created by InforeXuan on 2017/5/19.
 */
import React, {Component} from 'react'

import {
    View, FlatList, RefreshControl, ScrollView, Image, Text
} from "react-native"
import TitleBar from '../../widget/TitleBar'
import SearchView from '../../widget/SearchView'
const StyleSheet = require('../../../base/StyleSheet');
import PaymentItem from './PaymentItem';
import {GetPaymentListRequest} from '../../../api/payment/PaymentRequests'
let pageNo = 1;
let totalCount = 0;
let localCount = 0;
class PaymentManageScene extends Component {

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

    _onRefresh() {
        pageNo = 1;
        localCount = 0;
        this.state.listData = [];
        this.setState({
            isRefreshing: true,
        });
        this.fetchFromServer(pageNo)
    }

    fetchFromServer(pageNo) {
        let self = this;
        let params = {
            pageNo: pageNo,
            pageSize: _PAGESIZE_,
            userName: _USERNAME_,

        };
        new GetPaymentListRequest(params).start(function (data) {
            if (!isNull(data)) {
                localCount += data.list.length;
                totalCount = data.totalCount;
                self.setState({
                    listData: self.state.listData.concat(data.list),
                });
            }
            setTimeout(() => {
                self.setState({
                    isRefreshing: false,
                })
            }, _loading_)
        }, function (error) {
            setTimeout(() => {
                self.setState({
                    isRefreshing: false,
                })
            }, _loading_)
        });
    }

    _loadMore() {
        if (localCount < totalCount) {
            this.fetchFromServer(++pageNo)
        }
    }

    _renderList = () => {
        return (
            <FlatList
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
            />
        )
    };

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

    render() {
        return (
            <View style={styles.container}>
                <TitleBar
                    navigation={this.props.navigation}
                    title='财务管理'
                    leftImage={require('../../../images/common/icon_bar_left.png')}
                    onLeftPress={() => this.props.navigation.goBack()}/>
                <SearchView navigation={this.props.navigation} scene='SearchPayment' searchText={'请输入项目名称搜索'}/>
                {
                    this.state.listData && this.state.listData.length > 0 || this.state.isRefreshing ? this._renderList() : this._renderHolder()
                }
            </View>
        )
    }

    renderItemView = ({item}) => {
        return (
            <PaymentItem
                navigation={this.props.navigation}
                itemData={item}/>
        )
    }

    _itemRowSeparator = () => {
        return <View style={styles.itemRowSeparator}/>;
    }

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
        marginRight: 10
    },
    seperate_line: {
        height: 0.5,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: 'rgb(231,231,231)'
    },
    itemRowSeparator: {
        height: 10
    },
    itemContainer: {
        backgroundColor: 'white',
        borderRadius: 3,
    },
    item: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 10,
        paddingLeft: 10,
    },
    last_item: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    name: {
        fontSize: 16,
        color: '#333333',
        flex: 1,
    },
    value: {
        fontSize: 16,
        color: 'rgb(153,153,153)'
    },
    state_image: {
        width: 39,
        height: 39,
        resizeMode: 'stretch',
    },
    fkwt_image: {
        width: 20,
        height: 20,
        resizeMode: 'stretch',
    },
    item_alert_text: {
        marginLeft: 3,
        fontSize: 14,
        color: 'rgb(153,153,153)'
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
        marginTop: 15,
        fontSize: 15,
        color: 'rgb(166,166,166)',
    }

})

export default PaymentManageScene;