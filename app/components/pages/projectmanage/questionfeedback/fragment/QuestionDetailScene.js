/**
 * Created by Lanny on 2017/5/23.
 */
'use strict';
import React, {Component} from 'react'

import {
    View, Image, Text, TouchableOpacity, ScrollView, DeviceEventEmitter, Dimensions
}from "react-native"
import TitleBar from '../../../../widget/TitleBar'
import DialogBox from '../../../../widget/DialogBox'
import MutliImage from "../../../../widget/MutliImage";
const StyleSheet = require('../../../../../base/StyleSheet');
const scale = Dimensions.get('window').width / 375;
import {GetProblemInfoRequest} from '../../../../../api/projectmanage/ProjectManageRequests'
let navigateTitle = '问题详情';

class QuestionDetailScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionDetail: {}
        }
        log(_USERNAME_);
    }

    componentDidMount() {
        this._onRefresh();
        let self = this;
        this._subscription_refreshquestion = DeviceEventEmitter.addListener('SOLVEQUESTION_SUCCESS', function (event) {
            self._onRefresh();
        });
    }

    /**
     * refresh
     * @private
     */
    _onRefresh() {
        let self = this;
        let {params} = this.props.navigation.state;
        let problemId = params.problemId;
        let requestparams = {id: problemId};
        new GetProblemInfoRequest(requestparams).start(function (data) {
            self.setState({
                questionDetail: data
            });
        });
    }

    componentWillUnmount() {
        this._subscription_refreshquestion.remove();
    }

    render() {
        let problemItem = this.state.questionDetail;
        let isSolve = this._isCanSolve(problemItem);
        return (
            <View
                style={styles.container}>
                <TitleBar navigation={this.props.navigation}
                          title={navigateTitle}
                          leftImage={require('../../../../../images/common/icon_bar_left.png')}
                          onLeftPress={() => this.props.navigation.goBack()}/>
                <ScrollView style={isSolve?styles.scrollviewContainer:styles.scrollviewContainerTwo}>
                    <View style={styles.detailTopContainer}>

                        <View style={styles.detailNameContainer}>

                            <View style={styles.detailNameTopContainer}>

                                <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                      style={styles.detailCommonNameFont}>
                                    {problemItem.problemName}
                                </Text>

                                {this.renderProblemStatus(problemItem)}

                            </View>

                            <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                  style={styles.detailTopNameValuesFont}>
                                {problemItem.problemDescription}
                            </Text>

                        </View>

                        <View style={styles.detailTopDivider}/>

                        <View style={styles.detailCommonContainer}>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                  style={styles.detailCommonFont}>
                                所属项目
                            </Text>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                  style={styles.detailCommonValuesFont}>
                                {problemItem.projectName}
                            </Text>
                        </View>

                        <View style={styles.detailTopDivider}/>

                        <View style={styles.detailCommonContainer}>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                  style={styles.detailCommonFont}>
                                项目经理
                            </Text>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                  style={styles.detailManagerValuesFont}>
                                {problemItem.projectManagerName}
                            </Text>
                        </View>
                        <View style={styles.detailTopDivider}/>

                        <View style={styles.detailCommonContainer}>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                  style={styles.detailCommonFont}>
                                提出人部门
                            </Text>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                  style={styles.detailCommonValuesFont}>
                                {problemItem.depName}
                            </Text>
                        </View>
                        <View style={styles.detailTopDivider}/>

                        <View style={styles.detailCommonContainer}>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                  style={styles.detailCommonFont}>
                                提出时间
                            </Text>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                  style={styles.detailCommonValuesFont}>
                                {problemItem.createTime}
                            </Text>
                        </View>

                        <View style={styles.detailTopDivider}/>

                        <View style={styles.detailCommonContainer}>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                  style={styles.detailCommonFont}>
                                计划解决时间
                            </Text>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                  style={styles.detailCommonValuesFont}>
                                {problemItem.planTime}
                            </Text>
                        </View>
                        <View style={styles.detailTopDivider}/>

                        <View style={styles.detailCommonContainer}>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                  style={styles.detailCommonFont}>
                                提出人
                            </Text>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                  style={styles.detailCommonValuesFont}>
                                {problemItem.createUserName}
                            </Text>
                        </View>
                        {/*<View style={styles.detailTopDivider}/>
                        {this._renderSolveDescription(problemItem)}*/}
                    </View>
                    <View style={styles.bottomContainer}>
                        <View style={styles.bottomContainerRight}>
                            {
                                problemItem && this._renderHelperCard(problemItem)
                            }
                        </View>
                    </View>

                </ScrollView>
                {this.renderOperateContainer(problemItem,isSolve)}

                <DialogBox ref={(dialogbox) => {
                    this.dialogbox = dialogbox
                }}/>
            </View>
        );
    }

    _renderSolveDescription(problemItem){
        if(!isNull(problemItem.createUserDesc)){
            return(
                <View style={styles.detailCommonContainer}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={styles.detailCommonFont}>
                        解决描述
                    </Text>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={styles.detailCommonValuesFont}
                          ellipsizeMode={'tail'} numberOfLines={1}>
                        {problemItem.createUserDesc}
                    </Text>
                </View>
            );
        }
    }

    renderOperateContainer(problemItem,isSolve) {
        if (isSolve) {
            return (
                <View style={styles.detailBottom}>
                    <View style={styles.bottomDivider}/>
                    <View style={styles.detailBottomChoose}>
                        <TouchableOpacity style={styles.detailChooseButton}
                                          onPress={() => {
                                              this.props.navigation.goBack()
                                          }}
                        >
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.detailBottomFont}>
                                取消
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.detailChoosedivider}/>
                        <TouchableOpacity style={styles.detailChooseButton}
                                          onPress={() => {
                                              this.requestSolveProblem(problemItem);
                                          }}>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.detailBottomFont}>
                                解决
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }

    _isCanSolve(problemItem){
        let needSolve = false;
        if (_USERNAME_ === problemItem.createUser) {
            needSolve = true;
        } else {
            if (problemItem.projectProblemList && problemItem.projectProblemList.length > 0) {
                for (var i = 0; i < problemItem.projectProblemList.length; i++) {
                    if (problemItem.projectProblemList[i].userName === _USERNAME_) {
                        if (problemItem.projectProblemList[i].status === 0) {
                            needSolve = true;
                        }
                    }
                }
            }
        }
        return problemItem.problemStatus === 0 && needSolve;
    }

    requestSolveProblem(item) {
        this.props.navigation.navigate('SolveProblemScene', {problemId: item.id})
    }

    renderProblemStatus(problemItem) {
        if (problemItem.problemStatus === 0) {
            return (
                <View style={styles.detailStateNoContainer}>
                    <View style={styles.detailStateNo}>
                    </View>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.detailStateNoFont}>
                        未解决
                    </Text>
                </View>
            );
        } else if (problemItem.problemStatus === 1) {
            return (
                <View style={styles.detailStateContainer}>
                    <View style={styles.detailState}>
                    </View>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.detailStateFont}>
                        已解决
                    </Text>
                </View>
            );
        }
    }


    /**
     * render Status
     * @returns {XML}
     * @private
     */
    _renderConfirmStatus(status,isPoster) {
        if (status == 1) {
            return (
                <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.confirmYesText}>
                    已解决
                    {this._renderPoster(isPoster)}
                </Text>
            )
        } else {
            return (
                <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.confirmNoText}>
                    未解决
                    {this._renderPoster(isPoster)}
                </Text>
            )
        }
    }

    _renderPoster(isPoster) {
        if (isPoster) {
            return (
                <Text style={styles.helperIsPoster}>
                    【提出人】
                </Text>
            );
        }
    }

    _renderConfirmRightTime(rightTime, createTime) {
        if (rightTime) {
            return (
                <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                      style={styles.helperRightText}>{rightTime}</Text>
            )
        } else {
            return (
                <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                      style={styles.helperRightText}>{createTime}</Text>
            )
        }
    }

    _renderIcon(status) {
        if (status == 1) {
            return (
                <Image
                    style={styles.helperCircle}
                    resizeMode={'contain'}
                    source={require('../../../../../images/common/icon_right.png')}
                />
            )
        } else {
            return (
                <Image
                    style={styles.helperCircle}
                    resizeMode={'contain'}
                    source={require('../../../../../images/common/icon_wro.png')}
                />
            )
        }
    }

    _renderCardByHelper(problemItem, item, projectProblemList, i) {
        return (
            <View style={styles.helperCard}>
                <View style={styles.helperCardContainer}>
                    <MutliImage
                        style={styles.helperHeaderImg}
                        defaultImage={require('../../../../../images/icon_header_default.png')}
                        uri={item.img}/>
                    <View style={styles.helperPro}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                              style={styles.helperNameText}>
                            {item.organizeName}
                            {this._renderHorizantal(item.organizeName)}
                            {item.nickName}
                        </Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            {this._renderConfirmStatus(item.status,problemItem.createUser === item.userName)}
                            {this._renderConfirmRightTime(item.rightTime, problemItem.createTime)}
                        </View>
                    </View>
                </View>
                {this._renderConfirmDescription(projectProblemList, i)}
            </View>
        )
    }

    _renderHorizantal(organizeName){
        if (!isNull(organizeName)) {
            return (
                <Text style={styles.helperNameText}>
                    -
                </Text>
            );
        }
    }

    /**
     * 解决描述
     * @param projectProblemList
     * @param i
     * @private
     */
    _renderConfirmDescription(projectProblemList, i) {
        if (projectProblemList.length > 0 && !isNull(projectProblemList[i].problemDescription)) {
            return (
                <View>
                    <View style={styles.helperCardLine}/>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.helperCardDescript}>
                        {projectProblemList[i].problemDescription}
                    </Text>
                </View>
            )
        } else {
            return (
                <View/>
            )
        }
    }

    _renderHelperCard(problemItem) {
        let helperCards = [];
        problemItem.projectProblemList && problemItem.projectProblemList.length > 0
        && problemItem.projectProblemList.map((item, i) => {
            helperCards.push(
                <View key={i} style={{flexDirection: 'row'}}>
                    <View style={styles.helperLeft}>
                        <View style={styles.lineTop}></View>
                        {this._renderIcon(item.status)}
                        {problemItem.projectProblemList.length !== i + 1 &&
                        <View style={styles.lineBottom}></View>}
                    </View>
                    {this._renderCardByHelper(problemItem, item, problemItem.projectProblemList, i)}
                </View>
            )
        });
        return helperCards;
    }

}

