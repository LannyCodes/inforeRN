/**
 * Created by InforeXuan on 2017/5/24.
 */
import React, {Component} from 'react'
import {
    View, Text, TouchableOpacity, BackHandler, Dimensions, TouchableWithoutFeedback
}from "react-native"
import {USER_KEY} from '../../../constants/ContextConst'
import DrawerRight from '../../widget/DrawerRight'
import {DatePicker} from 'rnkit-actionsheet-picker';
import {FindTypeDictionaryRequest} from '../../../api/projectmanage/ProjectManageRequests'
const StyleSheet = require('../../../base/StyleSheet');
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const scale = screenWidth / 375.0;
const projectStatus = ['全部', '正常', '预警', '延期'];
class PmDrawerPart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projectType: [],
            projectStatusId: null,
            projectValue: null,
            date: null,
            selectedStartDate: '',
            selectedEndDate: ''
        }
    }

    componentDidMount() {
        let self = this;
        storage.load({
            key: USER_KEY.USERSTAGE_KEY,
        }).then(data => {
            let params = {userName: data.userName};
            new FindTypeDictionaryRequest(params).start(function (data) {
                if (data !== null && data.length > 0) {
                    self.setState({
                        projectType: data
                    });
                }

            });
        });
        BackHandler.addEventListener('hardwareBackPress', this._onBackHandler.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._onBackHandler.bind(this));
    }

    _onBackHandler() {
        if (this.isOpen()) {
            this.close();
            return true;
        } else {
            return false;
        }
    }

    startTime() {
        DatePicker.show({
            yearText: '年',
            monthText: '月',
            dayText: '日',
            datePickerMode: this.state.datePickerMode,
            onPickerConfirm: (selectedDate) => {
                this.setState({
                    selectedStartDate: selectedDate
                })
            },
        })
    }

    endDate() {
        DatePicker.show({
            yearText: '年',
            monthText: '月',
            dayText: '日',
            datePickerMode: this.state.datePickerMode,
            onPickerConfirm: (selectedDate) => {
                console.log(selectedDate);
                this.setState({
                    selectedEndDate: selectedDate
                })
            }
        })
    }

    open() {
        this.drawerRigth.drawerOpen();
    }

    close() {
        this.drawerRigth.drawerClose();
    }

    _confirm() {
        this.props.onConfirm && this.props.onConfirm(this.state.selectedStartDate, this.state.selectedEndDate, this.state.projectValue, this.state.projectStatusId);
        this.drawerRigth.drawerClose();
    }

    _reset() {
        this.setState({
            projectStatusId: null,
            projectValue: null,
            selectedStartDate: '',
            selectedEndDate: ''
        })
    }

    isOpen() {
        if (this.drawerRigth === null) {
            return false
        } else {
            return this.drawerRigth.isOpen();
        }
    }

    _renderStartTime() {
        if (this.state.selectedStartDate && this.state.selectedStartDate !== '') {
            return <TouchableOpacity onPress={() => this.startTime()}>
                <View style={styles.psTimeFront}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={styles.psTimeText}>{this.state.selectedStartDate}</Text>
                </View>
            </TouchableOpacity>
        } else {
            return <TouchableOpacity onPress={() => this.startTime()}>
                <View style={styles.psTimeFront}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.psTimeText}>开始时间</Text>
                </View>
            </TouchableOpacity>
        }
    }

    _renderEndTime() {
        if (this.state.selectedEndDate && this.state.selectedEndDate !== '') {
            return <TouchableOpacity onPress={() => this.endDate()}>
                <View style={styles.psTimeFront}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={styles.psTimeText}>{this.state.selectedEndDate}</Text>
                </View>
            </TouchableOpacity>
        } else {
            return <TouchableOpacity onPress={() => this.endDate()}>
                <View style={styles.psTimeFront}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.psTimeText}>结束时间</Text>
                </View>
            </TouchableOpacity>
        }
    }

    _renderProjectTime() {
        return (
            <View style={styles.psTime}>
                <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                      style={styles.drawerContentTextTitle}>计划开始</Text>
                <View style={styles.psTimeContainer}>
                    {this._renderStartTime()}
                    <View style={styles.psTimeBetween}/>
                    {this._renderEndTime()}
                </View>
            </View>
        )
    }

    _renderProjectStatus() {
        return (
            <View style={styles.psStatus}>
                <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                      style={styles.drawerContentTextTitle}>项目状态</Text>
                <View style={styles.psStatusContainer}>
                    {this._renderStatusItem()}
                </View>
            </View>
        )
    }

    _renderStatusItem() {
        let items = [];
        projectStatus.map((item, i) => {
            items.push(
                <TouchableWithoutFeedback key={i} onPress={() => this.setState({projectStatusId: i})}>
                    {this._renderStatusItemBingo(item, i)}
                </TouchableWithoutFeedback>
            )
        });
        return items;
    }

    _renderProjectType() {
        return (
            <View style={styles.psStage}>
                <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                      style={styles.drawerContentTextTitle}>项目类型</Text>
                <View style={styles.psStageContainer}>
                    {this._renderStageItem()}
                </View>
            </View>
        )
    }

    _renderStageItem() {
        let items = [];
        this.state.projectType.map((item, i) => {
            items.push(
                <TouchableWithoutFeedback key={i} onPress={() => this.setState({projectValue: item.value})}>
                    {this._renderStageItemBingo(item.name, item.value)}
                </TouchableWithoutFeedback>
            )
        });
        return items;
    }

    _renderStatusItemBingo(name, value) {
        if (value === this.state.projectStatusId) {
            return (
                <View style={styles.statusChooseItem}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={styles.statusChooseItemText}>{name}</Text>
                </View>
            )
        } else {
            return (
                <View style={styles.statusItem}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={styles.statusItemText}>{name}</Text>
                </View>
            )
        }
    }

    _renderStageItemBingo(name, value) {
        if (value === this.state.projectValue) {
            return (
                <View style={styles.stageChooseItem}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={styles.stageChooseItemText}>{name}</Text>
                </View>
            )
        } else {
            return (
                <View style={styles.stageItem}>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={styles.stageItemText}>{name}</Text>
                </View>
            )
        }
    }

    render() {
        return (
            <DrawerRight drawerWidth={336}
                         ref={(drawer) => {
                             this.drawerRigth = drawer
                         }}>
                <View style={styles.drawerContent}>
                    {this._renderProjectTime()}
                    {this._renderProjectStatus()}
                    {this._renderProjectType()}
                    <View style={styles.drawerBottomBtns}>
                        <TouchableOpacity style={styles.drawerBottomLeftBtn} onPress={() => this._reset()}>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                  style={styles.drawerBottomLeftBtnText}>重置</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.drawerBottomRightBtn} onPress={() => this._confirm()}>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                  style={styles.drawerBottomRightBtnText}>确定</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </DrawerRight>
        )
    }
}
const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    drawerContentTextTitle: {
        marginLeft: 15,
        fontSize: 16,
    },
    drawerBottomBtns: {
        position: 'absolute',
        top: screenHeight - 43 * scale,
        height: 44,
        width: 336,
        flexDirection: 'row'
    },
    drawerBottomLeftBtn: {
        width: 168,
        backgroundColor: 'white',
        borderColor: '#e7e7e7',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    drawerBottomRightBtn: {
        width: 168,
        backgroundColor: '#29a1f7',
        justifyContent: 'center',
        alignItems: 'center'
    },
    drawerBottomLeftBtnText: {
        color: '#333333',
        fontSize: 16,
        alignSelf: 'center'
    },
    drawerBottomRightBtnText: {
        color: '#ffffff',
        fontSize: 16,
    },
    psTime: {
        marginTop: 30
    },
    psTimeContainer: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    psTimeFront: {
        backgroundColor: '#e7e7e7',
        height: 28,
        width: 142,
        justifyContent: 'center',
        alignItems: 'center'
    },
    psTimeText: {
        fontSize: 12,
        color: '#333333'
    },
    psTimeBetween: {
        backgroundColor: '#999999',
        width: 8,
        height: 1,
        marginLeft: 6.5,
        marginRight: 6.5
    },
    psStatus: {
        marginTop: 20
    },
    psStatusContainer: {
        marginTop: 10,
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        flexWrap: 'wrap',
    },
    statusItem: {
        height: 28,
        marginLeft: 5,
        marginRight: 5,
        width: 95,
        marginTop: 10,
        backgroundColor: '#e7e7e7',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    statusChooseItem: {
        height: 28,
        marginLeft: 5,
        marginRight: 5,
        width: 95,
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 4,
        borderColor: '#29a1f7',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    statusItemText: {
        color: '#333333',
        fontSize: 12
    },
    statusChooseItemText: {
        color: '#29a1f7',
        fontSize: 12
    },
    psStage: {
        marginTop: 20
    },
    psStageContainer: {
        marginTop: 10,
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        flexWrap: 'wrap',
    },
    stageItem: {
        height: 28,
        marginLeft: 5,
        marginRight: 5,
        width: 95,
        marginTop: 10,
        backgroundColor: '#e7e7e7',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    stageChooseItem: {
        height: 28,
        marginLeft: 5,
        marginRight: 5,
        width: 95,
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 4,
        borderColor: '#29a1f7',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    stageItemText: {
        color: '#333333',
        fontSize: 12
    },
    stageChooseItemText: {
        color: '#29a1f7',
        fontSize: 12
    },
})
export default PmDrawerPart;