/**
 * Created by coderxuan on 2017/5/6.
 */
import React from 'react';
import {TabNavigator, TabBarBottom} from 'react-navigation';
import WorkPage from '../../components/pages/work'
import MessagePage from '../../components/pages/message/index'
import PersonalPage from '../../components/pages/personal/index'
import MailPage from '../../components/pages/maillist'
import TabBarItem from '../../components/widget/TabBarItem'

const Dimensions = require('Dimensions');
let {width} = Dimensions.get('window');
const scale = width / 375.0;

const TabConfig = TabNavigator(
    {
        Home: {
            screen: WorkPage,
            navigationOptions: {
                tabBarLabel: '工作',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        showMessage={false}
                        focused={focused}
                        selectedImage={require('../../images/home/icon_work_selected.png')}
                        normalImage={require('../../images/home/icon_work.png')}
                    />
                )
            },

        },
        MailList: {
            screen: MailPage,
            navigationOptions: {
                tabBarLabel: '通讯录',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        showMessage={false}
                        focused={focused}
                        selectedImage={require('../../images/home/icon_maillist_selected.png')}
                        normalImage={require('../../images/home/icon_maillist.png')}
                    />
                )
            },

        },
        Message: {
            screen: MessagePage,
            navigationOptions: {
                tabBarLabel: '消息',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        showMessage={true}
                        focused={focused}
                        selectedImage={require('../../images/home/icon_message_selected.png')}
                        normalImage={require('../../images/home/icon_message.png')}
                    />
                )
            },

        },
        Personal: {
            screen: PersonalPage,
            navigationOptions: {
                tabBarLabel: '我的',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        showMessage={false}
                        focused={focused}
                        selectedImage={require('../../images/home/icon_person_selected.png')}
                        normalImage={require('../../images/home/icon_person.png')}
                    />
                )
            },
        },
    },
    {
        tabBarPosition: 'bottom', // 设置tabBar的位置
        tabBarComponent: TabBarBottom,
        swipeEnabled: false, //是否允许在标签之间进行滑动
        animationEnabled: false, //是否在更改标签时显示动画。
        lazy: true, //懒加载
        tabBarOptions: {
            activeBackgroundColor: 'white',
            activeTintColor: '#29a1f7',
            inactiveBackgroundColor: 'white',
            inactiveTintColor: '#999999',
            showLabel: true,
            style: {height: 55 * scale},
            labelStyle: {
                marginBottom: 5 * scale,
                fontSize: 10 * scale,
            }
        },
    }
);

export default TabConfig;

