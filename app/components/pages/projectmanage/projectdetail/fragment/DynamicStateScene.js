/**
 * Created by Lanny on 2017/5/23.
 */
'use strict';
import React, {Component} from 'react'

import {
    View, FlatList, Image, Text, TouchableWithoutFeedback
}from "react-native"
import PictureOverlay from "../../../../widget/PictureOverlay";
import {showFile} from '../../../../../utils/OnlineFileUtils'
import {FILE_IMG_ICON} from '../../../../../constants/ImageConst'
import {CachedImage} from "react-native-img-cache";
const StyleSheet = require('../../../../../base/StyleSheet');

export default class DynamicStateScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectDynamicList: []
        }
    }

    _keyExtractor = (item, index) => index;

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    keyExtractor={this._keyExtractor.bind(this)}
                    data={this.state.projectDynamicList}
                    renderItem={this.renderItemView.bind(this)}
                    ItemSeparatorComponent={this._itemRowSeparator}
                    contentContainerStyle={styles.allContainer}
                />
                <PictureOverlay
                    ref={(po) => {
                        this.po = po
                    }}
                    cache={true}
                    url={this.state.clickImageUri}
                />
            </View>
        )
    }

    //返回itemView
    renderItemView({item}) {
        return (
            <View style={styles.itemContainer} key={item.key}>
                <CachedImage
                    resizeMode='contain'
                    style={styles.headIcon}
                    source={{uri: item.personHeaderImg}}
                />
                <View style={styles.itemSubContainer}>
                    <View style={styles.itemTopContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemDetailInfo}>
                            {item.personName} {item.dynamicType}
                        </Text>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemTime}>
                            {item.dynamicTime}
                        </Text>
                    </View>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemComment}>
                        {item.dynamicPlanContent}
                    </Text>
                    {this.renderItemFile(item)}
                </View>

            </View>
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


    renderItemFile(item) {
        if (item.dynamicFileList && item.dynamicFileList.length > 0) {
            return (
                <View style={styles.itemFileContainer}>
                    {item.dynamicFileList.map((subItem, j) => {
                        return (
                            <TouchableWithoutFeedback
                                onPress={() => showFile(this, item.fileType, item.fileName, item.filePath, item.id)}
                                key={j}>
                                <View>
                                    <View style={styles.itemFileInfo}>
                                        <Image
                                            resizeMode='contain'
                                            style={styles.headIcon}
                                            source={subItem.fileType && (subItem.fileType === '.png' || subItem.fileType === '.jpg' || subItem.fileType === '.jpeg' ) ? {uri: subItem.fileHeaderImg} : FILE_IMG_ICON[subItem.fileType]}
                                        />
                                        <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                              style={styles.fileName}>
                                            {subItem.fileName}
                                        </Text>
                                    </View>
                                    {this.renderItemFileDivider(j)}
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })}
                </View>
            );
        }
    }

    renderItemFileDivider(item, j) {
        if (item.dynamicFileList && j < item.dynamicFileList.length - 1) {
            return (
                <View style={styles.itemFileDivider}/>
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
    headIcon: {
        width: 36,
        height: 36,
        marginLeft: 10
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
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 20,
        paddingTop: 20
    },
    itemSubContainer: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'flex-start',
        marginLeft: 15
    },
    itemTopContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between'
    },
    itemFileContainer: {
        borderWidth: 0.5,
        borderColor: '#dadada',
        borderRadius: 1,
        backgroundColor: '#f2f2f2',
        flexDirection: 'column',
        flex: 1,
        marginTop: 7.5
    },
    itemDetailInfo: {
        fontSize: 14,
        color: '#999999'
    },
    itemTime: {
        color: '#b2b2b2',
        fontSize: 12
    },
    itemComment: {
        color: '#333333',
        fontSize: 14,
        marginTop: 5
    },
    itemFileInfo: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    fileName: {
        fontSize: 16,
        color: '#333333',
        marginLeft: 10
    },
    itemFileDivider: {
        height: 0.5,
        flex: 1,
        backgroundColor: '#dadada'
    }
});