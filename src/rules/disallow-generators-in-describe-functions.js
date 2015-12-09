'use strict';

/**
 * Module dependencies.
 */

const assert = require('assert');

/**
 * Export `disallowGeneratorsInDescribeFunctions`.
 */

module.exports = function() {};

module.exports.prototype = {
  check: (file, errors) => {
    file.iterateNodesByType('CallExpression', (node) => {
      if (node.callee.name !== 'describe') {
        return;
      }

      node.arguments
        .filter((argument) => {
          return argument.type === 'FunctionExpression' && argument.generator === true;
        })
        .forEach((argument) => {
          errors.add(
            'Do not use generators in describe functions',
            argument.loc.start
          );
        });
    });
  },

  configure: (disallowGeneratorsInDescribeFunctions) => {
    assert(
      disallowGeneratorsInDescribeFunctions === true || disallowGeneratorsInDescribeFunctions === false,
      'disallowGeneratorsInDescribeFunctions must be a boolean'
    );
  },

  getOptionName: () => {
    return 'disallowGeneratorsInDescribeFunctions';
  }
};
