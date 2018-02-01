/**
 * Created by coderxuan on 2017/6/9.
 */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, NativeAppEventEmitter, Picker, Dimensions, TextInput} from 'react-native';
import TitleBar from '../../widget/TitleBar'
import DeviceInfo from 'react-native-device-info'
import AppConst from '../../../constants/ContextConst'
import AMapLocation from 'react-native-smart-amap-location'

const StyleSheet = require('../../../base/StyleSheet');
let {width} = Dimensions.get('window');
let fir = 'https://fir.im/infore';
let urls = {
    testServerUrl: 'http://192.168.31.170:8080',
    devServerUrl: 'http://192.168.31.151:8009',
    aliyunSeverUrl: 'http://120.77.180.216',
    epms: 'http://epms.infore.com'
};
let inputWebUrl = '';

class DebugScene extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tmpWebUrl: AppConst.WebServerUrl,
            webServerUrl: AppConst.WebServerUrl,
            showPicker: false,
            location: ''
        }
    }

    componentDidMount() {
        AMapLocation.init(null) //使用默认定位配置
        NativeAppEventEmitter.addListener('amap.location.onLocationResult', this._onLocationResult)
    }

    componentWillUnmount() {
        //停止并销毁定位服务
        AMapLocation.cleanUp()
    }

    _updateAppConstWebUrlConfig() {
        Object.assign(AppConst, __DEV__ ? {
            WebServerUrl: this.state.tmpWebUrl,
        } : {WebServerUrl: this.state.tmpWebUrl,});
    }

    _changeWebUrlConfig(webUrl) {
        Object.assign(AppConst, __DEV__ ? {
            WebServerUrl: 'http://' + webUrl,
        } : {WebServerUrl: 'http://' + webUrl});
        this.setState({
            webServerUrl: AppConst.WebServerUrl
        })
    }

    _showReGeocode() {
        AMapLocation.getReGeocode()
    }

    _onLocationResult = (result) => {
        console.log(result)
        this.setState({
            location: result.formattedAddress
        })
    }

    render() {
        let brand = DeviceInfo.getBrand() + DeviceInfo.getSystemName() + ' ' + DeviceInfo.getSystemVersion() + ' ' + DeviceInfo.getUserAgent();
        let bundleId = DeviceInfo.getBundleId();
        let uniqueID = DeviceInfo.getUniqueID();
        let AppVersion = DeviceInfo.getVersion();
        let PickerItem = Picker.Item;
        return (
            <View style={styles.container}>
                <TitleBar navigation={this.props.navigation}
                          title='测试配置'
                          leftImage={require('../../../images/common/icon_bar_left.png')}
                          onLeftPress={() => this.props.navigation.goBack()}/>
                <View style={styles.telInfo}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={styles.telInfoText}>手机信息：{brand}</Text>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={styles.telInfoText}>项目包名：{bundleId}</Text>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={styles.telInfoText}>手机唯一标识：{uniqueID}</Text>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={styles.telInfoText}>APP版本：{AppVersion}</Text>
                    <TouchableOpacity
                        onPress={() => this.setState({showPicker: true})}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                              style={styles.telInfoText}>当前服务器：{this.state.webServerUrl}</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}
                >
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => inputWebUrl = text}
                        placeholder="这里手动输入ip然后点击确定啊"
                        autoFocus={true}
                        placeholderTextColor="#d2d2d2"
                    />
                    <TouchableOpacity onPress={() => {
                        this._changeWebUrlConfig(inputWebUrl);
                    }}>
                        <View style={{backgroundColor: '#508dff', padding: 10, borderRadius: 4, marginRight: 15}}>
                            <Text style={{color: 'white', fontSize: 16}}>确定</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View
                    style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}
                >
                    <TouchableOpacity onPress={this._showReGeocode}>
                        <View style={{backgroundColor: '#508dff', padding: 10, borderRadius: 4, marginRight: 15}}>
                            <Text style={{color: 'white', fontSize: 16}}>点击查看定位信息</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={{color: 'black'}}>{this.state.location}</Text>
                </View>
                {this.state.showPicker ?
                    <View style={styles.picker_container}>
                        <Picker
                            selectedValue={this.state.tmpWebUrl}
                            onValueChange={
                                (url) => {
                                    this.setState({tmpWebUrl: url});
                                }
                            }>
                            <PickerItem label="开发服务器151" value={urls.devServerUrl}/>
                            <PickerItem label="测试服务器170" value={urls.testServerUrl}/>
                            <PickerItem label="测试阿里云服务器" value={urls.aliyunSeverUrl}/>
                        </Picker>
                        <View style={styles.picker_ac}>
                            <TouchableOpacity
                                style={styles.picker_confirm}
                                onPress={() => {
                                    this.setState({
                                        webServerUrl: this.state.tmpWebUrl,
                                        showPicker: false,
                                    });
                                    this._updateAppConstWebUrlConfig()
                                }}>
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                      style={styles.picker_confirm_text}>确定</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.picker_confirm}
                                onPress={() => {
                                    this.setState({
                                        showPicker: false
                                    })
                                }}>
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                      style={styles.picker_confirm_text}>取消</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    : <View/>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    telInfo: {
        margin: 10,
    },
    telInfoText: {
        color: '#333333',
        fontSize: 13,
        letterSpacing: 0.5,
        marginTop: 3,
        borderColor: '#508dff',
        borderWidth: 2,
        padding: 3,
        borderRadius: 3,
    },
    input: {
        textAlign: 'left',
        margin: 10,
        height: 60,
        fontSize: 16,
        color: '#333333'
    },
    debugContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 44,
        backgroundColor: '#ef5653',
        marginTop: 10,
    },
    debugText: {
        fontSize: 16,
        color: 'white'
    },
    ewm: {
        width: 200,
        height: 200
    },
    smText: {
        fontSize: 15,
        color: '#508dff'
    },
    picker_container: {
        position: 'absolute',
        flex: 1,
        // flexDirection: 'column-reverse',
        width: width,
        backgroundColor: 'rgb(39,196,254)',
    },
    picker_ac: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    picker_confirm: {
        alignItems: 'center'
    },
    picker_confirm_text: {
        fontSize: 20,
        color: 'white',
        marginTop: 5
    },
    input: {
        marginLeft: 7,
        padding: 0,
        alignItems: 'flex-end',
        marginTop: 20,
        marginBottom: 20,
        width: '70%',
        height: 30,
        fontSize: 16,
    }
});

export default DebugScene;