'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('./helpers'),
    encode = _require.encode;

module.exports = function () {
  function Balance(client) {
    (0, _classCallCheck3.default)(this, Balance);

    this.client = client;
  }

  (0, _createClass3.default)(Balance, [{
    key: 'create',
    value: function create(code, params, callback) {
      return this.client.post('/vouchers/' + encode(code) + '/balance', params, callback);
    }
  }]);
  return Balance;
}();