/**
 * Created by coderxuan on 2017/7/17.
 */
import {
    NativeAppEventEmitter
} from 'react-native';
import JPushModule from 'jpush-react-native';
export function initListener(self) {
    if (_Android_) {
        JPushModule.notifyJSDidLoad();
        JPushModule.addReceiveCustomMsgListener((message) => {
            console.log("receive Custom notification: ", message);
            self.notificationOperation(message);
        });
        JPushModule.addReceiveNotificationListener((message) => {
            console.log("receive notification: ", message);
            self.notificationOperation(message);
        })
        JPushModule.addReceiveOpenNotificationListener((message) => {
            _CONTEXT_.navigate('Message');
            self.notificationOperation(message);
        })
    }
    if (_IOS_) {
        NativeAppEventEmitter.addListener('ReceiveNotification', (notification) => {
            log('前端收到推送');
            self.notificationOperation(notification);
            log('end');
        });
        NativeAppEventEmitter.addListener('OpenNotification', (notification) => {
            log('从后台点击进入');
            self.notificationOperation(notification);
            _CONTEXT_.navigate('Message');
            log('end');
        });
        NativeAppEventEmitter.addListener(
            'networkDidReceiveMessage',
            (message) => {
                log('networkDidReceiveMessage');
                console.log(message)
                log('end');
            }
        );
    }
}
export function removeListener() {
    if (_Android_) {
        JPushModule.removeReceiveCustomMsgListener();
        JPushModule.removeReceiveNotificationListener();
        JPushModule.removeReceiveOpenNotificationListener();
    } else if (_IOS_) {
        NativeAppEventEmitter.removeAllListeners();
    }
}