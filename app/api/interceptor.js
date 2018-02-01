/**
 * Created by coderxuan on 2017/6/27.
 */
import {resetNavigation} from '../utils/Common'
import {USER_KEY} from '../constants/ContextConst'
import Toast from 'react-native-root-toast'
import {removeListener} from '../utils/JPushFuc'
import JPushModule from 'jpush-react-native';
/**
 * token拦截器
 * 422 - token失效
 */
const TOKEN_ERROR = '422';
export function interceptor(code) {
    if (code === TOKEN_ERROR) {
        Toast.show('登录超时，请重新登录。', {
            duration: Toast.durations.LONG,
            position: -100
        });
        removeListener();
        //向极光推送注销用户别名Alias
        JPushModule.setAlias('', (success) => {
            log('注销别名成功');
            log(success);
        }, (error) => {
            log('注销别名失败');
            log(error);
        });
        storage.remove({
            key: USER_KEY.USERSTAGE_KEY,
        });
        global._USERNAME_ = '';
        global._NICKNAME_ = '';
        global._USERID_ = '';
        global._USERTOKEN_ = '';
        global._SHOW_SAFE_ = false;
        global._SHOW_PROCUREMENT_ = false; //采购的权限控制
        global._SHOW_PROBUGETDATA_ = false;
        try {
            resetNavigation(_CONTEXT_, 'Login');
        } catch (e) {
            return true;
        }
        return true;
    } else {
        return false;
    }
}