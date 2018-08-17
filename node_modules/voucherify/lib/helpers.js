'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assertOption = function assertOption(options, name) {
  if (!options[name]) {
    throw new Error('Missing required option \'' + name + '\'');
  }
};

var encode = function encode() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return encodeURIComponent(value);
};
var isString = function isString(value) {
  return typeof value === 'string';
};
var isObject = function isObject(value) {
  return (typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object' && !Array.isArray(value) && value !== null;
};
var isFunction = function isFunction(value) {
  return typeof value === 'function';
};

module.exports = {
  assertOption: assertOption,
  encode: encode,
  isString: isString,
  isObject: isObject,
  isFunction: isFunction
};