/** 
 * Created by Infore.Wlun. 
 */

import ActionType from '../../constants/ActionType';
import { combineReducers } from 'redux';

function paymentDetailOperation(state, action) {
    state = state || {
        isFetching: false,
        listData: [],
        selectItem: null,
    }
    switch (action.types) {
        case ActionType.PAYMENTDETAIL_FETCH_START:
            return {
                ...state,
                isFetching: true,
            }
        case ActionType.PAYMENTDETAIL_FETCH_END:
            return {
                ...state,
                listData: action.data,
                isFetching: false,
            }
        case ActionType.PAYMENTDETAIL_FETCH_ERROR:
            return {
                ...state,
                isFetching: false,
            }
        case ActionType.PAYMENTDETAIL_CLEAR:
            return {
                ...state,
                listData: [],
                selectItem: null,
            }
        case ActionType.PAYMENTDETAIL_SELECT:
            let selectElement = null;
            let listData = state.listData.map((element, index) => {
                if (index !== action.data) {
                    element.isSelected = false;
                } else {
                    if (element.isSelected === true) {
                        element.isSelected = false
                    } else {
                        element.isSelected = true;
                        selectElement = element;
                    }
                }
                return element
            })
            return {
                ...state,
                listData: listData,
                selectItem: selectElement,
            }
        default:
            return {
                ...state,
            }
    }
}

let paymentDetail = combineReducers({
    paymentDetail: paymentDetailOperation,
})

export default paymentDetail

