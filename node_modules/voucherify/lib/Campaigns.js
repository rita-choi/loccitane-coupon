'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('./helpers'),
    encode = _require.encode,
    isFunction = _require.isFunction;

module.exports = function () {
  function Campaigns(client) {
    (0, _classCallCheck3.default)(this, Campaigns);

    this.client = client;
  }

  (0, _createClass3.default)(Campaigns, [{
    key: 'create',
    value: function create(campaign, callback) {
      return this.client.post('/campaigns', campaign, callback);
    }
  }, {
    key: 'get',
    value: function get(name, callback) {
      return this.client.get('/campaigns/' + encode(name), null, callback);
    }
  }, {
    key: 'addVoucher',
    value: function addVoucher(campaignName, params, callback) {
      if (isFunction(params)) {
        callback = params;
        params = {};
      }

      return this.client.post('/campaigns/' + encode(campaignName) + '/vouchers', params || {}, callback);
    }
  }, {
    key: 'importVouchers',
    value: function importVouchers(campaignName, vouchers, callback) {
      return this.client.post('/campaigns/' + encode(campaignName) + '/import', vouchers, callback);
    }
  }, {
    key: 'list',
    value: function list(params, callback) {
      if (isFunction(params)) {
        callback = params;
        params = {};
      }

      return this.client.get('/campaigns', params, callback);
    }
  }]);
  return Campaigns;
}();