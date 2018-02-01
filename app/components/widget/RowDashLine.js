/**
 * Created by InforeXuan on 2017/5/23.
 */
import React, {Component} from 'react';
import {
    View
} from 'react-native';
const StyleSheet = require('../../base/StyleSheet');

/**
 * 横向虚线
 */
class RowDashLine extends Component {

    render() {
        let num = this.props.number;
        let arr = [];
        for (let i = 0; i < num; i++) {
            arr.push(i);
        }
        return (
            <View style={styles.dashLine}>{
                arr.map((item, index) => {
                    return <View style={styles.dashItem} key={'RowDashLine' + index}/>
                })
            }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    dashLine: {
        flexDirection: 'row',
    },
    dashItem: {
        height: 1,
        width: 7,
        marginRight: 3,
        backgroundColor: '#cccccc',
    }
});
export default RowDashLine