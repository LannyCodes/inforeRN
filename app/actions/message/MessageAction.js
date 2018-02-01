/**
 * Created by Infore.Wlun.
 */

import ActionType from '../../constants/ActionType';
import {QueryMsgRequest, FindNewMessageCntRequest} from '../../api/message/QueryMsgRequest'

export function fetchMessages(params, isRefresh) {
    return (dispatch) => {
        isRefresh && new FindNewMessageCntRequest(params).start(function (data) {
            let messageCount = data.newMessageCnt;
            if (isNull(messageCount)) {
                messageCount = 0;
            }
            dispatch({
                type: ActionType.SAVE_MESSAGECOUNT,
                messageCount: messageCount,
            })
        });
        dispatch({
            type: ActionType.MESSAGE_FETCH_START
        });
        new QueryMsgRequest(params).start(function (data) {
            log(data)
            dispatch({
                type: ActionType.MESSAGE_FETCH_END,
                data: data.list,
                isRefresh: isRefresh,
            });
            setTimeout(() => {
                dispatch({
                    type: ActionType.REFRESH_END,
                })
            }, _loading_)
        }, function (error) {
            log(error);
            dispatch({
                type: ActionType.MESSAGE_FETCH_ERROR,
            })
            setTimeout(() => {
                dispatch({
                    type: ActionType.REFRESH_END,
                })
            }, _loading_)
        });
    }
}

export function messageReaded(index) {
    return (dispatch) => {
        dispatch({
            type: ActionType.MESSAGE_READED,
            index: index,
        });
        dispatch({
            type: ActionType.REDUCE_MESSAGECOUNT,
        })
    }
}

