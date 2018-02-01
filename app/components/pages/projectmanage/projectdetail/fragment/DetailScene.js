/**
 * Created by Lanny on 2017/5/23.
 */
'use strict';
import React, {Component} from 'react'

import {
    View, Image, Text, ScrollView
}from "react-native"

import {GetProjectDetailRequest} from '../../../../../api/projectmanage/ProjectManageRequests'
const StyleSheet = require('../../../../../base/StyleSheet');
export default class DetailScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectDetailData: {}
        }
    }

    componentDidMount() {
        let self = this;
        let params = {id: this.props.id}
        new GetProjectDetailRequest(params).start(function (data) {
            console.log('getdata', data);
            self.setState({
                projectDetailData: data
            })
        })
    }

    render() {
        let projectDetailData = this.state.projectDetailData
        return (
            projectDetailData && <ScrollView style={styles.container}>
                <View style={styles.groupContainer}>
                    <View style={styles.itemContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            项目名称
                        </Text>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemContent}
                              ellipsizeMode={'tail'} numberOfLines={1}>
                            {projectDetailData.projectName}
                        </Text>
                    </View>
                    <View style={styles.projectDivider}/>
                    <View style={styles.itemContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            发起人
                        </Text>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemContent}>
                            {projectDetailData.createUser}
                        </Text>
                    </View>
                </View>
                <View style={styles.groupContainer}>
                    <View style={styles.itemContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            实际开始时间
                        </Text>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemContent}>
                            {projectDetailData.realStartTime}
                        </Text>
                    </View>
                    <View style={styles.projectDivider}/>
                    <View style={styles.itemContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            实际结束时间
                        </Text>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemContent}>
                            {projectDetailData.realFiniishTime}
                        </Text>
                    </View>
                </View>
                <View style={styles.groupContainer}>
                    <View style={styles.itemContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            项目经理
                        </Text>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemContent}>
                            {projectDetailData.projectManagerName}
                        </Text>
                    </View>
                    <View style={styles.projectDivider}/>
                    <View style={styles.itemContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            所属部门
                        </Text>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemContent}>
                            {projectDetailData.organizeName}
                        </Text>
                    </View>
                </View>
                <View style={styles.itemProjectNote}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                        项目需求
                    </Text>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemNote}>
                        {projectDetailData.explain}</Text>
                </View>
            </ScrollView>
        )
    }

    renderDetailState() {
        if (this.receive) {
            return (
                <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.userReceive}>
                    已通过
                </Text>
            )
        } else {
            return (
                <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.userRefuse}>
                    已拒绝
                </Text>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e7e7e7',
        flexDirection: 'column'
    },
    groupContainer: {
        backgroundColor: 'white',
        flexDirection: 'column',
        marginTop: 10
    },
    projectDivider: {
        backgroundColor: '#e7e7e7',
        height: 0.5,
        marginLeft: 15
    },
    itemContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 14,
        paddingBottom: 14,
        paddingLeft: 15,
        paddingRight: 12
    },
    itemProjectNote: {
        backgroundColor: 'white',
        flexDirection: 'column',
        marginTop: 10,
        paddingTop: 14,
        paddingLeft: 15,
        paddingBottom: 7,
        paddingRight: 18,
        marginBottom: 11
    },
    itemName: {
        color: '#333333',
        fontSize: 16
    },
    itemContent: {
        width: 230,
        color: '#999999',
        fontSize: 16,
        textAlign: 'right'
    },
    itemNote: {
        color: '#999999',
        fontSize: 16,
        marginTop: 10
    },
    detailHeader: {
        height: 76,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 15,
        backgroundColor: 'white'
    },
    detailSubHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    headIcon: {
        width: 36,
        height: 36
    },
    textHeader: {
        marginLeft: 15,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    textName: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    userName: {
        color: '#999999',
        fontSize: 14
    },
    userReceive: {
        color: '#43cda8',
        fontSize: 14,
        marginLeft: 5
    },
    userRefuse: {
        color: '#ef5653',
        fontSize: 14,
        marginLeft: 5
    },
    userComment: {
        color: '#333333',
        fontSize: 14,
        marginTop: 8
    },
    userTime: {
        color: '#b2b2b2',
        fontSize: 12,
        marginRight: 8
    }
});