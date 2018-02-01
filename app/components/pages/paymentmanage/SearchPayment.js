/**
 * Created by Infore.Wlun.
 */

import React, {Component} from 'react'
import {
    View, TextInput, Text, TouchableOpacity,
    StatusBar, Image, FlatList, RefreshControl, ScrollView,
} from "react-native"
const StyleSheet = require('../../../base/StyleSheet');
import {CachedImage} from "react-native-img-cache";
import PaymentItem from './PaymentItem';
import {GetPaymentListRequest} from '../../../api/payment/PaymentRequests'
import Toast from 'react-native-root-toast'
let searchValue = '';
class SearchPaymentScene extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listData: [],
            isRefreshing: false,
        }
    }

    _clickSearch = () => {
        let self = this;
        self.setState({
            isRefreshing: true,
        })
        let params = {
            projectName: searchValue,
            fromWhere: 'index',
            userName: _USERNAME_,
            userId: _USERID_,
        }
        new GetPaymentListRequest(params).start((data) => {
            console.log('data', data)
            if (!isNull(data)) {
                self.setState({
                    listData: data.list,
                })
            } else {
                Toast.show('没搜索到对应信息', {
                    duration: Toast.durations.LONG,
                    position: -100
                })
            }
            setTimeout(() => {
                self.setState({
                    isRefreshing: false,
                })
            }, _loading_)
        }, (error) => {
            console.log(error);
            setTimeout(() => {
                self.setState({
                    isRefreshing: false,
                })
            }, _loading_)
        })
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
                          style={styles.holderMessage}>没有搜到该关键字信息...</Text>
                </View>
            </ScrollView>

        )
    };

    _renderList = () => {
        return <ScrollView>
            <FlatList
                style={styles.flatList}
                keyExtractor={this._keyExtractor.bind(this)}
                data={this.state.listData}
                renderItem={this.renderItemView.bind(this)}
                ItemSeparatorComponent={this._itemRowSeparator}
                contentContainerStyle={styles.innerContainerStyle}
            />
        </ScrollView>
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
                            source={require('../../../images/common/icon_bar_black_left.png')}
                        />
                    </TouchableOpacity>
                    <View style={styles.searchEdit}>
                        <CachedImage
                            resizeMode='cover'
                            style={styles.inputIcon}
                            source={require('../../../images/common/icon_find.png')}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="请输入项目名称"
                            autoFocus={true}
                            returnKeyType='search'
                            returnKeyLabel='search'
                            placeholderTextColor="#999999"
                            underlineColorAndroid='transparent'
                            onSubmitEditing={() => {
                                this._clickSearch()
                            }}
                            onChangeText={(text) => {
                                searchValue = text
                            }}
                        />
                    </View>
                    <View style={styles.cancelContainer}>
                        <TouchableOpacity activeOpacity={0.5} onPress={() => {
                            this._clickSearch()
                        }}>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.topBlueCancel}>
                                搜索
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
        backgroundColor: '#f7f7f9',
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
        color: 'rgb(166,166,166)',
        marginTop: 15
    },
    flatList: {
        marginTop: 10,
        paddingLeft: 12,
        paddingRight: 12
    }
})

export default SearchPaymentScene