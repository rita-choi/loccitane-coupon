'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('./helpers'),
    isFunction = _require.isFunction;

module.exports = function () {
  function Events(client) {
    (0, _classCallCheck3.default)(this, Events);

    this.client = client;
  }

  (0, _createClass3.default)(Events, [{
    key: 'track',
    value: function track(eventName, metadata, customer, callback) {
      if (isFunction(customer)) {
        callback = customer;
        customer = {};
      }

      return this.client.post('/events', {
        event: eventName,
        customer: customer,
        metadata: metadata
      }, callback);
    }
  }]);
  return Events;
}();