/**
 * Created by coderxuan on 2017/5/6.
 */
import React, {Component} from 'react';
import {View, Image, Text, TouchableWithoutFeedback, ScrollView, TouchableOpacity} from 'react-native';
import {Call, Email} from '../../../../utils/LinkingUtils';
import PictureOverlay from "../../../widget/PictureOverlay";
import MultiImage from "../../../widget/MutliImage";
import {GetUserInforeByIdRequest} from '../../../../api/maillist/MailListRequests'
const StyleSheet = require('../../../../base/StyleSheet')

class MailPersonalScene extends Component {

    constructor(props: Object) {
        super(props)
        this.state = {
            clickImageUri: '',
            userInfo: {}
        };
        this.userId = this.props.navigation.state.params.userId;
    }

    componentDidMount() {
        let self = this;
        let params = {userId: this.userId};
        log('获取到的userId', this.userId);
        new GetUserInforeByIdRequest(params).start(function (data) {
            self.setState({
                userInfo: data
            })
        })
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

    _renderText(text) {
        if (isNull(text)) {
            return <View/>
        } else {
            return <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.rightText}>{text}</Text>
        }
    }


    /**
     * render 头像下面的职位信息
     * @returns {XML}
     * @private
     */
    _renderDepartment(department, job) {
        let connection = '-';
        if (isNull(department)) {
            department = '宇星科技';
        }
        if (isNull(job)) {
            job = '职员';
        }
        return (
            <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                  style={styles.job}>{department + connection + job}</Text>
        )
    }


    render() {
        let userInfo = this.state.userInfo;
        return (
            <ScrollView style={styles.container}>
                <View style={styles.frontContainer}>
                    <Image
                        style={styles.frontImage}
                        resizeMode={'cover'}
                        source={require('../../../../images/personal/icon_background.png')}
                    />
                    <View style={styles.frontContent}>
                        <View style={styles.frontHeader}>
                            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                <TouchableWithoutFeedback
                                    onPress={() => this.onImageClick(userInfo.img)}>
                                    <MultiImage
                                        style={styles.header}
                                        uri={userInfo.img}
                                    />
                                </TouchableWithoutFeedback>
                                <View style={styles.cameraContainer}>
                                </View>
                            </View>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                  style={styles.name}>{userInfo.nickName}</Text>
                            {this._renderDepartment(userInfo.organizeName, userInfo.position)}
                        </View>
                    </View>
                </View>
                <View style={styles.downContainer}>
                    <View style={styles.down1}>
                        <View style={styles.downCommonContain}>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                  style={styles.leftText}>手机</Text>
                            <TouchableOpacity onPress={() => Call(userInfo.mobile)}>
                                {this._renderText(userInfo.mobile)}
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.down1}>
                        <View style={styles.downCommonContain}>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                  style={styles.leftText}>Email</Text>
                            <TouchableOpacity onPress={() => Email(userInfo.email)}>
                                {this._renderText(userInfo.email)}
                            </TouchableOpacity>
                        </View>
                        <View style={styles.line}/>
                        <View style={styles.downCommonContain}>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                  style={styles.leftText}>座机</Text>
                            <TouchableOpacity onPress={() => Call(userInfo.tel)}>
                                {this._renderText(userInfo.tel)}
                            </TouchableOpacity>
                        </View>
                        <View style={styles.line}/>
                    </View>
                    <PictureOverlay
                        cache={true}
                        ref={(po) => {
                            this.po = po
                        }}
                        url={this.state.clickImageUri}
                    />
                </View>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.goBack()
                }} style={{
                    position: 'absolute',
                    top: 35,
                    left: 15,
                    padding: 10
                }}>
                    <Image style={styles.back} resizeMode={'contain'}
                           source={require('../../../../images/common/icon_bar_left.png')}/>
                </TouchableOpacity>
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
        borderColor: 'transparent'
    },
    cameraContainer: {
        width: 18,
        height: 18,
        marginLeft: -16,
        backgroundColor: 'transparent',
    },
    camera: {
        width: 11,
        height: 11,
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
    rightText: {
        color: '#262626',
        fontSize: 16,
    },
    rightImage: {
        height: 17,
        width: 17,
    },
    downCommonContain: {
        paddingRight: 17,
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
    },
    back: {
        width: 19,
        height: 16,
    }
});

export default MailPersonalScene;
