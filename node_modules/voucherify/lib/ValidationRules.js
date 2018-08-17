'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('./helpers'),
    encode = _require.encode;

var omit = require('lodash.omit');

module.exports = function () {
  function ValidationRules(client) {
    (0, _classCallCheck3.default)(this, ValidationRules);

    this.client = client;
  }

  (0, _createClass3.default)(ValidationRules, [{
    key: 'create',
    value: function create(validationRule, callback) {
      return this.client.post('/validation-rules', validationRule, callback);
    }
  }, {
    key: 'get',
    value: function get(validationRuleId, callback) {
      return this.client.get('/validation-rules/' + encode(validationRuleId), null, callback);
    }
  }, {
    key: 'update',
    value: function update(validationRule, callback) {
      return this.client.put('/validation-rules/' + encode(validationRule.id), omit(validationRule, ['id']), callback);
    }
  }, {
    key: 'delete',
    value: function _delete(validationRuleId, callback) {
      return this.client.delete('/validation-rules/' + encode(validationRuleId), callback);
    }
  }]);
  return ValidationRules;
}();