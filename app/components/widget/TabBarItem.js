/**
 * Created by coderxuan on 2017/5/6.
 */
import React, {Component} from 'react';
import {View, Image} from 'react-native';
import Message from './MessagePoint'
import {connect} from 'react-redux';
const StyleSheet = require('../../base/StyleSheet')

class TabBarItem extends Component {
    static propTypes = {
        ...View.propTypes,
        messageCount: React.PropTypes.number,
        showMessage: React.PropTypes.bool,
    };

    static defaultProps = {
        messageCount: 0,
        showMessage: false
    };

    render() {
        log('获取到消息个数', this.props.msgCount)
        let selectedImage = this.props.selectedImage ? this.props.selectedImage : this.props.normalImage
        return (
            <View>
                <Image
                    resizeMode={'contain'}
                    source={this.props.focused
                        ? selectedImage
                        : this.props.normalImage}
                    style={styles.image}
                />
                <Message
                    isShow={this.props.showMessage}
                    contentStyle={{position: 'absolute', marginLeft: 15, marginTop: -5}}
                    mesCount={this.props.msgCount}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        width: 26,
        height: 24
    }
});


function mapStateToProps(state) {
    return {
        msgCount: state.message.saveMsgCount
    }
}
export default connect(mapStateToProps)(TabBarItem);