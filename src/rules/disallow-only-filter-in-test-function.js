'use strict';

/**
 * Module dependencies.
 */

const assert = require('assert');

/**
 * Export `disallowOnlyFilterInTestFunctions`.
 */

module.exports = function() {};

module.exports.prototype = {
  check: (file, errors) => {
    file.iterateNodesByType('MemberExpression', (node) => {
      if (node.property.name !== 'only' && (node.object.name !== 'describe' || node.object.name !== 'it')) {
        return;
      }

      errors.add(`Do not use \`.only\` in \`${node.object.name}\` functions`, node.property.loc.start);
    });
  },

  configure: (disallowOnlyFilterInTestFunctions) => {
    assert(
      disallowOnlyFilterInTestFunctions === true || disallowOnlyFilterInTestFunctions === false,
      'disallowOnlyFilterInTestFunctions must be a boolean'
    );
  },

  getOptionName: () => {
    return 'disallowOnlyFilterInTestFunctions';
  }
};
