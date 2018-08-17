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
  function Vouchers(client, balance) {
    (0, _classCallCheck3.default)(this, Vouchers);

    this.client = client;

    // public
    this.balance = balance;
  }

  (0, _createClass3.default)(Vouchers, [{
    key: 'create',
    value: function create(voucher, callback) {
      return this.client.post('/vouchers/' + encode(voucher.code), voucher, callback);
    }
  }, {
    key: 'get',
    value: function get(code, callback) {
      return this.client.get('/vouchers/' + encode(code), null, callback);
    }
  }, {
    key: 'update',
    value: function update(voucher, callback) {
      return this.client.put('/vouchers/' + encode(voucher.code), voucher, callback);
    }
  }, {
    key: 'delete',
    value: function _delete(code) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      if (isFunction(params)) {
        callback = params;
        params = {};
      }

      return this.client.delete('/vouchers/' + encode(code), callback, {
        qs: { force: !!params.force }
      });
    }
  }, {
    key: 'list',
    value: function list(params, callback) {
      if (isFunction(params)) {
        callback = params;
        params = {};
      }

      return this.client.get('/vouchers', params, callback);
    }
  }, {
    key: 'enable',
    value: function enable(params, callback) {
      if (isObject(params)) {
        return this.client.post('/vouchers/enable', params, callback);
      }

      // Enable by code
      return this.client.post('/vouchers/' + encode(params) + '/enable', null, callback);
    }
  }, {
    key: 'disable',
    value: function disable(params, callback) {
      if (isObject(params)) {
        return this.client.post('/vouchers/disable', params, callback);
      }

      // Disable by code
      return this.client.post('/vouchers/' + encode(params) + '/disable', null, callback);
    }
  }, {
    key: 'import',
    value: function _import(vouchers, callback) {
      return this.client.post('/vouchers/import', vouchers, callback);
    }
  }]);
  return Vouchers;
}();