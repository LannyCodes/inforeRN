/**
 * Created by coderxuan on 2017/5/6.
 */
import React, {Component} from 'react';
import {DeviceEventEmitter} from 'react-native'
import Navigation from '../base/navigation/StackConfig'
import * as messageActions from '../actions/message/MessageAction';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {USER_KEY, SPLASH_TIME} from '../constants/ContextConst'
import SplashScreen from 'react-native-splash-screen'
import {resetNavigation, globalUser} from '../utils/Common'
import {initListener, removeListener} from '../utils/JPushFuc'
let route = '';
const SPLASH_REMOVE_TIME = 5000;

class App extends Component {
    constructor() {
        super()
    }

    componentWillMount() {
        let self = this;
        this._subscription_initJpush = DeviceEventEmitter.addListener('LOGIN_SUCCESS', function (event) {
            self.initJPush(self);
        });
    }

    componentDidMount() {
        let self = this;
        console.log(self._navigation._navigation);
        global._CONTEXT_ = this._navigation._navigation;
        storage.load({
            key: USER_KEY.USERSTAGE_KEY,
        }).then(data => {
            if (!isNull(data.userToken)) {
                globalUser(data);
                self.initJPush(self);
                route = 'TabHome'
            } else {
                route = 'Login'
            }
            //获取用户未读消息
            self.fetchUserMessages();
            resetNavigation(self._navigation._navigation, route);
            setTimeout(function () {
                SplashScreen.hide()
            }, SPLASH_TIME);
        }).catch(err => {
            log('BridgeScene 捕获到一个问题:', err);
            route = 'Login';
            resetNavigation(self._navigation._navigation, route);
            setTimeout(function () {
                SplashScreen.hide()
            }, SPLASH_TIME);
        });
        if (_Android_)
            setTimeout(function () {
                SplashScreen.hide()
            }, SPLASH_REMOVE_TIME);
    }

    initJPush(self) {
        initListener(self);
    }

    notificationOperation(message) {
        //处理通知事件
        this.fetchUserMessages();
    };

    componentWillUnmount() {
        removeListener();
        this._subscription_initJpush.remove();
    }

    fetchUserMessages = () => {
        let {fetchMessages} = this.props.messageActions;
        let messageParams = {userName: _USERNAME_, pageSize: _PAGESIZE_, pageNo: 1};
        fetchMessages(messageParams, true);
    }

    render() {
        return (
            <Navigation ref={(navigation) => {
                this._navigation = navigation
            }}/>
        );
    }
}

function mapStateToProps(state) {
    return {
        msgCount: state.message.saveMsgCount
    }
}

function mapDispatchToProps(dispatch) {
    return {
        messageActions: bindActionCreators(messageActions, dispatch)
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(App);