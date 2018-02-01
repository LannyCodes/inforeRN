/**
 * Created by InforeXuan on 2017/5/22.
 */
import React, {Component} from 'react'

import {
    View,
    Text,
    Image,
    TouchableOpacity
}from "react-native"
const StyleSheet = require('../../base/StyleSheet')
class SearchView extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        ...View.propTypes,
        // 属性类型
        params: React.PropTypes.string,
        callback: React.PropTypes.func,
        searchText: React.PropTypes.string
    };

    static defaultProps = {
        // 默认属性值
        searchText: '搜索'
    };

    render() {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => {
                this.props.navigation.navigate(this.props.scene, {route: this.props.params});
            }}>
                <View style={styles.searchBox}>
                    <View style={styles.searchBtn}>
                        <Image source={require('../../images/common/icon_find.png')} resizeMode={'contain'}
                               style={styles.searchImage}/>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                              style={styles.searchText}>{this.props.searchText}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    searchBox: {
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 8,
        marginBottom: 9.5,
        paddingBottom: 10,
        backgroundColor: 'white'
    },
    searchBtn: {
        backgroundColor: '#eeeff3',
        borderRadius: 3,
        width: 359,
        height: 27,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    searchText: {
        fontSize: 14,
        color: '#999999',
        marginLeft: 3
    },
    searchImage: {
        width: 18,
        height: 15
    },
});

export default SearchView;