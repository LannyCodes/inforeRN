/**
 * Created by InforeXuan on 2017/5/23.
 */

import React, {Component} from 'react';
import {
    Text, View, TouchableOpacity, ScrollView, RefreshControl, Image, DeviceEventEmitter
} from 'react-native';
import {GetProjectPlanRequest} from '../../../../../../api/projectmanage/ProjectManageRequests'
import ColumnDashLine from '../../../../../widget/ColumnDashLine'
import RowDashLine from '../../../../../widget/RowDashLine'
import {getProSubProcessId} from '../../../../../../actions/approval/ApprovalAction'
import store from '../../../../../../store/configStore'
const StyleSheet = require('../../../../../../base/StyleSheet');

let currentTime = 0;
class ProjectTree extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projectPlans: null,
            isRefreshing: false
        }
    }

    componentDidMount() {
        currentTime = new Date().getTime();
        this._onRefresh();
    }

    _onRefresh() {
        let self = this;
        self.setState({
            isRefreshing: true
        });
        let params = {projectId: this.props.id};
        new GetProjectPlanRequest(params).start(function (data) {
            self.setState({
                projectPlans: data,
                isRefreshing: false
            })
        }, function (error) {
            setTimeout(() => {
                self.setState({
                    isRefreshing: false,
                })
            }, _loading_)
        })
    }


    _renderParentItem(projectPlans) {
        if (!isNull(projectPlans.earlyWarningState) && projectPlans.earlyWarningState == 2) {
            return (
                <View style={styles.longViewItem}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={[styles.longViewText, {color: '#f7b55e'}]}>{projectPlans.name}</Text>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={[styles.longViewSubText, {color: '#f7b55e'}]}>{projectPlans.dutyNickname}负责</Text>
                </View>
            )
        }
        if (currentTime < projectPlans.end && currentTime > projectPlans.start) {
            return (
                <View style={styles.longViewItem}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={[styles.longViewText, {color: '#29a1f7'}]}>{projectPlans.name}</Text>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={[styles.longViewSubText, {color: '#29a1f7'}]}>{projectPlans.dutyNickname}负责</Text>
                </View>
            );
        } else {
            return (
                <View style={styles.longViewItem}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={[styles.longViewText, projectPlans.canWrite ? {color: '#333333'} : {color: '#999999'}]}>{projectPlans.name}</Text>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={styles.longViewSubText}>{projectPlans.dutyNickname}负责</Text>
                </View>
            );
        }
    }

    _renderChildItem(child) {
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

    _renderSubChildItem(ch) {
        if (!isNull(ch.earlyWarningState) && ch.earlyWarningState == 2) {
            return (
                <View style={styles.subshortViewItem}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={[styles.subshortViewText, {color: '#f7b55e'}]}>{ch.name}
                    </Text>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={[styles.subshortViewSubText, {color: '#f7b55e'}]}>{ch.dutyNickname}负责</Text>
                </View>
            )
        } else if (currentTime < ch.end && currentTime > ch.start) {
            return (
                <View style={styles.subshortViewItem}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={[styles.subshortViewText, {color: '#29a1f7'}]}>{ch.name}
                    </Text>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={[styles.subshortViewSubText, {color: '#29a1f7'}]}>{ch.dutyNickname}负责</Text>
                </View>
            );
        } else {
            return (
                <View style={styles.subshortViewItem}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={[styles.subshortViewText, ch.canWrite ? {color: '#333333'} : {color: '#999999'}]}>{ch.name}
                    </Text>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={styles.subshortViewSubText}>{ch.dutyNickname}负责</Text>
                </View>
            );
        }
    }

    _renderPlan() {
        let projectPlans = this.state.projectPlans;
        let v = [];
        if (null !== projectPlans) {
            store.dispatch(getProSubProcessId(projectPlans.id));
            v.push(
                <TouchableOpacity key={'level_0'} onPress={() => {
                    this.props.navigation.navigate('ProjectSubScene', {projectTree: projectPlans})
                }}>
                    <View style={styles.rowContainer}>
                        <RowDashLine
                            number={2}
                        />
                        {this._renderParentItem(projectPlans)}
                    </View>
                </TouchableOpacity>
            );
            projectPlans && projectPlans.children &&
            projectPlans.children.map((child, i) => {
                v.push(
                    <View key={'level_1' + i}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('ProjectSubScene', {projectTree: child})
                            }}>
                            <View style={styles.rowContainer}>
                                <RowDashLine
                                    number={4}
                                />
                                {this._renderChildItem(child)}
                            </View>
                        </TouchableOpacity>
                        {this._renderSubChild(child)}
                    </View>
                )
            })
        }
        return v
    }

    _renderSubChild(child) {
        let v = [];
        child && child.children &&
        child.children.map((ch, i) => {
            v.push(
                <View key={'level_2' + i}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('ProjectSubScene', {projectTree: ch})
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
        return v;
    }

    _renderDetail() {
        let count = 0; //计划的总数
        if (this.state.projectPlans) {
            count++;
        }
        if (this.state.projectPlans && this.state.projectPlans.children) {
            count += (this.state.projectPlans.children.length);
            for (let i = 0; i < this.state.projectPlans.children.length; i++) {
                if (this.state.projectPlans.children[i].children) {
                    count += this.state.projectPlans.children[i].children.length
                }
            }
        }
        return (
            <View style={styles.container}>
                {count !== 0 && <View style={{marginLeft: 15, flexDirection: 'row'}}>
                    <ColumnDashLine
                        height={(60 * count) - (50 / 2)}
                    />
                    <View>
                        {this._renderPlan()}
                    </View>
                </View>}
            </View>
        )
    }

    _renderHolder() {
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={() => this._onRefresh()}
                        tintColor="#3ca8fe"
                        colors={['#3ca8fe']}
                        progressBackgroundColor="#f1f1f1"
                    />
                }>
                <View
                    style={styles.holderContainer}>
                    <Image
                        resizeMode='cover'
                        style={styles.holderImage}
                        source={require('../../../../../../images/common/icon_holder_rw.png')}/>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={styles.holderMessage}>未查询到结果</Text>
                </View>
            </ScrollView>

        )
    }

    render() {
        return (
            <View>
                {
                    this.state.projectPlans !== null || this.state.isRefreshing ? this._renderDetail() : this._renderHolder()
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efefef',
        paddingRight: 10
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
    holderContainer: {
        marginTop: 150,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    holderImage: {
        width: 80,
        height: 80,
    },
    holderMessage: {
        marginTop: 15,
        fontSize: 15,
        color: 'rgb(166,166,166)',
    }
});

export default ProjectTree
