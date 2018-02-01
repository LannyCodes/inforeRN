/**
 * Created by Lanny on 2017/5/23.
 */
'use strict';
import React, {Component} from 'react'
import {
    View, FlatList,
    RefreshControl,
    Text,
    TouchableOpacity,
    DeviceEventEmitter,
    Image,
    ScrollView
}from "react-native"
import {GetQuestionBackRequest} from '../../../../../api/projectmanage/ProjectManageRequests'
import {CachedImage} from "react-native-img-cache";
const StyleSheet = require('../../../../../base/StyleSheet');
let pageNo = 1;
let totalCount = 0;
let localCount = 0;
export default class QuestionScene extends Component {
    constructor(props) {
        super(props);
        this.projectId = this.props.id;
        this.state = {
            listData: [],
            isRefreshing: false,
        }
    }

    componentDidMount() {
        this._onRefresh();

    }

    componentWillMount() {
        let self = this;
        this._subscription_refreshquestion = DeviceEventEmitter.addListener('SOLVEQUESTION_SUCCESS', function (event) {
            self._onRefresh();
        });
        this._subscription_refreshsavequestion = DeviceEventEmitter.addListener('SAVEQUESTION_SUCCESS', function (event) {
            self._onRefresh();
        });
    }

    componentWillUnmount() {
        this._subscription_refreshquestion.remove();
        this._subscription_refreshsavequestion.remove();
    }

    /**
     * refresh
     * @private
     */
    _onRefresh() {
        pageNo = 1;
        localCount = 0;
        this.state.listData = [];
        this.setState({isRefreshing: true});
        // log('alsdskdlkmkf_onRefresh');
        this.fetchFromServer(pageNo);
    }

    fetchFromServer(pageNo) {
        let self = this;
        let params = {
            pageNo: pageNo,
            pageSize: _PAGESIZE_,
            projectId: this.projectId
        };
        // log('alsdskdlkmkf');
        new GetQuestionBackRequest(params).start(function (data) {
            if (!isNull(data.list)) {
                localCount += data.list.length;
                totalCount = data.totalCount;
                self.setState({
                    listData: self.state.listData.concat(data.list),
                    isRefreshing: false,
                });
            } else {
                self.setState({
                    isRefreshing: false,
                })
            }
        }, function (error) {
            setTimeout(() => {
                self.setState({
                    isRefreshing: false,
                })
            }, _loading_)
        });
    }

    _loadMore() {
        // log('alsdskdlkmkf_loadMore');
        if (localCount < totalCount) {
            this.fetchFromServer(++pageNo)
        }
    }

    render() {
        let projectQuestionList = this.state.listData;
        return (
            <View style={styles.container}>
                {
                    ((!projectQuestionList || projectQuestionList.length === 0) && this.state.isRefreshing === false) ? this.renderHolder() : this.renderList()
                }
            </View>
        )
    }

    renderList = () => {
        return (
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={() => this._onRefresh()}
                        tintColor="#3ca8fe"
                        colors={['#3ca8fe']}
                        progressBackgroundColor="#f1f1f1"
                    />
                }
                onEndReachedThreshold={0.1}
                onEndReached={() => this._loadMore()}
                keyExtractor={this._keyExtractor.bind(this)}
                data={this.state.listData}
                renderItem={this._renderItemView.bind(this)}
                ItemSeparatorComponent={this._itemRowSeparator}
                contentContainerStyle={styles.allContainer}
            />
        )
    };

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
                        source={require('../../../../../images/common/icon_holder_rw.png')}/>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={styles.holderMessage}>未查询到结果</Text>
                </View>
            </ScrollView>

        )
    };

    //返回itemView
    _renderItemView({item}) {
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={() => {
                this.props.navigation.navigate('QuestionDetailScene', {problemId: item.id})
            }}>
                <View style={styles.itemViewContainer}>
                    <View style={styles.itemTopContainer}>
                        <CachedImage
                            resizeMode={'cover'}
                            style={styles.headIcon}
                            source={isNull(item.imgUrl)
                                ? require('../../../../../images/icon_header_default.png') : {uri: item.imgUrl}}
                        />
                        <View style={styles.itemTopRightContainer}>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                  style={styles.itemDepAndName}>
                                {item.createUserDepName}-{item.createUserName}
                            </Text>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                  style={styles.itemTime}>
                                {item.createTime}
                            </Text>
                        </View>
                    </View>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={styles.itemMiddleText} numberOfLines={2} ellipsizeMode={'tail'}>
                        【{item.problemName}】{item.problemDescription}
                    </Text>

                    {this.renderStateButton(item)}
                </View>
            </TouchableOpacity>
        );
    }

    renderStateButton(item) {
        if (item.problemStatus === 0) {
            return (
                <View style={styles.itemBottomButton}>
                    <CachedImage
                        resizeMode={'cover'}
                        style={styles.stateIcon}
                        source={require('../../../../../images/projectmanage/icon_problem_unstate.png')}
                    />
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={styles.stateText}>
                        未解决
                    </Text>
                </View>
            );
        } else if (item.problemStatus === 1) {
            return (
                <View style={styles.itemBottomButton}>
                    <CachedImage
                        resizeMode={'cover'}
                        style={styles.stateIcon}
                        source={require('../../../../../images/projectmanage/icon_problem_state.png')}
                    />
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={styles.stateText}>
                        已解决
                    </Text>
                </View>
            );
        } else {
            return (
                <View style={styles.itemBottomButton}>
                    <CachedImage
                        resizeMode={'cover'}
                        style={styles.stateIcon}
                        source={require('../../../../../images/projectmanage/icon_problem_unstate.png')}
                    />
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={styles.stateText}>
                        无需解决
                    </Text>
                </View>
            );
        }

    }

    _keyExtractor = (item, index) => index;

    _itemRowSeparator = () => {
        return <View style={styles._itemRowSeparator}/>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e7e7e7',
        flexDirection: 'column'
    },
    allContainer: {
        marginTop: 10,
        paddingBottom: 20
    },
    itemViewContainer: {
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    itemTopContainer: {
        marginTop: 12.5,
        marginLeft: 15,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    itemTopRightContainer: {
        marginLeft: 10,
        flexDirection: 'column'
    },
    headIcon: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    stateIcon: {
        width: 16,
        height: 16
    },
    itemDepAndName: {
        color: '#9b9b9b',
        fontSize: 13,
    },
    itemTime: {
        color: '#9b9b9b',
        fontSize: 12,
        marginTop: 5
    },
    itemMiddleText: {
        color: '#333333',
        fontSize: 16,
        marginTop: 10,
        marginLeft: 58.5,
        marginRight: 21
    },
    stateText: {
        fontSize: 13,
        color: '#9b9b9b',
        marginLeft: 7
    },
    itemBottomButton: {
        flex: 1,
        height: 37,
        marginTop: 10,
        backgroundColor: '#f9f9f9',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    _itemRowSeparator: {
        height: 10
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
    }
    ,
    holderMessage: {
        fontSize: 15,
        color: 'rgb(166,166,166)',
        marginTop: 15
    }
});