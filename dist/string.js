'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.trim = trim;
exports.encodeToUnicode = encodeToUnicode;
exports.decodeUnicode = decodeUnicode;
exports.firstUpperCase = firstUpperCase;
exports.firstLowerCase = firstLowerCase;
exports.splitUnit = splitUnit;

var _is = require('./is');

var _regex = require('./regex');

/**
 * 字符串两端剪切
 *
 * @param {string}  string
 * @param {string}  fe  f or e or  fe
 * @param {string}  char
 *
 * @example
 * ```javascript
 * trim('   abc   ')//=>'abc'
 * trim('   abc   ','f')//=>'abc   '
 * trim('   abc   ','e')//=>'   abc'
 * trim('**abc**','*')//=>'abc'
 * ```
 *
 * @returns {string}
 */
function trim(string) {
    var fe = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'fe';
    var char = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '\\s';

    if ((0, _is.isString)(string) && (0, _is.isString)(char) && (0, _is.isString)(fe)) {
        if (!/^(fe)|([fe])$/.test(fe)) {
            char = fe;fe = 'fe';
        }
        var FRegex = new RegExp('^[' + char + ']*'),
            ERegex = new RegExp('[' + char + ']*$');
        switch (fe) {
            case 'f':
                return string.replace(FRegex, '');
            case 'e':
                return string.replace(ERegex, '');
            default:
                return string.replace(FRegex, '').replace(ERegex, '');
        }
    }
    throw new Error('Parameter type error');
}

/**
 *
 * 字符转unicode
 * @param {string}  str  需要转码的字符串
 * @example
 * ```javascript
 *  encodeToUnicode('啊abc123.')
 *  //=>"\u554a\u0061\u0062\u0063\u0031\u0032\u0033\u002e"
 *
 * ```
 *
 * @returns {string}
 */

function encodeToUnicode(str) {
    if (!(0, _is.isString)(str)) {
        throw new Error(str + ' is not string');
    }
    var temp = "",
        rs = "";
    for (var i = 0, len = str.length; i < len; i++) {
        temp = str.charCodeAt(i).toString(16);
        rs += '\\u' + new Array(5 - temp.length).join("0") + temp;
    }
    return rs;
}

/**
 *
 * unicode字符串解码
 * @param {string}  str  需要解码的字符串
 * @example
 * ```javascript
 *  decodeUnicode('\u554a\u0061\u0062\u0063\u0031\u0032\u0033\u002e')
 *  //=>"啊abc123."
 *
 * ```
 *
 * @returns {string}
 */

function decodeUnicode(str) {
    if (!(0, _is.isString)(str)) {
        throw new Error(str + ' is not string');
    }
    return str.replace(/(\\u)(\w{4}|\w{2})/gi, function ($0, $1, $2) {
        return String.fromCharCode(parseInt($2, 16));
    });
}

/**
 *
 * Capitalize the first letter
 * @param {string}  string
 * @example
 * ```javascript
 *  firstUpperCase('abc')//=>'Abc'
 *
 *
 * ```
 *
 * @returns {string}
 */
function firstUpperCase(string) {
    return string[0].toUpperCase() + string.slice(1);
}

/**
 *
 * Lowercase first letter
 * @param {string}  string
 * @example
 * ```javascript
 *  firstLowerCase('Abc')//=>'abc'
 *
 *
 * ```
 *
 * @returns {string}
 */
function firstLowerCase(string) {
    return string[0].toLowerCase() + string.slice(1);
}

/**
 *
 * split number with unit
 * @param {string}  value
 * @param {boolean}  relative
 * @example
 * ```javascript
 *  splitUnit('123px')//=>{value:123,unit:'px'}
 *  splitUnit('123%')//=>{value:123,unit:'%'}
 *  splitUnit('+123%')//=>{value:123,unit:'%'}
 *  splitUnit('-123%')//=>{value:-123,unit:'%'}
 *  splitUnit('-=123%',true)//=>{value:'-=123',unit:'%'}
 *  splitUnit('+=123%',true)//=>{value:'+=123',unit:'%'}
 *
 *
 * ```
 *
 * @returns {object}
 */
function splitUnit(value) {
    var relative = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var v = void 0,
        unit = '';
    var reg = void 0;
    if (relative) {
        reg = _regex.regex.relativeNumberWithUnit;
    } else {
        reg = _regex.regex.numberWithUnit;
    }

    if (reg.test(value)) {

        var temp = RegExp.$1;
        unit = RegExp.$2;
        if (_regex.regex.number.test(temp)) {
            v = Number(temp);
        } else {
            v = temp;
        }
    }

    return {
        value: v, unit: unit
    };
}