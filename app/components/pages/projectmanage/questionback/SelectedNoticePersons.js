/** 
 * Created by Infore.Wlun. 
 */

import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    ScrollView,
    FlatList,
    TouchableOpacity,
    DeviceEventEmitter
} from "react-native"
import { connect } from 'react-redux';
import TitleBar from '../../../widget/TitleBar'
import { saveTmpQuestionBackPersons } from '../../../../actions/tmpQuesBack/TmpQuesBackAction';
import { saveQuestionbackPersons, saveQuestionbackRefresh } from '../../../../actions/questionback/QuestionBackAction'
import DialogBox from '../../../widget/DialogBox';
const StyleSheet = require('../../../../base/StyleSheet');

class SelectedNoticePersonsScene extends Component {
    constructor(props) {
        super(props)
    }

    _deleteClick = (index) => {
        this.dialogbox.confirm({
            content: ['确定删除吗？'],
            ok: {
                text: '是',
                color: '#29a1f7',
                callback: () => {
                    var tmpPersons = this.props.tqbPersons.slice(0);
                    tmpPersons.splice(index, 1);
                    this.props.dispatch(saveTmpQuestionBackPersons(tmpPersons));
                }
            },
            cancel: {
                text: '否',
                color: '#cccccc',
            }
        })

    }

    renderItemView = ({ item, index }) => {

        return (
            <View style={styles.itemContainer}>
                <View style={styles.leftContainer}>
                    <Image
                        resizeMode='contain'
                        style={styles.headerImage}
                        source={{ uri: item.img }} />
                    <Text style={styles.name}>{item.nickName}</Text>
                </View>
                <TouchableOpacity
                    onPress={this._deleteClick.bind(this, index)}>
                    <Image
                        resizeMode='contain'
                        style={styles.selectedIcon}
                        source={require('../../../../images/projectmanage/icon_cancel.png')} />
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        let navigateTitle = '已选择数量：' + this.props.tqbPersons.length
        return (
            <View style={styles.container}>
                <TitleBar navigation={this.props.navigation}
                    title={navigateTitle}
                    rightText={'确定'}
                    leftImage={require('../../../../images/common/icon_bar_left.png')}
                    onLeftPress={() => this.props.navigation.goBack()}
                    onRightPress={() => {
                        this.props.dispatch(saveQuestionbackRefresh());
                        this.props.dispatch(saveQuestionbackPersons(this.props.tqbPersons));
                        DeviceEventEmitter.emit('NOTICE_CONFIRM', null);
                    }} />
                <ScrollView>
                    <FlatList
                        style={{ flex: 1 }}
                        keyExtractor={this._keyExtractor.bind(this)}
                        data={this.props.tqbPersons}
                        renderItem={this.renderItemView.bind(this)}
                        ItemSeparatorComponent={this._itemRowSeparator} />
                </ScrollView>
                <DialogBox ref={(dialogbox) => {
                    this.dialogbox = dialogbox
                }} />
            </View>
        )
    }

    _itemRowSeparator = () => {
        return <View style={styles.itemRowSeparator} />;
    }

    _keyExtractor = (item, index) => index;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e7e7e7',
    },
    itemRowSeparator: {
        height: 1,
        paddingLeft: 15,
        backgroundColor: '#dedfe0'
    },
    itemContainer: {
        height: 44,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    leftContainer: {
        flex: 1,
        marginLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerImage: {
        width: 36,
        height: 36,
    },
    name: {
        marginLeft: 8.5,
        fontSize: 16,
        color: '#333333'
    },
    selectedIcon: {
        width: 20,
        height: 20,
        marginRight: 15,
    },
    seperationLine: {
        height: 1,
        backgroundColor: '#dedfe0',
    }
})

function mapStateToProps(state) {
    return {
        qbPersons: state.questionBackPersons.saveQBPersons,
        tqbPersons: state.tmpQBPersons.saveTQBPersons,
    }
}

export default connect(mapStateToProps)(SelectedNoticePersonsScene);