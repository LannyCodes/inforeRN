/**
 * Created by coderxuan on 2017/5/6.
 */
import BaseRequest from '../baseRequest'
import Urls from '../../constants/Urls'

class QueryMsgRequest extends BaseRequest {
    requestUrl() {
        return Urls.msg.getInforeMessageList
    }
}

class UpdateMsgStatus extends BaseRequest {
    requestUrl() {
        return Urls.msg.updateMessageStatus;
    }
}

class UpdateMessageStatus2Done extends BaseRequest {
    requestUrl() {
        return Urls.msg.updateMessageStatus2Done;
    }
}

class DeleteMessageRequest extends BaseRequest {
    requestUrl() {
        return Urls.msg.deleteMessageByStatus;
    }
}

/**
 * 查询未读消息总数
 */
class FindNewMessageCntRequest extends BaseRequest {
    requestUrl() {
        return Urls.msg.findNewMessageCnt;
    }
}

export {QueryMsgRequest, UpdateMsgStatus, DeleteMessageRequest, FindNewMessageCntRequest, UpdateMessageStatus2Done};