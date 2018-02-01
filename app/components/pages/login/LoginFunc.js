/**
 * Created by coderxuan on 2017/5/15.
 */
import {LoginRequest, VertifyOTPRequest, ModifyPwdRequest} from '../../../api/login/LoginRequests'
import {USER_KEY} from '../../../constants/ContextConst'
import {DeviceEventEmitter} from 'react-native'
import {isTel, resetNavigation, globalUser} from '../../../utils/Common'
import Toast from 'react-native-root-toast'
import JPushModule from 'jpush-react-native';
export function checkOtp(self) {
    if (isTel(self.state.inputPhoneNum)) {
        return true
    } else {
        Toast.show('请输入正确手机号！')
    }
}

export function checkInput(self) {
    if (self.state.inputPwd !== '' && self.state.inputPhoneAndEmail !== '') {
        return true
    } else {
        return false
    }
}

export function checkPhoneAndOtp(self) {
    if (self.state.inputPhoneNum !== '' && self.state.inputVertify !== '') {
        return true
    } else {
        return false
    }
}

export function checkPwdModify(self) {
    if (self.state.inputNewPwd !== '' && self.state.inputEnNewPwd !== '' && self.state.inputNewPwd === self.state.inputEnNewPwd) {
        return true
    } else {
        return false
    }
}

export function submitOtp(self) {
    if (isTel(self.state.inputPhoneNum)) {
        let params = {'telephone': self.state.inputPhoneNum, 'otp': self.state.inputVertify};
        new VertifyOTPRequest(params).start(function (data) {
            self.props.navigation.navigate('LoginModify', {tel: self.state.inputPhoneNum});
        })
    } else {
        Toast.show('请输入正确手机号！')
    }
}


/**
 * 登陆接口调用
 * @param self
 */
export async function loginSubmit(self) {
    let username = self.state.inputPhoneAndEmail;
    let password = self.state.inputPwd;
    let params = {'username': username, 'password': password};
    new LoginRequest(params).start(function (data) {
        //向极光推送注册用户别名Alias
        JPushModule.setAlias(data.userModel.userName, (success) => {
            log('注册别名成功');
            log(success);
        }, (error) => {
            log('注册别名失败');
            log(error);
        });
        //获取到用户信息并将用户信息保存到storage
        storage.save({
            key: USER_KEY.USERSTAGE_KEY,
            data: {
                userName: data.userModel.userName, //用户名
                nickName: data.userModel.nickName, //昵称
                userToken: data.token, //token
                userId: data.userModel.userId, //userId
                showSecurity: data.showSecurity, //安全的权限控制
                showProcurement: data.showProcurement, //采购的权限控制
                showProbugetData: data.showProbugetData,
            }
        });
        storage.save({
            key: USER_KEY.USER_POSITION_KEY,
            data: {
                userDepartment: data.userModel.organizeName, //部门
                userJob: data.userModel.position, //职位
                organizeId: data.userModel.organizeId,
                jobNum: data.userModel.jobNum,//工号
            }
        });
        storage.save({
            key: USER_KEY.USER_CANMODIFY_INFO_KEY.EMAIL,
            data: {
                userEmail: data.userModel.email, //邮箱
            }
        });
        storage.save({
            key: USER_KEY.USER_CANMODIFY_INFO_KEY.HEADER,
            data: {
                userHeaderImg: data.userModel.img, //头像
            }
        });

        storage.save({
            key: USER_KEY.USER_CANMODIFY_INFO_KEY.TEL,
            data: {
                userTelephone: data.userModel.mobile, //手机号
            }
        });

        storage.save({
            key: USER_KEY.USER_CANMODIFY_INFO_KEY.DESKPHONE,
            data: {
                userDeskPhone: data.userModel.tel,//座机号
            }
        });
        let users = {
            userName:data.userModel.userName,
            userId:data.userModel.userId,
            userToken: data.token,
            ...data,
        }
        globalUser(users);
        // global._SHOW_SAFE_ = data.showSecurity;
        // global._SHOW_PROCUREMENT_ = data.showProcurement //采购的权限控制
        // global._SHOW_PROBUGETDATA_ = data.showProbugetData
        DeviceEventEmitter.emit('LOGIN_SUCCESS');
        resetNavigation(self.props.navigation, 'TabHome');
    })
}

/**
 * 测试芳法
 * @param self
 */
export function modifyFinish(self) {
    let params = {newPwd: self.state.inputEnNewPwd, telephone: self.props.navigation.state.params.tel};
    new ModifyPwdRequest(params).start(function (data) {
        Toast.show('修改成功！');
        resetNavigation(self.props.navigation, 'Login');
    });
}