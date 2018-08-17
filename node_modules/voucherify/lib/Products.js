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
  function Products(client) {
    (0, _classCallCheck3.default)(this, Products);

    this.client = client;
  }

  (0, _createClass3.default)(Products, [{
    key: 'create',
    value: function create(product, callback) {
      return this.client.post('/products', product, callback);
    }
  }, {
    key: 'get',
    value: function get(productId, callback) {
      return this.client.get('/products/' + encode(productId), null, callback);
    }
  }, {
    key: 'update',
    value: function update(product, callback) {
      return this.client.put('/products/' + encode(product.id), omit(product, ['id']), callback);
    }
  }, {
    key: 'delete',
    value: function _delete(productId, params, callback) {
      if (isFunction(params)) {
        callback = params;
        params = {};
      }

      return this.client.delete('/products/' + encode(productId), callback, { qs: params });
    }
  }, {
    key: 'list',
    value: function list(params, callback) {
      if (isFunction(params)) {
        callback = params;
        params = {};
      }
      return this.client.get('/products', params, callback);
    }
  }, {
    key: 'createSku',
    value: function createSku(productId, sku, callback) {
      return this.client.post('/products/' + encode(productId) + '/skus', sku, callback);
    }
  }, {
    key: 'getSku',
    value: function getSku(productId, skuId, callback) {
      return this.client.get('/products/' + encode(productId) + '/skus/' + encode(skuId), null, callback);
    }
  }, {
    key: 'updateSku',
    value: function updateSku(productId, sku, callback) {
      return this.client.put('/products/' + encode(productId) + '/skus/' + encode(sku.id), omit(sku, ['id']), callback);
    }
  }, {
    key: 'deleteSku',
    value: function deleteSku(productId, skuId, params, callback) {
      if (isFunction(params)) {
        callback = params;
        params = {};
      }

      return this.client.delete('/products/' + encode(productId) + '/skus/' + encode(skuId), callback, { qs: params });
    }
  }, {
    key: 'listSkus',
    value: function listSkus(productId, callback) {
      return this.client.get('/products/' + encode(productId) + '/skus', null, callback);
    }
  }]);
  return Products;
}();