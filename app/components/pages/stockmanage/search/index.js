/**
 * Created by InforeXuan on 2017/5/19.
 */
import React, {Component} from 'react'

import {
    View, TextInput, Text,
    StatusBar, Image, TouchableOpacity, FlatList
}from "react-native"
import {CachedImage} from "react-native-img-cache";
import {findContractListRequest} from '../../../../api/stockmanage/StockManageRequests';
const StyleSheet = require('../../../../base/StyleSheet');
let searchKey = "";
class SearchStockScene extends Component {

    componentDidMount() {

    }

    constructor(props) {
        super(props);
        this.state = {
            stockList: [],
        }
    }

    _itemRowSeparator = () => {
        return <View style={styles.itemRowSeparator}/>;
    };

    _keyExtractor = (item, index) => index;

    /**
     * 请求
     */
    query() {
        let self = this;
        let params = {proName: searchKey, userName: _USERNAME_};
        new findContractListRequest(params).start(function (data) {
            self.setState({
                stockList: data.list
            })
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    translucent={true}
                    backgroundColor="#0f85ec"
                    barStyle='light-content'/>
                <View style={styles.topSearchEdit}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => {
                        this.props.navigation.goBack()
                    }}>
                        <Image
                            resizeMode='cover'
                            style={styles.leftImg}
                            source={require('../../../../images/common/icon_bar_black_left.png')}
                        />
                    </TouchableOpacity>
                    <View style={styles.searchEdit}>
                        <CachedImage
                            resizeMode='cover'
                            style={styles.inputIcon}
                            source={require('../../../../images/common/icon_find.png')}
                        />
                        <TextInput
                            style={styles.input}
                            value={this.state.searchKey}
                            onChangeText={(text) => {
                                searchKey = text
                            }}
                            placeholder="请输入项目名"
                            autoFocus={true}
                            placeholderTextColor="#999999"
                            underlineColorAndroid='transparent'
                        />
                    </View>
                    <View style={styles.cancelContainer}>
                        <TouchableOpacity activeOpacity={0.5} onPress={() => {
                            this.query()
                        }}>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.topBlueCancel}>
                                搜索
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flex: 1, padding: 1}}>
                    <FlatList
                        keyExtractor={this._keyExtractor.bind(this)}
                        data={this.state.stockList}
                        renderItem={this._renderImgItemView.bind(this)}
                        ItemSeparatorComponent={this._itemRowSeparator}
                        contentContainerStyle={styles.innerItem}
                    />
                </View>

            </View>
        )
    }

    //返回itemView
    _renderImgItemView({item}) {
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
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemNameText}>
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
                            {item.remark}
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f9',
        flexDirection: 'column'
    },
    innerItem: {
        marginTop: 6,
        marginLeft: 10,
        marginRight: 10
    },
    topSearchEdit: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 28
    },
    searchEdit: {
        backgroundColor: '#eeeff3',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 28,
        width: '70%',
        borderRadius: 3,
        flex: 1,
        borderWidth: 1,
        borderColor: '#eeeff3'
    },
    input: {
        marginLeft: 7,
        padding: 0,
        alignItems: 'flex-end',
        width: '70%',
        fontSize: 16,
        color: '#333333',
    },
    inputIcon: {
        alignItems: 'center',
        marginLeft: 12.5,
        width: 18,
        height: 19,
    },
    leftImg: {
        width: 16,
        height: 16,
    },
    topBlueCancel: {
        color: '#38a2fc',
        fontSize: 16
    },
    cancelContainer: {
        paddingLeft: 10,
        paddingRight: 10
    },
    itemContainer: {
        backgroundColor: 'white',
        borderRadius: 3
    },
    itemOneContainer: {
        height: 44,
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
    itemTwoContainerQH: {
        flexDirection: 'column',
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10
    },
    itemNameText: {
        fontSize: 16,
        color: '#333333'
    },
    itemNumValue: {
        color: '#999999',
        fontSize: 16
    },
    itemButtonText: {
        fontSize: 14,
        color: '#29a1f7'
    },
    itemRowSeparator: {
        height: 10
    },
})

export default SearchStockScene;