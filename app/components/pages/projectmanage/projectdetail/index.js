/**
 * Created by InforeXuan on 2017/5/23.
 */
import React, {Component} from 'react'

import {
    View, Image, Text
}from "react-native"
import TitleBar from '../../../widget/TitleBar'
import DetailScene from './fragment/DetailScene'
// import DynamicStateScene from './fragment/DynamicStateScene'
import FileScene from './fragment/FileScene'
import MemberScene from './fragment/MemberScene'
import ScheduleScene from './fragment/ScheduleScene'
import SafeScene from './fragment/SafeScene'
import ProjectDetailHead from './ProjectDetailHead'
import QuestionScene from './fragment/QuestionScene'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import {ScrollableTabBar} from '../../../widget/ScrollableTabViewBars'
const StyleSheet = require('../../../../base/StyleSheet');
class ProjectDetailScene extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showPlus: false,
            currentTab: ''
        }
    }

    _initProblemItem() {
        if (this.state.currentTab === '问题') {
            this.props.navigation.navigate('NewFeedBackScene', {
                projectId: this.props.navigation.state.params.projectId,
            })
        } else if (this.state.currentTab === '安全') {
            this.props.navigation.navigate('NewSafeScene', {
                projectId: this.props.navigation.state.params.projectId,
            })
        }
    }

    //TODO 安全和动态暂缓
    render() {
        let {params} = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <TitleBar navigation={this.props.navigation}
                          title='项目详情'
                          isShowRight={this.state.showPlus}
                          rightImage={require('../../../../images/common/icon_plus_white.png')}
                          onRightPress={() => this._initProblemItem()}
                          leftImage={require('../../../../images/common/icon_bar_left.png')}
                          onLeftPress={() => this.props.navigation.goBack()}/>
                <ProjectDetailHead
                    id={params.projectId}
                />
                <View style={styles.line}/>
                <ScrollableTabView
                    onChangeTab={(currentPage, pageNumber) => {
                        if ('问题' === currentPage.ref.props.tabLabel || '安全' === currentPage.ref.props.tabLabel) {
                            this.setState({
                                showPlus: true,
                                currentTab: currentPage.ref.props.tabLabel
                            })
                        } else {
                            this.setState({
                                showPlus: false,
                                currentTab: currentPage.ref.props.tabLabel
                            })
                        }
                    }}
                    initialPage={params.index}
                    renderTabBar={() => <ScrollableTabBar
                        scrollWithoutAnimation={true}
                        activeTextColor='rgb(41,161,247)'
                        inactiveTextColor='rgb(153,153,153)'
                        backgroundColor="#fff"
                        underlineStyle={{backgroundColor: 'rgb(41,161,247)'}}
                        underlineAlignLabel={true}
                    />}>
                    <DetailScene tabLabel="详情" navigation={this.props.navigation} id={params.projectId}/>
                    <ScheduleScene tabLabel="计划" navigation={this.props.navigation} id={params.projectId}/>
                    <FileScene tabLabel="文件" navigation={this.props.navigation} id={params.projectId}/>
                    <MemberScene tabLabel="成员" navigation={this.props.navigation} id={params.projectId}/>
                    <QuestionScene tabLabel="问题" navigation={this.props.navigation} id={params.projectId}/>
                    {this.renderSafeScene(params.projectId)}

                </ScrollableTabView>
            </View>
        )
    }

    renderSafeScene(projectId) {
        if (_SHOW_SAFE_) {
            return (
                <SafeScene tabLabel="安全" navigation={this.props.navigation} id={projectId}/>
            )
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
});

export default ProjectDetailScene;