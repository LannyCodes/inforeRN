/** 
 * Created by Infore.Wlun. 
 */
const React = require('react');
const {
    Platform,
    TouchableOpacity,
    TouchableNativeFeedback,
} = ReactNative;

const Button = (props) => {
    if (Platform.OS === 'ios') {
        return <TouchableOpacity {...props}>
            {props.children}
        </TouchableOpacity>;
    } else {
        return <TouchableNativeFeedback
            delayPressIn={0}
            background={TouchableNativeFeedback.SelectableBackground()} // eslint-disable-line new-cap
            {...props}
        >
            {props.children}
        </TouchableNativeFeedback>;
    }

};

module.exports = Button;