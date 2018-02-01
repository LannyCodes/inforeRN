/**
 * Created by InforeXuan on 2017/5/19.
 */
import React, {Component} from 'react'

import {
    View, TextInput, Text,
    StatusBar, Image, TouchableHighlight, TouchableOpacity, FlatList
}from "react-native"
const StyleSheet = require('../../../../base/StyleSheet');
import {CachedImage} from "react-native-img-cache";
import {QueryMsgRequest} from '../../../../api/message/QueryMsgRequest';
import MuliImage from '../../../widget/MutliImage'
let searchKey = "";
class SearchMessageScene extends Component {

    componentDidMount() {

    }

    constructor(props) {
        super(props);
        this.state = {
            messageList: [],
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
        let params = {userName: _USERNAME_, messageTitle: searchKey};
        new QueryMsgRequest(params).start(function (data) {
            self.setState({
                messageList: data.list
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
                            placeholder="搜索"
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
                        data={this.state.messageList}
                        renderItem={this.renderMsgItemView.bind(this)}
                        ItemSeparatorComponent={this._msgRowSeparator}
                    />
                </View>

            </View>
        )
    }

    renderMsgImg(item) {
        return (
            <MuliImage
                resizeMode='cover'
                style={styles.msgIcon}
                uri={item.headImage}
            />
        )
    };

    _msgRowSeparator = () => {
        return <View style={styles.msgRowSeparator}/>;
    };

    renderMsgItemView({item, index}) {
        return (
            <TouchableHighlight underlayColor={'#cccccc'}
                                onPress={() => this.jumpTargetPage('MessageDetail', item, index)}>
                <View style={styles.msgContainer}>
                    <View style={styles.msgSubContainer}>
                        {this.renderMsgImg(item)}
                        <View style={styles.msgText}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flex: 1
                            }}>
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.msgName}
                                      numberOfLines={1} ellipsizeMode={'tail'}>
                                    {item.createUser}
                                </Text>
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.msgTime}>
                                    {item.createTime}
                                </Text>
                            </View>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.msgContent}
                                  numberOfLines={1} ellipsizeMode={'tail'}>
                                {item.messageContent}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>

        );
    }

    /**
     * 跳到指定页面
     * @param routeName
     */
    jumpTargetPage(routeName, item, index) {
        this.props.navigation.navigate(routeName, {item: item, index: index});
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column'
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
    msgContainer: {
        backgroundColor: 'white',
        height: 68,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    msgSubContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        marginLeft: 10
    },
    msgRowSeparator: {
        height: 0.5,
        marginLeft: 10
    },
    msgIcon: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    msgText: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 10
    },
    msgName: {
        color: '#333333',
        fontSize: 16,
        width: 100
    },
    msgContent: {
        color: '#999999',
        fontSize: 14,
        marginTop: 5,
        width: 234,
        marginBottom: 5
    },
    msgTime: {
        color: '#b2b2b2',
        marginRight: 15,
        fontSize: 12,
    }

})

export default SearchMessageScene;