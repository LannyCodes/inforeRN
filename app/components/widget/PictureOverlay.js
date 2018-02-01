/**
 * Created by coderxuan on 2017/5/26.
 */
/**
 * <PictureOverlay
 cache={true} //如果是本地图片，必须设置为false
 ref={(po) => {this.po = po}}
 url={this.state.clickImageUri}
 />
 */
import React, {Component} from 'react';
import {
    Image, Dimensions, TouchableWithoutFeedback, View
} from 'react-native';
import {CachedImage} from "react-native-img-cache";
import OverlayContainer from './OverlayContainer';
const StyleSheet = require('../../base/StyleSheet');
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default class PictureOverlay extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    static propTypes = {
        ...View.propTypes,
        cache: React.PropTypes.bool,
    };

    static defaultProps = {
        cache: false,
    };

    _showModal() {
        this.oc.showModal();
    }

    _closeModal() {
        this.oc.closeModal()
    }

    _renderImage() {
        if (this.props.cache) {
            return <CachedImage
                resizeMode={Image.resizeMode.contain}
                style={styles.image}
                source={{uri: this.props.url}}/>
        } else {
            return <Image
                resizeMode={Image.resizeMode.contain}
                style={styles.image}
                source={{uri: this.props.url}}/>
        }
    }

    render() {
        return (
            <OverlayContainer
                ref={(oc) => {
                    this.oc = oc
                }}
                defaultClickClose={true}>
                <TouchableWithoutFeedback onPress={() => this._closeModal()}>
                    {
                        this._renderImage()
                    }
                </TouchableWithoutFeedback>
            </OverlayContainer>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        width: screenWidth,
        height: screenHeight,
        alignSelf: 'center',
    }
})