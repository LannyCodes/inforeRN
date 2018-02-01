/**
 * Created by coderxuan on 2017/5/23.
 */
import React, {Component} from 'react';
import {View, WebView} from 'react-native';
import TitleBar from '../../widget/TitleBar'
const StyleSheet = require('../../../base/StyleSheet');
class DocumentScene extends Component {

    constructor(props: Object) {
        super(props)
    }

    componentDidMount() {

    }

    render() {
        let {state} = this.props.navigation;
        return (
            <View style={{flex: 1}}>
                <TitleBar navigation={this.props.navigation}
                          title={state.params.title}
                          leftImage={require('../../../images/common/icon_bar_left.png')}
                          onLeftPress={() => this.props.navigation.goBack()}
                />
                <WebView
                    automaticallyAdjustContentInsets={false}
                    style={styles.webView}
                    source={{uri: state.params.url}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    onNavigationStateChange={this.onNavigationStateChange}
                    startInLoadingState={true}
                />
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    webView: {
        flex: 1,
    }
});


export default DocumentScene;
