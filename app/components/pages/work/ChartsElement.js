/**
 * Created by Infore.Wlun.
 */

import React, { Component } from 'react'
import {
    View,
    Image,
    Text,
    ScrollView,
    Dimensions,
} from "react-native"
import Echarts from '../../widget/echarts';
import PageControl from '../../widget/PageControl'
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { ScrollableTabBar, DefaultTabBar } from '../../widget/ScrollableTabViewBars'
import { QueryProjectStatisticsByOrg } from '../../../api/work/WorkRequests'
const screenWidth = Dimensions.get('window').width;
let width = screenWidth - 20;
const StyleSheet = require('../../../base/StyleSheet');

class BarChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: {},
        }
    }

    componentDidMount() {
        try {
            this._queryOrgMesssage(this.props.element)
        } catch (e) {
            log(e)
        }
    }

    _queryOrgMesssage = (element) => {
        let params = {
            orgKey: element.value,
            userId: _USERID_,
            userName: _USERNAME_,
        };
        let self = this;
        new QueryProjectStatisticsByOrg(params).start((data) => {
            if (data) {
                self.setState({
                    message: data,
                })
            }
        }, (error) => {
            log('下载详细信息失败')
        })
    }

    render() {
        let message = this.state.message;
        let data = [message.projectCnt, message.delayProjectCnt, message.childProjectCnt, message.saleCnt, message.purchaseCnt]
        let option = {
            color: ['rgb(57,141,238)'],
            title: {
                show: false,
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '20',
                top: '8',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['项目总数', '延期数', '分包数', '销售合同', '采购合同'],
                    axisTick: {
                        show: false,
                        alignWithLabel: true
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#979797",
                        }
                    },
                    axisLabel: {
                        magin: 5,
                        textStyle: {
                            color: '#666666',
                            fontSize: 10,
                        }
                    },
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    minInterval: 1,//自动计算的坐标轴最小间隔大小。例如可以设置成1保证坐标轴分割刻度显示成整数
                    axisLine: {
                        lineStyle: {
                            color: "#979797",
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            type: 'dotted',
                        }
                    }
                }
            ],
            series: [
                {
                    type: 'bar',
                    barWidth: '18',
                    data: data,
                    itemStyle: {
                        normal: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: 'rgb(57,141,238)' // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'rgb(120,182,253)' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            },
                            opacity: 0.8,
                        }
                    }
                }
            ]
        }
        return (
            <View
                style={{ flex: 1 }}>
                <Echarts
                    option={option}
                    height={160} />
            </View>
        )
    }
}

class ChartsElement extends Component {
    constructor(props) {
        super(props)
        this.state = {
            adrElement: '',
        }
    }

    static propTypes = {
        orgList: React.PropTypes.array
    };

    _renderIOSMain = () => {
        let arr = this.props.orgList.map((element, index) => {
            let nameIndex = element.name.lastIndexOf('事业部');
            let tabLabel = nameIndex > 0 ? element.name.slice(0, nameIndex) : element.name;
            return <BarChart
                key={index}
                tabLabel={tabLabel}
                element={element} />
        })
        return (
            <View
                style={[styles.mainContainer, { width: width }]}>
                <ScrollableTabView
                    locked={true}
                    renderTabBar={() => <ScrollableTabBar
                        style={{ height: 40 }}
                        tabStyle={{
                            height: 40,
                        }}
                        scrollWithoutAnimation={true}
                        activeTextColor='rgb(41,161,246)'
                        inactiveTextColor='rgb(153,153,153)'
                        backgroundColor="#fff"
                        underlineAlignLabel={true}
                        underlineStyle={{ backgroundColor: 'rgb(41,161,247)', height: 3 }} />
                    }>
                    {arr}
                </ScrollableTabView>
            </View>
        )
    }

