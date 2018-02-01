/**
 * Created by coderxuan on 2017/5/6.
 */
import AppConst from '../constants/ContextConst';
import api from './api'
import Toast from 'react-native-root-toast'
import {interceptor} from './interceptor'
class BaseRequest {
    constructor(body) {
        if (!body) {
            body = {};
        }
        let userId;
        if (!body.hasOwnProperty('userId')) {
            if (_USERID_) {
                userId = _USERID_;
                Object.assign(body, {
                    userId: userId,
                })
            }
        }
        Object.assign(body, {
            // body里添加请求参数（默认每条消息服务器提供的）
            deviceID: AppConst.deviceID,
            token: _USERTOKEN_ ? _USERTOKEN_ : ''
        });
        this.body = body;
    }

    requestUrl() {
        throw {message: 'function requestUrl must be override'};
    }

    /**
     * request start
     * @param successCallback 成功回调
     * @param failCallBack 失败回调
     * @param handleError 错误处理，如果这里进行了handle，failCallBack则不处理
     * @returns {Promise.<void>}
     */
    async start(successCallback, failCallBack, handleError) {
        let self = this;
        let url = this.requestUrl();
        let body = this.body;
        let formData = new FormData();
        for (let prop in body) {
            if (Array.isArray(body[prop])) {
                for (let value of body[prop]) {
                    formData.append(prop, value);
                }
            } else {
                formData.append(prop, body[prop]);
            }
        }
        let headers;
        if (_USERTOKEN_) {
            headers = {'Access-Token': _USERTOKEN_};
        } else {
            headers = {}
        }
        api(AppConst.WebServerUrl, headers).post(url, formData)
            .then((response) => {
                log(response);
                const {status} = response;
                if (response.ok) {
                    if (response.status) {
                        if (status === 200) {
                            if (response.data.code === '0' || response.data.code === 0) {
                                self.handleResponse(response.data, successCallback);
                            } else {
                                failCallBack && failCallBack(response.data.message);
                                if (response.data.message) {
                                    Toast.show(response.data.message, {
                                        duration: Toast.durations.LONG,
                                        position: -100
                                    });
                                }
                            }
                        } else if ('NETWORK_ERROR' === response.problem) {
                            this._handleFail(failCallBack, response, handleError)
                        }
                    } else {
                        this._handleFail(failCallBack, response, handleError)
                    }
                } else {
                    // log('response.data.code:' + response.data.code);
                    if (response.data && response.data.code) {
                        if (!interceptor(response.data.code)) {
                            this._handleFail(failCallBack, response, handleError);
                        }
                    } else {
                        this._handleFail(failCallBack, response, handleError);
                    }
                }
            })
    }

    handleResponse(responseJson, successCallback) {
        if (!responseJson) {
            return;
        }
        if (responseJson.code === '0' || responseJson.code === 0) {
            successCallback(responseJson.body);
        }
    }

    _handleFail(failCallBack, response, handleError) {
        if (handleError) {
            handleError(response.problem);
            return;
        }
        Toast.show('获取数据失败', {
            duration: Toast.durations.LONG,
            position: -100
        });
        failCallBack && failCallBack(response.problem);
    }
}

export default BaseRequest;
