/**
 * Created by coderxuan on 2017/5/6.
 *
 * 使用方法
 *  var StyleSheet = require('StyleSheet')
 *
 *  const styles = StyleSheet.create({
 *  example:{
 *     textSize:12,
 *     //ios 样式
 *     ios:{
 *        color:'#F123411',
 *
 *     },
 *     //android 样式
 *     android:{
 *      color:'#F22222',
 *     }
 *  }
 *  ]);
 *
 */

'use strict';

import {StyleSheet, Platform} from 'react-native';
import {resize2Dp} from './commonFunc'
export function create(styles: Object): { [name: string]: number } {
    const platformStyles = {};
    Object.keys(styles).forEach((name) => {
        let {ios, android, ...style} = {...styles[name]};
        resize2Dp(style);
        if (ios && Platform.OS === 'ios') {
            style = {...style, ...ios};
        }
        if (android && Platform.OS === 'android') {
            style = {...style, ...android};
        }
        platformStyles[name] = style;
    });
    return StyleSheet.create(platformStyles);
}