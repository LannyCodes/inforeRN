/**
 * Created by coderxuan on 2017/6/3.
 */
import {USER_KEY} from '../../../constants/ContextConst'
export function loadStateFromStorage(self) {
    storage.load({
        key: USER_KEY.USERSTAGE_KEY,
    }).then(data => {
        self.setState({
            userName: data.userName,
            nickName: data.nickName,
        })
    }).catch(err => {
        log(err.message);
    });

    storage.load({
        key: USER_KEY.USER_POSITION_KEY,
    }).then(data => {
        self.setState({
            userDepartment: data.userDepartment,
            userJob: data.userJob,
            jobNum: data.jobNum,
        })
    }).catch(err => {
        log(err.message);
    });

    storage.load({
        key: USER_KEY.USER_CANMODIFY_INFO_KEY.EMAIL,
    }).then(data => {
        self.setState({
            userEmail: data.userEmail,
        })
    }).catch(err => {
        log(err.message);
    });
    storage.load({
        key: USER_KEY.USER_CANMODIFY_INFO_KEY.TEL,
    }).then(data => {
        self.setState({
            userTelephone: data.userTelephone,
        })
    }).catch(err => {
        log(err.message);
    });
    storage.load({
        key: USER_KEY.USER_CANMODIFY_INFO_KEY.HEADER,
    }).then(data => {
        self.setState({
            userHeaderImg: data.userHeaderImg,
        })
    }).catch(err => {
        log(err.message);
    });
    storage.load({
        key: USER_KEY.USER_CANMODIFY_INFO_KEY.DESKPHONE,
    }).then(data => {
        self.setState({
            userDeskPhone: data.userDeskPhone,
        })
    }).catch(err => {
        log(err.message);
    });
    storage.load({
        key: USER_KEY.USERSTAGE_KEY,
    }).then(data => {
        self.setState({
            userId: data.userId,
        })
    }).catch(err => {
        log(err.message);
    });
}

export function updateHeader(headerImage) {
    storage.save({
        key: USER_KEY.USER_CANMODIFY_INFO_KEY.HEADER,
        data: {
            userHeaderImg: headerImage, //头像
        }
    });
}