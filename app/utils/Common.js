/**
 * Created by coderxuan on 2017/5/26.
 */
import {NavigationActions} from 'react-navigation'
import {USER_KEY} from '../constants/ContextConst'
import {removeListener} from '../utils/JPushFuc'
import JPushModule from 'jpush-react-native';

/**
 * 退出登录
 * 清空登录状态（token、保存的用户数据）, 清空路由状态，进入登录页面
 */
export function exitLogin(self) {
    self.dialogbox.confirm({
        content: ['是否确认退出登录？'],
        ok: {
            text: '是',
            color: '#29a1f7',
            callback: () => {
                removeListener();
                //iOS 清空Badge
                if (_IOS_) {
                    JPushModule.setBadge(0, () => {
                    });
                }
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
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: 'Login'})
                    ]
                });
                self.props.navigation.dispatch(resetAction);
            },
        },
        cancel: {
            color: '#cccccc',
            text: '否',
        },
    })
}

/**
 * 重置ScrollView，用于TextInput弹出键盘遮挡表单
 * @param platform
 */
export function resetKeyboard(self, platform: string) {
    if (platform === 'all' || platform === 'ios') {
        self.refs.scrollView.scrollTo({y: 0, animated: true});
    }
}

/**
 * 上移动页面，用于TextInput弹出键盘遮挡表单
 * @param platform
 * @param distance
 */
export function moveKeyboard(self, platform: string, distance: number) {
    if (platform === 'all' || platform === 'ios') {
        self.refs.scrollView.scrollTo({y: distance, animated: true});
    }
}

/**
 * 设置用户信息全局变量
 * @param self
 */
export function globalUser(data) {
    global._NICKNAME_ = data.nickName;
    global._USERNAME_ = data.userName;
    global._USERID_ = data.userId;
    global._USERTOKEN_ = data.userToken;
    global._SHOW_SAFE_ = data.showSecurity;
    global._SHOW_PROCUREMENT_ = data.showProcurement //采购的权限控制
    global._SHOW_PROBUGETDATA_ = data.showProbugetData
}

/**
 * 清除Navigation栈
 * @param navigation
 */
export function resetNavigation(navigation, route) {
    const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({routeName: route})
        ]
    });
    (function (options) {
        navigation.dispatch(options)
    }(resetAction))
}


/**
 * 手机号校验
 * @param obj
 * @returns {boolean}
 */
export function isTel(obj) {
    let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))\d{8})$/;
    return reg.test(obj);
}


/**
 * 座机校验
 * @param obj
 * @returns {boolean}
 */
export function isDeskTel(obj) {
    let reg = /^[0-9]{7,12}$/;
    return reg.test(obj);
}


/**
 * 邮箱校验
 * @param obj
 * @returns {boolean}
 */
export function isMail(obj) {
    let reg = /[a-zA-Z0-9]{1,10}@[a-zA-Z0-9]{1,5}\.[a-zA-Z0-9]{1,5}/;
    if (!reg.test(obj)) {
        return false
    } else {
        return true
    }
}

/**
 * 换算成文件大小
 * @param obj
 * @returns {string}
 */
export function getFileSize(fileByte) {
    var fileSizeByte = fileByte;
    var fileSizeMsg = "";
    if (fileSizeByte < 1048576) fileSizeMsg = toDecimal((fileSizeByte / 1024)) + "K";
    else if (fileSizeByte == 1048576) fileSizeMsg = "1M";
    else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824) fileSizeMsg = toDecimal((fileSizeByte / (1024 * 1024))) + "M";
    else if (fileSizeByte > 1048576 && fileSizeByte == 1073741824) fileSizeMsg = "1gb";
    else if (fileSizeByte > 1073741824 && fileSizeByte < 1099511627776) fileSizeMsg = toDecimal((fileSizeByte / (1024 * 1024 * 1024))) + "G";
    else fileSizeMsg = "文件超过1TB";
    return fileSizeMsg;
}

/**
 * 保留两位小数
 * @param obj
 * @returns {string}
 */
function toDecimal(x) {
    let f = parseFloat(x);
    if (isNaN(f)) {
        return;
    }
    f = Math.round(x * 100) / 100;
    return f;
}

export function formatDateTime(inputTime) {
    let date = new Date(inputTime);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
}

/**
 * 时间字符串转具体时间
 * @param stringDate 2017-05-23 20:11:11
 */
export function string2Date(stringDate) {
    if (stringDate === null || stringDate === undefined || stringDate === 'null' || stringDate === '')
        return;
    let obtain1 = stringDate.split(' ');
    let obtain2 = obtain1[0].split('-');//天数
    let obtain = obtain1[1].split(':');//小时
    stringDate = stringDate.replace(new RegExp("-", "gm"), "/");
    let millisecond = new Date(stringDate).getTime();
    let diff = new Date().getTime() - millisecond;
    if (diff < 0)
        return;
    let today = new Date().getDate();
    if (diff <= 24 * 60 * 60 * 1000) {
        if (parseInt(obtain2[2]) < today) {
            return `昨天 ${obtain[0]}:${obtain[1]}`;
        }
        return `今天 ${obtain[0]}:${obtain[1]}`;
    } else {
        if (diff <= 48 * 60 * 60 * 1000) {
            if (parseInt(obtain2[2]) === (today - 1)) {
                return `昨天 ${obtain[0]}:${obtain[1]}`;
            } else {
                return `前天 ${obtain[0]}:${obtain[1]}`;
            }
        } else if (48 * 60 * 60 * 1000 < diff && diff < 7 * 24 * 60 * 60 * 1000) {
            let temp = new Date(stringDate).getDay();
            let whichDay;
            switch (temp) {
                case 0:
                    whichDay = '星期日';
                    break;
                case 1:
                    whichDay = '星期一';
                    break;
                case 2:
                    whichDay = '星期二';
                    break;
                case 3:
                    whichDay = '星期三';
                    break;
                case 4:
                    whichDay = '星期四';
                    break;
                case 5:
                    whichDay = '星期五';
                    break;
                case 6:
                    whichDay = '星期六';
                    break;
            }
            return `${whichDay} ${obtain[0]}:${obtain[1]}`;
        } else {
            return `${obtain1[0]} ${obtain[0]}:${obtain[1]}`;
        }
    }
}




