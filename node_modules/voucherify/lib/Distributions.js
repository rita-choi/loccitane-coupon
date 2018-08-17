'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('./helpers'),
    isFunction = _require.isFunction;

module.exports = function () {
  function Distributions(client, exportsNamespace) {
    (0, _classCallCheck3.default)(this, Distributions);

    this.client = client;
    this.exports = exportsNamespace;
    this.publications = {
      list: function list(params, callback) {
        if (isFunction(params)) {
          callback = params;
          params = {};
        }

        return client.get('/publications', params, callback);
      }
    };
  }

  (0, _createClass3.default)(Distributions, [{
    key: 'publish',
    value: function publish(params, callback) {
      return this.client.post('/vouchers/publish', params, callback);
    }
  }]);
  return Distributions;
}();