    _renderAndroidMain = () => {
        let arr = this.props.orgList.map((element, index) => {
            let nameIndex = element.name.lastIndexOf('事业部');
            let tabLabel = nameIndex > 0 ? element.name.slice(0, nameIndex) : element.name;
            return <View
                key={index}
                tabLabel={tabLabel} />
        })
        let self = this;
        let element = this.props.orgList.length > 0 ? this.props.orgList[0] : '';
        return (
            <View
                style={[styles.mainContainer, { width: width }]}>
                <View style={{ height: 40 }}>
                    <ScrollableTabView
                        locked={true}
                        onChangeTab={(e) => {
                            let i = e ? e.i : 0;
                            this._barChart._queryOrgMesssage(this.props.orgList[i])
                        }}
                        renderTabBar={() => <DefaultTabBar
                            activeTab={0}
                            style={{
                                height: 40,
                            }}
                            tabStyle={{
                                height: 40,
                            }}
                            scrollWithoutAnimation={true}
                            activeTextColor='rgb(41,161,246)'
                            inactiveTextColor='rgb(153,153,153)'
                            backgroundColor="#fff"
                            underlineStyle={{ backgroundColor: 'rgb(41,161,247)', height: 3, width: 39 }} />}>
                        {arr}
                    </ScrollableTabView>
                </View>
                <BarChart element={element} ref={(barChart) => {
                    this._barChart = barChart
                }} />
            </View>
        )
    }

    _renderMainView = () => {
        if (this.props.orgList && this.props.orgList.length > 0) {
            if (_IOS_) {
                return this._renderIOSMain()
            } else {
                return this._renderAndroidMain()
            }
        } else {
            return this._renderPlaceHolder()
        }

    }

    _renderPlaceHolder = () => {
        return (
            <View style={[styles.placeHolder, { width: width }]}>
                <Image
                    style={styles.holderImage}
                    source={require('../../../images/work/icon_work_H.png')} />
            </View>
        )
    }

