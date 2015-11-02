'use strict';

/**
 * Module dependencies.
 */

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

/**
 * Export `requireSqlTemplateInQueryFunction`.
 */

var requireSqlTemplateInQueryFunction = function requireSqlTemplateInQueryFunction() {};

requireSqlTemplateInQueryFunction.prototype = {
  check: function check(file, errors) {
    file.iterateNodesByType('CallExpression', function (node) {
      var property = node.callee.property;

      if (!property || property.name !== 'query') {
        return;
      }

      node.arguments.forEach(function (argument) {
        if (argument.type !== 'TaggedTemplateExpression') {
          errors.add('Use the `sql` tagged template literal for raw queries', argument.loc.start);
        }
      });
    });
  },

  configure: function configure(requireSqlTemplate) {
    _assert2['default'](requireSqlTemplate === true || requireSqlTemplate === false, 'requireSqlTemplate option requires sql tagged templates on raw queries');
  },

  getOptionName: function getOptionName() {
    return 'requireSqlTemplateInQueryFunction';
  }
};

exports['default'] = requireSqlTemplateInQueryFunction;
module.exports = exports['default'];