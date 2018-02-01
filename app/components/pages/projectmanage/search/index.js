/**
 * Created by InforeXuan on 2017/5/19.
 */
import React, {Component} from 'react'

import {
    View, TextInput, Text, TouchableOpacity,
    StatusBar, Image, ListView
}from "react-native"
const StyleSheet = require('../../../../base/StyleSheet');
import {CachedImage} from "react-native-img-cache";
import {GetProjectManageListRequset} from '../../../../api/projectmanage/ProjectManageRequests'
import ProjectItem from '../ProjectItem'
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
let searchText = '';
class SearchProjectScene extends Component {

    componentDidMount() {

    }

    constructor(props) {
        super(props);
        this.state = {
            projectList: {},
        }
    }

    render() {
        let data = this.state.projectList;
        return (
            <View style={styles.container}>
                <StatusBar
                    translucent={true}
                    backgroundColor="#0f85ec"
                    barStyle='light-content'/>
                <View style={styles.topSearchEdit}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => {
                        this.props.navigation.goBack()
                    }}>
                        <Image
                            resizeMode='cover'
                            style={styles.leftImg}
                            source={require('../../../../images/common/icon_bar_black_left.png')}
                        />
                    </TouchableOpacity>
                    <View style={styles.searchEdit}>
                        <CachedImage
                            resizeMode='cover'
                            style={styles.inputIcon}
                            source={require('../../../../images/common/icon_find.png')}
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => {
                                searchText = text
                            }}
                            placeholder="请输入项目名称"
                            autoFocus={true}
                            placeholderTextColor="#999999"
                            underlineColorAndroid='transparent'
                        />
                    </View>
                    <View style={styles.cancelContainer}>
                        <TouchableOpacity activeOpacity={0.5} onPress={() => {
                            this.queryProjectByName(this)
                        }}>
                            <Text adjustsFontSizeToFit={false} allowFontScaling={false} style={styles.topBlueCancel}>
                                搜索
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <ListView dataSource={ds.cloneWithRows(data)}
                          renderRow={(rowData) => <ProjectItem
                              navigation={this.props.navigation}
                              itemData={rowData}/>}
                          showsVerticalScrollIndicator={false}
                          enableEmptySections={true}
                          removeClippedSubviews={false}
                />

            </View>
        )
    }

    queryProjectByName(self) {
        let searchKey = searchText;
        let params = {projectName: searchKey, userName: _USERNAME_};
        new GetProjectManageListRequset(params).start(function (data) {
            self.setState({
                projectList: data.list,
            });
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f9',
        flexDirection: 'column'
    },
    topSearchEdit: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 28
    },
    searchEdit: {
        backgroundColor: '#eeeff3',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 28,
        width: '70%',
        borderRadius: 3,
        flex: 1,
        borderWidth: 1,
        borderColor: '#eeeff3'
    },
    input: {
        marginLeft: 7,
        padding: 0,
        alignItems: 'flex-end',
        width: '70%',
        fontSize: 16,
        color: '#333333',
    },
    inputIcon: {
        alignItems: 'center',
        marginLeft: 12.5,
        width: 18,
        height: 19,
    },
    leftImg: {
        width: 16,
        height: 16,
    },
    topBlueCancel: {
        color: '#38a2fc',
        fontSize: 16
    },
    cancelContainer: {
        paddingLeft: 10,
        paddingRight: 10
    }
})

export default SearchProjectScene;