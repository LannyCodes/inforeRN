/**
 * Created by coderxuan on 2017/5/15.
 */

import React, {Component} from 'react'

import {
    View,
    Text,
    TouchableOpacity,
}from "react-native"
import {GetValidateCodeRequest} from '../../api/login/LoginRequests'
const StyleSheet = require('../../base/StyleSheet')

class Otp extends Component {

    constructor(props) {
        super(props);
        this.timeCount = 59;
        this.state = {
            enable: this.props.enable,
            codeText: "获取验证码",
            startTiming: false,
        }
    }

    static propTypes = {
        ...View.propTypes,
        // 属性类型
    };

    static defaultProps = {
        // 默认属性值
    };

    componentWillReceiveProps(nextProps) {
        if (this.state.startTiming) {
            return;
        }
        if (this.state.enable !== nextProps.enable) {
            this.setState({enable: nextProps.enable})
        }
    }

    _onPress() {
        if (!this.state.enable) {
            return;
        }
        if (this.props.onPress && this.props.onPress()) {
            this._startCutdown();
        }
    }

    _startCutdown() {
        let self = this;
        let timeCount = this.timeCount;
        let params = {
            "telephone": this.props.telephone
        };
        new GetValidateCodeRequest(params).start(function (data) {
            self.setState({
                enable: false,
                startTiming: true
            });
            self.interval = setInterval(() => {
                if (timeCount != 0) {
                    self.setState({
                        codeText: timeCount-- + 's后重发'
                    });
                } else {
                    self.setState({
                        codeText: '重获验证码',
                        enable: true,
                        startTiming: false
                    });
                    clearInterval(self.interval);
                }
            }, 1000);
        });
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    render() {
        let contentColor;
        if (this.state.enable) {
            contentColor = '#0ba8fd';
        } else {
            contentColor = '#cccccc';
        }
        return (
            <TouchableOpacity onPress={() => this._onPress()}>
                <Text adjustsFontSizeToFit={false} allowFontScaling={false}style={[{color: contentColor}, styles.codeText]}
                >{this.state.codeText}</Text>
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    codeText: {
        fontSize: 16
    }
})

export default Otp;