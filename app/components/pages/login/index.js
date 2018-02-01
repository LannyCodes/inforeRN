/**
 * Created by InforeXuan on 2017/5/12.
 */
import React, {Component} from 'react';
import {ScrollView, View, Text, Keyboard, StatusBar} from 'react-native';
import {LoginPart} from './LoginPart'
import styles from './LoginStyles'
import DebugButton from '../../../components/widget/DebugButton'
import {resetKeyboard, moveKeyboard} from '../../../utils/Common'
class LoginScene extends Component {

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

    constructor(props: Object) {
        super(props)
        this.state = {
            showMima: false,
            inputPhoneAndEmail: '',
            inputPwd: ''
        }
    }

    render() {
        return (
            <ScrollView ref="scrollView" style={{flex: 1, backgroundColor: 'white'}}>
                <StatusBar
                    translucent={true}
                    backgroundColor="transparent"
                    barStyle="default"/>
                <View style={styles.container}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}style={styles.content}>盈峰项目管理系统</Text>
                    {LoginPart(this)}
                    <DebugButton navigation={this.props.navigation}/>
                </View>
            </ScrollView>
        );
    }
}

export default LoginScene;