/**
 * Created by coderxuan on 2017/5/6.
 */
import React, {
    Component
} from 'react'
import App from './components/app'
import {init} from "./base/def/init"
import {Provider} from 'react-redux';
import store from './store/configStore';

class RootScene extends Component {
    constructor(props: Object) {
        super(props);
        this.state = {store: store};
        (async () => {
            let data = await init();
            console.log(data)  //虽然只是看一下global内的内容，可以通过resolve将需要的数据通过异步传出来。
        })();
    }

    render() {
        return (
            <Provider store={this.state.store}>
                <App/>
            </Provider>
        )
    }
}

export default RootScene
