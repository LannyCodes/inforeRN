/**
 * Created by coderxuan on 2017/5/15.
 */
import {Dimensions} from 'react-native';
const StyleSheet = require('../../../base/StyleSheet');
const screenHeight = Dimensions.get('window').height;
// define your styles
const styles = StyleSheet.create({
    container: {
        height: screenHeight,
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 20
    },
    leftImg: {
        marginLeft: 20,
        marginTop: 20,
        width: 16,
        height: 16
    },
    content: {
        color: '#29a1f7',
        marginTop: 179,
        fontSize: 24
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 345,
        height: 44,
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
    },
    input: {
        flex:1,
        width: '70%',
        fontSize: 16,
        color: '#333333',
    },
    vertifyInput: {
        width: '60%',
        fontSize: 16,
        color: '#333333'
    },
    inputEndIcon: {
        marginRight: 10,
        width: 18,
        height: 18,
    },
    iconWrong:{
        marginRight: 10,
        width: 18,
        height: 18,
    },
    mimaManContainer: {
        width: 345,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    forgetMima: {
        color: '#999999',
        fontSize: 15,
        alignSelf: 'center',
        marginTop: 28
    },
    remMima: {
        color: '#d2d2d2',
        fontSize: 14
    },
    submit: {
        marginTop: 46.5
    },
    columnLine: {
        width: 1,
        height: 22,
        backgroundColor: '#cccccc',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 10,
        width: 90
    },
    otp: {
        marginRight: 10,
    },
    line: {
        height: 0.5,
        backgroundColor: '#dddddd'
    }
});

export default styles