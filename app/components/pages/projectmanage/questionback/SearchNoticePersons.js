/**
 * Created by Infore.Wlun.
 */

import React, {Component} from 'react'
import {
    View, TextInput, Text, TouchableOpacity,
    StatusBar, Image, FlatList,
} from "react-native"
import {CachedImage} from "react-native-img-cache";
import {connect} from 'react-redux';
import CheckBox from '../../../widget/PersonCheckBox';
import Toast from 'react-native-root-toast';
import {GetProblemUserByNickNameRequest} from '../../../../api/maillist/MailListRequests';
import {saveTmpQuestionBackPersons} from '../../../../actions/tmpQuesBack/TmpQuesBackAction';
const StyleSheet = require('../../../../base/StyleSheet');
let searchKey = '';
let checkPersons = [];

class SearchNoticePersons extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isRefreshing: false,
            mailList: [],
        }
    }

    componentDidMount() {
        checkPersons = this.props.tqbPersons.slice(0);
    }

    _clickSearch = () => {
        let self = this;
        let params = {nickName: searchKey, userName: _USERNAME_};
        new GetProblemUserByNickNameRequest(params).start(function (data) {
            self.setState({
                mailList: data
            })
        })
    }

    _updatePerson = (itemData, isCheck) => {
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

    _renderImgItemView({item}) {
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
                    name={item.nickName}
                    uri={item.img}
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
                    onClick={(check) => this._updatePerson(item, check)}
                    isChecked={isChecked}
                />
                <View style={[{height: 1}, styles.line]}/>
            </View>
        );
    }

    _itemRowSeparator = () => {
        return <View style={styles.itemRowSeparator}/>;
    }

    _keyExtractor = (item, index) => index;

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    translucent={true}
                    backgroundColor="#0f85ec"
                    barStyle='light-content'/>
                <View style={styles.topSearchEdit}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => {
                        this.props.navigation.goBack()
                    }}>
                        <Image
                            resizeMode='cover'
                            style={styles.leftImg}
                            source={require('../../../../images/common/icon_bar_black_left.png')}
                        />
                    </TouchableOpacity>
                    <View style={styles.searchEdit}>
                        <CachedImage
                            resizeMode='cover'
                            style={styles.inputIcon}
                            source={require('../../../../images/common/icon_find.png')}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="搜索"
                            autoFocus={true}
                            returnKeyType='search'
                            returnKeyLabel='search'
                            placeholderTextColor="#999999"
                            underlineColorAndroid='transparent'
                            onSubmitEditing={() => {
                                this._clickSearch()
                            }}
                            onChangeText={(text) => {
                                searchKey = text;
                            }}
                        />
                    </View>
                    <View style={styles.cancelContainer}>
                        <TouchableOpacity activeOpacity={0.5} onPress={() => {
                            this._clickSearch()
                        }}>
                            <Text style={styles.topBlueCancel}>
                                搜索
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    style={{marginTop: 10}}
                    keyExtractor={this._keyExtractor.bind(this)}
                    data={this.state.mailList}
                    renderItem={this._renderImgItemView.bind(this)}
                    ItemSeparatorComponent={this._itemRowSeparator}
                    contentContainerStyle={styles.innerContainerStyle}
                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    topSearchEdit: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 28
    },
    searchEdit: {
        backgroundColor: '#eeeff3',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 28,
        width: '70%',
        borderRadius: 3,
        flex: 1,
        borderWidth: 1,
        borderColor: '#eeeff3'
    },
    input: {
        marginLeft: 7,
        padding: 0,
        alignItems: 'flex-end',
        width: '70%',
        fontSize: 16,
        color: '#333333',
    },
    inputIcon: {
        alignItems: 'center',
        marginLeft: 12.5,
        width: 18,
        height: 19,
    },
    leftImg: {
        width: 16,
        height: 16,
    },
    topBlueCancel: {
        color: '#38a2fc',
        fontSize: 16
    },
    cancelContainer: {
        paddingLeft: 10,
        paddingRight: 10
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
    checkbox: {
        width: 20,
        height: 20,
        marginRight: 13
    },
})

function mapStateToProps(state) {
    return {
        tqbPersons: state.tmpQBPersons.saveTQBPersons,
    }
}

export default connect(mapStateToProps)(SearchNoticePersons)