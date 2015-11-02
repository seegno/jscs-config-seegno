'use strict';

/**
 * Module dependencies.
 */

import assert from 'assert';

/**
 * Export `requireSqlTemplateInQueryFunction`.
 */

const requireSqlTemplateInQueryFunction = () => {};

requireSqlTemplateInQueryFunction.prototype = {
  check: (file, errors) => {
    file.iterateNodesByType('CallExpression', (node) => {
      let property = node.callee.property;

      if (!property || property.name !== 'query') {
        return;
      }

      node.arguments.forEach((argument) => {
        if (argument.type !== 'TaggedTemplateExpression') {
          errors.add(
            'Use the `sql` tagged template literal for raw queries',
            argument.loc.start
          );
        }
      });
    });
  },

  configure: (requireSqlTemplate) => {
    assert(
      requireSqlTemplate === true || requireSqlTemplate === false,
      'requireSqlTemplate option requires sql tagged templates on raw queries'
    );
  },

  getOptionName: () => {
    return 'requireSqlTemplateInQueryFunction';
  }
};

export default requireSqlTemplateInQueryFunction;
