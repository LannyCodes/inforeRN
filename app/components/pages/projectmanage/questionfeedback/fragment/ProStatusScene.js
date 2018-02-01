/**
 * Created by Lanny on 2017/5/23.
 */
'use strict';
import React, {Component} from 'react'

import {
    View, ListView, Image, Text, ScrollView
}from "react-native"
const StyleSheet = require('../../../../../base/StyleSheet');
export default class ProStatusScene extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.proNameStyle}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}style={styles.nameLabelTxt}>
                        项目名称
                    </Text>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}style={styles.itemFirstFont} numberOfLines={1} ellipsizeMode={'tail'}>
                        {this.props.projectName}
                    </Text>
                </View>
                <View style={styles.itemDivider}/>
                <View style={styles.proNameStyle}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}style={styles.nameLabelTxt}>
                        项目编号
                    </Text>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}style={styles.nameValueTxt}>
                        {this.props.projectNo}
                    </Text>
                </View>
                <View style={styles.itemDivider}/>
                <View style={styles.proNameStyle}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}style={styles.nameLabelTxt}>
                        所属部门
                    </Text>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}style={styles.nameValueTxt}>
                        {this.props.organizeName}
                    </Text>
                </View>
                <View style={styles.itemDivider}/>
                <View style={styles.proNameStyle}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}style={styles.nameLabelTxt}>
                        项目负责人
                    </Text>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}style={styles.nameValueTxt}>
                        {this.props.dutyUser}
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e7e7e7',
        flexDirection: 'column',
        paddingTop:10
    },
    proNameStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 14,
        paddingBottom: 14,
        paddingLeft: 15,
        paddingRight: 13,
        backgroundColor: 'white'
    },
    nameLabelTxt: {
        fontSize: 16,
        color: '#333333'
    },
    itemFirstFont: {
        fontSize: 16,
        width:200,
        color: '#999999'
    },
    nameValueTxt: {
        fontSize: 16,
        color: '#999999'
    },
    itemDivider: {
        height: 0.5,
        marginLeft: 15,
        backgroundColor: '#e7e7e7'
    }
});