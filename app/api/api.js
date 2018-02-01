/**
 * Created by InforeXuan on 2017/5/18.
 */
import {create} from 'apisauce'

const api = (baseUrl, header) => create({
    baseURL: baseUrl,
    timeout: 30000,
    headers: {
        ...header,
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
    }
});

export default api