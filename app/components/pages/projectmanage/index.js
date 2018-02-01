/**
 * Created by InforeXuan on 2017/5/19.
 */
import React, {Component} from 'react'

import {
    View,
}from "react-native"
import TitleBar from '../../widget/TitleBar'
import SearchView from '../../widget/SearchView'
import {GetProjectManageListRequset} from '../../../api/projectmanage/ProjectManageRequests'
import {styles} from './PmStyles'
import ProjectNormalListScene from './fragment/ProjectNormalListScene'

import PmDrawerPart from './PmDrawerPart'

class ProjectManageScene extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={styles.container}>
                <TitleBar
                    navigation={this.props.navigation}
                    title='项目管理'
                    rightText={'筛选'}
                    leftImage={require('../../../images/common/icon_bar_left.png')}
                    onRightPress={() => this.drawerPart.open()}
                    onLeftPress={() => this.props.navigation.goBack()}
                />
                <SearchView navigation={this.props.navigation} scene={'SearchProject'} searchText={'请输入项目名称搜索'}/>
                <ProjectNormalListScene ref={(normalList) => {
                    this.normalList = normalList
                }}
                                        navigation={this.props.navigation}/>
                <PmDrawerPart
                    ref={(drawer) => {
                        this.drawerPart = drawer
                    }}
                    onConfirm={(startTime, endTime, stage, status) => {
                        this.normalList._screening(startTime, endTime, stage, status)
                    }}
                />
            </View>
        )
    }
}

export default ProjectManageScene;