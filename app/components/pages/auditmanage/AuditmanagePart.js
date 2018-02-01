/**
 * Created by Lanny on 2017/5/25.
 */
import React, {Component} from 'react';
import {Dimensions, BackHandler, Platform, View} from 'react-native'
import ModalView from "./ModalView";
const StyleSheet = require('../../../base/StyleSheet');
const screenWidth = Dimensions.get('window').width;
const scale = screenWidth / 375.0;
export  default class AuditmanagePart extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this._onBackHandler.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._onBackHandler.bind(this));
    }

    _onBackHandler() {
        if (this.isOpen()) {
            this.close();
            return true;
        } else {
            return false;
        }
    }

    down() {
        this.drawerDown.drawerDown();
    }

    close() {
        this.drawerDown.drawerClose();
    }

    isOpen() {
        if (this.drawerDown === null) {
            return false
        } else {
            return this.drawerDown.isDown();
        }
    }

    render() {
        return (
            <ModalView drawerDownHeight={Platform.OS === 'ios' ? this.props.height * 42 : this.props.height * 50}
                       ref={(drawer) => {
                           this.drawerDown = drawer
                       }}>
                <View style={styles.contentContainer}>
                    {this.props.children}
                </View>
            </ModalView>
        )
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        width: screenWidth / scale,
        alignItems: 'center',
        backgroundColor: 'white'
    },
});