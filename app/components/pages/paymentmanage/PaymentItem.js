/**
 * Created by Infore.Wlun.
 */

import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    Dimensions,
    TouchableHighlight
} from "react-native"
const StyleSheet = require('../../../base/StyleSheet');
const {width, height} = Dimensions.get('window');

// width = width/scale;

let imgSource;
export default class PaymentItem extends Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        navigation: React.PropTypes.object,
        itemData: React.PropTypes.object,
    }

    render() {
        let {navigation, itemData} = this.props
        switch (itemData.totalPaymentStatus) {
            case 1:
                imgSource = require('../../../images/paymentmanage/icon_whk.png');
                break;
            case 2:
                imgSource = require('../../../images/paymentmanage/icon_yhk.png');
                break;
            case 3:
                imgSource = require('../../../images/common/icon_yq.png');
            default:
                break;
        }
        return (
            <TouchableHighlight
                underlayColor={'#f1f1f1'}
                onPress={() => {
                    this.props.navigation.navigate('PaymentDetail', {
                        contractId: itemData.contractId,
                        projectId: itemData.projectId,
                    });
                }}>
                <View style={styles.itemContainer}>
                    <View style={styles.item_top_container}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={styles.item_image_container}>
                                <Image
                                    resizeMode='cover'
                                    style={styles.item_project_image}
                                    source={isNull(itemData.imgUrl) ? require('../../../images/paymentmanage/icon_project_holder.png') :
                                        {uri: itemData.imgUrl}}
                                />
                            </View>
                            <View style={styles.item_content_container}>
                                <Text
                                    style={styles.item_title}
                                    numberOfLines={0}
                                    allowFontScaling={false}>{itemData.projectName}</Text>
                                <Text
                                    allowFontScaling={false}
                                    style={[styles.item_content, {marginTop: 8}]}>
                                    编号:
                                    <Text
                                        allowFontScaling={false}>{itemData.contractNo}</Text>
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={[styles.item_content, {marginTop: 8}]}>
                                    金额:
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.item_amount}>{itemData.contractMoney}万</Text>
                                </Text>
                            </View>
                        </View>
                        <View style={{width: 39}}>
                            <Image resizeMode='contain' style={styles.state_image} source={imgSource}/>
                        </View>
                    </View>
                    <View style={styles.line}/>
                    <View style={styles.check_container}>
                        <View style={styles.last_item}>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                  style={styles.item_alert_text}>查看更多</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}


const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: 'white',
        borderRadius: 3,
        marginTop: 10
    },
    item_top_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    item_image_container: {
        marginTop: 15,
        marginLeft: 15,
        marginBottom: 15,
        marginRight: 10,
        justifyContent: 'center',
    },
    item_project_image: {
        width: 65,
        height: 65,
        borderRadius: 7,
    },
    item_content_container: {
        marginTop: 16,
        marginBottom: 15,
        marginRight: 10,
        width: 210,
    },
    item_title: {
        fontSize: 18,
        color: 'rgb(51,51,51)',
    },
    item_content: {
        fontSize: 14,
        color: 'rgb(153,153,153)',
    },
    item_amount: {
        color: 'rgb(247,181,94)',
    },
    last_item: {
        height: 37,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    check_container: {
        backgroundColor: 'white'
    },
    state_image: {
        width: 39,
        height: 39,
        alignSelf: 'flex-end',
        flexShrink: 0
        // flex:1,
    },
    item_alert_text: {
        marginLeft: 3,
        fontSize: 14,
        color: 'rgb(155,155,155)'
    },
    line: {
        height: 0.5,
        backgroundColor: '#e7e7e7',
        marginLeft: 10,
        marginRight: 10
    }
})