/**
 * Created by Infore.Wlun.
 */

import React, {Component} from 'react'
import {
    View,
    FlatList,
    TouchableHighlight,
    Image,
    Text
} from "react-native";
import TitleBar from '../../../widget/TitleBar'
const StyleSheet = require('../../../../base/StyleSheet');

class ProjectProfileList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visibleSwiper: false,
        }
    }

    _keyExtractor = (item, index) => index;

    _itemRowSeparator = () => {
        return <View style={styles.itemRowSeperate}/>;
    };

    render() {
        let data = this.props.navigation.state.params.data;
        return (
            <View style={styles.container}>
                <TitleBar navigation={this.props.navigation}
                          title='问题项目'
                          leftImage={require('../../../../images/common/icon_bar_left.png')}
                          onLeftPress={() => {
                              this.props.navigation.goBack()
                          }}/>
                <FlatList
                    keyExtractor={this._keyExtractor.bind(this)}
                    data={data}
                    renderItem={this.renderItemView.bind(this)}
                    ItemSeparatorComponent={this._itemRowSeparator}
                    contentContainerStyle={styles.allContainer}/>
            </View>
        )
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

    //返回itemView
    renderItemView({item}) {
        log('问题项目Item', item)
        return (
            <TouchableHighlight
                style={{flex: 1}}
                underlayColor={'#f1f1f1'} onPress={() =>
                this.props.navigation.navigate('ProjectDetail', {
                    projectId: item.id,
                })}>
                <View style={styles.itemContainer}>
                    <View style={styles.itemTextContent}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image
                                resizeMode='contain'
                                style={styles.projectImage}
                                source={isNull(item.imgUrl) ?
                                    require('../../../../images/projectmanage/icon_proimg_default.png') :
                                    {
                                        uri: item.imgUrl
                                    }}/>
                            <View style={styles.textContainer}>
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.itemFirstFont}
                                      numberOfLines={1} ellipsizeMode={'tail'}>{item.projectName}</Text>
                                {this._renderProjectManager(item.projectManagerName)}
                                {this._renderProblemStatus(item.problemCnt, item.problemSum)}
                            </View>
                        </View>
                        <Image
                            resizeMode={'contain'}
                            style={styles.statusImg}
                            source={statusImgList[item.status]}
                        />
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

const statusImgList =
    {
        1: require('../../../../images/common/icon_pm_common.png'),
        2: require('../../../../images/common/icon_pm_warn.png'),
        3: require('../../../../images/common/icon_pm_timeout.png')
    };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e7e7e7',
        flexDirection: 'column'
    },
    allContainer: {
        marginTop: 10
    },
    itemRowSeperate: {
        flexDirection: 'row',
        flex: 1,
        height: 0.8,
        marginLeft: 15,
        backgroundColor: '#e7e7e7'
    },
    itemContainer: {
        backgroundColor: '#fffefe',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        borderColor: '#f7f7f9',
        borderWidth: 1,
        borderRadius: 3,
        flexDirection: 'column',
    },
    statusImg: {
        width: 40,
        height: 40,
    },
    itemLine: {
        backgroundColor: '#e7e7e7',
        height: 1,
        marginLeft: 10,
        marginRight: 10
    },
    itemTextContent: {
        height: 96,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemFirstFont: {
        fontSize: 18,
        marginLeft: 10,
        width: 200,
        color: '#333333'
    },
    itemSecondFont: {
        fontSize: 14,
        marginLeft: 10,
        width: 200,
        color: '#999999',
        marginTop: 6
    },
    itemRightFont: {
        fontSize: 16,
        color: '#999999',
        marginRight: 10
    },
    itemLeftFont: {
        fontSize: 16,
        marginLeft: 10,
        color: '#333333'
    },
    projectImage: {
        width: 65,
        height: 65,
        marginLeft: 12
    },

});

export default ProjectProfileList