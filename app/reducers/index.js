/**
 * Created by InforeXuan on 2017/5/18.
 */
import {combineReducers} from 'redux';
import message from './message'
import questionback from './questionback'
import approval from './approval'
import tmpQBPersons from './tmpQuesBack';
import paymentDetail from './payment'
import notification from './notificaion';
let MainReducer = combineReducers({
    message: message,
    questionBackPersons: questionback,
    approval: approval,
    tmpQBPersons: tmpQBPersons,
    paymentDetail: paymentDetail,
    notification: notification,
});

module.exports = MainReducer;
