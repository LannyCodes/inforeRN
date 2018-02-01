/** 
 * Created by Infore.Wlun. 
 */

import BaseRequest from '../baseRequest'
import Urls from '../../constants/Urls'

class GetPaymentListRequest extends BaseRequest {
    requestUrl() {
        return Urls.payment.getPaymentListRequest;
    }
}

class SendRemindMessage extends BaseRequest {
    requestUrl() {
        return Urls.payment.sendRemindMessage;
    }
}

class PaymentDetailRequest extends BaseRequest {
    requestUrl() {
        return Urls.payment.paymentDetail;
    }
}

export { GetPaymentListRequest, SendRemindMessage,PaymentDetailRequest };