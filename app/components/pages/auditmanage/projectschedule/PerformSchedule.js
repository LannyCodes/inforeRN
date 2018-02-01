/**
 * Created by Lanny on 2017/6/17.
 */
/**
 * Created by Lanny on 2017/5/23.
 */
'use strict';
import React, {Component} from 'react'

import {
    ScrollView, View,
}from "react-native"

import AuditProjectTree from './AuditProjectTree'

const StyleSheet = require('../../../../base/StyleSheet');
export default class PerformSchedule extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <AuditProjectTree id={this.props.processApprovalId} navigation={this.props.navigation}/>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 30,
    },
    content: {
        fontSize: 18,
        color: 'red'
    }
});