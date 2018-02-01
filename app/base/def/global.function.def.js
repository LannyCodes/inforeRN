/**
 * 注册一些全局函数
 */
/**
 * log
 * @param msg
 * @param tag
 */
function log(msg, tag) {
    if (__DEV__) {
        tag ? console.log(msg, tag) : console.log(msg);
    }
}
/**
 * 判断字符串为空
 * @param str
 * @returns {boolean}
 */
function isNull(str) {
    if (str === null || str === undefined || str === '' || str === 'null') {
        return true;
    }
    return false;
}

export {log, isNull}