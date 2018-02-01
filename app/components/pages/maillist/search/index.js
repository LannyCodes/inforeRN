/**
 * Created by InforeXuan on 2017/5/19.
 */
import React, {Component} from 'react'

import {
    View, TextInput, Text,
    StatusBar, Image, TouchableOpacity, FlatList
}from "react-native"
import MutiImage from '../../../widget/MutliImage'
import {CachedImage} from "react-native-img-cache";
import {GetUserModelByNickNameRequest} from '../../../../api/maillist/MailListRequests';
const StyleSheet = require('../../../../base/StyleSheet');
let searchKey = "";
class SearchMailScene extends Component {

    componentDidMount() {

    }

    constructor(props) {
        super(props);
        this.state = {
            mailList: [],
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
        let params = {nickName: searchKey};
        new GetUserModelByNickNameRequest(params).start(function (data) {
            self.setState({
                mailList: data
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
                            placeholder="请输入姓名"
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
                <FlatList
                    keyExtractor={this._keyExtractor.bind(this)}
                    data={this.state.mailList}
                    renderItem={this._renderImgItemView.bind(this)}
                    ItemSeparatorComponent={this._msgRowSeparator}
                />
            </View>
        )
    }

    /**
     * 进入个人详情页面
     * @param departName
     * @param itemData
     * @private
     */
    _showMailPersonDetail(itemData) {
        this.props.navigation.navigate('MailPersonDetail', {userId: itemData.userId})
    }

    //返回itemView
    _renderImgItemView({item}) {
        return (
            <TouchableOpacity
                onPress={this._showMailPersonDetail.bind(this, item)}>
                <View style={styles.subDepartContent}>
                    <View style={styles.subDepart}>
                        <MutiImage style={styles.subDepart_image}
                                   defaultImage={require('../../../../images/icon_header_default.png')}
                                   uri={item.img}/>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                              style={styles.subDepart_name}>{item.nickName}</Text>
                    </View>
                    <View style={[{height: 1}, styles.line]}/>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
    subDepart: {
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 18
    },
    subDepart_image: {
        width: 36,
        height: 36,
    },
    subDepart_name: {
        fontSize: 16,
        color: 'rgb(51,51,51)',
        marginLeft: 8.5
    },
    subDepartContent: {
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    line: {
        marginLeft: 18,
        backgroundColor: '#dedfe0'
    },
})

export default SearchMailScene;