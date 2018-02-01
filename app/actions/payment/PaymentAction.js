/** 
 * Created by Infore.Wlun. 
 */

import ActionType from '../../constants/ActionType'
import { PaymentDetailRequest } from '../../api/payment/PaymentRequests'

export function paymentPlanClick(index) {
    return {
        types:ActionType.PAYMENTDETAIL_SELECT,
        type:ActionType.PAYMENTDETAIL_SELECT,
        data:index,
    }
}

export function clearPaymentDetail(){
    return {
        type:ActionType.PAYMENTDETAIL_CLEAR,
        types:ActionType.PAYMENTDETAIL_CLEAR,
    }
}

export function fetchPaymentDetail(params) {
    return (dispatch) => {
        dispatch({
            types:ActionType.PAYMENTDETAIL_FETCH_START,
            type:ActionType.PAYMENTDETAIL_FETCH_START
        })
        new PaymentDetailRequest(params).start((data) => {
            return dispatch({
                types:ActionType.PAYMENTDETAIL_FETCH_END,
                type:ActionType.PAYMENTDETAIL_FETCH_END,
                data:data,
            });
        },(error)=>{
            dispatch({
                types:ActionType.PAYMENTDETAIL_FETCH_ERROR,
                type:ActionType.PAYMENTDETAIL_FETCH_ERROR,
            })
        })
    }
}