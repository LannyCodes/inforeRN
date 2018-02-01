/**
 * Created by coderxuan on 2017/5/26.
 */
'use strict';

/**
 *
 * 使用：
 *
 * 首先在页面声明
 *
 this.dialogbox.confirm({
            color:'blue',
            title: '这是一个提交框',
            content: ['是否确认提交？', '提交么？'],
            ok: {
                text: '确认',
                callback: () => {
                    this.dialogbox.alert('您已提交!');
                },
            },
            cancel: {
                color:'red',
                text: '不提交',
                callback: () => {
                    this.dialogbox.alertWithCallBack(
                        {
                            title: '一个按钮的回调',
                            content: ['回调？'],
                            ok: {
                                color:'green',
                                text: '确认',
                                callback: () => {
                                    alert('这里是回调');
                                },
                            },
                        })
                },
            },
        });
 *
 *
 */

import React, {Component, PropTypes} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    TouchableWithoutFeedback,
    PixelRatio,
} from 'react-native';
const StyleSheet = require('../../base/StyleSheet');
let {width} = Dimensions.get('window');
const scale = width / 375.0;
class PopContent extends Component {

    static propTypes = {
        title: PropTypes.string,
        content: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.arrayOf(PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ])),
        ]),
        btns: PropTypes.array,
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        let {title, content, btns} = this.props;
        let btnNumber = btns.length;
        return (
            <View style={styles.tipBox}>
                { title && <View style={styles.tipTitleBox}><Text adjustsFontSizeToFit={false} allowFontScaling={false}style={styles.tipTitle}>{title}</Text></View>}
                <View style={styles.tipContentBox}>
                    {(() => {
                        let tipContent = [];
                        if (content instanceof Array) {
                            content.forEach((item, index, arr) => {
                                if (index > 9) {
                                    return;
                                }
                                item && ( tipContent[index] = (
                                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}style={styles.tipContent} key={'tipContent' + index}>{item}</Text>) );
                            });
                        } else {
                            content && ( tipContent[0] = (
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false}style={styles.tipContent} key={'tipContent'}>{content}</Text>) );
                        }
                        return tipContent;
                    })()}
                </View>
                <View style={styles.line}></View>
                <View style={[styles.btnBox, btnNumber > 2 ? {flexDirection: 'column',} : {}]}>
                    {(() => {
                        let btnContent = [];
                        btns.forEach((btn, index,) => {
                            btnContent.push(
                                <TouchableOpacity style={styles.btnTextBox} onPress={btn.callback}
                                                  key={'btnTextBox' + index}>
                                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}style={[styles.btnText, {color: btn.color}]}>{btn.text}</Text>
                                </TouchableOpacity>
                            );
                            index != btnNumber - 1 && btnContent.push(<View style={styles.btnLine}
                                                                            key={'btnLine' + index}/>);
                        });
                        return btnContent;
                    })()}
                </View>
            </View>
        );
    }

}
;

class DisplayPopup extends Component {

    static defaultProps = {
        isOverlay: true,
        isOverlayClickClose: true,
        btns: [{
            text: 'ok',
            callback: () => {
            },
        }],
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            isVisible: true,
        };

    }

    close() {
        this.setState({
            isVisible: false,
        });
    }

    _renderOverlay() {
        if (this.props.isOverlay) {
            return (
                <TouchableWithoutFeedback onPress={() => {
                    if (this.props.isOverlayClickClose) {
                        this.close();
                    }
                }}>
                    <View style={styles.overlay}></View>
                </TouchableWithoutFeedback>
            );
        }
    }

    render() {
        let {isVisible, isOverlay,} = this.state;
        let {title, content, btns,} = this.props;
        btns = btns.map((item) => {
            return {
                text: item.text,
                callback: () => {
                    typeof item.callback === 'function' && item.callback();
                    this.close();
                },
            };
        });
        if (isVisible) {
            return (
                <View style={styles.popupContainer}>
                    {this._renderOverlay()}
                    <View style={styles.tipBoxView}>
                        <PopContent title={title} content={content} btns={btns}/>
                    </View>
                </View>
            );
        }
        return <View style={styles.hidden}/>;
    }

}
;

