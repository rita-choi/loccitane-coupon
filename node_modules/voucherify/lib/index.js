'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyNames = require('babel-runtime/core-js/object/get-own-property-names');

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ApiClient = require('./ApiClient');
var Campaigns = require('./Campaigns');
var Distributions = require('./Distributions');
var Exports = require('./Exports');
var Events = require('./Events');
var Balance = require('./Balance');
var Vouchers = require('./Vouchers');
var Validations = require('./Validations');
var Redemptions = require('./Redemptions');
var PromotionTiers = require('./PromotionTiers');
var Promotions = require('./Promotions');
var Customers = require('./Customers');
var Orders = require('./Orders');
var Products = require('./Products');
var ValidationRules = require('./ValidationRules');
var Segments = require('./Segments');

var _require = require('./helpers'),
    assertOption = _require.assertOption,
    isFunction = _require.isFunction;

module.exports = function (options) {
  assertOption(options, 'applicationId');
  assertOption(options, 'clientSecretKey');

  var client = new ApiClient(options);
  var balance = new Balance(client);
  var vouchers = new Vouchers(client, balance);
  var campaigns = new Campaigns(client);
  var exportsNamespace = new Exports(client);
  var events = new Events(client);
  var distributions = new Distributions(client, exportsNamespace);
  var promotionTiers = new PromotionTiers(client);
  var promotions = new Promotions(client, campaigns, promotionTiers);
  var validations = new Validations(client, promotions);
  var redemptions = new Redemptions(client, promotions);
  var customers = new Customers(client);
  var orders = new Orders(client);
  var products = new Products(client);
  var segments = new Segments(client);
  var validationRules = new ValidationRules(client);

  /**
   * Copy redemptions.list method and extend it so we can run:
   *
   *   // deprecated
   *   api.redemptions(query, callback)
   *
   *   // new
   *   api.redemptions.list(query, callback)
   *   api.redemptions.redeem(code, trackingId, callback)
   *   // ...
   */
  var backwardCompatibleRedemptions = redemptions.list.bind(redemptions);
  // copy to func object all redemption methods bound to it's context
  var exposedFunctions = (0, _getOwnPropertyNames2.default)((0, _getPrototypeOf2.default)(redemptions));

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(exposedFunctions), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var name = _step.value;

      if (name !== 'constructor' && isFunction(redemptions[name])) {
        backwardCompatibleRedemptions[name] = redemptions[name].bind(redemptions);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return {
    vouchers: vouchers,
    campaigns: campaigns,
    distributions: distributions,
    validations: validations,
    redemptions: backwardCompatibleRedemptions,
    promotions: promotions,
    customers: customers,
    orders: orders,
    products: products,
    segments: segments,
    validationRules: validationRules,
    events: events,

    // leaving for backward compatibility

    // vouchers
    list: function list(query, callback) {
      return vouchers.list(query, callback);
    },
    get: function get(code, callback) {
      return vouchers.get(code, callback);
    },
    create: function create(voucher, callback) {
      return vouchers.create(voucher, callback);
    },
    delete: function _delete(code, params, callback) {
      return vouchers.delete(code, params, callback);
    },
    update: function update(voucher, callback) {
      return vouchers.update(voucher, callback);
    },
    enable: function enable(code, callback) {
      return vouchers.enable(code, callback);
    },
    disable: function disable(code, callback) {
      return vouchers.disable(code, callback);
    },
    publish: function publish(campaignName, callback) {
      return distributions.publish(campaignName, callback);
    },
    // validations
    validate: function validate(code, params, callback) {
      return validations.validateVoucher(code, params, callback);
    },
    // redemptions
    redemption: function redemption(code, callback) {
      return redemptions.getForVoucher(code, callback);
    },
    redeem: function redeem(code, trackingId, callback) {
      return redemptions.redeem(code, trackingId, callback);
    },
    rollback: function rollback(redemptionId, data, callback) {
      return redemptions.rollback(redemptionId, data, callback);
    },
    // campaigns
    campaign: {
      voucher: {
        create: function create(campaignName, voucher, callback) {
          return campaigns.addVoucher(campaignName, voucher, callback);
        }
      }
    },
    // customers
    customer: customers,
    // products
    product: {
      create: function create(product, callback) {
        return products.create(product, callback);
      },
      get: function get(productId, callback) {
        return products.get(productId, callback);
      },
      update: function update(product, callback) {
        return products.update(product, callback);
      },
      delete: function _delete(productId, callback) {
        return products.delete(productId);
      },
      sku: {
        create: function create(productId, sku, callback) {
          return products.createSku(productId, sku, callback);
        },
        get: function get(productId, skuId, callback) {
          return products.getSku(productId, skuId, callback);
        },
        update: function update(productId, sku, callback) {
          return products.updateSku(productId, sku, callback);
        },
        delete: function _delete(productId, skuId, callback) {
          return products.deleteSku(productId, skuId, callback);
        }
      }
    }
  };
};