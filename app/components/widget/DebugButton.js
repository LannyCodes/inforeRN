/**
 * Created by coderxuan on 2017/6/9.
 */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
const StyleSheet = require('../../base/StyleSheet');

class DebugButton extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        // if (__DEV__) {
            return (
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Debug')}>
                    <View style={styles.debugContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false}style={styles.debugText}>配置信息【仅用于DEBUG及测试】</Text>
                    </View>
                </TouchableOpacity>
            )
        // } else {
        //     return <View/>
        // }
    }
}

const styles = StyleSheet.create({
    debugContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 44,
        backgroundColor: 'white',
        marginTop: 10
    },
    debugText: {
        fontSize: 16,
        color: '#ef5653'
    }
})

export default DebugButton;