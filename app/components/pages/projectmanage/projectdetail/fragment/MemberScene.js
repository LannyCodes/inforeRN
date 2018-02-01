/**
 * Created by Lanny on 2017/5/23.
 */
'use strict';
import React, {Component} from 'react'
import {
    View, FlatList, Image, Text, TouchableHighlight, ScrollView, RefreshControl
}from "react-native"
import {GetProjectMemberListRequest} from '../../../../../api/projectmanage/ProjectManageRequests'
const StyleSheet = require('../../../../../base/StyleSheet');
export default class MemberScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectMemberList: [],
            isRefreshing: false
        }
    }

    componentDidMount() {
        this._onRefresh();
    }

    _onRefresh() {
        let self = this;
        self.setState({
            isRefreshing: true
        });
        let params = {projectId: self.props.id};
        new GetProjectMemberListRequest(params).start(function (data) {
            self.setState({
                projectMemberList: data,
                isRefreshing: false
            })
        }, function (error) {
            setTimeout(() => {
                self.setState({
                    isRefreshing: false,
                })
            }, _loading_)
        });
    }

    _keyExtractor = (item, index) => index;

    render() {
        return (
            <View style={styles.container}>
                {
                    ((!this.state.projectMemberList || this.state.projectMemberList.length === 0) && this.state.isRefreshing === false) ? this._renderHolder() : this._renderDetail()
                }
            </View>
        )
    }

    _renderHolder() {
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
                        source={require('../../../../../images/common/icon_holder_rw.png')}/>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={styles.holderMessage}>未查询到结果</Text>
                </View>
            </ScrollView>

        )
    }

    _renderDetail() {
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
                keyExtractor={this._keyExtractor.bind(this)}
                data={this.state.projectMemberList}
                renderItem={this.renderItemView.bind(this)}
                ItemSeparatorComponent={this._itemRowSeparator}
                contentContainerStyle={styles.allContainer}/>
        )
    }

    //返回itemView
    renderItemView({item}) {
        return (
            <TouchableHighlight
                onPress={() => this.props.navigation.navigate('MailPersonDetail', {
                    userId: item.userId
                })}>
                <View style={styles.itemContainer}>
                    <View style={styles.itemSubContainer}>
                        <Image
                            resizeMode='cover'
                            style={styles.headIcon}
                            source={isNull(item.memberHeaderImg) || !item.memberHeaderImg.startsWith('http') ?
                                require('../../../../../images/icon_header_default.png') :
                                {uri: item.memberHeaderImg}}
                        />
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemMemberName}>
                            {item.projectUserName}
                        </Text>
                    </View>
                    {this.renderItemRightView(item)}
                </View>
            </TouchableHighlight>
        );
    }

    renderItemRightView(item) {
        if (item.memberType && item.memberType === '1') {
            return (
                <View style={styles.itemRightViewStyle}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemRightFont}>
                        负责人
                    </Text>
                </View>
            )
        }
    }

    _itemRowSeparator = () => {
        return <View style={styles.itemRowSeperate}/>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e7e7e7',
        flexDirection: 'column'
    },
    allContainer: {
        marginTop: 10
    },
    itemRowSeperate: {
        flexDirection: 'row',
        flex: 1,
        height: 0.8,
        marginLeft: 15,
        backgroundColor: '#e7e7e7'
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 55,
        paddingLeft: 15,
        paddingRight: 15
    },
    itemSubContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    itemMemberName: {
        fontSize: 16,
        color: '#333333',
        marginLeft: 6
    },
    headIcon: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    itemRightViewStyle: {
        width: 61,
        height: 26,
        borderRadius: 2,
        borderWidth: 0.5,
        borderColor: '#29a1f7',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemRightFont: {
        fontSize: 12,
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
        marginTop: 15,
        fontSize: 15,
        color: 'rgb(166,166,166)',
    }
});