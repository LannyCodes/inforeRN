/**
 * Created by InforeXuan on 2017/6/8.
 */
import React, {Component} from 'react';
import {View} from 'react-native';
import {CustomCachedImage} from 'react-native-img-cache'
import ProgressImage from 'react-native-image-progress';
const StyleSheet = require('../../base/StyleSheet');
/**
 <MutiImage
 style={styles.subDepart_image}
 defaultImage={require('../../../images/icon_header_default.png')}
 uri={subItem.headerImg}/>
 */
class MutliImage extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        ...View.propTypes,
        defaultImage: React.PropTypes.any,
        uri: React.PropTypes.string,
        resizeMode: React.PropTypes.string,
    };

    static defaultProps = {
        resizeMode: 'cover',
        defaultImage: require('../../images/icon_header_default.png'),
        uri: ''
    };

    render() {
        return (
            <CustomCachedImage
                component={ProgressImage}
                style={this.props.style}
                resizeMode={this.props.resizeMode}
                source={isNull(this.props.uri) ?
                    this.props.defaultImage : {
                        uri: this.props.uri
                    }}
            />)
    }
}

export default MutliImage;