export default class DialogBox extends Component {

    static DisplayPopup = DisplayPopup;

    static defaultProps = {
        isOverlay: true,
        isOverlayClickClose: true,
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            isVisible: false,
            isOverlay: this.props.isOverlay,
            isOverlayClickClose: this.props.isOverlayClickClose,
            content: null,
        };
    }

    _pop(args) {
        this.setState({
            content: ( <PopContent {...args}/> ),
            isVisible: true,
        });
    }

    alert(...text) {
        text = text.map((text) => text);
        this._pop({
            content: text || '',
            btns: [{
                text: '确定',
                callback: () => {
                    this.close();
                    this && typeof this.callback === 'function' && this.callback();
                },
                color: '#49a7f6'
            }],
        });
    }

    alertWithCallBack(args) {
        let {title, content, ok} = args;
        this._pop({
            title: args.title,
            content: args.content,
            btns: [
                {
                    text: ok && ok.text || 'OK',
                    callback: () => {
                        this.close();
                        ok && typeof ok.callback === 'function' && ok.callback();
                    },
                    color: ok && ok.color || '#149be0',
                },
            ],
        });
    }

    confirm(args) {
        let {title, content, ok, cancel,} = args;
        this._pop({
            title: title,
            content: content,
            btns: [
                {
                    text: cancel && cancel.text || 'Cancel',
                    callback: () => {
                        this.close();
                        cancel && typeof cancel.callback === 'function' && cancel.callback();
                    },
                    color: cancel && cancel.color || '#149be0',
                },
                {
                    text: ok && ok.text || 'OK',
                    callback: () => {
                        this.close();
                        ok && typeof ok.callback === 'function' && ok.callback();
                    },
                    color: ok && ok.color || '#149be0',
                },
            ],
        });
    }

    pop(args) {
        this._pop(args);
    }

    close() {
        this.setState({
            isVisible: false,
        });
    }

    _renderOverlay() {
        if (this.state.isOverlay) {
            return (
                <TouchableWithoutFeedback onPress={() => {
                    if (this.state.isOverlayClickClose) {
                        this.close();
                    }
                }}>
                    <View style={styles.overlay}></View>
                </TouchableWithoutFeedback>
            );
        }
    }

    _renderContent() {
        return (
            <View style={styles.tipBoxView}>
                {this.state.content}
            </View>
        );
    }

    render() {
        let {isVisible, isOverlay,} = this.state;
        if (isVisible) {
            return (
                <View style={styles.popupContainer}>
                    {this._renderOverlay()}
                    {this._renderContent()}
                </View>
            );
        }
        return <View style={styles.hidden}/>;
    }

};

let styles = StyleSheet.create({
    popupContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width / scale,
        height: Dimensions.get('window').height / scale,
        overflow: 'hidden',
        backgroundColor: 'rgba(00, 00, 00, 0)',
    },
    overlay: {
        position: 'absolute',
        width: Dimensions.get('window').width / scale,
        height: Dimensions.get('window').height / scale,
        backgroundColor: '#000',
        opacity: .5,
    },
    tipBoxView: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width - 100,
        borderRadius: 12,
        overflow: 'hidden',
    },
    tipBox: {
        paddingTop: 15,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tipTitleBox: {
        height: 30,
        width: Dimensions.get('window').width - 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tipTitle: {
        fontSize: 19,
        fontWeight: '500',
        textAlign: 'center',
    },
    tipContentBox: {
        flexDirection: 'column',
        marginBottom: 15,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
    },
    tipContent: {
        fontSize: 15,
        marginBottom: 5,
        textAlign: 'center',
    },
    line: {
        height: 1 / PixelRatio.get(),
        width: Dimensions.get('window').width - 100,
        backgroundColor: '#ddd',
    },
    btnBox: {
        width: Dimensions.get('window').width - 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
    },
    btnTextBox: {
        flex: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnLine: {
        height: 50,
        width: 1 / PixelRatio.get(),
        backgroundColor: '#ddd',
    },
    btnText: {
        textAlign: 'center',
        fontSize: 15,
    },
    hidden: {
        position: 'absolute',
        height: 0,
        width: 0,
        top: 0,
        left: 0,
    },
});