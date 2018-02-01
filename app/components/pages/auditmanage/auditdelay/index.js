/**
 * Created by Lanny on 2017/6/13.
 */
/**
 * Created by Lanny on 2017/6/8.
 */
/**
 * Created by InforeXuan on 2017/5/23.
 */
import React, {Component} from 'react'

import {
    View, Image, Text, TouchableOpacity, DeviceEventEmitter
}from "react-native"
import {CheckCanApproveRequest} from '../../../../api/auditmanage/AuditManageRequests'
import TitleBar from '../../../widget/TitleBar'
import ProjectDelayDetail from './ProjectDelayDetail'
import ProjectDelayApprovalRecord from './ProjectDelayApprovalRecord'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import DelayDetailHeader from './DelayDetailHeader'
import {ScrollableTabBar} from 'react-native-scrollable-tab-view'
const StyleSheet = require('../../../../base/StyleSheet');

class ProjectDelayScene extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailData: {},
            refreshScreen: false,
            isReceive: true,
            approvalId: null
        }
        this.projectStage = this.props.navigation.state.params.projectStage
        this.processId = this.props.navigation.state.params.processId
        this.id = this.props.navigation.state.params.id
        this.processType = this.props.navigation.state.params.processType
    }

    componentWillMount() {
        let self = this;
        this._subscription_needRefresh = DeviceEventEmitter.addListener('NEED_REFRESH', function (checkStatus, result) {
            self.refresh(checkStatus, result);
        });
    }

    componentWillUnmount() {
        this._subscription_needRefresh.remove();
    }

    componentDidMount() {
        let self = this;
        /**
         * 查看是否可以审批
         * @type {{processApprovalId: 即为processId, userName: *, processType: (*)}}
         */
        let params = {processApprovalId: self.processId, userName: _USERNAME_, processType: this.processType};
        new CheckCanApproveRequest(params).start(function (data) {
            self.setState({
                approvalId: data.approvalId
            })
        })
    }

    render() {
        let autoMarginBottom = (this.projectStage === 0 && this.state.approvalId !== null)? 44 : 0;
        return (
            <View style={styles.container}>
                <TitleBar navigation={this.props.navigation}
                          title='审核详情'
                          leftImage={require('../../../../images/common/icon_bar_left.png')}
                          onLeftPress={() => this.props.navigation.goBack()}/>
                <DelayDetailHeader
                    projectStage={this.projectStage}
                    id={this.processId}
                />
                <View style={styles.line}/>
                {this.projectStage === 0 || this.projectStage === '0'
                    ? <View>
                        <ProjectDelayDetail tabLabel="审核详情" navigation={this.props.navigation}
                                            processApprovalId={this.processId}
                        />
                    </View>
                    : <ScrollableTabView style={{marginBottom: autoMarginBottom}} renderTabBar={() => <ScrollableTabBar
                        scrollWithoutAnimation={true}
                        activeTextColor='rgb(41,161,247)'
                        inactiveTextColor='rgb(153,153,153)'
                        backgroundColor="#fff"
                        underlineStyle={{backgroundColor: 'rgb(41,161,247)'}}
                    />}>
                        <ProjectDelayDetail tabLabel="审核详情" navigation={this.props.navigation}
                                            processApprovalId={this.processId}
                        />
                        <ProjectDelayApprovalRecord tabLabel="审核记录" navigation={this.props.navigation}
                                                    processApprovalId={isNull(this.state.approvalId) ? this.id : this.state.approvalId}/>
                    </ScrollableTabView>}

                {this.renderOperateContainer(this.projectStage)}
            </View>
        )
    }

    renderOperateContainer(stage) {
        if (!isNaN(stage) && stage === 0 && !isNull(this.state.approvalId)) {
            return (
                <View style={styles.detailBottom}>
                    <View style={styles.bottomDivider}/>
                    <View style={styles.detailBottomChoose}>
                        <TouchableOpacity style={styles.detailChooseButton}
                                          onPress={() => this.props.navigation.navigate('ApprovalReason',
                                              {
                                                  'checkStatus': 1,
                                                  'approvalId': this.state.approvalId,
                                                  'placeholder': '请输入通过理由（非必填）'
                                              })}
                        >
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.detailBottomFont}>
                                通过
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.detailChoosedivider}/>
                        <TouchableOpacity style={styles.detailChooseButton}
                                          onPress={() => this.props.navigation.navigate('ApprovalReason',
                                              {
                                                  'checkStatus': 2,
                                                  'approvalId': this.state.approvalId,
                                                  'placeholder': '请输入拒绝理由（必填）'
                                              })}>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.detailBottomFont}>
                                拒绝
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }

    /**
     *
     * @param checkStatus 通过、拒绝
     * @param result 审核成功、失败
     */
    refresh(checkStatus, result) {
        log(checkStatus + '+' + result)
        if (result === 1) {
            if (checkStatus === 1) {//通过，
                this.projectStage = 1;
                this.setState({refreshScreen: true})
            } else if (checkStatus === 2) {//拒绝
                this.projectStage = 2;
                this.setState({refreshScreen: true})
            }
        } else if (result === 0) {

        }
    }
}

// define your styles
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efefef'
    },
    line: {
        height: 0.5,
    },
    detailBottom: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: 375,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    bottomDivider: {
        backgroundColor: '#e7e7e7',
        width: 375,
        height: 0.5,
    },
    detailBottomChoose: {
        flexDirection: 'row',
        height: 44,
        flex: 1,
        alignItems: 'center'
    },
    detailChooseButton: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    detailChoosedivider: {
        width: 0.5,
        height: 24,
        backgroundColor: '#e7e7e7'
    },
    detailBottomFont: {
        fontSize: 16,
        color: '#29a1f7'
    },

});

export default ProjectDelayScene;