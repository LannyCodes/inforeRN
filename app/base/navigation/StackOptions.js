/**
 * Created by coderxuan on 2017/5/6.
 * 如果使用自定义的TitleBar则在这里定制
 */
import React from 'react';
const StackOptions = ({navigation}) => {
    // log(navigation);
    let {state, goBack} = navigation;
    const headerStyle = {backgroundColor: '#4ECBFC'};
    const headerTitleStyle = {fontSize: 20, color: 'white', fontWeight: '300'}
    const headerBackTitle = null
    return {headerStyle, headerTitleStyle, headerBackTitle}
};

export default StackOptions