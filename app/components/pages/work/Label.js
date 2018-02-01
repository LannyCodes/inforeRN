/** 
 * Created by Infore.Wlun. 
 */

import React, { Component } from 'react'
import {
    View,
    Text,
} from "react-native"
const StyleSheet = require('../../../base/StyleSheet');

class Label extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={[styles.container,this.props.style]}>
                <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={[styles.text,this.props.textStyle]}>{this.props.text}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        height:20,
        width:40,
        backgroundColor:'rgba(239,86,83,0.2)',
        alignItems:'center',
        justifyContent:'center',
    },
    text:{
        fontSize:10,
    }
})

export default Label;