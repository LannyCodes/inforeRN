/**
 * Created by coderxuan on 2017/5/6.
 */
import React, {Component} from 'react';
import {
    DeviceEventEmitter,
    View,
    Image,
    Text,
    ScrollView,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native';
import DialogBox from '../../widget/DialogBox'
import {exitLogin} from '../../../utils/Common';
import {CachedImage} from "react-native-img-cache";
import  ImagePicker from 'react-native-image-picker';
import PictureOverlay from "../../widget/PictureOverlay";
import DebugButton from "../../widget/DebugButton";
import ImageCropPicker from 'react-native-image-crop-picker';
import Toast from 'react-native-root-toast'
import {loadStateFromStorage, updateHeader} from './PersonalFunc'
import {UpdateUserHeadImgRequest} from '../../../api/personal/PersonalRequests'
const StyleSheet = require('../../../base/StyleSheet');
class PersonalScene extends Component {

    constructor(props: Object) {
        super(props);
        this.state = {
            userId: '',
            userName: '',
            nickName: '',
            userDepartment: '',
            jobNum: '',
            userEmail: '',
            userHeaderImg: '',
            userJob: '',
            userTelephone: '',
            userDeskPhone: '',
            clickImageUri: '',
        }
    }

    componentWillMount() {
        let self = this;
        loadStateFromStorage(this)
        this._subscription_modifyInfoSuccess = DeviceEventEmitter.addListener('MODIFY_SUCCESS', function (event) {
            loadStateFromStorage(self)
        });
    }

    componentWillUnmount() {
        this._subscription_modifyInfoSuccess.remove();
    }

    onImageClick(url) {
        if (url !== null && url !== '') {
            if (url.startsWith('http')) {
                this.setState({
                    clickImageUri: url
                });
                this.po._showModal();
            }
        }
    }

    _selectPhotoTapped() {
        let self = this;
        const options = {
            title: '请选择',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            allowsEditing: true,
            chooseFromLibraryButtonTitle: '选择相册',
            cameraType: 'back', //前置或后置摄像头            mediaType: 'photo', //'photo', 'video', or 'mixed' on iOS, 'photo' or 'video' on Android            maxWidth: 500,
            quality: 0.75, //0 to 1, photos only            allowsEditing: true, //bool - enables built in iOS functionality to resize the image after selection            noData: false, //If true, disables the base64 data field from being generated (greatly improves performance on large photos)            storageOptions: { // 如果设置，则保存在设置的路径下而不是一个temp目录                skipBackup: true, // 如果true，照片将不会被备份到icloud                path: 'images',
            cameraRoll: true, //如果true，裁剪的照片讲保存到手机中            }
        };
        try {
            ImagePicker.showImagePicker(options, (response) => {
                if (response.didCancel) {
                    log('User cancelled photo picker');
                }
                else if (response.error) {
                    log('ImagePicker Error: ', response.error);
                }
                else if (response.customButton) {
                    log('User tapped custom button: ', response.customButton);
                }
                else {
                    ImageCropPicker.openCropper({
                        path: response.uri,
                        width: 300,
                        height: 300,
                        includeBase64: true
                    }).then(image => {
                        self._uploadImage(image.data);
                    }).catch(e => {
                        console.log('User cancelled photo picker：' + e);
                    });
                }
            });
        } catch (exception) {
            console.log(exception)
        }
    }

    /**
     * 更改头像
     * @private
     */
    _cameraHearder() {
        this._selectPhotoTapped();
    }

    _renderText(text) {
        if (isNull(text)) {
            return <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                         style={[styles.rightText, {color: '#cccccc'}]}>请选择</Text>
        } else {
            return <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.rightText}>{text}</Text>
        }
    }

    /**
     * 调用接口更新头像
     * @param imageBase64 转base64的地址
     * @private
     */
    _uploadImage(imageBase64) {
        let self = this;
        let params = {'userName': this.state.userName, 'image': imageBase64};
        new UpdateUserHeadImgRequest(params).start(function (data) {
            Toast.show('修改成功', {
                durations: Toast.durations.LONG
            });
            self.setState({
                userHeaderImg: data.headerImage
            });
            updateHeader(data.headerImage)
        });
    }


    /**
     * 进入修改密码页面
     * @private
     */
    _modifyPass() {
        this.props.navigation.navigate('LoginModify', {tel: this.state.userTelephone});
    }

    /**
     * 进入修改信息页面
     * @param modeRoute
     * @private
     */
    _modifyInfo(modeRoute, values) {
        this.props.navigation.navigate('ModifyPersonInfo', {userId: this.state.userId, fromTask: modeRoute, values: values});
    }


    /**
     * render 头像下面的职位信息
     * @returns {XML}
     * @private
     */
    _renderDepartment() {
        let connection = '-';
        let department = this.state.userDepartment;
        let job = this.state.userJob;
        if (isNull(department)) {
            department = '宇星科技';
        } else if (isNull(job)) {
            job = '职员';
        }
        return (
            <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                  style={styles.job}>{department + connection + job}</Text>
        )
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.frontContainer}>
                    <Image
                        style={styles.frontImage}
                        resizeMode={'cover'}
                        source={require('../../../images/personal/icon_background.png')}
                    />
                    <View style={styles.frontContent}>
                        <View style={styles.frontHeader}>
                            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                <TouchableWithoutFeedback onPress={() => this.onImageClick(this.state.userHeaderImg)}>
                                    <CachedImage
                                        resizeMode={'cover'}
                                        style={styles.header}
                                        source={isNull(this.state.userHeaderImg) || !this.state.userHeaderImg.startsWith('http') ? require('../../../images/icon_header_default.png') : {uri: this.state.userHeaderImg}}
                                    />
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => this._cameraHearder()}>
                                    <View style={styles.cameraContainer}>
                                        <Image
                                            resizeMode={'contain'}
                                            style={styles.camera}
                                            source={require('../../../images/personal/icon_camera.png')}
                                        />
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                  style={styles.name}>{this.state.nickName}</Text>
                            {this._renderDepartment()}
                        </View>
                    </View>
                </View>
                <View style={styles.downContainer}>
                    <View style={[styles.down1, {backgroundColor: '#ffffff'}]}>
                        <View style={styles.downCommonContain}>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                  style={styles.leftText}>工号</Text>
                            <View style={styles.right}>
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                      style={[styles.rightText, {color: '#878787'}]}>{this.state.jobNum}</Text>
                                <Image
                                    style={styles.rightImage}
                                    resizeMode={'contain'}
                                    source={require('../../../images/common/icon_arrow_right.png')}
                                />
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.downContainer}>
                    <View style={styles.down1}>
                        <View style={styles.downCommonContain}>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                  style={styles.leftText}>手机</Text>
                            <TouchableOpacity onPress={() => this._modifyInfo('tel',this.state.userTelephone)}>
                                <View style={styles.right}>
                                    {this._renderText(this.state.userTelephone)}
                                    <Image
                                        style={styles.rightImage}
                                        resizeMode={'contain'}
                                        source={require('../../../images/common/icon_arrow_right.png')}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.down1}>
                        <View style={styles.downCommonContain}>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                  style={styles.leftText}>Email</Text>
                            <TouchableOpacity onPress={() => this._modifyInfo('email',this.state.userEmail)}>
                                <View style={styles.right}>
                                    {this._renderText(this.state.userEmail)}
                                    <Image
                                        style={styles.rightImage}
                                        resizeMode={'contain'}
                                        source={require('../../../images/common/icon_arrow_right.png')}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.line}/>
                        <View style={styles.downCommonContain}>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                  style={styles.leftText}>座机</Text>
                            <TouchableOpacity onPress={() => this._modifyInfo('desktel',this.state.userDeskPhone)}>
                                <View style={styles.right}>
                                    {this._renderText(this.state.userDeskPhone)}
                                    <Image
                                        style={styles.rightImage}
                                        resizeMode={'contain'}
                                        source={require('../../../images/common/icon_arrow_right.png')}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.line}/>
                        <TouchableOpacity onPress={() => this._modifyPass()}>
                            <View style={styles.downCommonContain}>
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                      style={styles.leftText}>修改密码</Text>

                                <View style={styles.right}>
                                    <Image
                                        style={styles.rightImage}
                                        resizeMode={'contain'}
                                        source={require('../../../images/common/icon_arrow_right.png')}
                                    />
                                </View>

                            </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => exitLogin(this)}>
                        <View style={styles.exitContainer}>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                  style={styles.exitText}>退出登录</Text>
                        </View>
                    </TouchableOpacity>
                    <DebugButton navigation={this.props.navigation}/>
                </View>
                <DialogBox ref={(dialogbox) => {
                    this.dialogbox = dialogbox
                }}/>
                <PictureOverlay
                    cache={true}
                    ref={(po) => {
                        this.po = po
                    }}
                    url={this.state.clickImageUri}
                />
            </ScrollView>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    frontContainer: {
        height: 218,
        flexDirection: 'column',
    },
    frontImage: {
        height: 218,
    },
    frontContent: {
        marginTop: -218,
        backgroundColor: 'transparent'
    },
    frontHeader: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 75.5,
    },
    header: {
        width: 67,
        height: 67,
        borderRadius: 33.5,
        borderWidth: 1,
        borderColor: 'transparent',
        marginLeft: 15,
    },
    cameraContainer: {
        width: 18,
        height: 18,
        marginLeft: -30,
        padding: 25,
        marginTop: -25,
        backgroundColor: 'transparent',

    },
    camera: {
        width: 13,
        height: 13,
        alignSelf: 'center'
    },
    name: {
        marginTop: 15,
        color: 'white',
        fontSize: 16
    },
    job: {
        marginTop: 5,
        color: 'white',
        fontSize: 12
    },
    line: {
        height: 1,
        backgroundColor: '#e7e7e7',
        marginLeft: 10
    },
    downContainer: {
        flex: 1,
        backgroundColor: '#efefef'
    },
    down1: {
        backgroundColor: 'white',
        marginTop: 10
    },
    leftText: {
        color: '#878787',
        fontSize: 16,
        marginLeft: 10
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10
    },
    rightText: {
        color: '#262626',
        fontSize: 16,
        marginRight: 10
    },
    rightImage: {
        height: 17,
        width: 17,
    },
    downCommonContain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 44,
    },
    exitContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 44,
        backgroundColor: 'white',
        marginTop: 10
    },
    exitText: {
        fontSize: 16,
        color: '#ef5653'
    }
});

export default PersonalScene;
