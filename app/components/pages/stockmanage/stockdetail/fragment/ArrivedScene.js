/**
 * Created by InforeXuan on 2017/5/19.
 */
import React, {Component} from 'react'

import {
    View,
    Text,
    ScrollView,
    TouchableHighlight,
    Image,
    Dimensions,
    FlatList,
    RefreshControl,
    ListView,
    TouchableWithoutFeedback,
}from "react-native"
import PictureOverlay from "../../../../widget/PictureOverlay";
import {CachedImage} from "react-native-img-cache";
import CheckBox from '../../../../widget/CheckBox'
import StockItem from './StockItem'
const StyleSheet = require('../../../../../base/StyleSheet');
import {StockDetailRequest} from '../../../../../api/stockmanage/StockManageRequests'
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
const screenWidth = Dimensions.get('window').width;
let pageNo = 1;
let totalCount = 0;
let localCount = 0;
class ArrivedScene extends Component {

    constructor(props) {
        super(props);
        this.stockItems = [];
        this.itemCheckedNumber = 0;
        this.isParentSelected = [];
        this.checkAllBox = {};
        this.checkBoxNumber = 0;
        this.state = {
            clickImageUri: '',
            isRefreshing: false,
            listData: [],
            checkednumber:0,
        }
    }

    static propTypes = {
        ...View.propTypes,
        onDialogClick: React.PropTypes.func.isRequired
    };

    componentDidMount() {
        this._onRefresh();
    }

    fetchFromServer(pageNo) {
        let self = this;
        let params = {
            pageNo: pageNo,
            pageSize: _PAGESIZE_,
            contractNo: this.props.contractId,
            status:1
        };
        // 获取数据
        new StockDetailRequest(params).start(function (data) {
            if (!isNull(data.list)&&data.list.length>0) {
                for(var i = 0;i < data.list.length;i++){
                    data.list[localCount + i]['index'] = localCount + i;
                    self.isParentSelected[localCount + i] = false;
                }
                localCount += data.list.length;
                totalCount = data.totalCount;
                self.setState({
                    listData: self.state.listData.concat(data.list),
                    isRefreshing: false,
                });
            } else {
                self.setState({
                    isRefreshing: false,
                })
            }
        }, function (error) {
            setTimeout(() => {
                self.setState({
                    isRefreshing: false,
                })
            }, _loading_)
        });
    }

    /**
     * refresh
     * @private
     */
    _onRefresh() {
        pageNo = 1;
        localCount = 0;
        this.state.listData = [];
        this.setState({
            isRefreshing: true,
        });
        this.fetchFromServer(pageNo)
    }

    _loadMore() {
        if (localCount < totalCount) {
            this.fetchFromServer(++pageNo)
        }
    }

    _photoUpdate() {
        let self = this;
        let childTrueId = [];
        this.state.listData.map((item, i) => {
            item.childrenList.map((subitem, j) =>{
                if (self.stockItems[i].getSelected()[j]) {
                    childTrueId.push(subitem.id);
                }
            });
        });
        log(childTrueId);
        this.props.onDialogClick(childTrueId);
    }

