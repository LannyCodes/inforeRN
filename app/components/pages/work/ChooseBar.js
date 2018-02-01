/** 
 * Created by Infore.Wlun. 
 */

import React, { Component } from 'react'
import {
    View,
    Text,
    Dimensions,
    ViewPropTypes,
    TouchableOpacity,
    Animated,
} from "react-native"
const screenWidth = Dimensions.get('window').width;
const StyleSheet = require('../../../base/StyleSheet')

class ChooseBar extends Component {

    static propTypes = {
        titles: React.PropTypes.array,
        style: ViewPropTypes.style,
        onChange: React.PropTypes.func,
    };

    constructor(props) {
        super(props)
        this.state = {
            currentIndex: 0,
            animateValue: new Animated.Value(0),
        }
    }

    _renderBar = (text, key) => {
        let width = this.props.width ? this.props.width : screenWidth;
        let barWidth = width / this.props.items.length
        return (
            <TouchableOpacity
                key={key}
                style={[styles.textContainer]}
                onPress={() => {
                    this.setState({
                        currentIndex: key,
                    })
                    Animated.timing(this.state.animateValue, {
                        toValue: barWidth * key + (barWidth - 39) / 2,
                        duration: 2,
                    })
                    {/*this.state.animateValue.setValue(barWidth*key);*/ }
                    {/*this.props.onChange(key)*/ }
                }}>
                <Text style={[styles.text, { color: this.state.currentIndex === key ? this.props.selectedColor : this.props.inSelectedColor }]}>{text}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        let arr = this.props.items.map((element, index) => {
            return this._renderBar(element, index);
        })
        return (
            <View style={[styles.container, { width: this.props.width }]}>
                {arr}
                <Animated.View style={[styles.undleLine, {
                    transform: [
                        { translateX },
                    ]
                }]} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        justifyContent: 'space-around',
        width: screenWidth,
        backgroundColor: 'white',
        flexDirection: 'row'
    },
    text: {
        fontSize: 14,
        color: '#666666',
    },
    textContainer: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    undleLine: {
        position: 'absolute',
        backgroundColor: '#29a1f7',
        width: 39,
        height: 3,
        top: 37,
    }
})

export default ChooseBar