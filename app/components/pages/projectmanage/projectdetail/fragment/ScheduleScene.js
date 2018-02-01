/**
 * Created by Lanny on 2017/5/23.
 */
'use strict';
import React, {Component} from 'react'

import {
    ScrollView, View, Text
}from "react-native"

import ProjectTree from './projectTree/ProjectTree'

const StyleSheet = require('../../../../../base/StyleSheet');
export default class ScheduleScene extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <ProjectTree id={this.props.id} navigation={this.props.navigation}/>
                </View>
            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#f5f5f5',
        // paddingBottom: 30,
    },
    content: {
        fontSize: 18,
        color: 'red'
    }
});