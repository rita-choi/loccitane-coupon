'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('./helpers'),
    encode = _require.encode,
    isFunction = _require.isFunction,
    isObject = _require.isObject,
    isString = _require.isString;

module.exports = function () {
  function Redemptions(client, promotionsNamespace) {
    (0, _classCallCheck3.default)(this, Redemptions);

    this.client = client;
    this.promotions = promotionsNamespace;
  }

  (0, _createClass3.default)(Redemptions, [{
    key: 'redeem',
    value: function redeem(code, params, callback) {
      var context = {};
      var qs = {};
      var isDeprecated = false;

      if (isObject(code) && isObject(params)) {
        return this.promotions.tiers.redeem(code['id'], params, callback);
      }

      if (isObject(code)) {
        isDeprecated = true;
        console.warn('This redeem method invocation is deprecated. First argument should be always a code, check docs for more details.');
        if (isObject(params)) {
          console.warn('This redeem method invocation is deprecated. Params being an object will be ignored.');
        }

        context = code;
        code = context.voucher;
        delete context.voucher;
      } else {
        context = params || {};
      }

      if (isFunction(params)) {
        callback = params;
        context = isDeprecated ? context : null;
      } else if (isString(params) && params.length > 0) {
        // FIXME put  to body: {customer: tracking_id}, test it with working API
        qs.tracking_id = encode(params);
      }

      return this.client.post('/vouchers/' + encode(code) + '/redemption', context, callback, { qs: qs });
    }
  }, {
    key: 'list',
    value: function list(params, callback) {
      if (isFunction(params)) {
        callback = params;
        params = {};
      }

      return this.client.get('/redemptions', params, callback);
    }
  }, {
    key: 'getForVoucher',
    value: function getForVoucher(code, callback) {
      return this.client.get('/vouchers/' + encode(code) + '/redemption', null, callback);
    }
  }, {
    key: 'rollback',
    value: function rollback(redemptionId, params, callback) {
      if (isFunction(params)) {
        callback = params;
        params = null;
      }

      var qs = {};
      var payload = {};

      if (isString(params)) {
        qs.reason = encode(params);
      } else if (isObject(params)) {
        var _params = params,
            reason = _params.reason,
            tracking_id = _params.tracking_id,
            customer = _params.customer;


        qs = {
          reason: reason ? encode(reason) : undefined,
          tracking_id: tracking_id ? encode(tracking_id) : undefined // eslint-disable-line camelcase
        };
        payload = { customer: customer };
      }

      return this.client.post('/redemptions/' + encode(redemptionId) + '/rollback', payload, callback, { qs: qs });
    }
  }]);
  return Redemptions;
}();