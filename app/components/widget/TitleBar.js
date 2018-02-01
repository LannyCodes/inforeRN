/**
 * Created by InforeXuan on 2017/5/19.
 */
/**
 *
 * 使用：<TitleBar
 title='项目管理'
 rightText={'筛选'}
 leftImage={require('../../../images/common/icon_bar_left.png')}
 onRightPress={() => alert('筛选')}
 onLeftPress={()=>alert('回退')}
 />
 */
import React, {Component} from 'react'

import {
    View,
    Text,
    Image,
    StatusBar,
    TouchableOpacity
}from "react-native"
const StyleSheet = require('../../base/StyleSheet');
class TitleBar extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    static propTypes = {
        ...View.propTypes,
        leftText: React.PropTypes.string,
        rightText: React.PropTypes.string,
        isShowRight: React.PropTypes.bool,
    };

    static defaultProps = {
        leftText: '',
        rightText: '',
        isShowRight: true
    };

    _renderLeft() {
        let {leftText, leftImage, onLeftPress} = this.props;
        let left;
        if (leftImage !== '' && leftImage !== undefined) {
            left = (
                <TouchableOpacity onPress={() => onLeftPress()} style={styles.renderLeft}>
                    <Image
                        resizeMode='contain'
                        style={styles.leftImg}
                        source={leftImage}
                    />
                </TouchableOpacity>
            )
        } else {
            if (leftText !== '') {
                left = (
                    <TouchableOpacity onPress={() => onLeftPress()} style={styles.renderLeft}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                              style={styles.leftText}>{leftText}</Text>
                    </TouchableOpacity>
                )
            } else {
                left = ( <View style={styles.renderLeft}/>)
            }
        }
        return left;
    }

    _renderRight() {
        let {rightText, rightImage, onRightPress} = this.props;
        let right;
        if (rightImage !== '' && rightImage !== undefined && this.props.isShowRight) {
            right = (
                <TouchableOpacity onPress={() => onRightPress()} style={styles.renderRight}>
                    <Image style={styles.rightImg}
                           source={rightImage}
                           resizeMode='contain'/>
                </TouchableOpacity>
            )
        } else {
            if (rightText !== '') {
                right = (
                    <TouchableOpacity onPress={() => onRightPress()} style={styles.renderRight}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                              style={styles.rightText}>{rightText}</Text>
                    </TouchableOpacity>
                )
            } else {
                right = ( <View style={styles.renderRight}/>)
            }
        }
        return right;
    }

    _renderTitle() {
        let {title} = this.props;
        let content;
        if (title !== '') {
            content = (
                <View style={styles.title}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} numberOfLines={1}
                          style={styles.titleText}>{title}</Text>
                </View>
            )
        } else {
            content = (<View style={styles.title}/>)
        }
        return content
    }

    render() {
        let {title} = this.props
        return (
            <View style={styles.titlebarContainer}>
                <StatusBar
                    backgroundColor="transparent"
                    barStyle="light-content"/>
                <Image style={styles.imagebg}
                       resizeMode={'stretch'}
                       source={require('../../images/common/icon_titlebar.png')}/>
                <View style={styles.titleContent}>
                    {this._renderLeft()}
                    {this._renderTitle()}
                    {this._renderRight()}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titlebarContainer: {
        height: 64,
    },
    imagebg: {
        height: 64,
        position: 'absolute'
    },
    titleContent: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    left: {
        flex: 1,
        marginTop: 12.5,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        // marginLeft: 10
    },
    right: {
        flex: 1,
        marginTop: 12.5,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        // marginRight: 10,
        alignItems: 'center'
    },
    title: {
        flex: 3,
        marginTop: 32.5,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    titleText: {
        fontSize: 18,
        color: 'white',
        backgroundColor: 'transparent',
        width: 280,
        textAlign: 'center'
    },
    rightText: {
        fontSize: 16,
        color: 'white',
        backgroundColor: 'transparent'
    },
    leftText: {
        fontSize: 16,
        backgroundColor: 'transparent',
        color: 'white',
    },
    leftImg: {
        width: 19,
        height: 19,
    },
    rightImg: {
        width: 19,
        height: 19,
    },
    renderLeft: {
        marginTop: 17.5,
        paddingLeft: 18,
        paddingTop: 15,
        paddingRight: 5,
        paddingBottom: 3,
        alignItems: 'flex-end',
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    renderRight: {
        paddingTop: 12,
        marginTop: 20.5,
        paddingLeft: 5,
        paddingRight: 18,
        paddingBottom: 5,
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'flex-end'
    }
})

export default TitleBar;