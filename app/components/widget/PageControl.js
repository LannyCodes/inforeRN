/** 
 * Created by Infore.Wlun. 
 */

import React, { Component } from 'react'
import {
    View,
    ViewPropTypes,
    TouchableOpacity,
} from "react-native"
const StyleSheet = require('../../base/StyleSheet');

/*
    用法
    this.pageControl.setIndex = index;//设置哪个点高亮
    style //属性可以修改背景色和位置
    <PageControl ref={(pageControl)=>{this._pageControl=pageControl}}/>
    目前dot只有一种样式，待以后添加样式修改
*/

class PageControlDot extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSelected: props.selected,
        }
    }

    static propTypes = {
        index: React.PropTypes.number,
        selected: React.PropTypes.bool,
        style: ViewPropTypes.style,
        color: React.PropTypes.string,
        selectedColor: React.PropTypes.string,
    };

    static defaultProps = {
        index: 0,
        selected: false,
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.selected !== this.state.isSelected) {
            this.setState({
                isSelected: nextProps.selected
            })
        }
    }

    _dotClicked = () => {

    }

    render() {
        let backgroundColor = !this.state.isSelected ? this.props.color : this.props.selectedColor;
        return (
            <TouchableOpacity
                onPress={this._dotClicked}>
                <View style={[styles.dot, { backgroundColor: backgroundColor }]} />
            </TouchableOpacity>
        )
    }
}

class PageControl extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedIndex: 0,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.index != this.state.selectedIndex) {
            this.setState({
                selectedIndex: nextProps.index,
            })
        }
    }

    static propTypes = {
        dotsNum: React.PropTypes.number,
        color: React.PropTypes.string,
        selectedColor: React.PropTypes.string,
        width: React.PropTypes.string,
    };

    static defaultProps = {
        dotsNum: 2,
        index: 0,
    };

    setIndex = (index: number) => {
        this.setState({
            selectedIndex: index,
        })
    }

    render() {
        let dots = [];
        let dotsNum = this.props.dotsNum;
        dotsNum = dotsNum < 1 ? 1 : dotsNum;
        for (var index = 0; index < this.props.dotsNum; index++) {
            dots.push(<PageControlDot
                key={index}
                index={index}
                color={this.props.color}
                selectedColor={this.props.selectedColor}
                selected={this.state.selectedIndex === index ? true : false} />)
        }
        let width = dotsNum * 12 + (dotsNum - 1) * 10;
        return (
            <View style={[styles.container, this.props.style]}>
                <View style={[styles.dotContainer, { width: width }]}>
                    {dots}
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        flex: 1,
        position: 'absolute',
    },
    dotContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dot: {
        width: 12,
        height: 1.5,
    }
})

export default PageControl;