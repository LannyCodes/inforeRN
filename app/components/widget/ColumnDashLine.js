/**
 * Created by InforeXuan on 2017/5/23.
 */
import React, {Component} from 'react';
import {
     View
} from 'react-native';
const StyleSheet = require('../../base/StyleSheet');

class ColumnDashLine extends Component {

    render() {
        let h = this.props.height;
        let arr = [];
        let num = Math.ceil(h / 10)
        for (let i = 0; i < num; i++) {
            arr.push(i);
        }
        return (
            <View style={styles.dashLine}>{
                arr.map((item, index) => {
                    return <View style={styles.dashItem} key={'ColumnDashLine' + index}/>
                })
            }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    dashLine: {
        flexDirection: 'column',
    },
    dashItem: {
        height: 7,
        width: 1,
        marginTop: 3,
        backgroundColor: '#cccccc',
    }
});
export default ColumnDashLine