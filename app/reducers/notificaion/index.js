/** 
 * Created by Infore.Wlun. 
 */

import ActionType from '../../constants/ActionType';
import { combineReducers } from 'redux';

function notificationOperation (state,action){
    state = state || {
        notiData:null,
    }

    switch(action.types){
        case ActionType.NOTIFICATION_RECIEVE:
            return {
                ...state,
                notiData:action.data,
            }
        default:
            return {...state};
    }
}

let notification = notificationOperation;

export default notification;
