'use strict';

/**
 * Module dependencies.
 */

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

/**
 * Export `disallowOnlyFilterInTestFunctions`.
 */

var disallowOnlyFilterInTestFunctions = function disallowOnlyFilterInTestFunctions() {};

disallowOnlyFilterInTestFunctions.prototype = {
  check: function check(file, errors) {
    file.iterateNodesByType('MemberExpression', function (node) {
      if (node.property.name !== 'only' && (node.object.name !== 'describe' || node.object.name !== 'it')) {
        return;
      }

      errors.add('Do not use `.only` in `' + node.object.name + '` functions', node.property.loc.start);
    });
  },

  configure: function configure(disallowOnlyFilterInTestFunctions) {
    _assert2['default'](disallowOnlyFilterInTestFunctions === true || disallowOnlyFilterInTestFunctions === false, 'disallowOnlyFilterInTestFunctions must be a boolean');
  },

  getOptionName: function getOptionName() {
    return 'disallowOnlyFilterInTestFunctions';
  }
};

exports['default'] = disallowOnlyFilterInTestFunctions;
module.exports = exports['default'];