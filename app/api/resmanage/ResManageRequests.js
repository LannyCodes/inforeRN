/**
 * Created by coderxuan on 2017/5/6.
 */
import BaseRequest from '../baseRequest'
import Urls from '../../constants/Urls'

class ResManageRequest extends BaseRequest {
    requestUrl() {
        return Urls.resManage.getInforeResInfo
    }
}

export {ResManageRequest};