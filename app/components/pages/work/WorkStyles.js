/**
 * Created by zhang on 2017/5/15.
 */
const StyleSheet = require('../../../base/StyleSheet');

// define your styles
const styles = StyleSheet.create({
    xxzxPng: {
        width: 750 / 2,
        height: 472 / 2
    },
    container: {
        flex: 1,
        backgroundColor: '#e7e7e7',
        flexDirection: 'column',
    },
    topContainer: {
        flexDirection: 'column',
        width: 375,
        height: 176,
        backgroundColor: '#0f85ec',
        marginBottom: 15
    },
    topSearchEdit: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15,
        marginTop: 28
    },
    searchEdit: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: 345,
        height: 28,
        backgroundColor: '#38a2fc',
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#38a2fc'
    },
    input: {
        marginLeft: 7,
        padding: 0,
        alignItems: 'flex-end',
        width: '70%',
        fontSize: 16,
        color: '#ffffff',
    },
    inputIcon: {
        alignItems: 'center',
        marginLeft: 12.5,
        width: 18,
        height: 19,
    },
    menuIcon: {
        alignItems: 'center',
        width: 36,
        height: 36
    },
    topFlatList: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center'
    },
    topItem: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    menuTitle: {
        color: 'white',
        backgroundColor: 'transparent',
        textAlign: 'center',
        marginTop: 11,
        fontSize: 15
    },
    taskLabel: {
        color: '#999999',
        fontSize: 14,
        marginLeft: 10,
        marginTop: 8,
        marginBottom: 8
    },
    taskContainer: {
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    taskSubContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        marginLeft: 13,
    },
    taskUserInfo: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    taskUserName: {
        flexDirection: 'column',
        marginLeft: 13
    },
    taskState: {
        fontSize: 12,
        color: '#29a1f7'
    },
    taskIcon: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    taskName: {
        fontSize: 16,
        color: '#9b9b9b',
        marginBottom: 5
    },
    taskTime: {
        fontSize: 12,
        color: '#939393'
    },
    taskApproveContainer: {
        width: 60,
        height: 26,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
    },
    taskApprove: {
        width: 60,
        height: 26,
        backgroundColor: '#29a1f7',
        opacity: 0.2,
        borderRadius: 1,
    },
    taskApproveFont: {
        fontSize: 12,
        color: '#29a1f7',
        position: 'absolute',
        backgroundColor: 'transparent',
    },
    taskPlanContainer: {
        width: 60,
        height: 26,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
    },
    taskPlan: {
        width: 60,
        height: 26,
        backgroundColor: '#17c295',
        opacity: 0.2,
        borderRadius: 1,
    },
    taskPlanFont: {
        fontSize: 12,
        color: '#17c295',
        position: 'absolute',
        backgroundColor: 'transparent',
    },
    taskMsgContainer: {
        width: 60,
        height: 26,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
    },
    taskMsg: {
        width: 60,
        height: 26,
        backgroundColor: '#f7b55e',
        opacity: 0.2,
        borderRadius: 1,
    },
    taskMsgFont: {
        fontSize: 12,
        color: '#f7b55e',
        position: 'absolute',
        backgroundColor: 'transparent',
    },
    taskContentText: {
        color: '#333333',
        fontSize: 16,
        marginTop: 11,
        marginLeft: 58.5,
        marginRight: 21,
        marginBottom: 10
    },
    taskDivider: {
        backgroundColor: '#e6e6e6',
        height: 0.5,
        flex: 1
    },
    taskLook: {
        flex: 1,
        height: 37,
        marginTop: 10
    },
    taskLookText: {
        color: '#9b9b9b',
        fontSize: 13
    },
    taskRowSeperate: {
        height: 10
    },
    taskColumnSeperate: {
        width: 28
    },
    imgColumnSeparator: {
        width: 4.5
    },
    imgInnerListView: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 6.5,
        marginBottom: 6.5,
        marginLeft: 15
    },
    imgIcon: {
        width: 112,
        height: 112
    },
    modalcontainer: {
        flex: 1,
        backgroundColor: '#e7e7e7',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    scrollContent: {
        flex: 1,
    },
    holderContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    holderImage: {
        width: 80,
        height: 80,
    },
    holderMessage: {
        fontSize: 15,
        color: 'rgb(166,166,166)',
        marginTop: 15
    },
    chartElement: {
        height: 207,
    },
    innerContainerStyle: {
        marginLeft: 10,
        marginRight: 10
    },
    chartContainer:{
        height:207,
        alignItems:'center',
        justifyContent:'center',
    },
});

export default styles