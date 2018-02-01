/**
 * Created by InforeXuan on 2017/5/22.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
} from 'react-native'
const screenWidth = Dimensions.get('window').width;
const StyleSheet = require('../../../../../base/StyleSheet');
import CheckBox from '../../../../widget/CheckBox'

export default class StockItem extends Component {

    constructor(props) {
        super(props);
        let {itemData,status} = this.props;
        this.checkedNums = 0;
        this.preCheckedNums = 0;
        this.parentCheckBox = {};
        this.childrenCheckBox = [];
        this.isSelected = [];
        this.stockDetail = itemData;
        this.checkedTotalNums = 0;
        this.status = status;
        for(var i = 0;i < itemData.childrenList.length;i++){
            let child = itemData.childrenList[i];
            if(child.status === status){
                this.checkedTotalNums = this.checkedTotalNums + 1;
            }
        }
        for (var i = 0;i< itemData.childrenList.length;i++){
            this.isSelected[i] = false;
        }
        this.state = {
            isExpand: false
        }
    }

    static propTypes = {
        ...View.propTypes,
        onItemClick: React.PropTypes.func.isRequired
    };

    getSelected(){
        return this.isSelected;
    }

    render() {
        let stockItem = this.stockDetail;
        return (
            <View style={styles.fxContainer}>
                <View style={styles.fxBox}>
                    <View style={styles.fxDes}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                              style={styles.fxDesText}>{stockItem.parentCode}</Text>
                        <CheckBox
                            style={styles.checkbox}
                            ref={(cb) => {
                                this.parentCheckBox = cb
                            }}
                            checkedImage={require('../../../../../images/common/icon_cb_ok.png')}
                            unCheckedImage={require('../../../../../images/common/icon_cb_cancle.png')}
                            onClick={(check) => {
                                this.totalClick(!check);
                                let diffNum = this.checkedNums - this.preCheckedNums;
                                this.props.onItemClick(!check,diffNum);
                            }}
                            isChecked={false}
                        />

                    </View>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={styles.fxContentText}>{stockItem.parentDesc}</Text>
                    <View style={styles.line}/>

                    <TouchableOpacity onPress={() => {
                        this._expandSubList()
                    }}>
                        <View style={styles.sqzxButton}>
                            {this.renderStockButtonState()}
                        </View>

                    </TouchableOpacity>

                </View>

                {this.renderStockSubItem(stockItem)}

            </View>
        )
    }

    totalClick(checked) {
        if (this.isSelected && this.isSelected.length > 0) {
            for (var i = 0; i < this.isSelected.length; i++) {
                this.isSelected[i] = checked;
                if (this.childrenCheckBox && this.childrenCheckBox[i]) {
                    if(this.childrenCheckBox[i].state.isChecked !== checked) {
                        this.childrenCheckBox[i].setState({
                            isChecked: checked
                        })
                    }
                }
            }
        }

        if (checked) {
            this.preCheckedNums = this.checkedNums;
            this.checkedNums = this.checkedTotalNums;
        } else {
            this.preCheckedNums = this.checkedNums;
            this.checkedNums = 0;
        }
    }

    renderStockButtonState(){
        if (this.state.isExpand) {
            return (
                <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                      style={styles.sqzxButtonText}>收起子项</Text>
            )
        } else {
            return (
                <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                      style={styles.sqzxButtonText}>展开子项</Text>
            )
        }
    }

    _expandSubList(){
        this.setState({
            isExpand: !this.state.isExpand
        })
    }

    renderStockSubItem(items) {
        if (this.state.isExpand) {
            if (items.childrenList && items.childrenList.length > 0) {
                let self = this;
                let views = [];
                items.childrenList.map((item, i) => {
                    views.push(
                        self._renderStockSubItem(item,i)
                    );
                });
                return views;
            } else {
                <View/>
            }
        } else {
            <View/>
        }
    }

    onClick(checked){
        if(this.parentCheckBox){
            if(this.parentCheckBox.state.isChecked !== checked){
                this.parentCheckBox.onClick();
            }
        }
    }

    _renderStockSubItem(item,i){
        return (
            <View style={styles.zxContainer}>
                <View style={styles.fxBox}>
                    <View style={styles.fxDes}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                              style={styles.fxDesText}>{item.childrenCode}</Text>
                        {
                            item.status === this.status && <CheckBox
                                ref={(cb) => {
                                    this.childrenCheckBox[i] = cb
                                }}
                                style={styles.checkbox}
                                checkedImage={require('../../../../../images/common/icon_cb_ok.png')}
                                unCheckedImage={require('../../../../../images/common/icon_cb_cancle.png')}
                                onClick={(check) => {
                                    this.isSelected[i] = !check;
                                    if(!check) {
                                        this.preCheckedNums = this.checkedNums;
                                        this.checkedNums = this.checkedNums + 1;
                                    } else {
                                        this.preCheckedNums = this.checkedNums;
                                        this.checkedNums = this.checkedNums - 1;
                                    }
                                    let diffNum = this.checkedNums - this.preCheckedNums;
                                    if(this.checkedNums === this.checkedTotalNums){
                                        this.parentCheckBox.setState({
                                            isChecked : true
                                        });
                                        this.props.onItemClick(true,diffNum);
                                    } else {
                                        this.parentCheckBox.setState({
                                            isChecked : false
                                        });
                                        this.props.onItemClick(false,diffNum);
                                    }
                                }}
                                isChecked={this.isSelected[i]}
                            />
                        }
                    </View>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={styles.fxContentText}>{item.childrenDescribe}</Text>
                    <View style={styles.line}/>
                    <View style={styles.zxTextBox}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                              style={styles.zxText333}>采购数量</Text>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                              style={styles.zxText999}>{item.unitDosage}{item.unit}</Text>
                    </View>
                    <View style={styles.line}/>
                    <View style={styles.zxTextBox}>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                              style={styles.zxText333}>采购员</Text>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                              style={styles.zxText999}>{item.buyer}</Text>
                    </View>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    fxContainer: {
        marginTop: 10,
    },
    line: {
        height: 1,
        backgroundColor: '#e7e7e7'
    },
    zxContainer: {
        marginTop: 10,
        flex: 1
    },
    zxTextBox: {
        height: 44,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    zxText333: {
        color: '#333333',
        fontSize: 16
    },
    zxText999: {
        color: '#999999',
        fontSize: 16
    },
    fxBox: {
        backgroundColor: 'white',
        paddingTop: 14,
        paddingLeft: 15,
        paddingRight: 14
    },
    fxDesText: {
        fontSize: 16,
        width: '80%',
        color: '#333333'
    },
    fxContentText: {
        fontSize: 16,
        color: '#9b9b9b',
        marginTop: 10,
        marginBottom: 10
    },
    fxDes: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    checkbox: {
        width: 18,
        height: 18,
        marginLeft: 5
    },
    sqzxButton: {
        height: 41,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sqzxButtonText: {
        color: '#29a1f7',
        fontSize: 14
    }
})