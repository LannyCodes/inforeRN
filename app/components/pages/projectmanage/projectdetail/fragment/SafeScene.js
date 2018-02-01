/**
 * Created by Lanny on 2017/5/23.
 */
'use strict';
import React, {Component} from 'react'

import {
    View,
    Text,
    ScrollView,
    FlatList,
    RefreshControl,
    ListView,
    TouchableWithoutFeedback,
    Image,
    DeviceEventEmitter
}from "react-native"
import {CachedImage} from 'react-native-img-cache'
const StyleSheet = require('../../../../../base/StyleSheet');
import PictureOverlay from "../../../../widget/PictureOverlay";
import {GetSecurityLogList} from '../../../../../api/projectmanage/ProjectManageRequests'
import {string2Date} from '../../../../../utils/Common'
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
let pageNo = 1;
let totalCount = 0;
let localCount = 0;

export default class SafeScene extends Component {

    constructor(props) {
        super(props);
        this.projectId = this.props.id;
        this.state = {
            isRefreshing: false,
            listData: [],
            clickImageUri: ''
        }
    }

    componentDidMount() {
        this._onRefresh();
    }

    componentWillMount() {
        let self = this;
        this._subscription_refreshquestion = DeviceEventEmitter.addListener('NEWSAFE_SUCCESS', function (event) {
            self._onRefresh();
        });
    }

    componentWillUnmount() {
        this._subscription_refreshquestion.remove();
    }


    /**
     * refresh
     * @private
     */
    _onRefresh() {
        pageNo = 1;
        localCount = 0;
        this.state.listData = [];
        this.setState({isRefreshing: true});
        this.fetchFromServer(pageNo);
    }

    fetchFromServer(pageNo) {
        let self = this;
        let params = {
            pageNo: pageNo,
            pageSize: _PAGESIZE_,
            projectId: this.projectId
        };
        new GetSecurityLogList(params).start(function (data) {
            if (!isNull(data.list)) {
                localCount += data.list.length;
                totalCount = data.totalCount;
                self.setState({
                    listData: self.state.listData.concat(data.list),
                    isRefreshing: false,
                });
            } else {
                self.setState({
                    isRefreshing: false,
                })
            }
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

    render() {
        return (
            <View style={styles.container}>
                {
                    ((!this.state.listData || this.state.listData.length === 0) && this.state.isRefreshing === false) ? this.renderHolder() : this.renderList()
                }
                <PictureOverlay
                    ref={(po) => {
                        this.po = po
                    }}
                    url={this.state.clickImageUri}
                />
            </View>
        )
    }


    renderList = () => {
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
                renderItem={this.renderTaskItemView.bind(this)}
                ItemSeparatorComponent={this._itemRowSeparator}
                contentContainerStyle={styles.allContainer}
            />
        )
    };

    renderHolder = () => {
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
    };

    _keyExtractor = (item, index) => index;

    _itemRowSeparator = () => {
        return <View style={styles.taskRowSeperate}/>;
    };

    //返回itemView
    renderTaskItemView({item}) {
        return (
            <View key={item.userImage}>
                <View style={styles.taskContainer}>
                    <View style={styles.taskUserInfo}>
                        <CachedImage
                            resizeMode={'cover'}
                            style={styles.taskIcon}
                            source={isNull(item.userImage)
                                ? require('../../../../../images/icon_header_default.png') : {uri: item.userImage}}
                        />
                        <View style={styles.taskUserName}>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.taskName}>
                                {item.deptName}-{item.sendUserName}
                            </Text>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.taskTime}>
                                {item.dateString}
                            </Text>
                        </View>
                    </View>

                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.taskContentText}>
                        【{item.projectName}】{item.content}
                    </Text>

                    {this._renderImageList(item.images)}

                </View>
            </View>
        );
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
    taskRowSeperate: {
        height: 10
    },
    taskContainer: {
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    taskUserInfo: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 15,
        marginLeft: 13
    },
    taskUserName: {
        flexDirection: 'column',
        marginLeft: 13
    },
    taskState: {
        fontSize: 12,
        color: '#29a1f7'
    },
    taskIcon: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    taskName: {
        fontSize: 16,
        color: '#333333',
        marginBottom: 5
    },
    taskTime: {
        fontSize: 12,
        color: '#939393'
    },
    taskContentText: {
        fontSize: 16,
        color: '#333333',
        marginRight: 22.5,
        marginTop: 8.5,
        marginLeft: 13
    },
    imgInnerListView: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 4,
        marginBottom: 13,
        marginLeft: 11
    },
    imgIcon: {
        width: 112,
        height: 112,
        margin: 2.5
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
    }
    ,
    holderMessage: {
        fontSize: 15,
        color: 'rgb(166,166,166)',
        marginTop: 15
    }
});