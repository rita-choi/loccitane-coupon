'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('./helpers'),
    encode = _require.encode,
    isFunction = _require.isFunction;

var omit = require('lodash.omit');

module.exports = function () {
  function Orders(client) {
    (0, _classCallCheck3.default)(this, Orders);

    this.client = client;
  }

  (0, _createClass3.default)(Orders, [{
    key: 'create',
    value: function create(order, callback) {
      return this.client.post('/orders', order, callback);
    }
  }, {
    key: 'get',
    value: function get(orderId, callback) {
      return this.client.get('/orders/' + encode(orderId), null, callback);
    }
  }, {
    key: 'update',
    value: function update(order, callback) {
      return this.client.put('/orders/' + encode(order.id), omit(order, ['id']), callback);
    }
  }, {
    key: 'list',
    value: function list(params, callback) {
      if (isFunction(params)) {
        callback = params;
        params = {};
      }
      return this.client.get('/orders', params, callback);
    }
  }]);
  return Orders;
}();