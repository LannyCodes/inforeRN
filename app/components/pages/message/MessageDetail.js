/**
 * Created by mac4 on 2017/5/23.
 */
import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import TitleBar from '../../widget/TitleBar'
import {string2Date} from '../../../utils/Common'
import {UpdateMsgStatus} from '../../../api/message/QueryMsgRequest'
import {bindActionCreators} from 'redux';
import * as messageActions from '../../../actions/message/MessageAction';
import {connect} from 'react-redux';

const StyleSheet = require('../../../base/StyleSheet');

class MessageDetailScene extends Component {

    constructor(props: Object) {
        super(props)
    }

    componentDidMount() {
        let {params} = this.props.navigation.state
        let param = {
            messageId: params.item.id,
            userName: _USERNAME_
        };
        if (params.item.messageStatus != 1) {
            let {messageReaded} = this.props.messageActions;
            messageReaded(params.index);
            new UpdateMsgStatus(param).start(function (data) {
                log(data);
            }, function (error) {
                log(error);
            })
        }
    }

    render() {
        let {params} = this.props.navigation.state
        let item = params.item;
        return (
            <ScrollView style={styles.container}>
                <TitleBar navigation={this.props.navigation}
                          title='消息详情'
                          leftImage={require('../../../images/common/icon_bar_left.png')}
                          onLeftPress={() => this.props.navigation.goBack()}/>

                <View style={styles.topContainer}>
                    {!isNull(string2Date(item.createTime)) && <View style={styles.timeContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.timetext}>
                            {string2Date(item.createTime)}
                        </Text>
                    </View>}
                </View>

                <View style={styles.msgDetailContainer}>
                    <View style={styles.contentContainer}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.titletext}>
                            {item.messageTitle}
                        </Text>

                        <View style={styles.msgDivider}/>

                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.contenttext}>
                            {'       ' + item.messageContent}
                        </Text>
                    </View>

                    <View style={styles.msgEnd}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.msgAuthorText}>
                            {item.nickName}
                        </Text>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.msgPublishTime}>
                            {item.createTime}
                        </Text>
                    </View>
                </View>

            </ScrollView>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efefef'
    },
    topContainer: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    timeContainer: {
        height: 19,
        padding: 3,
        backgroundColor: '#dedede',
        borderRadius: 1.5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    timetext: {
        color: 'white',
        fontSize: 10
    },
    msgDetailContainer: {
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10,
        height: 204,
        borderRadius: 3,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    contentContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    titletext: {
        color: '#333333',
        fontSize: 16,
        marginTop: 17,
        marginLeft: 15,
        marginRight: 15
    },
    msgDivider: {
        height: 0.8,
        width: 345,
        backgroundColor: 'rgba(232,232,232,0.5)',
        marginTop: 8
    },
    contenttext: {
        color: '#999999',
        fontSize: 14,
        marginTop: 9.5,
        marginLeft: 5,
        marginRight: 5,
    },
    msgEnd: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
        paddingRight: 15,
        paddingBottom: 20
    },
    msgAuthorText: {
        fontSize: 12,
        color: '#999999',
    },
    msgPublishTime: {
        fontSize: 12,
        color: '#999999',
        marginTop: 10
    }
});

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        messageActions: bindActionCreators(messageActions, dispatch),
    }
}

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(MessageDetailScene);