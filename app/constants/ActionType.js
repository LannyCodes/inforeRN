/**
 * Created by InforeXuan on 2017/5/18.
 */
import 'core-js'

//将action分组
const MessageFetchActionType = {
    MESSAGE_FETCH_START: Symbol(),
    MESSAGE_FETCH_END: Symbol(),
    MESSAGE_FETCH_ERROR: Symbol(),
    MESSAGE_READED: Symbol(),
    REFRESH_END: Symbol(),
}

const PaymentDetailActionType = {
    PAYMENTDETAIL_FETCH_START: Symbol(),
    PAYMENTDETAIL_FETCH_END: Symbol(),
    PAYMENTDETAIL_FETCH_ERROR: Symbol(),
    PAYMENTDETAIL_SELECT: Symbol(),
    PAYMENTDETAIL_CLEAR: Symbol(),
}

const MessageCountActionType={
    INCREMENT_MESSAGECOUNT: Symbol(),
    REDUCE_MESSAGECOUNT: Symbol(),
    CLEAR_MESSAGECOUNT: Symbol(),
    SAVE_MESSAGECOUNT: Symbol(),
}

const ProcessActionType={
    PROCESSID: Symbol(),
    SUB_PROCESSID: Symbol(),
    PROJECT_PROCESSID: Symbol(),
}

const NotificationActionType={
    NOTIFICATION_RECIEVE: Symbol(),
}

const QuesBackActionType={
    SAVE_QUESBACK_PERSONS: Symbol(),
    SAVE_QUESBACK_REFRESH: Symbol(),
}

const TmpQuesBackActionType={
    SAVE_TMPQUESBACK_PERSONS: Symbol(),
    SAVE_TMPQUESBACK_REFRESH: Symbol(),
    ADD_TMPQUESBACK_PERSON: Symbol(),
    DELETE_TMPQUESBACK_PERSON: Symbol(),
}

const AppRovalActionType={
    APPROVAL_RECORD: Symbol(),
}

//这个一定要放到最后
const ActionType = {
    ...AppRovalActionType,
    ...QuesBackActionType,
    ...TmpQuesBackActionType,
    ...NotificationActionType,
    ...ProcessActionType,
    ...MessageCountActionType,
    ...MessageFetchActionType,
    ...PaymentDetailActionType,
};

export default ActionType;