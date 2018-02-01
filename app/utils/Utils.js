/**
 * Created by coderxuan on 2017/7/18.
 */
let lastClickTime = 0;
class Utils {
    /**
     * 防重复点击
     * @returns {boolean}
     */
    static isFastClick() {
        let timeNow = new Date().getTime();
        if (timeNow - lastClickTime < 1000) {
            return true;
        }
        lastClickTime = timeNow;
        return false;
    }
}
export default Utils;