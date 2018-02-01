/**
 * Created by Lanny on 2017/5/23.
 */
'use strict';
import React, {Component} from 'react'
import {
    View, FlatList, Image, Text, TouchableOpacity, ScrollView, RefreshControl
}from "react-native"
import {GetProjectFileListRequest} from '../../../../../api/projectmanage/ProjectManageRequests'
import {showFile} from '../../../../../utils/OnlineFileUtils'
import PictureOverlay from "../../../../widget/PictureOverlay";
import {FILE_IMG_ICON} from '../../../../../constants/ImageConst'
import {getFileSize} from '../../../../../utils/Common'
const StyleSheet = require('../../../../../base/StyleSheet');
export default class FileScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clickImageUri: '',
            projectFileList: [],
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
        new GetProjectFileListRequest(params).start(function (data) {
            self.setState({
                projectFileList: data,
                isRefreshing: false
            })
        }, function (error) {
            setTimeout(() => {
                self.setState({
                    isRefreshing: false,
                })
            }, _loading_)
        })
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

    _renderDetail(projectFileList) {
        return (
            <View style={styles.container}>
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
                    data={projectFileList}
                    renderItem={this._renderItemView.bind(this)}
                    ItemSeparatorComponent={this._itemRowSeparator}
                    contentContainerStyle={styles.allContainer}
                />
            </View>
        )
    }

    render() {
        let projectFileList = this.state.projectFileList;
        return (
            <View style={styles.container}>
                {
                    ((!projectFileList || projectFileList.length === 0) && this.state.isRefreshing === false) ? this._renderHolder() : this._renderDetail(projectFileList)
                }
                <PictureOverlay
                    cache={true}
                    ref={(po) => {
                        this.po = po
                    }}
                    url={this.state.clickImageUri}
                />
            </View>
        )
    }

    _keyExtractor = (item, index) => index;

    _itemRowSeparator = () => {
        return <View style={styles.itemRowSeperate}/>;
    }


    //返回itemView
    _renderItemView({item}) {
        return (
            <TouchableOpacity onPress={() => showFile(this, item.fileType, item.fileName, item.filePath, item.id)}>
                <View style={styles.itemContainer}>
                    <View style={styles.itemSubContainer}>
                        <Image
                            resizeMode='contain'
                            style={styles.headIcon}
                            source={item.fileType && (item.fileType === '.png' || item.fileType === '.jpg' || item.fileType === '.jpeg') ?
                                (isNull(item.filePath) || !item.filePath.startsWith('http') ?
                                    require('../../../../../images/file/icon_default_fileimg.png') :
                                    {uri: item.filePath})
                                : FILE_IMG_ICON[item.fileType]}
                        />
                        <View style={styles.itemSubTextContainer}>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemFileName}
                                  numberOfLines={1} ellipsizeMode={'tail'}>
                                {item.fileName}
                            </Text>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                  style={styles.itemFileOtherInfo}>
                                {getFileSize(item.fileSize) + ' ' + item.createTime + ' ' + item.createUser}
                            </Text>
                        </View>
                    </View>
                    <Image
                        resizeMode='contain'
                        style={styles.arrowIcon}
                        source={require('../../../../../images/common/icon_arrow_right.png')}
                    />
                </View>
            </TouchableOpacity>
        );
    }

    // 显示大图
    _onImageClick(url) {
        if (url !== null && url !== '') {
            if (url.startsWith('http')) {
                this.setState({
                    clickImageUri: url
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
    itemRowSeperate: {
        flexDirection: 'row',
        flex: 1,
        height: 0.5,
        marginLeft: 15,
        backgroundColor: '#e7e7e7'
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 60,
        paddingLeft: 15,
        paddingRight: 10
    },
    itemSubContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    itemSubTextContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 10
    },
    headIcon: {
        width: 40,
        height: 40
    },
    itemFileName: {
        fontSize: 16,
        textAlign: 'left',
        width: 260,
        color: '#333333'
    },
    itemFileOtherInfo: {
        fontSize: 12,
        color: '#999999',
        marginTop: 4
    },
    arrowIcon: {
        width: 9,
        height: 9
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