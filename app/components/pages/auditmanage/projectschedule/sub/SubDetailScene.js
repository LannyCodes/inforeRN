/**
 * Created by Lanny on 2017/5/23.
 */
'use strict';
import React, {Component} from 'react'

import {
    View, Text, ScrollView
}from "react-native"
import {GetFlowApprovalDetailRequest} from '../../../../../api/auditmanage/AuditManageRequests'
const StyleSheet = require('../../../.././../base/StyleSheet');
import {connect} from 'react-redux';
import ErrorPage from '../../../../widget/ErrorPage';
import {formatDateTime} from '../../../../../utils/Common'
class SubDetailScene extends Component {
    constructor(props) {
        super(props);
        this.processApprovalId = props.processApprovalId;
        this.processId = props.processId;
        this.receive = props.receive;
        this.state = {
            detailData: null,
            detailDataModify: null,
        }
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.retrieveId !== this.props.retrieveId) {
            let self = this;
            let params = {'taskGanttId': nextProps.retrieveId};
            new GetFlowApprovalDetailRequest(params).start(function (data) {
                if (data) {
                    self.setState({
                        detailData: data.taskGantt,
                        detailDataModify: data.taskGanttIdBackups,
                    })
                } else {
                    self.setState({
                        detailData: null,
                        detailDataModify: null,
                    })
                }
            }, function (error) {
                self.setState({
                    detailData: null,
                    detailDataModify: null,
                })
            });
        }
        return true
    }

    componentDidMount() {
        let self = this;
        let params = {'taskGanttId': this.props.retrieveId};
        new GetFlowApprovalDetailRequest(params).start(function (data) {
            if (data) {
                self.setState({
                    detailData: data.taskGantt,
                    detailDataModify: data.taskGanttIdBackups,
                })
            } else {
                self.setState({
                    detailData: null,
                    detailDataModify: null,
                })
            }
        }, function (error) {
            self.setState({
                detailData: null,
                detailDataModify: null,
            })
        })
    }

    _renderCommonText(key) {
        let selectDate = {};
        if (this.state.detailDataModify === null) {
            selectDate = this.state.detailData
        } else {
            selectDate = this.state.detailDataModify
        }
        if (this.state.detailDataModify !== null && this.state.detailDataModify !== null) {
            if (this.state.detailData[key] !== this.state.detailDataModify[key]) {
                return (
                    key === 'duration' || key === 'taskPre' ?
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                              style={[styles.itemContent, {color: '#ef5653'}]}>
                            {this.state.detailDataModify[key]}天
                        </Text> : <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                        style={[styles.itemContent, {color: '#ef5653'}]}>
                        {this.state.detailDataModify[key]}
                    </Text>
                )
            } else {
                return (
                    key === 'duration' || key === 'taskPre' ?
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                              style={[styles.itemContent]}>
                            {this.state.detailDataModify[key]}天
                        </Text> : <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                        style={[styles.itemContent]}>
                        {this.state.detailDataModify[key]}
                    </Text>
                )
            }
        } else {
            return (
                key === 'duration' || key === 'taskPre' ?
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={styles.itemContent}>
                        {selectDate[key]}天
                    </Text> : <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                    style={styles.itemContent}>
                    {selectDate[key]}
                </Text>
            )
        }
    }


    _renderTimeText(key) {
        let selectDate = {};
        if (this.state.detailDataModify === null) {
            selectDate = this.state.detailData
        } else {
            selectDate = this.state.detailDataModify
        }
        if (this.state.detailDataModify !== null && this.state.detailDataModify !== null) {
            if (this.state.detailData[key] !== this.state.detailDataModify[key]) {
                return (
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={[styles.itemContent, {color: '#ef5653'}]}>
                        {!isNull(this.state.detailDataModify[key]) ? formatDateTime(this.state.detailDataModify[key]) : this.state.detailDataModify[key]}
                    </Text>
                )
            } else {
                return (
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={[styles.itemContent]}>
                        {!isNull(this.state.detailDataModify[key]) ? formatDateTime(this.state.detailDataModify[key]) : this.state.detailDataModify[key]}
                    </Text>
                )
            }
        } else {
            return (
                <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                      style={styles.itemContent}>
                    {!isNull(selectDate[key]) ? formatDateTime(selectDate[key]) : selectDate[key]}
                </Text>
            )
        }
    }

    _renderNoteText(key) {
        let selectDate = {};
        if (this.state.detailDataModify === null) {
            selectDate = this.state.detailData
        } else {
            selectDate = this.state.detailDataModify
        }
        if (this.state.detailDataModify !== null && this.state.detailDataModify !== null) {
            if (this.state.detailData[key] !== this.state.detailDataModify[key]) {
                return (
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={[styles.itemNote, {color: '#ef5653'}]}>
                        { this.state.detailDataModify[key]}
                    </Text>
                )
            } else {
                return (
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={[styles.itemNote]}>
                        { this.state.detailDataModify[key]}
                    </Text>
                )
            }
        } else {
            return (
                <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                      style={styles.itemNote}>
                    {selectDate[key]}
                </Text>
            )
        }
    }

    _renderProgressText(key) {
        let selectDate = {};
        if (this.state.detailDataModify === null) {
            selectDate = this.state.detailData
        } else {
            selectDate = this.state.detailDataModify
        }
        if (this.state.detailDataModify !== null && this.state.detailDataModify !== null) {
            if (this.state.detailData[key] !== this.state.detailDataModify[key]) {
                return (
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={[styles.itemContent, {color: '#ef5653'}]}>
                        {this.state.detailDataModify[key]}%
                    </Text>
                )
            } else {
                return (
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={[styles.itemContent]}>
                        {this.state.detailDataModify[key]}%
                    </Text>
                )
            }
        } else {
            return (
                <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                      style={styles.itemContent}>
                    {selectDate[key]}%
                </Text>
            )
        }
    }

    render() {
        let detailData = this.state.detailData;
        if (detailData === null) {
            return (
                <ErrorPage/>
            )
        }
        return (
            <ScrollView style={styles.container}>
                <View style={styles.groupContainer}>
                    <View style={styles.itemContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            计划名称
                        </Text>
                        {this._renderCommonText('name')}
                    </View>
                    <View style={styles.projectDivider}/>
                    <View style={styles.itemContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            责任部门
                        </Text>
                        {this._renderCommonText('dutyDepartment')}
                    </View>
                    <View style={styles.projectDivider}/>
                    <View style={styles.itemContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            计划开始
                        </Text>
                        {this._renderTimeText('start')}
                    </View>
                    <View style={styles.projectDivider}/>
                    <View style={styles.itemContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            计划结束
                        </Text>
                        {this._renderTimeText('end')}
                    </View>
                    <View style={styles.projectDivider}/>
                    <View style={styles.itemContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            任务周期
                        </Text>
                        {this._renderCommonText('duration')}
                    </View>
                    <View style={styles.projectDivider}/>
                    <View style={styles.itemContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            进度
                        </Text>
                        {this._renderProgressText('progress')}
                    </View>
                </View>
                <View style={styles.groupContainer}>
                    <View style={styles.itemContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            责任人
                        </Text>
                        {this._renderCommonText('duty')}
                    </View>
                    <View style={styles.projectDivider}/>
                    <View style={styles.itemContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                            预警提醒
                        </Text>
                        {this._renderCommonText('taskPre')}
                    </View>
                </View>
                <View style={[styles.itemProjectNote, {marginBottom: 0}]}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemName}>
                        任务备注
                    </Text>
                    {this._renderNoteText('description')}
                </View>
            </ScrollView>
        )
    }
}

function mapStateToProps(state) {
    return {
        retrieveId: state.approval.catchSubProcessId
    }
}

export default connect(mapStateToProps)(SubDetailScene);

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
        width: 170 + 50,
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