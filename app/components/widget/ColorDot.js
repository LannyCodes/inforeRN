/**
 * Created by coderxuan on 2017/6/6.
 */
import React, {Component} from 'react';
import {View} from 'react-native';
const StyleSheet = require('../../base/StyleSheet');
class ColorDot extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        ...View.propTypes,
        color: React.PropTypes.string,

    };

    static defaultProps = {
        color: 'green',
    };

    render() {
        if (this.props.color === 'blue') {
            return (
                <View style={styles.blue}>
                    <View style={styles.blueBigDot}/>
                    <View style={styles.blueSmallDot}/>
                </View>
            )
        } else {
            let color = '#89d043';
            if (this.props.color === 'gray') {
                color = '#dddddd';
            } else {
                color = '#89d043'
            }
            return <View style={[styles.smallDot, {backgroundColor: color}]}/>
        }
    }
}

const styles = StyleSheet.create({
    smallDot: {
        height: 8,
        width: 8,
        borderRadius: 4,
    },
    blue: {
        height: 16,
        width: 16,
    },
    blueBigDot: {
        backgroundColor: '#29a1f7',
        opacity: 0.4,
        height: 16,
        width: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    blueSmallDot: {
        backgroundColor: '#29a1f7',
        height: 12,
        opacity: 1,
        width: 12,
        borderRadius: 6,
        marginTop: -14,
        marginLeft: 2
    }
});
export default ColorDot;