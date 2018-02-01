/**
 * Created by coderxuan on 2017/7/11.
 */
import React, {Component} from 'react';
import {Dimensions, Image, Text, View} from 'react-native'
const StyleSheet = require('../../../../base/StyleSheet');
export  default class ChangeDetailHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auditDetailData: {}
        }
    }

    render() {
        return (
            <View style={styles.pro_title_con}>
                <Image
                    resizeMode='contain'
                    style={styles.project_image}
                    source={require('../../../../images/common/icon_default_pro.png')}/>
                <View style={styles.prj_con1}>
                    <View style={styles.optionalShow}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.prj_title_text}
                              numberOfLines={1}>{this.props.processName}</Text>
                        {this.props.projectStage === 0 &&
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                              style={styles.prj_wait_approval}>待审核</Text>}
                    </View>
                </View>
                {this.renderApprovalState(this.props.projectStage)}
            </View>
        )
    }

    renderApprovalState(stage) {
        if (stage && stage === 1) {
            return (
                <Image
                    resizeMode='contain'
                    style={styles.statePic}
                    source={require('../../../../images/projectcheck/icon_check_ok.png')}
                />
            )
        } else if (stage && stage === 2) {
            return (
                <Image
                    resizeMode='contain'
                    style={styles.statePic}
                    source={require('../../../../images/projectcheck/icon_check_out.png')}
                />
            )
        }
    }
}

const styles = StyleSheet.create({
    pro_title_con: {//页面顶部
        backgroundColor: 'white',
        flexDirection: 'row',
        height: 87,
        paddingLeft: 15,
        alignItems: 'center',
    },
    project_image: {
        width: 65,
        height: 65,
        borderRadius: 3
    },
    prj_con1: {
        flex: 1,
        marginLeft: 15,
        flexDirection: 'column',
    },
    prj_title_text: {
        fontSize: 18,
        color: 'rgb(51,51,51)',
        textAlign: 'left',
        flex: 1
    },
    prj_period: {
        fontSize: 14,
        color: 'rgb(153,153,153)',
        marginTop: 14.5
    },
    statePic: {
        width: 60,
        height: 60,
        position: 'absolute',
        right: 15
    },
    optionalShow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    prj_wait_approval: {
        marginRight: 18,
        fontSize: 12,
        color: 'rgb(41,161,247)',
        paddingLeft: 9,
        paddingRight: 9,
        backgroundColor: '#fafafa',
        borderRadius: 2,
        borderColor: '#cccccc',
        borderWidth: 0.5,
        paddingTop: 5,
        paddingBottom: 5
    }
});