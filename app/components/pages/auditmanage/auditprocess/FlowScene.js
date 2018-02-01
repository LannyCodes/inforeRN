/**
 * Created by Lanny on 2017/7/5.
 */
'use strict';
import React, {Component} from 'react';
import {
    View, Image, Text, TouchableWithoutFeedback, ScrollView, Dimensions
} from 'react-native';
import ColorDot from '../../../widget/ColorDot';
import {GetOperationFlowApprovalRequest} from '../../../../api/auditmanage/AuditManageRequests'
let {width} = Dimensions.get('window');
const StyleSheet = require('../../../../base/StyleSheet');
const scale = width / 375.0;
export default class FlowScene extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // items: 8
            detailData: null
        }
    }

    componentDidMount() {
        let self = this;
        let params = {'processApprovalId': this.props.processId};
        new GetOperationFlowApprovalRequest(params).start(function (data) {
            if (data) {
                self.setState({
                    detailData: data
                })
            } else {
                self.setState({
                    detailData: []
                })
            }
        })
    }

    render() {
        let detailData = this.state.detailData;
        return (
            <ScrollView >
                <View style={styles.container}>
                    {this.rightPart(detailData)}
                </View>

            </ScrollView>
        )
    }

    _renderColorDot(status, i, end) {
        let lineH, toplineColor, endLineColor, dotColor;
        if (status === 2) {
            toplineColor = '#89d043';
            endLineColor = '#89d043';
            dotColor = 'green';
            lineH = 26;
        } else if (status === 1) {
            toplineColor = '#89d043';
            endLineColor = '#dddddd';
            dotColor = 'blue';
            lineH = 22;
        } else if (status == 0) {
            lineH = 26;
            toplineColor = '#dddddd';
            endLineColor = '#dddddd';
            dotColor = 'gray'
        }
        return (
            <View style={{alignItems: 'center'}}>
                {i !== 0 ? <View style={{width: 1, height: lineH * scale, backgroundColor: toplineColor}}></View> :
                    <View style={{width: 1, height: lineH * scale, backgroundColor: 'transparent'}}></View>
                }
                <ColorDot color={dotColor}/>
                {i !== end ? <View style={{width: 1, height: lineH * scale, backgroundColor: endLineColor}}></View> :
                    <View style={{width: 1, height: lineH * scale, backgroundColor: 'transparent'}}></View>
                }
            </View>
        )
    }

    _renderText(item) {
        let textColor, userTextColor;
        if (item.status === 2) {
            textColor = '#333333';
            userTextColor = '#999999'
        } else if (item.status === 1) {
            textColor = '#29a1f7'
            userTextColor = '#29a1f7'
        } else if (item.status == 0) {
            textColor = '#999999'
            userTextColor = '#999999'
        }
        return (
            <View style={styles.rightPart}>
                <Text style={[styles.name, {color: textColor}]}>{item.activityName}</Text>
                {/*<Text style={[styles.name, {color: userTextColor}]}>{item.createUser}负责</Text>*/}
            </View>
        )
    }

    rightPart(items) {
        // log(items);
        if (items !== null) {
            return (
                <View style={styles.rightContainer}>
                    {
                        items.map((item, i) => {
                            return (
                                <View key={i} style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <View style={{alignItems: 'center', width: 41}}>
                                        {this._renderColorDot(item.status, i, items.length - 1)}
                                    </View>
                                    {this._renderText(item)}
                                </View>
                            )
                        })
                    }
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    leftPart: {
        flexDirection: 'column',
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    virtualLine: {
        width: 1,
    },
    rightPart: {
        flex: 1,
        marginTop: 10,
        paddingLeft: 15,
        height: 50,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        marginRight: 15
    },
    name: {
        fontSize: 14,
        textAlign: 'left',
        color: 'rgb(51,51,51)'
    },
    responsible: {
        marginTop: 4,
        fontSize: 12,
        textAlign: 'left',
        color: 'rgb(153,153,153)'
    },
});