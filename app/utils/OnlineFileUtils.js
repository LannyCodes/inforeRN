/**
 * Created by coderxuan on 2017/6/23.
 */
import AppConst from '../constants/ContextConst';
import api from '../api/api'
import Urls from '../constants/Urls'
import {HTTP} from './LinkingUtils'
import Toast from 'react-native-root-toast'
/**
 * 在线文档查看
 * @param self
 * @param type
 * @param title
 * @param url
 * @param id
 */
function showFile(self, type, title, url, id) {
    if (type && (type === '.png' || type === '.jpeg' || type === '.jpg')) { //图片三种格式
        if (!isNull(url)) {
            if (url.startsWith('http')) {
                self._onImageClick(url)
            } else {
                self._onImageClick(AppConst.WebServerUrl + url)
            }
        }
        //pdf txt未做转换
    } else if (type && type === '.pdf' || type && type === '.txt') {
        if (url.startsWith('http')) {
            HTTP(url)
        } else {
            HTTP(AppConst.WebServerUrl + url)
        }
    } else { //转化成html
        let formData = new FormData();
        formData.append('fileId', id);
        let headers = {'Access-Token': _USERTOKEN_};
        api(AppConst.WebServerUrl, headers).post(Urls.doc.docUrl, formData)
            .then((response) => {
                log(response.data)
                if (response.data && response.data.success) {
                    self.props.navigation.navigate('Document', {url: response.data.msg, title: title})
                } else {
                    Toast.show('暂不支持预览该格式文件');
                }
            })
    }
}
export {showFile}