/**
 * Created by InforeXuan on 2017/5/12.
 */
import React, {Component} from 'react';
import {View, Text, ScrollView, Keyboard, TouchableOpacity, Image} from 'react-native';
import {resetKeyboard, moveKeyboard} from '../../../../utils/Common'
import styles from '../LoginStyles'
import {ModifyPart} from './ModifyPart'
class ModifyScene extends Component {

    constructor(props: Object) {
        super(props);
        this.state = {
            showNewMima: false,
            showConfirmMima: false,
            inputNewPwd: '',
            inputEnNewPwd: '',
        }
    }

    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow() {
        moveKeyboard(this, 'all', 120)
    }

    _keyboardDidHide() {
        resetKeyboard(this, 'all')
    }

    render() {
        return (
            <ScrollView ref="scrollView" style={{flex: 1, backgroundColor: 'white'}}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => {
                    this.props.navigation.goBack()
                }}>
                    <Image
                        resizeMode='cover'
                        style={styles.leftImg}
                        source={require('../../../../images/common/icon_bar_black_left.png')}
                    />
                </TouchableOpacity>
                <View style={styles.container}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.content}>修改密码</Text>
                    {ModifyPart(this)}
                </View>
            </ScrollView>
        );
    }
}

export default ModifyScene;