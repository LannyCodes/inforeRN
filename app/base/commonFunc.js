/** * Created by InforeXuan on 2017/5/17. */
const Dimensions = require('Dimensions');
let {width} = Dimensions.get('window');
const scale = width / 375.0;
let _type = ['width', 'height',
    'margin', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight',
    'padding', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight',
    'fontSize', 'borderRadius', 'borderWidth', 'lineHeight'
];

export function resize2Dp(style: Object) {
    _protoTypeChange();
    for (let key in style) {
        if (_type.contains(key)) {
            if (style[key] !== undefined && typeof style[key] === "number") {
                style[key] *= scale
            }
        }
    }
}

let _protoTypeChange = function () {
    if(!Array.prototype.contains){
        Array.prototype.contains = function (obj) {
            let i = this.length;
            while (i--) {
                if (this[i] === obj) {
                    return true;
                }
            }
            return false;
        }
    }
};