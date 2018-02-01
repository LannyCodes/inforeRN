/**
 * Created by Infore.Wlun.
 */

import React, {Component} from 'react'
import {
    View,
    Modal,
    ActivityIndicator,
    Dimensions,
} from "react-native"
const{width, height} = Dimensions.get('window');
const scale = width / 375.0;
const StyleSheet = require('../../base/StyleSheet');

class ModalHud extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalShow: this.props.visible,
        }
    }

    static propTypes = {
        visible: React.PropTypes.bool,
    };

    static defaultProps = {
        visible: false,
    };

    componentWillReceiveProps(nextProps) {
        this.state.modalShow !== nextProps.visible ? this.setState({
            modalShow: nextProps.visible
        }) : '';
    }

    _setModalVisible(visible) {
        this.setState({modalShow: visible});
    }

    render() {
        return (
            <Modal
                visible={this.state.modalShow}
                animationType={'fade'}
                onRequestClose={() => {
                    this._setModalVisible(false)
                }}
                transparent={true}>
                <View style={styles.container}>
                    <ActivityIndicator
                        size='large'
                        animating={this.state.modalShow}
                    />
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        position: 'absolute',
        top: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: width/scale,
        height: height/scale,
        backgroundColor: 'black',
        opacity: 0.5,
    },
    indicator: {
        alignItems: 'center',
        justifyContent: 'center',
    },

})

export default ModalHud