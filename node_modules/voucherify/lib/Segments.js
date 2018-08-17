'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('./helpers'),
    encode = _require.encode;

module.exports = function () {
  function Segments(client) {
    (0, _classCallCheck3.default)(this, Segments);

    this.client = client;
  }

  (0, _createClass3.default)(Segments, [{
    key: 'create',
    value: function create(segment, callback) {
      return this.client.post('/segments', segment, callback);
    }
  }, {
    key: 'get',
    value: function get(segmentId, callback) {
      return this.client.get('/segments/' + encode(segmentId), null, callback);
    }
  }, {
    key: 'delete',
    value: function _delete(segmentId, callback) {
      return this.client.delete('/segments/' + encode(segmentId), callback);
    }
  }]);
  return Segments;
}();