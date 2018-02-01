/**
 * Created by Lanny on 2017/6/8.
 */
/**
 * Created by Lanny on 2017/6/6.
 */
/**
 * Created by Lanny on 2017/5/23.
 */
'use strict';
import React, {Component} from 'react'

import {
    View, FlatList, Image, Text, TouchableWithoutFeedback
}from "react-native"
import {showFile} from '../../../../utils/OnlineFileUtils'
import PictureOverlay from "../../../widget/PictureOverlay";
import {GetApprovalRecordListRequest} from '../../../../api/auditmanage/AuditManageRequests'
import {FILE_IMG_ICON} from '../../../../constants/ImageConst'
const StyleSheet = require('../../../../base/StyleSheet');
import MutliImage from '../../../widget/MutliImage';
import ErrorPage from '../../../widget/ErrorPage';
export default class ApprovalRecord extends Component {
    constructor(props) {
        super(props);
        this.processApprovalId = props.processApprovalId;
        this.state = {
            approvalRecord: {}
        }
    }

    componentDidMount() {
        let self = this;
        let params = {'approvalId': this.processApprovalId};
        new GetApprovalRecordListRequest(params).start(function (data) {
            if (data) {
                self.setState({
                    approvalRecord: data
                })
            } else {
                self.setState({
                    approvalRecord: null
                })
            }
        })
    }

    _keyExtractor = (item, index) => index;

    render() {
        return (
            <View style={styles.container}>
                {/*<FlatList
                 keyExtractor={this._keyExtractor.bind(this)}
                 data={this.state.dynamicList}
                 renderItem={this.renderItemView.bind(this)}
                 ItemSeparatorComponent={this._itemRowSeparator}
                 contentContainerStyle={styles.allContainer}
                 />*/}
                {this.renderItemView(this.state.approvalRecord)}
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
    renderItemView(item) {
        if (isNull(item)) {
            return (
                <ErrorPage errorContent={'没有任何记录...'}/>
            )
        }
        return (
            <View style={styles.itemContainer}>
                <MutliImage
                    style={styles.headIcon}
                    uri={item.img}
                />
                <View style={styles.itemSubContainer}>
                    <View style={styles.itemTopContainer}>
                        <View style={{flexDirection: 'row'}}>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemDetailInfo}>
                                {item.realApprovalUser}
                            </Text>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                  style={item.processStatus === 2 ? styles.reject : styles.agree}>
                                {!isNull(item.processStatus) && (item.processStatus === 2 ? '已拒绝' : '已通过')}
                            </Text>
                        </View>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemTime}>
                            {item.approvalTime}
                        </Text>
                    </View>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemComment}>
                        {item.otherReason}
                    </Text>
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
                                <View key={j}>
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
                                    {this.renderItemFileDivider(item, j)}
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
        width: 34,
        height: 34,
        marginLeft: 10,
        borderRadius: 17
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
    },
    agree: {
        marginLeft: 5,
        fontSize: 14,
        color: 'rgb(137,208,67)'
    },
    reject: {
        marginLeft: 5,
        fontSize: 14,
        color: 'rgb(239,86,83)'
    }
});