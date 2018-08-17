'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('./helpers'),
    encode = _require.encode,
    isFunction = _require.isFunction,
    isObject = _require.isObject;

module.exports = function () {
  function Validations(client, promotionsNamespace) {
    (0, _classCallCheck3.default)(this, Validations);

    this.client = client;
    this.promotions = promotionsNamespace;
  }

  (0, _createClass3.default)(Validations, [{
    key: 'validateVoucher',
    value: function validateVoucher(code) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      if (isFunction(params)) {
        callback = params;
        params = {};
      }

      return this.client.post('/vouchers/' + encode(code) + '/validate', params, callback);
    }
  }, {
    key: 'validate',
    value: function validate(code) {
      var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      if (isObject(code)) {
        if (isFunction(context)) {
          callback = context;
        }
        return this.promotions.validate(code, callback);
      }

      return this.validateVoucher(code, context, callback);
    }
  }]);
  return Validations;
}();