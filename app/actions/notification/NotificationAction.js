/** 
 * Created by Infore.Wlun. 
 */

import  ActionType from '../../constants/ActionType';

export function notificationReceived (noti){
    return {
        types:ActionType.NOTIFICATION_RECIEVE,
        type: ActionType.NOTIFICATION_RECIEVE,
        data: noti,
    }
}