/**
 * Created by InforeXuan on 2017/5/22.
 */

const StyleSheet = require('../../../base/StyleSheet');
// define your styles
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e7e7e7',
    },
    itemContainer: {
        backgroundColor: '#fffefe',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        borderColor: '#f7f7f9',
        borderWidth: 1,
        borderRadius: 3,
        flexDirection: 'column',
    },
    statusImg: {
        width: 40,
        height: 40,
    },
    itemLine: {
        backgroundColor: '#e7e7e7',
        height: 1,
        marginLeft: 10,
        marginRight: 10
    },
    itemTextContent: {
        height: 96,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemFirstFont: {
        fontSize: 18,
        marginLeft: 10,
        width: 200,
        color: '#333333'
    },
    itemSecondFont: {
        fontSize: 14,
        marginLeft: 10,
        width: 200,
        color: '#999999',
        marginTop: 6
    },
    itemRightFont: {
        fontSize: 16,
        color: '#999999',
        marginRight: 10
    },
    itemLeftFont: {
        fontSize: 16,
        marginLeft: 10,
        color: '#333333'
    },
    projectImage: {
        width: 65,
        height: 65,
        marginLeft: 12
    },
    textContainer: {
        justifyContent: 'flex-start',
        height: 65,
        paddingTop: 2
    },
    itemButtonContent: {
        flex: 1,
        height: 37,
        flexDirection: 'row',
        backgroundColor: '#f9f9f9',
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemButtonText: {
        fontSize: 13,
        color: '#9b9b9b',
    },
    itemButtonText: {
        marginLeft: 6.5,
        fontSize: 14,
        color: '#999999'
    },
    itemButtonImage: {
        width: 16,
        height: 16
    },
    itemButtonImage2: {
        width: 18,
        height: 18
    },
    itemButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemButtonLine: {
        width: 1,
        marginTop: 10.5,
        marginBottom: 10.5,
        backgroundColor: '#e7e7e7'
    },
    scrollContent: {
        flex: 1,
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
    },
    holderMessage: {
        fontSize: 15,
        color: 'rgb(166,166,166)',
        marginTop:15
    }
})