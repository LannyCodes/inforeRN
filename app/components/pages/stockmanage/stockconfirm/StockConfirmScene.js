/**
 * Created by InforeXuan on 2017/5/23.
 */
import React, {Component} from 'react'
import {
    View, Text, TextInput, Image, DeviceEventEmitter, ListView, TouchableWithoutFeedback
} from "react-native"
import ImagePicker from 'react-native-image-crop-picker';
import TitleBar from '../../../widget/TitleBar'
import ModalHud from '../../../widget/ModalHud'
import DialogBox from '../../../widget/DialogBox'
import PictureOverlay from "../../../widget/PictureOverlay";
import Toast from "react-native-root-toast";
import {StockBatchConfirmRequest} from '../../../../api/stockmanage/StockManageRequests'
const StyleSheet = require('../../../../base/StyleSheet');
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
let pics = [];
let inputContent = '';
let navigateTitle = '拍照上传';
let navigatePlaceholder = '请输入备货情况说明';
class StockConfirmScene extends Component {

    constructor(props) {
        super(props);
        this.arrivalsId = props.navigation.state.params.arrivalsId;
        this.id = props.navigation.state.params.id;
        this.state = {
            detailData: {},
            refreshTag: false,
            clickImageUri: '',
            isShowHud: false,
        }
    }

    /**
     * clear cache date
     */
    componentWillUnmount() {
        pics = [];
    }

    _selectPhotoTapped() {
        let self = this;
        ImagePicker.openCamera({
            cropping: false,
            compressImageQuality: 0.5,//图片质量参数，0~1
        }).then(image => {
            let imgFile = {uri: image.path, type: 'multipart/form-data', name: 'infore_contract.jpg'};
            pics.push(imgFile);
            self.setState({
                refreshTag: true
            })
        }).catch(e => {
            console.log('User cancelled camera：' + e);
        });
    }

    _onImageClick(rowData) {
        if (rowData !== null && rowData !== '') {
            this.setState({
                clickImageUri: rowData.uri
            });
            this.po._showModal();
        }
    }

    _deleteImage(rowID) {
        pics.splice(rowID, 1);
        this.setState({
            refreshTag: true
        })
    }

    /**
     * 确认到货点击
     * @private
     */
    _confirmBatch() {
        let arr = this.arrivalsId;
        let self = this;
        self.dialogbox.confirm({
            content: ['是否确认收货？'],
            ok: {
                text: '是',
                color: '#29a1f7',
                callback: () => {
                    self.setState({
                        isShowHud: true,
                    });
                    /**
                     * status:确认到货1 -- 确认未到货0
                     * @type {{arr: *, content: string, file: Array, contractId: *, status: number}}
                     */
                    let params = {arr: arr, content: inputContent, file: pics, contractId: this.id, status: 1};
                    new StockBatchConfirmRequest(params).start(function (data) {
                        self.setState({
                            isShowHud: false,
                        });
                        Toast.show('到货成功', {
                            duration: Toast.durations.LONG,
                            position: -100
                        });
                        DeviceEventEmitter.emit('STOCK_SUCCESS', null);
                    }, function (error) {
                        self.setState({
                            isShowHud: false,
                        });
                        Toast.show('到货失败，请稍后重试', {
                            duration: Toast.durations.LONG,
                            position: -100
                        });
                    })
                },
            },
            cancel: {
                color: '#cccccc',
                text: '否',
            },
        })
    }

    _renderImageList() {
        if (pics && pics.length > 0) {
            return (
                <ListView
                    dataSource={ds.cloneWithRows(pics)}
                    renderRow={this._renderImgItemView.bind(this)}
                    contentContainerStyle={styles.imgInnerListView}/>
            )
        } else {
            return <View />
        }
    }

    //返回itemView
    _renderImgItemView(rowData, sectionID, rowID) {
        return (
            <View style={styles.imageContainer}>
                <TouchableWithoutFeedback onPress={() => this._onImageClick(rowData)}>
                    <Image
                        resizeMode='cover'
                        style={styles.imgIcon}
                        source={{uri: rowData.uri}}
                    />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => this._deleteImage(rowID)}>
                    <Image
                        resizeMode='cover'
                        style={styles.imgIconCancle}
                        source={require('../../../../images/common/icon_wrong.png')}
                    />
                </TouchableWithoutFeedback>
            </View>
        );
    }

    _renderCamera() {
        if (pics.length < 9) {
            return <TouchableWithoutFeedback onPress={() => this._selectPhotoTapped()}>
                <Image
                    resizeMode='contain'
                    style={styles.photoPic}
                    source={require('../../../../images/common/icon_photo.png')}/>
            </TouchableWithoutFeedback>
        } else {
            return <View />
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TitleBar navigation={this.props.navigation}
                          title={navigateTitle}
                          leftImage={require('../../../../images/common/icon_bar_left.png')}
                          onLeftPress={() => this.props.navigation.goBack()}
                          rightText={'确定'}
                          onRightPress={() => {
                              this._confirmBatch();
                          }}/>
                <View style={styles.questionInput}>
                    <TextInput
                        style={styles.input}
                        multiline={true}
                        onChangeText={(text) => inputContent = text}
                        placeholder={navigatePlaceholder}
                        placeholderTextColor="#cccccc"
                        underlineColorAndroid='transparent'
                    />
                </View>
                <View style={styles.bottomPhoto}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.picText}>
                        图片
                    </Text>
                    {this._renderCamera()}
                </View>
                {this._renderImageList()}
                <PictureOverlay
                    ref={(po) => {
                        this.po = po
                    }}
                    url={this.state.clickImageUri}
                />
                <DialogBox ref={(dialogbox) => {
                    this.dialogbox = dialogbox
                }}/>
                <ModalHud
                    visible={this.state.isShowHud}/>
            </View>
        )
    }
}

// define your styles
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e7e7e7',
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    questionInput: {
        backgroundColor: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        height: 200,
        paddingBottom: 10
    },
    text: {
        fontSize: 14,
        color: '#29a1f7',
    },
    input: {
        textAlignVertical: 'top',
        flex: 1,
        fontSize: 14,
        color: '#333333',
    },
    suggestion: {
        color: '#29a1f7',
        fontSize: 14,
        marginTop: 10
    },
    bottomPhoto: {
        height: 44,
        marginTop: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15
    },
    picText: {
        color: '#333333',
        fontSize: 16
    },
    photoPic: {
        width: 27,
        height: 27
    },
    imgInnerListView: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 6.5,
        marginBottom: 6.5,
        marginLeft: 15
    },
    imageContainer: {
        flexDirection: 'row'
    },
    imgIcon: {
        width: 108,
        height: 108,
        margin: 5
    },
    imgIconCancle: {
        width: 16,
        height: 16,
        marginLeft: -15
    },
});

export default StockConfirmScene;
