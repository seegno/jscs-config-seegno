'use strict';

/**
 * Module dependencies.
 */

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

/**
 * Export `disallowGeneratorsInDescribeFunctions`.
 */

var disallowGeneratorsInDescribeFunctions = function disallowGeneratorsInDescribeFunctions() {};

disallowGeneratorsInDescribeFunctions.prototype = {
  check: function check(file, errors) {
    file.iterateNodesByType('CallExpression', function (node) {
      if (node.callee.name !== 'describe') {
        return;
      }

      node.arguments.filter(function (argument) {
        return argument.type === 'FunctionExpression' && argument.generator === true;
      }).forEach(function (argument) {
        errors.add('Do not use generators in describe functions', argument.loc.start);
      });
    });
  },

  configure: function configure(disallowGeneratorsInDescribeFunctions) {
    _assert2['default'](disallowGeneratorsInDescribeFunctions === true || disallowGeneratorsInDescribeFunctions === false, 'disallowGeneratorsInDescribeFunctions must be a boolean');
  },

  getOptionName: function getOptionName() {
    return 'disallowGeneratorsInDescribeFunctions';
  }
};

exports['default'] = disallowGeneratorsInDescribeFunctions;
module.exports = exports['default'];