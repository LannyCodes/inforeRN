/**
 * Created by coderxuan on 2017/5/15.
 */
import React, {Component} from 'react';
import {
    View,
    Image,
    TouchableHighlight,
    Text
} from 'react-native'
import MutiImage from './MutliImage'
const CB_ENABLED_IMAGE = require('../../images/login/icon_eye.png');
const CB_DISABLED_IMAGE = require('../../images/login/icon_invalid.png');
const StyleSheet = require('../../base/StyleSheet')
export default class CheckBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: this.props.isChecked,
        }
    }

    static propTypes = {
        ...View.propTypes,
        onClick: React.PropTypes.func.isRequired,
        onIntercept: React.PropTypes.func,
        isChecked: React.PropTypes.bool,
        header: React.PropTypes.string,
        name: React.PropTypes.string,
    };

    static defaultProps = {
        isChecked: false,
        header: '',
        name: ''
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.isChecked !== this.state.isChecked) {
            this.setState({
                isChecked: nextProps.isChecked
            })
        }
    }

    _getImg() {
        if (this.state.isChecked) {
            return this.props.checkedImage ? this.props.checkedImage : CB_ENABLED_IMAGE;
        } else {
            return this.props.unCheckedImage ? this.props.unCheckedImage : CB_DISABLED_IMAGE;
        }
    }

    _genCheckedImage() {
        let source = this._getImg();
        return (
            <Image style={this.props.style} source={source} resizeMode='contain'/>
        )
    }


    onClick() {
        if (!this.state.isChecked) {
            if (this.props.onIntercept && !this.props.onIntercept()) {
                return;
            }
        }
        this.setState({
            isChecked: !this.state.isChecked
        });
        this.props.onClick(this.state.isChecked);
    }

    render() {
        return (
            <TouchableHighlight onPress={() => this.onClick()} underlayColor={'#f7f7f7'}>
                <View style={styles.subDepart}>
                    <View style={styles.subDepartItem}>
                        <MutiImage style={styles.subDepart_image}
                                   resizeMode={'cover'}
                                   defaultImage={require('../../images/icon_header_default.png')}
                                   uri={this.props.uri}/>
                        <Text adjustsFontSizeToFit={false} allowFontScaling={false}
                              style={styles.subDepart_name}>{this.props.name}</Text>
                    </View>
                    {this._genCheckedImage()}
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    subDepart: {
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 18,
        paddingRight: 3
    },
    subDepartItem: {
        flexDirection: 'row',
        alignItems: 'center',
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
});