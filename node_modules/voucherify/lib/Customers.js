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
  function Customers(client) {
    (0, _classCallCheck3.default)(this, Customers);

    this.client = client;
  }

  (0, _createClass3.default)(Customers, [{
    key: 'create',
    value: function create(customer, callback) {
      return this.client.post('/customers', customer, callback);
    }
  }, {
    key: 'get',
    value: function get(customerId, callback) {
      return this.client.get('/customers/' + encode(customerId), null, callback);
    }
  }, {
    key: 'list',
    value: function list(params, callback) {
      if (isFunction(params)) {
        callback = params;
        params = {};
      }

      return this.client.get('/customers', params, callback);
    }
  }, {
    key: 'update',
    value: function update(customer, callback) {
      return this.client.put('/customers/' + encode(customer.id || customer.source_id), omit(customer, ['id']), callback);
    }
  }, {
    key: 'delete',
    value: function _delete(customerId, callback) {
      return this.client.delete('/customers/' + encode(customerId), callback);
    }
  }]);
  return Customers;
}();