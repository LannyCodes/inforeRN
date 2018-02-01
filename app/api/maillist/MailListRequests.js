/**
 * Created by InforeXuan on 2017/5/31.
 */
import BaseRequest from '../baseRequest'
import Urls from '../../constants/Urls'
/**
 * 获取通讯录列表
 */
class GetInforeMailListRequest extends BaseRequest {
    requestUrl() {
        return Urls.mailList.getInforeMailList
    }
}
/**
 * 获取通讯录搜索列表
 */
class GetUserModelByNickNameRequest extends BaseRequest {
    requestUrl() {
        return Urls.mailList.getUserModelByNickName
    }
}

/**
 * getUserById
 */
class GetUserInforeByIdRequest extends BaseRequest {
    requestUrl() {
        return Urls.mailList.getUserInforById
    }
}
/**
 * 获取问题确认人列表
 */
class GetProblemUserListRequest extends BaseRequest {
    requestUrl() {
        return Urls.mailList.getProblemUserList
    }
}
/**
 * 搜索问题确认人列表
 */
class GetProblemUserByNickNameRequest extends BaseRequest {
    requestUrl() {
        return Urls.mailList.getProblemUserByNickName
    }
}
export {
    GetInforeMailListRequest,
    GetUserModelByNickNameRequest,
    GetUserInforeByIdRequest,
    GetProblemUserListRequest,
    GetProblemUserByNickNameRequest
}