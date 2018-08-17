'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('./helpers'),
    encode = _require.encode;

module.exports = function () {
  function Exports(client) {
    (0, _classCallCheck3.default)(this, Exports);

    this.client = client;
  }

  (0, _createClass3.default)(Exports, [{
    key: 'create',
    value: function create(exportResource, callback) {
      return this.client.post('/exports', exportResource, callback);
    }
  }, {
    key: 'get',
    value: function get(exportResourceId, callback) {
      return this.client.get('/exports/' + encode(exportResourceId), null, callback);
    }
  }, {
    key: 'delete',
    value: function _delete(exportResourceId, callback) {
      return this.client.delete('/exports/' + encode(exportResourceId), callback);
    }
  }]);
  return Exports;
}();