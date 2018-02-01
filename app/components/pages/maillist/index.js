/**
 * Created by coderxuan on 2017/5/6.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    RefreshControl
} from 'react-native';
import TitleBar from '../../widget/TitleBar'
import SearchView from '../../widget/SearchView'
import MutiImage from '../../widget/MutliImage'
import {GetInforeMailListRequest} from '../../../api/maillist/MailListRequests'
const StyleSheet = require('../../../base/StyleSheet');
let isExpandArr = []
class MailScene extends Component {

    constructor(props: Object) {
        super(props);
        this.state = {
            refresh: false,
            isRefreshing: false,
            departmentList: []
        };
    }

    componentDidMount() {
        this._onRefresh();
    }


    /**
     * refresh
     * @private
     */
    _onRefresh() {
        let self = this;
        self.setState({isRefreshing: true});
        let params = {organizeId: '0'};
        // 获取数据
        new GetInforeMailListRequest(params).start(function (data) {
            self.setState({
                departmentList: data.organizeList,
            });
            setTimeout(() => {
                self.setState({
                    isRefreshing: false,
                })
            }, _loading_)
        }, function (error) {
            setTimeout(() => {
                self.setState({
                    isRefreshing: false,
                })
            }, _loading_)
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <TitleBar navigation={this.props.navigation}
                          title='通讯录'/>
                <SearchView navigation={this.props.navigation} scene={'SearchMail'}/>
                <ScrollView style={styles.scrollView}
                            scrollEventThrottle={16}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.isRefreshing}
                                    onRefresh={() => this._onRefresh()}
                                    tintColor="#3ca8fe"
                                    colors={['#3ca8fe']}
                                    progressBackgroundColor="#f1f1f1"
                                />
                            }>
                    {this._renderContent()}
                </ScrollView>
            </View>
        );
    }

    _renderContent() {
        let departData = this.state.departmentList;
        if (!departData) {
            return;
        }
        return this.state.departmentList && this.state.departmentList.map((item, i) => {
                isExpandArr.push(true)
                return (
                    <View style={{flexDirection: 'column'}} key={i}>
                        <TouchableOpacity onPress={this._showorhideItems.bind(this, i)}>
                            <View style={styles.content}>
                                <View style={styles.contentFont}>
                                    {this._renderArrowSample(isExpandArr[i])}
                                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                          style={styles.content_text}>{item.organizeName}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        {isExpandArr[i] &&
                        <View>
                            {item.childrens && item.childrens.map((subItem, k) => {
                                return (
                                    <TouchableOpacity key={k} onPress={this._jump2SubDepartment.bind(this, subItem)}>
                                        <View style={styles.subDepartContent}>
                                            <View style={styles.subContent}>
                                                <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                                      style={styles.subDepart_name}>{subItem.organizeName}</Text>
                                                <Image style={styles.subDepartImage}
                                                       source={require('../../../images/common/icon_arrow_right.png')}/>
                                            </View>
                                            {item.childrens.length !== k + 1 &&
                                            <View style={[{height: 1}, styles.line]}/>}
                                        </View>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>}
                        {isExpandArr[i] &&
                        <View>
                            {item.users && item.users.map((subItem, j) => {
                                return (
                                    <TouchableOpacity key={j}
                                                      onPress={this._showMailPersonDetail.bind(this, item.organizeName, subItem)}>
                                        <View style={styles.subDepartContent}>
                                            <View style={styles.subDepart} key={j}>
                                                <MutiImage style={styles.subDepart_image}
                                                           defaultImage={require('../../../images/icon_header_default.png')}
                                                           uri={subItem.img}/>
                                                <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                                      style={styles.subDepart_name}>{subItem.nickName}</Text>
                                            </View>
                                            {item.users.length !== j + 1 && <View style={[{height: 1}, styles.line]}/>}
                                        </View>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>}
                    </View>
                );
            });
    }

    _renderArrowSample(isExpand) {
        if (isExpand) {
            return <Image style={styles.content_image}
                          source={require('../../../images/common/icon_arrow_down.png')}/>
        } else {
            return <Image style={styles.content_image}
                          source={require('../../../images/common/icon_arrow_right.png')}/>
        }
    }

    _showorhideItems(i) {
        isExpandArr[i] = !isExpandArr[i]
        this.setState({
            refresh: true
        })
    }

    /**
     * 进入个人详情页面
     * @param departName
     * @param itemData
     * @private
     */
    _showMailPersonDetail(departName, itemData) {
        this.props.navigation.navigate('MailPersonDetail', {
            userId: itemData.userId
        })
    }

    /**
     * 跳转到通讯录子页面
     * @param subDepartment
     * @private
     */
    _jump2SubDepartment(subDepartment) {
        log('subDepartment', subDepartment)
        this.props.navigation.navigate('SubDepartMail', {subDepartment: subDepartment})
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    scrollView: {
        backgroundColor: 'rgb(238, 239, 243)',
        flexDirection: 'column'
    },
    contentFont: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 46,
        backgroundColor: 'rgb(255,255,255)',
        paddingLeft: 13.4,
        paddingRight: 13.4,
        justifyContent: 'space-between'
    },
    content_image: {
        width: 15,
        height: 15,
    },
    content_text: {
        fontSize: 18,
        marginLeft: 14,
        color: '#333333'
    },
    contentEnd: {
        color: '#999999',
        fontSize: 12
    },
    subDepart: {
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 18
    },
    subDepart_image: {
        width: 36,
        height: 36,
        borderRadius: 18
    },
    subDepart_name: {
        fontSize: 16,
        color: 'rgb(51,51,51)',
        marginLeft: 8.5
    },
    subDepartContent: {
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    line: {
        marginLeft: 18,
        backgroundColor: '#dedfe0'
    },
    subDepartImage: {
        width: 14,
        height: 14,
        marginRight: 10
    },
    subContent: {
        height: 55,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 18
    },
});

//make this component available to the app
export default MailScene;