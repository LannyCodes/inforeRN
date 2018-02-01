/**
 * Created by coderxuan on 2017/5/6.
 */
import DeviceInfo from 'react-native-device-info'

export const USER_KEY = {
    USERSTAGE_KEY: 'INFROREUSERSTATEKEY',
    USER_POSITION_KEY: 'INFOREUSERDEPARTMENTJOBKEY', //部门职位
    USER_CANMODIFY_INFO_KEY: {
        EMAIL: 'INFOREUSEREMAIL',
        TEL: 'INFOREUSERTEL',
        DESKPHONE: 'INFOREUSERDESKPHONE',
        HEADER: 'INFOREUSERHEADER',
    }
};

export const SPLASH_TIME = 1000;//Splash页面展示时间

let AppConst = {
    deviceID: DeviceInfo.getUniqueID(),
};

if (__DEV__) {
    Object.assign(AppConst, {
        // WebServerUrl: "http://192.168.31.170:8080", //测试服务器地址
        // WebServerUrl: "http://192.168.31.151:8009",  //开发服务器地址
        WebServerUrl: "https://epms.infore.com",  //阿里云地址
        // WebServerUrl: "http://192.168.39.213:10086",  //本地Mock
    })
} else {
    Object.assign(AppConst, {
        // WebServerUrl: "http://192.168.31.170:8080", //测试服务器地址
        // WebServerUrl: "https://epms.infore.com",  //阿里云地址
        WebServerUrl: "http://192.168.31.151:8009",  //开发服务器地址
        // WebServerUrl: "http://119.23.209.49:9080",  //测试服务器地址
    });
}

export default AppConst;