    render() {
        let self = this;
        let images = self.props.image;
        let imageArr = [];
        if (!isNull(images)) {
            imageArr = images.split(',');
        }
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.svContainer}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.isRefreshing}
                                    onRefresh={() => this._onRefresh()}
                                    tintColor="#3ca8fe"
                                    colors={['#3ca8fe']}
                                    progressBackgroundColor="#f1f1f1"
                                />
                            }>
                    {
                        !isNull(self.props.remark) &&
                        <View style={styles.qhmsContainer}>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.qhmsTitle}>
                                缺货描述
                            </Text>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.qhmsContent}>
                                {self.props.remark}
                            </Text>
                        </View>
                    }
                    {
                        imageArr && imageArr.length > 0 && <View style={styles.qhmsContainer}>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.qhmsTitle}>
                                出库单
                            </Text>
                            {this._renderImageList(imageArr)}
                        </View>
                    }
                    {
                        ((!this.state.listData || this.state.listData.length === 0) && this.state.isRefreshing === false) ? this.renderHolder() : this.renderList()
                    }
                </ScrollView>
                {this.renderOperateContainer()}
                <PictureOverlay
                    ref={(po) => {
                        this.po = po
                    }}
                    url={this.state.clickImageUri}
                />
            </View>
        )
    }

    renderHolder = () => {
        return (
            <ScrollView>
                <View
                    style={styles.holderContainer}>
                    <Image
                        resizeMode='cover'
                        style={styles.holderImage}
                        source={require('../../../../../images/common/icon_holder_rw.png')}/>
                    <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                          style={styles.holderMessage}>未查询到结果</Text>
                </View>
            </ScrollView>

        )
    };

    renderList = () => {
        return (
            <FlatList
                onEndReachedThreshold={0.1}
                onEndReached={() => this._loadMore()}
                keyExtractor={this._keyExtractor.bind(this)}
                data={this.state.listData}
                renderItem={this._renderStockItem.bind(this)}
            />
        )
    };


    _renderImageList(pics) {
        if (pics && pics.length > 0) {
            return (
                <ListView
                    dataSource={ds.cloneWithRows(pics)}
                    renderRow={this._renderImgItemView.bind(this)}
                    contentContainerStyle={styles.imgInnerListView}/>
            )
        } else {
            return <View/>
        }
    }

    _onImageClick(rowData) {
        if (rowData !== null && rowData !== '') {
            if (rowData.startsWith('http')) {
                this.setState({
                    clickImageUri: rowData
                });
                this.po._showModal();
            }
        }
    }

    _renderImgItemView(rowData) {
        if (isNull(rowData) || !rowData.startsWith('http')) {
            return <View/>
        } else {
            return (
                <TouchableWithoutFeedback onPress={() => this._onImageClick(rowData)}>
                    <CachedImage
                        resizeMode='cover'
                        style={styles.imgIcon}
                        source={{uri: rowData}}
                    />
                </TouchableWithoutFeedback>
            );
        }
    }


    _renderStockItem({item}) {
        let self = this;
        return(
            <StockItem
                ref={(stock) => {
                    this.stockItems[item.index] = stock
                }}
                itemData={item}
                status={1}
                onItemClick={(check,diffNum) => {
                    if(this.isParentSelected[item.index] !== check){
                        if(check){
                            this.itemCheckedNumber = this.itemCheckedNumber + 1;
                        } else {
                            this.itemCheckedNumber = this.itemCheckedNumber - 1;
                        }
                        this.isParentSelected[item.index] = check;
                    }
                    if(this.itemCheckedNumber === this.state.listData.length){
                        if(this.checkAllBox){
                            this.checkAllBox.setState({
                                isChecked: true
                            })
                        }
                    } else {
                        if(this.checkAllBox){
                            this.checkAllBox.setState({
                                isChecked: false
                            })
                        }
                    }
                    this.checkBoxNumber = this.checkBoxNumber + diffNum;
                    self.setState({
                        checkednumber: this.checkBoxNumber
                    });
                }}
            />
        );
    }

    renderOperateContainer() {
        let showConfirm = false;
        let self = this;
        self.state.listData.map((item, i) => {
            item.childrenList.map((subitem, j) =>{
                if (subitem.status === 1) {
                    showConfirm = true;
                }
            });
        });
        if (showConfirm) {
            return (
                <View style={styles.detailBottom}>
                    <View style={styles.bottomDivider}/>
                    <View style={styles.detailBottomChoose}>
                        <View style={styles.detailChooseButton}>
                            <CheckBox
                                style={styles.checkbox}
                                ref={(cb) => {
                                    this.checkAllBox = cb
                                }}
                                checkedImage={require('../../../../../images/common/icon_cb_ok.png')}
                                unCheckedImage={require('../../../../../images/common/icon_cb_cancle.png')}
                                onClick={(check) => {
                                    if (this.stockItems && this.stockItems.length > 0) {
                                        for (let checkbox of this.stockItems) {
                                            checkbox.onClick(!check);
                                        }
                                    }
                                }}
                                isChecked={false}
                            />
                            <Text style={styles.bottomAllChooseFont}>
                                全选
                            </Text>
                        </View>
                        <View style={styles.detailChoosedivider}/>
                        <View style={styles.detailChooseButton}>
                            <Text style={styles.bottomAllChooseFont}>
                                已选  ({this.state.checkednumber})
                            </Text>
                        </View>
                        <View style={styles.detailChoosedivider}/>
                        <TouchableHighlight style={{flex: 1}} underlayColor={'#f1f1f1'}
                                            onPress={() => this._photoUpdate()}>
                            <View style={styles.detailChooseButton}>
                                <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                                      style={styles.detailBottomFont}>
                                    确认未到货
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            );
        } else {
            return <View/>
        }
    }

    _keyExtractor = (item, index) => index;

    _itemRowSeparator = () => {
        return <View style={styles._itemRowSeparator}/>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e7e7e7',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    allContainer: {
        marginTop: 10,
    },
    allItemContainer: {
        marginTop: 10,
    },
    imgInnerListView: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 6.5,
        marginBottom: 6.5,
    },
    svContainer: {
        paddingBottom: 10
    },
    qhmsContainer: {
        marginTop: 10,
        backgroundColor: 'white',
        padding: 15
    },
    qhmsTitle: {
        fontSize: 16,
        color: '#333333'
    },
    qhmsContent: {
        fontSize: 16,
        color: '#9b9b9b',
        marginTop: 10
    },
    bottomDivider: {
        backgroundColor: '#e7e7e7',
        width: 375,
        height: 0.5,
    },
    detailBottom: {
        width: '100%',
        height: 44,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    detailBottomChoose: {
        flexDirection: 'row',
        height: 44,
        flex: 1,
        justifyContent:'flex-start',
        alignItems: 'center'
    },
    detailChooseButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomAllChooseFont:{
        fontSize:16,
        color:'#9b9b9b',
        marginLeft: 7
    },
    detailChoosedivider: {
        width: 0.5,
        height: 24,
        backgroundColor: '#e7e7e7'
    },
    detailBottomFont: {
        fontSize: 16,
        color: '#29a1f7'
    },
    imgIcon: {
        width: 109,
        height: 109,
        margin: 3
    },
    fxContainer: {
        marginTop: 10,
        width: screenWidth
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
    sqzxButton: {
        height: 41,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sqzxButtonText: {
        color: '#29a1f7',
        fontSize: 14
    },
    holderContainer: {
        marginTop: 150,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    holderImage: {
        width: 80,
        height: 80,
    }
    ,
    holderMessage: {
        fontSize: 15,
        color: 'rgb(166,166,166)',
        marginTop: 15
    },
    _itemRowSeparator: {
        height: 10
    }
});

export default ArrivedScene;