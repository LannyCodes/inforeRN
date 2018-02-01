/**
 * Created by coderxuan on 2017/5/31.
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    DeviceEventEmitter
} from 'react-native';
import { connect } from 'react-redux';
import TitleBar from '../../../widget/TitleBar'
import Toast from 'react-native-root-toast'
import SearchView from '../../../widget/SearchView'
import CheckBox from '../../../widget/PersonCheckBox'
import { saveQuestionbackPersons, saveQuestionbackRefresh } from '../../../../actions/questionback/QuestionBackAction'
import { saveTmpQuestionBackPersons } from '../../../../actions/tmpQuesBack/TmpQuesBackAction';
const StyleSheet = require('../../../../base/StyleSheet');
let isExpandArr = [];
let checkPersons = [];
let navigateTitle = '问题反馈';
let from;
class NoticePersonsScene extends Component {

    constructor(props: Object) {
        super(props);
        this.state = {
            refresh: false,
            departmentList: []
        };
    }

    componentDidMount() {
        let self = this;
        checkPersons = this.props.qbPersons;
        if (checkPersons.length > 0) {
            this.props.dispatch(saveTmpQuestionBackPersons(checkPersons))//将选择人数存到临时选择人数中
        }
        let { params } = this.props.navigation.state;
        from = params.route;
        if (from && from === 'repayment') {
            navigateTitle = '回款提醒'
        }
        self.setState({
            departmentList: params.subDepartment
        })
    }

    componentWillUnmount() {
        navigateTitle = '问题反馈';
    }

    _updatePerson(itemData, isCheck) {
        if (!isCheck) {
            var tmpPersons = this.props.tqbPersons.slice(0);
            tmpPersons.push(itemData);
            this.props.dispatch(saveTmpQuestionBackPersons(tmpPersons));
            return;
        } else {
            var tmpPersons = this.props.tqbPersons.slice(0);
            tmpPersons.map((item, i) => {
                if (item.userId === itemData.userId) {
                    tmpPersons.splice(i, 1);
                }
            })
            this.props.dispatch(saveTmpQuestionBackPersons(tmpPersons));
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TitleBar navigation={this.props.navigation}
                    title={navigateTitle}
                    leftImage={require('../../../../images/common/icon_bar_left.png')}
                    onLeftPress={() => this.props.navigation.goBack()}
                     />
                <ScrollView style={styles.scrollView}
                    scrollEventThrottle={16}>
                    <SearchView navigation={this.props.navigation} scene='SearchNoticePerson'
                        params={this.props.navigation.state.params.route} />
                    {this._renderContent()}
                </ScrollView>
                <View style={styles.commandContainer}>
                    <TouchableOpacity
                        style={styles.commandTextContainer}
                        onPress={() => {
                            this.props.navigation.navigate('SelectedNoticePersons');
                        }}>
                        <Text style={styles.commandText}>已选择：{this.props.tqbPersons.length}人</Text>
                    </TouchableOpacity>
                    <View style={styles.commandSeperationLine} />
                    <TouchableOpacity
                        style={styles.commandTextContainer}
                        onPress={() => {
                            this.props.dispatch(saveQuestionbackRefresh());
                            this.props.dispatch(saveQuestionbackPersons(this.props.tqbPersons));
                            DeviceEventEmitter.emit('NOTICE_CONFIRM', null);
                            isExpandArr = []
                        }}>
                        <Text style={styles.commandText}>确定</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    _renderContent() {
        let departData = this.state.departmentList.childrens;
        let usersData = this.state.departmentList.users;
        let departContent = [];
        if (departData) {
            departContent.push(
                departData && departData.map((item, i) => {
                    isExpandArr.push(false);
                    return (
                        <View style={{ flexDirection: 'column' }} key={i}>
                            <TouchableOpacity onPress={this._showorhideItems.bind(this, i)}>
                                <View style={styles.content}>
                                    <View style={styles.contentFont}>
                                        {this._renderArrowSample(isExpandArr[i])}
                                        <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                            style={styles.content_text}>{item.organizeName}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            {isExpandArr[i] &&
                                <View>
                                    {item.childrens && item.childrens.map((subItem, k) => {
                                        return (
                                            <TouchableOpacity key={k}
                                                onPress={this._jump2SubDepartment.bind(this, subItem)}>
                                                <View style={styles.subDepartContent}>
                                                    <View style={styles.subContent}>
                                                        <Text
                                                            style={styles.subDepart_name}>{subItem.organizeName}</Text>
                                                        <Image style={styles.subDepartImage}
                                                            source={require('../../../../images/common/icon_arrow_right.png')} />
                                                    </View>
                                                    {item.childrens.length !== k + 1 &&
                                                        <View style={[{ height: 1 }, styles.line]} />}
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>}
                            {isExpandArr[i] &&
                                <View>
                                    {item.users && item.users.map((subItem, j) => {
                                        let isChecked = false;
                                        if (this.props.tqbPersons && this.props.tqbPersons.length > 0) {
                                            this.props.tqbPersons.map((item, i) => {
                                                if (subItem.userId === item.userId) {
                                                    isChecked = true;
                                                }
                                            })
                                        }
                                        return (
                                            <View key={j} style={styles.subDepartContent}>
                                                <CheckBox
                                                    name={subItem.nickName}
                                                    uri={subItem.img}
                                                    onIntercept={
                                                        () => {
                                                            if (from === 'repayment' && this.props.tqbPersons.length != 0) {
                                                                Toast.show('只能选择一个用户');
                                                                return false
                                                            }
                                                            return true
                                                        }
                                                    }
                                                    style={styles.checkbox}
                                                    checkedImage={require('../../../../images/common/icon_cb_ok.png')}
                                                    unCheckedImage={require('../../../../images/common/icon_cb_cancle.png')}
                                                    onClick={(check) => this._updatePerson(subItem, check)}
                                                    isChecked={isChecked} />
                                                {item.users.length !== j + 1 && <View style={[{ height: 1 }, styles.line]} />}
                                            </View>
                                        )
                                    })}
                                </View>}
                        </View>
                    );
                })
            )
        }
        if (usersData) {
            departContent.push(
                usersData && usersData.map((subItem, l) => {
                    let isChecked = false;
                    if (this.props.tqbPersons && this.props.tqbPersons.length > 0) {
                        this.props.tqbPersons.map((qbItem, i) => {
                            if (subItem.userId === qbItem.userId) {
                                isChecked = true;
                            }
                        })
                    }
                    return (
                        <View key={l} style={styles.subDepartContent}>
                            <CheckBox
                                name={subItem.nickName}
                                uri={subItem.img}
                                onIntercept={
                                    () => {
                                        if (from === 'repayment' && this.props.tqbPersons.length != 0) {
                                            Toast.show('只能选择一个用户');
                                            return false
                                        }
                                        return true
                                    }
                                }
                                style={styles.checkbox}
                                checkedImage={require('../../../../images/common/icon_cb_ok.png')}
                                unCheckedImage={require('../../../../images/common/icon_cb_cancle.png')}
                                onClick={(check) => this._updatePerson(subItem, check)}
                                isChecked={isChecked}
                            />
                            {usersData.length !== l + 1 && <View style={[{ height: 1 }, styles.line]} />}
                        </View>
                    )
                }
                )
            )
        }
        return departContent;
    }

    _renderArrowSample(isExpand) {
        if (isExpand) {
            return <Image style={styles.content_image}
                source={require('../../../../images/common/icon_arrow_down.png')} />
        } else {
            return <Image style={styles.content_image}
                source={require('../../../../images/common/icon_arrow_right.png')} />
        }
    }

    _showorhideItems(i) {
        isExpandArr[i] = !isExpandArr[i]
        this.setState({
            refresh: true
        })
    }

    /**
     * 跳转到通讯录子页面
     * @param subDepartment
     * @private
     */
    _jump2SubDepartment(subDepartment) {
        this.props.navigation.navigate('NoticeSubPersons', { subDepartment: subDepartment, route: from })
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    checkbox: {
        width: 20,
        height: 20,
        marginRight: 13
    },
    scrollView: {
        backgroundColor: 'rgb(238, 239, 243)',
        flexDirection: 'column'
    },
    contentFont: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 46,
        backgroundColor: 'rgb(255,255,255)',
        paddingLeft: 13.4,
        paddingRight: 13.4,
        justifyContent: 'space-between'
    },
    content_image: {
        width: 15,
        height: 15,
    },
    content_text: {
        fontSize: 18,
        marginLeft: 14,
        color: '#333333'
    },
    contentEnd: {
        color: '#999999',
        fontSize: 12
    },
    subDepart: {
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 18,
        paddingRight: 3
    },
    subDepartItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    subDepart_image: {
        width: 36,
        height: 36,
    },
    subDepart_name: {
        fontSize: 16,
        color: 'rgb(51,51,51)',
        marginLeft: 8.5
    },
    subDepartContent: {
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    line: {
        marginLeft: 18,
        backgroundColor: '#dedfe0'
    },
    subDepartImage: {
        width: 14,
        height: 14,
        marginRight: 10
    },
    subContent: {
        height: 55,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 18
    },
    commandContainer: {
        height: 44,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
    },
    commandSeperationLine: {
        width: 1,
        height: 24,
        backgroundColor: '#e7e7e7'
    },
    commandTextContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    commandText: {
        fontSize: 16,
        color: '#29a1f7'
    }
});

//make this component available to the app
function mapStateToProps(state) {
    return {
        qbPersons: state.questionBackPersons.saveQBPersons,
        tqbPersons: state.tmpQBPersons.saveTQBPersons,
    }
}
export default connect(mapStateToProps)(NoticePersonsScene);