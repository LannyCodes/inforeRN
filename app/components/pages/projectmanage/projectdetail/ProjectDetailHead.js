/**
 * Created by coderxuan on 2017/7/11.
 */
import React, {Component} from 'react';
import {Dimensions, Image, Text, View} from 'react-native'
const StyleSheet = require('../../../../base/StyleSheet');
const screenWidth = Dimensions.get('window').width;
import {SelectByPrimaryKeyHead} from '../../../../api/projectmanage/ProjectManageRequests'
export  default class ProjectDetailHead extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headerData: {}
        }
    }

    componentDidMount() {
        let self = this;
        let params = {id: this.props.id};
        new SelectByPrimaryKeyHead(params).start(function (data) {
            self.setState({
                headerData: data
            })
        })
    }

    render() {
        let headerData = this.state.headerData;
        return (
            <View style={styles.pro_title_con}>
                <Image
                    resizeMode='contain'
                    style={styles.project_image}
                    source={isNull(headerData.imgUrl) ?
                        require('../../../../images/projectmanage/icon_proimg_default.png') :
                        {uri: headerData.imgUrl}}/>
                <View style={styles.prj_con1}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.prj_title_text}
                          numberOfLines={1} ellipsizeMode={'tail'}>
                        {headerData.projectName}
                    </Text>
                    {headerData.planStartTime &&
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.prj_period}>
                        {`项目周期${ headerData.planStartTime}至${headerData.planFinishTime}`}
                    </Text>}
                </View>
            </View>
        )
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
    },
    prj_con1: {
        marginLeft: 15,
        flexDirection: 'column',
    },
    prj_title_text: {
        fontSize: 18,
        color: 'rgb(51,51,51)',
        textAlign: 'left',
        width: 250
    },
    prj_period: {
        fontSize: 14,
        color: 'rgb(153,153,153)',
        marginTop: 14.5,
        marginRight: 80
    },
    statePic: {
        width: 60,
        height: 60,
        position: 'absolute',
        right: 15
    }
});