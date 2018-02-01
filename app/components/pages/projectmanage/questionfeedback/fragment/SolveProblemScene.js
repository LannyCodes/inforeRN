/**
 * Created by InforeXuan on 2017/5/23.
 */
import React, {Component} from 'react'

import {
    View, Text, TextInput, TouchableOpacity,DeviceEventEmitter
}from "react-native"
import Toast from 'react-native-root-toast'
import TitleBar from '../../../../widget/TitleBar'
import {SolveProblemRequest} from '../../../../../api/projectmanage/ProjectManageRequests'
const StyleSheet = require('../../../../../base/StyleSheet');
let navigateTitle = '解决问题';
class SolveProblemScene extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comment: '',
        }
    }

    /**
     * 提交审核结果
     * @param comment
     * @private
     */
    _commit(comment) {
        let self = this;
        let {params} = this.props.navigation.state;
        let problemId = params.problemId;
        let requestparams = {problemId: problemId, userName: _USERNAME_, problemDescription:comment};
        new SolveProblemRequest(requestparams).start(function (solvedata) {
            Toast.show('解决问题成功');
            DeviceEventEmitter.emit('SOLVEQUESTION_SUCCESS', null);
            DeviceEventEmitter.emit('NEED_REFRESH', null);
            self.props.navigation.goBack();
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <TitleBar navigation={this.props.navigation}
                          title={navigateTitle}
                          leftImage={require('../../../../../images/common/icon_bar_left.png')}
                          onLeftPress={() => this.props.navigation.goBack()}
                          rightText={'确定'}
                          onRightPress={() => {
                              this._commit(this.state.comment);
                          }}/>

                <View style={styles.approvalInput}>
                    <TextInput
                        style={styles.input}
                        multiline={true}
                        defaultValue={this.state.comment}
                        onChangeText={(text) =>
                            this.setState({
                                comment: text
                            })
                        }
                        placeholder={'请输入解决问题描述'}
                        placeholderTextColor="#cccccc"
                        underlineColorAndroid='transparent'
                    />
                </View>
            </View>
        )
    }
}

// define your styles
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e7e7e7',
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    approvalInput: {
        flexDirection: 'column',
        height: 200,
        backgroundColor: 'white',
        padding: 15
    },
    input: {
        textAlignVertical: 'top',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flex: 1,
        fontSize: 14,
        color: '#333333',
    },
    bottomSuggestion: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    itemContainer: {
        width: 105,
        height: 28,
        borderRadius: 4,
        backgroundColor: '#e7e7e7',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15
    },
    itemSuggestion: {
        color: '#333333',
        fontSize: 12
    }
});

export default SolveProblemScene;