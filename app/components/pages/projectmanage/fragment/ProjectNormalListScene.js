/**
 * Created by InforeXuan on 2017/5/19.
 */
import React, {Component} from 'react'

import {
    View, ListView,
    RefreshControl,
    Image,
    Text,
    ScrollView
} from "react-native"
import {GetProjectManageListRequset} from '../../../../api/projectmanage/ProjectManageRequests'
import {styles} from '../PmStyles'
import ProjectItem from '../ProjectItem'
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
let pageNo = 1;
let totalCount = 0;
let localCount = 0;

class ProjectNormalListScene extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projectList: [],
            isRefreshing: false,
        }
        this.startTime = '';
        this.endTime = '';
        this.stage = '';
        this.status = '';
    }

    componentDidMount() {
        this._onRefresh();
    }

    fetchFromServer(pageNo) {
        let self = this;
        // 获取数据
        let params = {userName: _USERNAME_, pageNo: pageNo, pageSize: _PAGESIZE_};
        if (!isNull(this.startTime)) {
            params.startTime = this.startTime;
        }
        if (!isNull(this.endTime)) {
            params.endTime = this.endTime;
        }
        if (!isNull(this.stage)) {
            params.projectType = this.stage;
        }
        if (!isNull(this.status) && this.status !== 0) {
            params.status = this.status;
        }
        new GetProjectManageListRequset(params).start(function (data) {
            // log(data)
            if (data.list)
                localCount += data.list.length;
            totalCount = data.totalCount;
            self.setState({
                projectList: self.state.projectList.concat(data.list),
                isRefreshing: false,
            });
        }, function (error) {
            setTimeout(() => {
                self.setState({
                    isRefreshing: false,
                })
            }, _loading_)
        });
    }


    _onRefresh() {
        pageNo = 1;
        localCount = 0;
        this.state.projectList = [];
        this.setState({isRefreshing: true});
        this.fetchFromServer(pageNo)

    }

    _loadMore() {
        if (localCount < totalCount) {
            this.fetchFromServer(++pageNo)
        }
    }

    /**
     * 筛选
     * @param startTime
     * @param endTime
     * @param stage
     * @param status
     * @private
     */
    _screening(startTime, endTime, stage, status) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.stage = stage;
        this.status = status;
        let self = this;
        let params = {};
        log(startTime + '---' + endTime + '---' + stage + '---' + status);
        // status 项目状态
        // projectType 项目类型
        if (!isNull(this.startTime)) {
            params.startTime = this.startTime;
        }
        if (!isNull(this.endTime)) {
            params.endTime = this.endTime;
        }
        if (!isNull(this.stage)) {
            params.projectType = this.stage;
        }
        if (!isNull(this.status) && this.status !== 0) {
            params.status = this.status;
        }
        params.userName = _USERNAME_;
        new GetProjectManageListRequset(params).start(function (data) {
            // log(data)
            self.setState({
                projectList: data.list,
                isRefreshing: false,
            });
        }, function (error) {
            setTimeout(() => {
                self.setState({
                    isRefreshing: false,
                })
            }, _loading_)
        });
    }

    renderHolder = () => {
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
                        source={require('../../../../images/common/icon_holder_xmgl.png')}/>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={styles.holderMessage}>未查询到结果</Text>
                </View>
            </ScrollView>
        )
    };


    renderList = (data) => {
        let dataSource = data;
        if (dataSource) {
            return (
                <ListView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={() => this._onRefresh()}
                            tintColor="#3ca8fe"
                            colors={['#3ca8fe']}
                            progressBackgroundColor="#f1f1f1"
                        />
                    }
                    initialListSize={1}
                    onEndReached={() => this._loadMore()}
                    onEndReachedThreshold={5}
                    dataSource={ds.cloneWithRows(dataSource)}
                    renderRow={(rowData) => <ProjectItem
                        navigation={this.props.navigation}
                        itemData={rowData}/>}
                    showsVerticalScrollIndicator={false}
                    enableEmptySections={true}
                    removeClippedSubviews={false}
                />
            )
        }
    };

    render() {
        let data = this.state.projectList;
        return (
            <View style={styles.container}>
                {((!data || data.length === 0) && !this.state.isRefreshing) ? this.renderHolder() : this.renderList(data)}
            </View>
        )
    }
}

export default ProjectNormalListScene;