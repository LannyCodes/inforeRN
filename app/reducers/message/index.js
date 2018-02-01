/**
 * Created by InforeXuan on 2017/5/18.
 */
import  ActionType from '../../constants/ActionType';
import {combineReducers} from 'redux';
import JPushModule from 'jpush-react-native';

let count = 0;
function changeMessageCount(state = count, action) {
    switch (action.type) {
        case ActionType.INCREMENT_MESSAGECOUNT:
            if (count < 99) {
                ++count;
                if(_IOS_){
                    JPushModule.setBadge(count,()=>{})
                }
                return count;
            }
        case ActionType.REDUCE_MESSAGECOUNT:
            if (count > 0) {
                --count;
                if(_IOS_){
                    JPushModule.setBadge(count,()=>{})
                }
                return count;
            }
        case ActionType.CLEAR_MESSAGECOUNT:
            count = 0;
            if(_IOS_){
                JPushModule.setBadge(count,()=>{})
            }
            return count;
        default:
            return count;
    }
}

function saveMessageCount(state = count, action) {
    if (action.type === ActionType.SAVE_MESSAGECOUNT) {
        count = action.messageCount;
        if(_IOS_){
            if(count > 99){
                count = 99;
            }
            JPushModule.setBadge(count,()=>{})
        }
    }
    return count
}

function messageData(state, action) {
    let isRefresh = action.isRefresh;
    if (isRefresh) {
        state = {
            isFetching: false,
            messageList: [],
        }
    } else {
        state = state || {
                isFetching: false,
                messageList: [],
            }
    }
    switch (action.type) {
        case ActionType.MESSAGE_FETCH_END:
            let concatMes = state.messageList;
            return {
                ...state,
                messageList: concatMes.concat(action.data),
            }
        case ActionType.MESSAGE_FETCH_START:
            return {
                ...state,
                isFetching: true,
            }
        case ActionType.MESSAGE_FETCH_ERROR:
            return {
                ...state,
            }
        case ActionType.MESSAGE_READED:
            if (action.index >= state.messageList) {
                return {
                    ...state,
                }
            }
            let messageList = state.messageList.slice(0);
            let messageItem = messageList[action.index]
            messageItem.messageStatus = 1;
            return {
                ...state,
                messageList: messageList,
            }
        case ActionType.REFRESH_END:
            return {
                ...state,
                isFetching:false,
            }
        default:
            return {
                ...state
            }
    }
}

let message = combineReducers({
    changeMsgCount: changeMessageCount,
    saveMsgCount: saveMessageCount,
    messageData: messageData,
});

export default message;