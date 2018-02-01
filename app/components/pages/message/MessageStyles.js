/**
 * Created by zhang on 2017/5/15.
 */
const StyleSheet = require('../../../base/StyleSheet');

// define your styles
const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#e7e7e7',
            flexDirection: 'column',
        },
        scrollView: {
            flex: 1,
            backgroundColor: 'rgb(238, 239, 243)',
            flexDirection: 'column'
        },
        msgContainer: {
            backgroundColor: 'white',
            height: 68,
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        msgSubContainer: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flex: 1,
            marginLeft: 10
        },
        msgRowSeparator: {
            height: 0.5,
            marginLeft: 10
        },
        msgIcon: {
            width: 50,
            height: 50,
            borderRadius:25
        },
        msgText: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            marginLeft: 10
        },
        msgName: {
            color: '#333333',
            fontSize: 16,
            width: 100
        },
        msgContent: {
            color: '#999999',
            fontSize: 14,
            marginTop: 5,
            width: 234,
            marginBottom: 5
        },
        msgTime: {
            color: '#b2b2b2',
            marginRight: 15,
            fontSize: 12,
        },
        scrollContent: {
            flex: 1
        },
        holderContainer: {
            marginTop: 150,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        holderImage: {
            width: 80,
            height: 80,
        }
        ,
        holderMessage: {
            fontSize: 15,
            color: 'rgb(166,166,166)',
            marginTop:15
        },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75
    },
    backRightBtnLeft: {
        backgroundColor: '#e7e7e7',
        right: 75
    },
    backRightBtnRight: {
        backgroundColor: '#FF3B2F',
        right: 0
    },
    backTextWhite: {
        color: '#FFF'
    },
    })
;

export default styles