/**
 * Created by Lanny on 2017/5/24.
 */
'use strict';
import React, {Component, PropTypes} from 'react'

import {
    View, TouchableWithoutFeedback, Animated, Dimensions
}from "react-native";
const StyleSheet = require('../../../base/StyleSheet');
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const scale = screenWidth / 375.0;
export default class ModalView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentHeight: new Animated.Value(0),
            isShow: false,
        }

    }

    static PropTypes = {
        ...View.PropTypes,
        drawerDownHeight: React.PropTypes.number.isRequired,
    }

    static defaultProps = {
        drawerDownHeight: 104
    };

    drawerDown() {
        if (!this.isDown()) {
            this.setState({
                isShow: true,
            });
            Animated.timing(
                this.state.contentHeight,
                {
                    toValue: scale * this.props.drawerDownHeight,
                    duration: 250,
                }
            ).start();
        } else {
            this.drawerClose();
        }
    }

    drawerClose() {
        if (this.isDown()) {
            this.setState({
                contentHeight: new Animated.Value(0),
                isShow: false
            });
        }
    }

    isDown() {
        return this.state.contentHeight._value > 0 && this.state.isShow
    }

    render() {
        if (this.state.isShow) {
            return (
                <View style={styles.container}>
                    <Animated.View style={[styles.drawerContainer, {height: this.state.contentHeight}]}>
                        {this.props.children}
                    </Animated.View>
                    <TouchableWithoutFeedback onPress={() => this.drawerClose()}>
                        <View style={styles.bottomContainer}/>
                    </TouchableWithoutFeedback>
                </View>
            )
        } else {
            return <View/>;
        }

    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: screenWidth / scale,
        height: screenHeight / scale,
        top: 100 * scale,
        flexDirection: 'column',
    },
    drawerContainer: {
        width: screenWidth / scale,
        backgroundColor: 'white'
    },
    bottomContainer: {
        flex: 1,
        width: screenWidth + 100,
        opacity: 0.5,
        backgroundColor: '#000000'
    }
});