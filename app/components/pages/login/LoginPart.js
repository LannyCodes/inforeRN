/**
 * Created by coderxuan on 2017/5/15.
 */
import React from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import styles from './LoginStyles'
import CheckBox from '../../widget/CheckBox'
import SubmitBtn from '../../widget/SubmitBtn'
import {checkInput, loginSubmit} from './LoginFunc'
export function LoginPart(self) {
    return (
        <View>
            <View>
                <View style={[{marginTop: 31}, styles.inputContainer]}>
                    <TextInput
                        style={styles.input}
                        value={self.state.inputPhoneAndEmail}
                        onChangeText={(text) => {
                            text = text.replace('.', '');
                            self.setState({inputPhoneAndEmail: text});
                        }}
                        placeholder="用户名/手机号"
                        placeholderTextColor="#d2d2d2"
                        underlineColorAndroid='transparent'
                        // 心好累啊
                        // 审核列表获取的和网页的不一样啊。。
                    />
                    <TouchableOpacity onPress={() => self.setState({inputPhoneAndEmail: ''})}>
                        <Image style={styles.iconWrong} source={require('../../../images/common/icon_wrong.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.line}/>
            </View>

            <View>
                <View style={[{marginTop: 10.5}, styles.inputContainer]}>
                    <TextInput
                        style={styles.input}
                        value={self.state.inputPwd}
                        onChangeText={(text) => {
                            text = text.replace('.', '');
                            self.setState({inputPwd: text});
                        }}
                        placeholder="输入密码"
                        placeholderTextColor="#d2d2d2"
                        underlineColorAndroid='transparent'
                        secureTextEntry={!self.state.showMima}
                    />

                    <CheckBox
                        style={styles.inputEndIcon}
                        checkedImage={require('../../../images/login/icon_eye.png')}
                        unCheckedImage={require('../../../images/login/icon_invalid.png')}
                        onClick={(check) => self.setState({showMima: !check})}
                        isChecked={false}
                    />
                </View>
                <View style={styles.line}/>
            </View>
            <SubmitBtn
                style={styles.submit}
                text={'登录'}
                onPress={() => loginSubmit(self)}
                check={() => checkInput(self)}/>
            <TouchableOpacity onPress={() => self.props.navigation.navigate('LoginVertify')}>
                <Text adjustsFontSizeToFit={false} allowFontScaling={false}style={styles.forgetMima}>忘记密码？</Text>
            </TouchableOpacity>
        </View>
    )
}