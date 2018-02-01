/**
 * Created by coderxuan on 2017/5/6.
 */
import BaseRequest from '../baseRequest'
import Urls from '../../constants/Urls'

/**
 * 登录接口
 */
class LoginRequest extends BaseRequest {
    requestUrl() {
        return Urls.login.userLogin
    }
}

/**
 * 获取验证码
 */
class GetValidateCodeRequest extends BaseRequest {
    requestUrl() {
        return Urls.login.getValidateCode
    }
}
/**
 * 验证OTP
 */
class VertifyOTPRequest extends BaseRequest {
    requestUrl() {
        return Urls.login.verifyOtp
    }
}

/**
 * 修改密码
 */
class ModifyPwdRequest extends BaseRequest {
    requestUrl() {
        return Urls.login.modifyPwd
    }
}


export {LoginRequest, GetValidateCodeRequest, VertifyOTPRequest, ModifyPwdRequest};