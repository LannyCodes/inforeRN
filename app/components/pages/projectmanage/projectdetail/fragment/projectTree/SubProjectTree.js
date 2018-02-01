/**
 * Created by coderxuan on 2017/6/16.
 */

import React, {Component} from 'react';
import {
    Text, View, TouchableOpacity, DeviceEventEmitter
} from 'react-native';
import ColumnDashLine from '../../../../../widget/ColumnDashLine'
import RowDashLine from '../../../../../widget/RowDashLine'
const StyleSheet = require('../../../../../../base/StyleSheet');
import {getProSubProcessId} from '../../../../../../actions/approval/ApprovalAction'
import store from '../../../../../../store/configStore'
let currentTime;
class SubProjectTree extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projectPlans: {}
        }
    }

    componentDidMount() {
        currentTime = new Date().getTime();
    }

    _renderPlan(projectTreeDto) {
        let v = [];
        store.dispatch(getProSubProcessId(projectTreeDto.id));
        v.push(
            <TouchableOpacity
                key={'touch_container_key'}
                onPress={() => {
                    store.dispatch(getProSubProcessId(projectTreeDto.id));
                    DeviceEventEmitter.emit('GO_SUB_DETAIL_PAGE');
                }}>
                <View style={styles.rowContainer}>
                    <RowDashLine
                        number={2}
                    />
                    {this._renderParentItem(projectTreeDto)}
                </View>
            </TouchableOpacity>
        );
        let children = projectTreeDto.children;
        if (children && children.length && children.length > 0) {
            children && children.length && children.map((child, i) => {
                v.push(
                    <View key={'level_0' + i} style={[styles.rowContainer, {marginTop: 0}]}>
                        <TouchableOpacity
                            onPress={() => {
                                store.dispatch(getProSubProcessId(child.id));
                                DeviceEventEmitter.emit('GO_SUB_DETAIL_PAGE');
                            }}>
                            <View style={styles.rowContainer}>
                                <RowDashLine
                                    number={4}
                                />
                                {this._renderChildItem(child)}
                            </View>
                        </TouchableOpacity>
                    </View>
                );
                child.children && child.children.reverse().map((ch, j) => {
                    v.push(
                        <View key={'level_1' + j}>
                            <TouchableOpacity
                                onPress={() => {
                                    if (ch.children) {
                                        this.props.navigation.navigate('ProjectSubScene', {projectTree: ch})
                                    } else {
                                        store.dispatch(getProSubProcessId(ch.id));
                                        DeviceEventEmitter.emit('GO_SUB_DETAIL_PAGE');
                                    }
                                }}>
                                <View style={styles.rowContainer}>
                                    <RowDashLine
                                        number={6}
                                    />
                                    {this._renderSubChildItem(ch)}
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                })
            })
        }
        return v
    }

    _renderParentItem(item) {
        if (!isNull(item.earlyWarningState) && item.earlyWarningState == 2) {
            return (
                <View style={styles.longViewItem}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={[styles.longViewText, {color: '#f7b55e'}]}>{item.name}</Text>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={[styles.longViewSubText, {color: '#f7b55e'}]}>{item.dutyNickname}负责</Text>
                </View>
            )
        }
        if (currentTime < item.end && currentTime > item.start) {
            return (
                <View style={styles.longViewItem}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={[styles.longViewText, {color: '#29a1f7'}]}> {item.name}</Text>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={[styles.longViewSubText, {color: '#29a1f7'}]}>{item.dutyNickname}负责</Text>
                </View>
            )
        } else {
            return (
                <View style={styles.longViewItem}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={[styles.longViewText, item.canWrite ? {color: '#333333'} : {color: '#999999'}]}>{item.name}</Text>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={styles.longViewSubText}>{item.dutyNickname}负责</Text>
                </View>
            );
        }
    }

    _renderChildItem(item) {
        if (!isNull(item.earlyWarningState) && item.earlyWarningState == 2) {
            return (
                <View style={styles.shortViewItem}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={[styles.shortViewText, {color: '#f7b55e'}]}>{item.name}
                    </Text>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={[styles.shortViewSubText, {color: '#f7b55e'}]}>{item.dutyNickname}负责</Text>
                </View>
            )
        } else if (currentTime < item.end && currentTime > item.start) {
            return (
                <View style={styles.shortViewItem}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={[styles.shortViewText, {color: '#29a1f7'}]}>{item.name}</Text>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={[styles.shortViewSubText, {color: '#29a1f7'}]}>{item.dutyNickname}负责</Text>
                </View>
            )
        } else {
            return (
                <View style={styles.shortViewItem}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={[styles.shortViewText, item.canWrite ? {color: '#333333'} : {color: '#999999'}]}>{item.name}
                    </Text>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={styles.shortViewSubText}>{item.dutyNickname}负责</Text>
                </View>
            );
        }
    }


    _renderSubChildItem(child) {
        if (!isNull(child.earlyWarningState) && child.earlyWarningState == 2) {
            return (
                <View style={styles.shortViewItem}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={[styles.shortViewText, {color: '#f7b55e'}]}>{child.name}
                    </Text>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={[styles.shortViewSubText, {color: '#f7b55e'}]}>{child.dutyNickname}负责</Text>
                </View>
            )
        } else if (currentTime < child.end && currentTime > child.start) {
            return (
                <View style={styles.shortViewItem}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={[styles.shortViewText, {color: '#29a1f7'}]}>{child.name}
                    </Text>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={[styles.shortViewSubText, {color: '#29a1f7'}]}>{child.dutyNickname}负责</Text>
                </View>
            );
        } else {
            return (
                <View style={styles.shortViewItem}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={[styles.shortViewText, child.canWrite ? {color: '#333333'} : {color: '#999999'}]}>{child.name}
                    </Text>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={styles.shortViewSubText}>{child.dutyNickname}负责</Text>
                </View>
            );
        }
    }

    render() {
        let {params} = this.props.navigation.state;
        log('这里是ProjectTree:', params.projectTree)
        let count = 0; //计划的总数
        if (params.projectTree) {
            count++;
            if (params.projectTree.children) {
                count += (params.projectTree.children.length);
                params.projectTree.children.map((item) => {
                    if (item.children)
                        count += item.children.length;
                })
            }
        }
        return (
            <View style={{marginLeft: 15, flexDirection: 'row'}}>
                <ColumnDashLine
                    height={(60 * count) - (50 / 2)}
                />
                <View>
                    {this._renderPlan(params.projectTree)}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efefef'
    },
    rowContainer: {
        marginTop: 10.5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    longViewItem: {
        paddingLeft: 15,
        height: 50,
        width: 330,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    longViewText: {
        fontSize: 14,
    },
    longViewSubText: {
        fontSize: 12,
        marginTop: 4,
        color: '#999999'
    },
    shortViewSubText: {
        fontSize: 12,
        marginTop: 4,
        color: '#999999'
    },
    shortViewItem: {
        paddingLeft: 15,
        height: 50,
        width: 310,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    shortViewText: {
        fontSize: 14,
    },
    subshortViewText: {
        fontSize: 14,
    },
    subshortViewSubText: {
        fontSize: 12,
        marginTop: 4,
        color: '#999999'
    },
    subshortViewItem: {
        paddingLeft: 15,
        height: 50,
        width: 290,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'center',
    },
});
export default SubProjectTree