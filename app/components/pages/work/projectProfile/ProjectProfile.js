/**
 * Created by Infore.Wlun.
 */

import React, {Component} from 'react'
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import LoopScroll from '../../../widget/LoopScroll';
import Label from '../Label'
const StyleSheet = require('../../../../base/StyleSheet');
const screenWidth = Dimensions.get('window').width;
const scale = screenWidth / 375;
const width = screenWidth / scale;

//
class ProfileItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let element = this.props.element;
        let backgroundColor = '';
        let textColor = '';
        let text = '';
        switch (element.status) {
            case 1:
                backgroundColor = 'rgba(23,194,149,0.2)'
                textColor = 'rgb(23,194,149)';
                text = '正常';
            case 2:
                backgroundColor = 'rgba(247,181,94,0.2)';
                textColor = 'rgb(247,181,94)';
                text = '预警'
                break;
            case 3:
                backgroundColor = 'rgba(239,86,83,0.2)';
                textColor = 'rgb(239,86,83)';
                text = '延期'
                break;
            default:
                backgroundColor = 'white';
                textColor = 'white';
                break;
        }
        let problemCnt = isNull(element.problemCnt) ? 0 : element.problemCnt;
        let problemSum = isNull(element.problemSum) ? 0 : element.problemSum;
        return (
            <View
                style={[styles.itemContainer]}
            >
                <View>
                    <Text
                        adjustsFontSizeToFit={false}
                        allowFontScaling={false}
                        numberOfLines={1}
                        style={[styles.itemTitle]}>
                        【{element.projectName}】
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text
                            adjustsFontSizeToFit={false}
                            allowFontScaling={false}
                            numberOfLines={1}
                            style={[styles.itemMsg, {width: 100}]}>
                            经理:{element.projectManagerName}
                        </Text>
                        {
                            problemSum > 0 ? <Text
                                adjustsFontSizeToFit={false}
                                allowFontScaling={false}
                                numberOfLines={1}
                                style={styles.itemStatus}>
                                问题情况:{problemCnt > 0 ? '未解决' : '已解决'}
                            </Text> : <View />
                        }
                    </View>
                </View>
                <View style={styles.itemRight}>
                    <Label style={{backgroundColor: backgroundColor}} textStyle={{color: textColor}}
                           text={text}/>
                </View>
            </View>

        )
    }
}

class ProjectProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visibleSwiper: false,
        }
    }

    _renderSwiper = () => {
        return (
            <View>
                <LoopScroll
                    height={48}
                    width={screenWidth - 102}
                    horizontal={false}
                    autoplay={true}
                    loop={true}>
                    {
                        this.props.overViewData.map((element, index) => {
                            return <ProfileItem element={element} key={index} navigation={this.props.navigation}
                                                data={this.props.overViewData}/>
                        })
                    }
                </LoopScroll>
            </View>
        )
    }


    render() {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('ProjectProfileListScene', {data: this.props.overViewData})
                }}
            >
                <View style={styles.container}>
                    <View style={styles.leftContainer}>
                        <Text style={[styles.mainTitle, {marginBottom: 6}]}>问题</Text>
                        <Text style={styles.mainTitle}>项目</Text>
                    </View>
                    <View style={styles.seperationLine}/>
                    <View style={styles.rightContainer}>
                        {
                            this._renderSwiper()
                        }
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 68,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
    },
    leftContainer: {
        marginLeft: 16.5,
        justifyContent: 'center',
        marginRight: 12,
    },
    mainTitle: {
        fontSize: 18,
        color: '#333333',
    },
    seperationLine: {
        width: 1,
        height: 36,
        backgroundColor: '#eeeeee',
    },
    rightContainer: {
        marginRight: 10,
    },
    itemContainer: {
        width: width - 102,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    itemTitle: {
        width: width - 150,
        fontSize: 15,
        color: '#333333',
        marginBottom: 10.5,
    },
    itemMsg: {
        fontSize: 13,
        marginLeft: 7,
        color: "#999999"
    },
    itemStatus: {
        fontSize: 13,
        color: '#398dee',
    },
    itemTime: {
        fontSize: 10,
        color: "#999999",
    },
    itemRight: {
        alignSelf: 'flex-start',
        justifyContent: 'center',
    },
})

export default ProjectProfile