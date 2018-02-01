/**
 * Created by InforeXuan on 2017/5/24.
 */
/**
 * <DrawerRight drawerWidth={336}
 ref={(drawer) => {
                             this.drawerRigth = drawer
                         }}>
 <View style={styles.drawerContent}>
 自定义内容
 </View>
 </DrawerRight>
 */
import React, {Component} from 'react';
import {Dimensions, View, Animated, TouchableWithoutFeedback} from 'react-native';
const StyleSheet = require('../../base/StyleSheet');
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const scale = screenWidth / 375.0;
class DrawerRight extends Component {

    constructor(props: Object) {
        super(props);
        this.state = {
            contentWidth: new Animated.Value(0),
            isShow: false,
        };
    }

    static propTypes = {
        ...View.propTypes,
        drawerWidth: React.PropTypes.number.isRequired
    };

    static defaultProps = {
        drawerWidth: 336
    };

    drawerOpen() {
        if (!this.isOpen()) {
            this.setState({
                isShow: true
            });
            Animated.timing(
                this.state.contentWidth,
                {
                    toValue: scale * this.props.drawerWidth,
                    duration: 250,
                },
            ).start();
        }
    }

    drawerClose() {
        if (this.isOpen()) {
            this.setState({
                contentWidth: new Animated.Value(0),
                isShow: false
            });
        }
    }

    isOpen() {
        if (this.state.contentWidth._value > 0 && this.state.isShow) {
            return true
        } else {
            return false
        }
    }

    render() {
        if (this.state.isShow) {
            return (
                <View style={styles.container}>
                    <View style={styles.contentContainer}>
                        <TouchableWithoutFeedback onPress={() => this.drawerClose()}>
                            <View style={styles.leftContainer}/>
                        </TouchableWithoutFeedback>
                        <Animated.View style={[styles.rightContainer, {width: this.state.contentWidth}]}>
                            {this.props.children}
                        </Animated.View>
                    </View>
                </View>
            )
        } else {
            return <View/>
        }
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: screenWidth / scale,
        height: screenHeight / scale,
    },
    contentContainer: {
        flexDirection: 'row',
        height: screenHeight / scale,
    },
    leftContainer: {
        height: screenHeight / scale,
        flex: 1,
        backgroundColor: '#000000',
        opacity: 0.5
    },
    rightContainer: {
        height: screenHeight / scale,
        backgroundColor: 'white',
        opacity: 1
    }
});

export default DrawerRight;