const styles = StyleSheet.create({
    scrollviewContainer: {
        flex: 1,
        backgroundColor: '#e7e7e7',
        flexDirection: 'column',
        marginBottom: 50
    },
    scrollviewContainerTwo: {
        flex: 1,
        backgroundColor: '#e7e7e7',
        flexDirection: 'column',
        marginBottom: 10
    },
    container: {
        flex: 1,
        backgroundColor: '#e7e7e7',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    detailTopContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginTop: 10,
        backgroundColor: 'white'
    },
    detailNameContainer: {
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 15,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    detailNameTopContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    detailCommonNameFont: {
        fontSize: 16,
        color: '#333333',
        width:270
    },
    detailCommonFont: {
        fontSize: 16,
        color: '#333333',
    },
    detailCommonValuesFont: {
        color: '#999999',
        fontSize: 16,
        textAlign: 'right',
        width: 230
    },
    detailTopNameValuesFont: {
        color: '#9b9b9b',
        fontSize: 16,
        marginTop: 15.5
    },
    detailManagerValuesFont: {
        color: '#29a1f7',
        fontSize: 16,
        textAlign: 'right',
        width: 230
    },
    detailStateContainer: {
        width: 54,
        height: 26,
        alignItems: 'center',
        justifyContent: 'center',
    },
    detailState: {
        width: 54,
        height: 26,
        backgroundColor: '#17c295',
        opacity: 0.2,
        borderRadius: 1,
    },
    detailStateFont: {
        fontSize: 14,
        color: '#17c295',
        position: 'absolute',
        backgroundColor: 'transparent',
    },
    detailStateNoContainer: {
        width: 54,
        height: 26,
        alignItems: 'center',
        justifyContent: 'center',
    },
    detailStateNo: {
        width: 54,
        height: 26,
        backgroundColor: '#f7b55e',
        opacity: 0.2,
        borderRadius: 1,
    },
    detailStateNoFont: {
        fontSize: 14,
        color: '#f7b55e',
        position: 'absolute',
        backgroundColor: 'transparent',
    },
    detailCommonContainer: {
        paddingTop: 14,
        paddingLeft: 15,
        paddingRight: 12,
        paddingBottom: 14,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    detailTopDivider: {
        backgroundColor: '#e5e5e5',
        height: 1,
        marginLeft: 15
    },
    detailChoosePlanTime: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    detailChooseLabel: {
        color: '#cccccc',
        fontSize: 16
    },
    detailArrowRight: {
        width: 10,
        height: 10,
        marginLeft: 5,
        alignSelf: 'center'
    },
    bottomContainer: {
        flexDirection: 'row',
        flex: 1
    },
    bottomContainerRight: {
        flex: 1,
        marginRight: 15,
    },
    helperCard: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 4,
        marginTop: 10,
    },
    helperCardContainer: {
        height: 76,
        flexDirection: 'row',
        alignItems: 'center'
    },
    helperCardLine: {
        height: 0.5,
        flex: 1,
        marginLeft: 78,
        marginRight: 15,
        backgroundColor: '#dcdcdc'
    },
    helperCardDescript: {
        marginLeft: 78,
        marginRight: 15,
        color: '#666666',
        fontSize: 15,
        marginTop: 8,
        ios: {lineHeight: 18},
        marginBottom: 5
    },
    helperHeaderImg: {
        width: 44,
        height: 44,
        borderRadius: 2,
        marginLeft: 19,
        marginRight: 19
    },
    helperPro: {
        flex: 1,
        flexDirection: 'column'
    },
    helperNameText: {
        fontSize: 15,
        color: '#666666',
        marginBottom: 15
    },

    helperIsPoster: {
        fontSize: 13,
        color: '#666666',
    },
    helperRightText: {
        fontSize: 12,
        color: '#999999',
        marginRight: 15
    },
    confirmYesText: {
        fontSize: 13,
        color: '#17c295'
    },
    confirmNoText: {
        fontSize: 13,
        color: '#f7b55e'
    },
    helperLeft: {
        width: 35,
        alignItems: 'center'
    },
    helperCircle: {
        width: 16,
        height: 16,
    },
    lineTop: {
        width: 1,
        height: 32,
        backgroundColor: '#29a1f7'
    },
    lineBottom: {
        width: 1,
        flex: 1,
        backgroundColor: '#29a1f7'
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


export default QuestionDetailScene;
