/**
 * Created by InforeXuan on 2017/5/22.
 */
import React, {Component} from 'react';
import {
    View, Text, Image, TouchableHighlight
} from 'react-native'
import {styles} from './PmStyles'
const statusImgList =
    {
        1: require('../../../images/common/icon_pm_common.png'),
        2: require('../../../images/common/icon_pm_warn.png'),
        3: require('../../../images/common/icon_pm_timeout.png')
    };
export default class ProjectItem extends Component {
    _renderProblemStatus(problemCnt, problemSum) {
        if (isNull(problemSum) || problemSum === 0) {
            return (
                <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                      style={styles.itemSecondFont}
                      numberOfLines={1}
                      ellipsizeMode={'tail'}>问题情况：<Text
                    style={[styles.itemSecondFont, {color: '#999999'}]}>无</Text></Text>
            )
        } else {
            if (isNull(problemCnt) || problemCnt === 0) {
                return (
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={styles.itemSecondFont}
                          numberOfLines={1}
                          ellipsizeMode={'tail'}>问题情况：<Text
                        style={[styles.itemSecondFont, {color: '#17c295'}]}>已解决</Text></Text>
                )
            } else {
                return (
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={styles.itemSecondFont}
                          numberOfLines={1}
                          ellipsizeMode={'tail'}>问题情况：
                        <Text
                            style={[styles.itemSecondFont, {color: '#f7b55e'}]}>未解决</Text>
                    </Text>
                )
            }
        }
    }

    _renderProjectManager(projectManagerName) {
        if (!isNull(projectManagerName)) {
            return (
                <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                      style={styles.itemSecondFont}
                      numberOfLines={1}
                      ellipsizeMode={'tail'}>项目经理：{projectManagerName}</Text>
            )
        } else {
            return (
                <View/>
            )
        }
    }

    render() {
        let {itemData, navigation} = this.props;
        return (
            itemData && <TouchableHighlight
                style={{flex: 1}}
                underlayColor={'#f1f1f1'} onPress={() =>
                navigation.navigate('ProjectDetail', {
                    projectId: itemData.id,
                })}>
                <View style={styles.itemContainer}>
                    <View style={styles.itemTextContent}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image
                                resizeMode='contain'
                                style={styles.projectImage}
                                source={isNull(itemData.imgUrl) ?
                                    require('../../../images/projectmanage/icon_proimg_default.png') :
                                    {
                                        uri: itemData.imgUrl
                                    }}/>
                            <View style={styles.textContainer}>
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemFirstFont}
                                      numberOfLines={1} ellipsizeMode={'tail'}>{itemData.projectName}</Text>
                                {this._renderProjectManager(itemData.projectManagerName)}
                                {this._renderProblemStatus(itemData.problemCnt, itemData.problemSum)}
                            </View>
                        </View>
                        <Image
                            resizeMode={'contain'}
                            style={styles.statusImg}
                            source={statusImgList[itemData.status]}
                        />
                    </View>
                    <View style={styles.itemButtonContent}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                              style={styles.itemButtonText}>查看更多</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}