    _renderRadarChart = () => {
        let lineStyle = {
            normal: {
                width: 1,
                opacity: 0.5
            }
        };
        let probudgetData = this.props.probudgetData;
        // var dataBJ = [
        //     [probudgetData.operatingProfitTotal, probudgetData.grossProfitTotal, probudgetData.contractMoneyTotal, probudgetData.nonbusinessIncomeTotal, probudgetData.netProfitTotal],
        // ];
        var dataBJ = [
            [probudgetData.netProfitTotal, probudgetData.grossProfitTotal, probudgetData.operatingProfitTotal, probudgetData.nonbusinessIncomeTotal],
        ];
        // let max = Math.max(probudgetData.operatingProfitTotal, probudgetData.grossProfitTotal, probudgetData.contractMoneyTotal, probudgetData.nonbusinessIncomeTotal, probudgetData.netProfitTotal);
        let max = Math.max(probudgetData.operatingProfitTotal, probudgetData.grossProfitTotal, probudgetData.nonbusinessIncomeTotal, probudgetData.netProfitTotal);
        let operatingProfitTotalName = '营业利润总金额' + (isNull(probudgetData.operatingProfitTotal) ? '0' : probudgetData.operatingProfitTotal) + 'w';
        let grossProfitTotalName = '毛利润总金额' + (isNull(probudgetData.grossProfitTotal) ? '0' : probudgetData.grossProfitTotal) + 'w';
        let contractTotalName = '总销售合同数' + (isNull(probudgetData.contractTotal) ? '0' : probudgetData.contractTotal) + '个';
        let nonbusinessIncomeTotalName = '总营业外收入合计' + (isNull(probudgetData.nonbusinessIncomeTotal) ? '0' : probudgetData.nonbusinessIncomeTotal) + 'w';
        let netProfitTotalName = '净利润总金额' + (isNull(probudgetData.netProfitTotal) ? '0' : probudgetData.netProfitTotal) + 'w';
        let contractMoneyTotalName = '销售合同总金额' + (isNull(probudgetData.contractMoneyTotal) ? '0' : probudgetData.contractMoneyTotal) + 'w';
        let option = {
            title: {
                text: contractMoneyTotalName,
                textStyle: {
                    color: 'rgb(41,161,247)',
                    fontSize: 14,
                },
                padding: [
                    10,
                    0,
                    0,
                    20,
                ]
            },
            radar: {
                indicator: [
                    { name: netProfitTotalName, max: max },
                    { name: grossProfitTotalName, max: max },
                    { name: operatingProfitTotalName, max: max },
                    { name: nonbusinessIncomeTotalName, max: max },

                ],
                startAngle: 45,
                shape: 'circle',
                splitNumber: 5,
                name: {
                    show: false,
                    textStyle: {
                        color: 'rgb(102, 102, 102)',
                        fontSize: 12,
                    }
                },
                nameGap: 7, //指示器名距离指示器轴距离
                radius: screenWidth > 320 ? '75%' : '65%',
                splitLine: {
                    lineStyle: {
                        color: [
                            'white'
                        ].reverse()
                    }
                },
                splitArea: {
                    areaStyle: {
                        color: ['rgb(225,234,255)'],
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: 'white'
                    }
                }
            },
            series: [
                {
                    type: 'radar',
                    lineStyle: lineStyle,
                    data: dataBJ,
                    symbol: 'none',
                    animation: true,
                    itemStyle: {
                        normal: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: 'rgb(97,165,254)' // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'rgb(120,212,254)' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            }
                        }
                    },
                    areaStyle: {
                        normal: {
                            opacity: 0.5,
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: 'rgb(97,165,254)' // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'rgb(120,212,254)' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            }
                        }
                    }
                },
            ]
        }
        if (this.props.probudgetData) {
            return (
                <View style={{ width: width }}>
                    <Echarts
                        option={option}
                        height={207} />
                    <View style={[styles.radarIndicatorContainer, { alignSelf: 'flex-end', alignItems: 'flex-end', paddingRight: 10 }]}>
                        <Text style={[styles.radarIndicatorName]}>
                            净利润总金额
                            <Text style={styles.radarAcount}>{(isNull(probudgetData.netProfitTotal) ? '0' : probudgetData.netProfitTotal) + 'w'}</Text>
                        </Text>
                        <Text style={[styles.radarIndicatorName]}>
                            总营业外收入合计
                            <Text style={styles.radarAcount}>{(isNull(probudgetData.nonbusinessIncomeTotal) ? '0' : probudgetData.nonbusinessIncomeTotal) + 'w'}</Text>
                        </Text>
                    </View>
                    <View style={[styles.radarIndicatorContainer, { paddingLeft: 20 }]}>
                        <Text style={[styles.radarIndicatorName, {}]}>
                            毛利润总金额
                            <Text style={styles.radarAcount}>{(isNull(probudgetData.grossProfitTotal) ? '0' : probudgetData.grossProfitTotal) + 'w'}</Text>
                        </Text>
                        <Text style={[styles.radarIndicatorName, {}]}>
                            营业利润总金额
                            <Text style={styles.radarAcount}>{(isNull(probudgetData.operatingProfitTotal) ? '0' : probudgetData.operatingProfitTotal) + 'w'}</Text>
                        </Text>
                    </View>
                </View>
            )
        } else {
            return this._renderPlaceHolder();
        }

    }

    onAnimationEnd = (e) => {
        var offSetX = e.nativeEvent.contentOffset.x;
        var currentPage = offSetX / width;
        if(_SHOW_PROBUGETDATA_){
            this._pageControl.setIndex(currentPage)
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <ScrollView
                    scrollEnabled={true}
                    horizontal={true}
                    pagingEnabled={true}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    removeClippedSubviews={false}
                    onMomentumScrollEnd={(e) => {
                        this.onAnimationEnd(e)
                    }}
                >
                    {this._renderMainView()}
                    {this.props.probudgetData && this._renderRadarChart()}
                </ScrollView>
                {
                    _SHOW_PROBUGETDATA_ ?
                        <PageControl
                            color='#e7e7e7'
                            selectedColor='#29a1f7'
                            ref={(pageControl) => {
                                this._pageControl = pageControl
                            }}
                            style={styles.pageControl} /> : <View />
                }
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    mainContainer: {
        flex: 1,
    },
    pageControl: {
        bottom: 8,
        position: 'absolute',
    },
    textStyle: {
        marginTop: 20,
        marginLeft: 20,
        position: 'absolute',
        fontSize: 12,
        color: 'rgb(102,102,102)'
    },
    holderImage: {
        width: 80,
        height: 80,
    },
    placeHolder: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    radarIndicatorContainer: {
        position: 'absolute',
        flex: 1,
        height: 207,
        justifyContent: 'space-around',
        backgroundColor: 'rgba(255,255,255,0)'
    },
    radarIndicatorName: {
        // position: 'absolute',
        width: 80,
        fontSize: 14,
        color: 'rgb(102,102,102)',
    },
    radarAcount: {
        color: 'rgb(41,161,247)',
    }
})

export default ChartsElement;