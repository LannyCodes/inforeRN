/**
 * Created by coderxuan on 2017/5/8.
 */
import {log, isNull} from './global.function.def'
import {Platform, AsyncStorage} from 'react-native';
import Storage from 'react-native-storage';

export function init() {
    return new Promise(function (resolve, reject) {
        // console.ignoredYellowBox = ['Warning: Failed prop type: Invalid prop `children` '];
        // console.ignoredYellowBox = true; //关闭debug时候的黄色警告->true
        console.disableYellowBox = true
        let s = new Storage({
            // 最大容量，默认值1000条数据循环存储
            size: 1000,
            // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
            // 如果不指定则数据只会保存在内存中，重启后即丢失
            storageBackend: AsyncStorage,
            // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
            defaultExpires: null,
            // 读写时在内存中缓存数据。默认启用。
            enableCache: true,
        });
        (function (storage) {
            // 封装log
            global._USERID_ = ''; //初始化global userId
            global._USERTOKEN_ = ''; //初始化global token
            global._SHOW_SAFE_ = false; //安全的权限控制初始化
            global._SHOW_PROCUREMENT_ = false; //采购的权限控制初始化
            // global._SHOW_PROBUGETDATA_ = false;
            global.log = log;
            global.isNull = isNull;
            // 系统是iOS
            global._IOS_ = (Platform.OS === 'ios');
            // 系统是安卓
            global._Android_ = (Platform.OS === 'android');
            global.storage = storage;
            //Loading转圈展示时间
            global._loading_ = 300;
            global._PAGESIZE_ = 10;
        })(s)
        resolve(global);
    });
}

