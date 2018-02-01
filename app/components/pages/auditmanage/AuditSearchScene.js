/**
 * Created by Lanny on 2017/6/15.
 */
/**
 * Created by InforeXuan on 2017/5/19.
 */
import React, {Component} from 'react'

import {
    View, TextInput, Text, TouchableOpacity,
    StatusBar, FlatList, Image
}from "react-native"
const StyleSheet = require('../../../base/StyleSheet');
import {CachedImage} from "react-native-img-cache";
import {AuditSearchRequest} from '../../../api/auditmanage/AuditManageRequests'
import AuditManageItem from './AuditManageItem';
let searchKey = '';
class AuditSearchScene extends Component {

    componentDidMount() {

    }

    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            text: '',
            showCorrectPage: true
        }
    }

    query() {
        let self = this;
        let params = {'userName': _USERNAME_, 'processName': searchKey};
        new AuditSearchRequest(params).start(function (data) {
            if (data.list && data.list.length > 0)
                self.setState({
                    showCorrectPage: true,
                    listData: data.list
                });
            else {
                self.setState({
                    showCorrectPage: false
                });
            }
        })
    }

    renderHolder = () => {
        return (
            <View
                style={styles.holderContainer}>
                <Image
                    resizeMode='center'
                    style={styles.holderImage}
                    source={require('../../../images/common/icon_holder_rw.png')}/>
                <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                      style={styles.holderMessage}>没有查询到结果...</Text>
            </View>

        )
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
                            value={this.state.searchKey}
                            onChangeText={(text) => {
                                searchKey = text
                            }}
                            placeholder="请输入流程名称"
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
                {this.state.showCorrectPage ?
                    <FlatList
                        keyExtractor={this._keyExtractor.bind(this)}
                        style={styles.flatList}
                        data={this.state.listData}
                        renderItem={this._renderItem.bind(this)}/>
                    : this.renderHolder()
                }

            </View>
        )


    }

    _keyExtractor = (item, index) => index;

    _renderItem({item, index}) {
        return <AuditManageItem {...item} {...this.props} key={index}/>
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
        marginLeft: 5,
        marginRight: 3,
        width: 22,
        height: 18,
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
    flatList: {
        marginTop: 10,
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
    },
    errorRemind: {
        fontSize: 30,
        color: '#333333'
    },
    holderContainer: {
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

export default AuditSearchScene;