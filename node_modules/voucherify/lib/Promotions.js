'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function () {
  function Promotions(client, campaignsNamespace, promotionTiersNamespace) {
    (0, _classCallCheck3.default)(this, Promotions);

    this.client = client;
    this.campaignsNamespace = campaignsNamespace;

    // public
    this.tiers = promotionTiersNamespace;
  }

  (0, _createClass3.default)(Promotions, [{
    key: 'create',
    value: function create(params, callback) {
      return this.campaignsNamespace.create(params, callback);
    }
  }, {
    key: 'validate',
    value: function validate(params, callback) {
      return this.client.post('/promotions/validation', params, callback);
    }
  }]);
  return Promotions;
}();