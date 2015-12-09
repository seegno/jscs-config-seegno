'use strict';

/**
 * Module dependencies.
 */

const assert = require('assert');
const parser = require('sql-parse');
const get = require('lodash.get');

/**
 * Check if `literal` is an SQL query.
 */

function isSqlQuery(literal) {
  if (!literal) {
    return false;
  }

  try {
    parser.parse(literal);
  } catch (error) {
    return false;
  }

  return true;
}

/**
 * Validate node.
 */

function validate(node, errors) {
  const expressions = get(node, 'expressions', []);
  const tag = get(node, 'tag.name');
  const type = get(node, 'type');

  // "x" is just a placeholder for the interpolated expression.
  const value = get(node, 'quasis', []).map(x => (x.value.raw)).join('x');

  if (type === 'TemplateLiteral' && expressions.length && isSqlQuery(value) && tag !== 'sql') {
    errors.add('Use the `sql` tagged template literal for raw queries', node.loc.start);
  }
}

/**
 * Export `requireSqlTemplate`.
 */

module.exports = function() {};

module.exports.prototype = {
  check: (file, errors) => {
    file.iterateNodesByType('VariableDeclaration', (node) => {
      node.declarations.forEach(declaration => validate(declaration.init, errors));
    });

    file.iterateNodesByType('CallExpression', (node) => {
      node.arguments.forEach(argument => validate(argument, errors));
    });
  },

  configure: (requireSqlTemplate) => {
    assert(
      requireSqlTemplate === true || requireSqlTemplate === false,
      'requireSqlTemplate option requires sql tagged templates on raw queries'
    );
  },

  getOptionName: () => {
    return 'requireSqlTemplate';
  }
};
