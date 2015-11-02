'use strict';

/**
 * Module dependencies.
 */

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _should = require('should');

var _should2 = _interopRequireDefault(_should);

/**
 * Auxiliary constants.
 */

var Assertion = _should2['default'].Assertion.prototype;
var assertions = Object.keys(Assertion);
var chains = Object.keys(Assertion).filter(function (key) {
  return typeof Assertion[key] !== 'function';
});

/**
 * Export `requireShouldAssertionExecution`.
 */

var requireShouldAssertionExecution = function requireShouldAssertionExecution() {};

requireShouldAssertionExecution.prototype = {
  check: function check(file, errors) {
    file.iterateNodesByType('Identifier', function (node) {
      if (!node.parentNode || !node.parentNode.object || !node.parentNode.object.property) {
        return;
      }

      // Skip non-assertions.
      if (assertions.indexOf(node.name) === -1) {
        return;
      }

      // Skip assertion terms that are used in another conditions.
      if (chains.indexOf(node.parentNode.object.property.name) === -1) {
        return;
      }

      // Allow chaining.
      if (chains.indexOf(node.name) !== -1 && chains.indexOf(node.parentNode.object.property.name) !== -1) {
        return;
      }

      if (node.parentNode.parentNode.type !== 'CallExpression') {
        errors.add('You must invoke the assertion in `should.' + node.name + '`', node.loc.end);
      }
    });
  },

  configure: function configure(requireShouldAssertionExecution) {
    _assert2['default'](requireShouldAssertionExecution === true || requireShouldAssertionExecution === false, 'requireShouldAssertionExecution must be a boolean');
  },

  getOptionName: function getOptionName() {
    return 'requireShouldAssertionExecution';
  }
};

exports['default'] = requireShouldAssertionExecution;
module.exports = exports['default'];