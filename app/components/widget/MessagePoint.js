/**
 * Created by InforeXuan on 2017/5/18.
 */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
const StyleSheet = require('../../base/StyleSheet')

class MessagePoint extends Component {

    constructor(props: Object) {
        super(props)
        this.state = {}
    }

    static propTypes = {
        ...View.propTypes,
        mesCount: React.PropTypes.number,
        isShow: React.PropTypes.bool,
    };

    static defaultProps = {
        mesCount: 0,
        isShow: false
    };

    render() {
        let mesView;
        if (this.props.mesCount > 0 && this.props.isShow) {
            let countShow = this.props.mesCount <= 99 ? `${this.props.mesCount}`:'99+'
            mesView = (
                <View style={[styles.messageContain, this.props.contentStyle]}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}style={styles.message}>{countShow}</Text>
                </View>)
        } else {
            mesView = ( <View/>)
        }
        return mesView
    }
}

const styles = StyleSheet.create({
    messageContain: {
        borderColor: 'red',
        width: 22,
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: 'red',

    },
    message: {
        color: 'white',
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontSize: 10
    }
});

export default MessagePoint;