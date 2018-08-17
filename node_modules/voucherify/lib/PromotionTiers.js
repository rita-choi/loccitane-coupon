'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('./helpers'),
    encode = _require.encode;

module.exports = function () {
  function PromotionTiers(client) {
    (0, _classCallCheck3.default)(this, PromotionTiers);

    this.client = client;
  }

  (0, _createClass3.default)(PromotionTiers, [{
    key: 'list',
    value: function list(promotionId, callback) {
      return this.client.get('/promotions/' + encode(promotionId) + '/tiers', null, callback);
    }
  }, {
    key: 'create',
    value: function create(promotionId, params, callback) {
      return this.client.post('/promotions/' + encode(promotionId) + '/tiers', params, callback);
    }
  }, {
    key: 'redeem',
    value: function redeem(promotionsTierId, params, callback) {
      return this.client.post('/promotions/tiers/' + encode(promotionsTierId) + '/redemption', params, callback);
    }
  }, {
    key: 'update',
    value: function update() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return this.client.put('/promotions/tiers/' + encode(params['id']), params, callback);
    }
  }, {
    key: 'delete',
    value: function _delete(promotionsTierId, callback) {
      return this.client.delete('/promotions/tiers/' + encode(promotionsTierId), null, callback);
    }
  }]);
  return PromotionTiers;
}();