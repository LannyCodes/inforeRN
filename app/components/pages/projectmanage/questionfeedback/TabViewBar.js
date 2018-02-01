const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    Text,
    View,
    Animated,
    TouchableOpacity
} = ReactNative;

const DefaultTabBar = React.createClass({
    propTypes: {
        goToPage: React.PropTypes.func,
        activeTab: React.PropTypes.number,
        tabs: React.PropTypes.array,
        backgroundColor: React.PropTypes.string,
        activeTextColor: React.PropTypes.string,
        inactiveTextColor: React.PropTypes.string,
        textStyle: Text.propTypes.style,
        tabStyle: View.propTypes.style,
        renderTab: React.PropTypes.func,
        underlineStyle: View.propTypes.style,
    },

    getDefaultProps() {
        return {
            activeTextColor: 'rgb(41,161,247)',
            inactiveTextColor: 'rgb(153,153,153)',
            backgroundColor: "#fff",
        };
    },

    renderTabOption(name, page) {
    },

    renderTab(name, page, isTabActive, onPressHandler) {
        const {activeTextColor, inactiveTextColor, textStyle,} = this.props;
        const textColor = isTabActive ? activeTextColor : inactiveTextColor;
        // const fontWeight = isTabActive ? 'bold' : 'normal';

        return <TouchableOpacity
            activeOpacity={1}
            style={{flex: 1, flexDirection: 'row'}}
            key={name}
            accessible={true}
            accessibilityLabel={name}
            accessibilityTraits='button'
            onPress={() => onPressHandler(page)}>
            <View style={[styles.tab, this.props.tabStyle,]}>
                <Text adjustsFontSizeToFit={false} allowFontScaling={false}style={[{color: textColor, fontSize: 14}, textStyle,]}>
                    {name}
                </Text>
            </View>
            <View style={styles.separate_line}/>
        </TouchableOpacity>

            ;
    },

    render() {
        const containerWidth = this.props.containerWidth;
        const numberOfTabs = this.props.tabs.length;
        const tabUnderlineStyle = {
            position: 'absolute',
            width: containerWidth / numberOfTabs,
            bottom: 1,
            justifyContent: "center",
            alignItems: "center"
        };

        const left = this.props.scrollValue.interpolate({
            inputRange: [0, 1,], outputRange: [0, containerWidth / numberOfTabs,],
        });
        return (
            <View style={[styles.tabs, {backgroundColor: this.props.backgroundColor,}, this.props.style,]}>
                {this.props.tabs.map((name, page) => {
                    const isTabActive = this.props.activeTab === page;
                    const renderTab = this.props.renderTab || this.renderTab;
                    return renderTab(name, page, isTabActive, this.props.goToPage);
                })}
            </View>
        );
    },
});

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabs: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    separate_line: {
        height: 24,
        width: 1,
        backgroundColor: 'rgb(231,231,231)',
        alignSelf: 'center'
    }
});

module.exports = DefaultTabBar;
