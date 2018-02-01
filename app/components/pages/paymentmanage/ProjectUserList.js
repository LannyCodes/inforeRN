/** 
 * Created by Infore.Wlun. 
 */

import React, { Component } from 'react';
import {
    View,
    FlatList,
} from "react-native";
import { connect } from 'react-redux';
import TitleBar from '../../widget/TitleBar';
import CheckBox from '../../widget/PersonCheckBox';
import Toast from 'react-native-root-toast';
import { GetProjectMemberListRequest } from '../../../api/projectmanage/ProjectManageRequests';
import {saveQuestionbackPersons, saveQuestionbackRefresh} from '../../../actions/questionback/QuestionBackAction';
import { saveTmpQuestionBackPersons } from '../../../actions/tmpQuesBack/TmpQuesBackAction';
const StyleSheet = require('../../../base/StyleSheet');

class ProjectUserList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listData: [],
        }
    }

    componentDidMount() {
        let params = {
            projectId: this.props.navigation.state.params.projectId,
        }
        let self = this;
        new GetProjectMemberListRequest(params).start((data) => {
            if (data) {
                console.log(data);
                self.setState({
                    listData: data,
                })
            }
        }, (error) => {

        })
    }

    componentWillUnmount() {
        // this.props.dispatch(saveTmpQuestionBackPersons([]));
    }

    renderItemView = ({ item }) => {
        let from = this.props.navigation.state.params.route;
        let isChecked = false;
        if (this.props.tqbPersons && this.props.tqbPersons.length > 0) {
            this.props.tqbPersons.map((qbItem, i) => {
                if (qbItem.userId === item.userId) {
                    isChecked = true;
                }
            })
        }
        return (
            <View style={styles.subDepartContent}>
                <CheckBox
                    name={item.projectUserName}
                    uri={item.memberHeaderImg}
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
                    checkedImage={require('../../../images/common/icon_cb_ok.png')}
                    unCheckedImage={require('../../../images/common/icon_cb_cancle.png')}
                    onClick={(check) => this._updatePerson(item, check)}
                    isChecked={isChecked}
                />
                <View style={[{ height: 1 }, styles.line]} />
            </View>
        )
    }

    _updatePerson = (itemData, isCheck) => {
        if (!isCheck) {
            var tmpPersons = this.props.tqbPersons.slice(0);
            let item = {
                nickName:itemData.projectUserName,
                userName:itemData.projectUser,
                userId:itemData.userId,
            }
            tmpPersons.push(item);
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

    _sure = () => {
        this.props.dispatch(saveQuestionbackRefresh());
        this.props.dispatch(saveQuestionbackPersons(this.props.tqbPersons));
        this.props.navigation.goBack();
    }

    _goBack = () => {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <TitleBar
                    navigation={this.props.navigation}
                    title='项目成员'
                    leftImage={require('../../../images/common/icon_bar_left.png')}
                    rightText={'确定'}
                    onLeftPress={() => this._goBack()}
                    onRightPress={() => this._sure()} />
                <FlatList
                    keyExtractor={this._keyExtractor.bind(this)}
                    data={this.state.listData}
                    renderItem={this.renderItemView} 
                    contentContainerStyle={styles.innerContainerStyle}/>
            </View>
        )
    }
    _keyExtractor = (item, index) => index;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e7e7e7',
    },
    checkbox: {
        width: 20,
        height: 20,
        marginRight: 13
    },
    line: {
        marginLeft: 18,
        backgroundColor: '#dedfe0'
    },
    subDepartContent: {
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    innerContainerStyle: {
        marginTop: 6,
    },
})

function mapStateToProps(state) {
    return {
        tqbPersons: state.tmpQBPersons.saveTQBPersons,
    }
}

export default connect(mapStateToProps)(ProjectUserList)