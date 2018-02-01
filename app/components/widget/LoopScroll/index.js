/** 
 * Created by Infore.Wlun. 
 */

import React, { Component } from 'react'
import {
    View,
    ScrollView,
    Dimensions,
    InteractionManager
} from "react-native"
const StyleSheet = require('../../../base/StyleSheet');
let ScreenWidth = Dimensions.get('window').width;
let ScreenHeight = Dimensions.get('window').height;

class LoopScroll extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 0,
        }
        this._num = this.props.children.length;
        this._activeNum = this.props.initPage > this._num - 1 || this.props.initPage < 0 ? 0 : this.props.initPage;
        if (this.props.loop) {
            this._activeNum++;
            this._num = this._num + 2;
        }
    }

    static propTypes = {
        horizontal: React.PropTypes.bool, //是否水平
        width: React.PropTypes.number, //宽高 默认屏幕宽高
        height: React.PropTypes.number,
        duration: React.PropTypes.number,
        initPage: React.PropTypes.number, //初始页面
        loop: React.PropTypes.bool,
        autoPlay: React.PropTypes.bool,
    };

    static defaultProps = {
        horizontal: false,
        width: ScreenWidth,
        height: ScreenHeight,
        duration: 2000,
        initPage: 0,
        loop: false,
        autoPlay: true,
    };

    componentDidMount() {
        if (this.props.autoPlay && this.props.children && this.props.children.length > 1) {
            InteractionManager.runAfterInteractions(() => {
                this._scroll();
            })
            this._startTimer()
        }
    }

    componentWillUnMount() {
        this._timer && clearInterval(this._timer);
    }

    _renderPage = () => {
        let props = this.props
        let pages = [];
        let total = props.children.length
        if (total >= 0) {
            pages = Object.keys(props.children);
            //首尾分别插入尾页和首页
            if (this.props.loop && total > 1) {
                pages.unshift(total - 1 + '');
                pages.push('0');
            }
            pages = pages.map((page, i) => {
                return <View style={[styles.childrenContainer, { height: this.props.height }]} key={i}>{props.children[page]}</View>
            })
        }
        return pages;
    }

    render() {
        return (
            <View>
                <ScrollView
                    style={{ height: this.props.height }}
                    ref={(scrollView) => { this._scrollView = scrollView }}
                    horizontal={this.props.horizontal}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    alwaysBounceHorizontal={false}
                    alwaysBounceVertical={false}
                    pagingEnabled={true}
                    onMomentumScrollEnd={(e) => { this._onAnimationEnd(e) }}
                    onScrollBeginDrag={this._onScrollBeginDrag}
                    onScrollEndDrag={(e)=>{this._onScrollEndDrag(e)}}>
                    {this._renderPage()}
                </ScrollView>
            </View>
        )
    }

    _onScrollBeginDrag = () => {
        this._timer && clearInterval(this._timer)
    }

    _onScrollEndDrag = (e) => {
        this._timer && this._startTimer();
    }

    _onAnimationEnd = (e) => {
        //求出偏移量  
        let offset = this.props.horizontal ? e.nativeEvent.contentOffset.x : e.nativeEvent.contentOffset.y;
        //求出当前页数  
        let pageIndex = Math.floor(offset / (this.props.horizontal ? this.props.width : this.props.height));
        this._activeNum = pageIndex
        // // //更改状态机  
        if (this.props.loop && _IOS_) {
            if (pageIndex >= this._num - 1) {
                this._activeNum = 1;
                pageIndex = 1;
            } else if (pageIndex <= 0) {
                this._activeNum = this._num - 2;
                pageIndex = this._num - 2;
            }
            this._scroll(false);
        }
        // this.setState({ currentPage: pageIndex });
    }

    _scroll = (isAnimate = true) => {
        let scrollView = this._scrollView;
        let offset = this._activeNum * (this.props.horizontal ? this.props.width : this.props.height);
        if(!isNull(scrollView)){
            scrollView.scrollResponderScrollTo({ x: this.props.horizontal ? offset : 0, y: this.props.horizontal ? 0 : offset, animated: isAnimate });
        }
    }

    _startTimer = () => {
        this._timer = setInterval(() => {
            if (this.props.loop && _Android_) {
                if (this._activeNum >= this._num - 1) {
                    this._activeNum = 1;
                    this._scroll(false);
                    this._activeNum = 2;
                    this._scroll();
                } else {
                    this._activeNum = this._activeNum + 1;
                    this._scroll();
                }
            } else {
                if (this._activeNum >= this._num - 1) {
                    this._activeNum = 0;
                } else {
                    this._activeNum = this._activeNum + 1;
                }
                this._scroll();
            }

        }, this.props.duration)
    }
}

const styles = StyleSheet.create({
    childrenContainer: {
        alignItems: 'center',
        justifyContent:'center',
    }
})

export default LoopScroll