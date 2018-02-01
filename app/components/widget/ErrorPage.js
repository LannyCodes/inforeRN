/**
 * Created by Lanny on 2017/7/1.
 */
'use strict';
import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    ScrollView
} from 'react-native';
const StyleSheet = require('../../base/StyleSheet');
export default class ErrorPage extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        errorContent: React.PropTypes.string,
        errorImg: React.PropTypes.any
    };

    static defaultProps = {
        errorContent: '暂时没有数据...',
        errorImg: require('../../images/common/icon_holder_rw.png')
    };


    render() {
        return (
            <View style={styles.holderContainer}>
                <Image
                    resizeMode='cover'
                    style={styles.holderImage}
                    source={this.props.errorImg}/>
                <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                      style={styles.holderMessage}>{this.props.errorContent}</Text>
            </View>
        )
    };
}

const styles = StyleSheet.create({
    holderImage: {
        width: 80,
        height: 80,
    },
    holderMessage: {
        fontSize: 15,
        marginTop: 15,
        color: 'rgb(166,166,166)',
    },
    holderContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});