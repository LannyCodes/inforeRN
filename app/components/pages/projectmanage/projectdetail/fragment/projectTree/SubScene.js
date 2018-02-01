/**
 * Created by coderxuan on 2017/7/14.
 */

import React, {Component} from 'react';
import {
    View, DeviceEventEmitter
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view'
import {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import SubProjectTree from './SubProjectTree'
import SubDetailScene from './SubDetailScene'
import TitleBar from '../../../../../widget/TitleBar'
const StyleSheet = require('../../../../../../base/StyleSheet');

class AuditSubScene extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let self = this;
        this._subscription_goDetailPage = DeviceEventEmitter.addListener('GO_SUB_DETAIL_PAGE', function (checkStatus, result) {
            self.goToDetailPage();
        });
    }

    goToDetailPage() {
        this.tabView.goToPage(1);
    }

    componentWillUnmount() {
        this._subscription_goDetailPage.remove();
    }

    render() {
        let {params} = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <TitleBar navigation={this.props.navigation}
                          title={params.projectTree.name}
                          leftImage={require('../../../../../../images/common/icon_bar_left.png')}
                          onLeftPress={() => {
                              this.props.navigation.goBack()
                          }}/>
                <ScrollableTabView
                    ref={(tabView) => {
                        this.tabView = tabView
                    }}
                    renderTabBar={() => <ScrollableTabBar
                        scrollWithoutAnimation={true}
                        activeTextColor='rgb(41,161,247)'
                        inactiveTextColor='rgb(153,153,153)'
                        backgroundColor="#fff"
                        underlineStyle={{backgroundColor: 'rgb(41,161,247)'}}
                    />}>
                    <SubProjectTree
                        projectTree={this.props.projectTree}
                        tabLabel="执行计划" navigation={this.props.navigation}
                        processApprovalId={this.processId}/>
                    <SubDetailScene
                        tabLabel="基本信息" navigation={this.props.navigation}
                        processApprovalId={this.processId}/>
                </ScrollableTabView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efefef'
    },
});
export default AuditSubScene