'use strict';

/**
 * Module dependencies.
 */

import assert from 'assert';
import should from 'should';

/**
 * Auxiliary constants.
 */

const Assertion = should.Assertion.prototype;
const assertions = Object.keys(Assertion);
const chains = Object.keys(Assertion).filter(key => typeof Assertion[key] !== 'function');

/**
 * Export `requireShouldAssertionExecution`.
 */

const requireShouldAssertionExecution = () => {};

requireShouldAssertionExecution.prototype = {
  check: (file, errors) => {
    file.iterateNodesByType('Identifier', (node) => {
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
        errors.add(`You must invoke the assertion in \`should.${node.name}\``, node.loc.end);
      }
    });
  },

  configure: (requireShouldAssertionExecution) => {
    assert(
      requireShouldAssertionExecution === true || requireShouldAssertionExecution === false,
      'requireShouldAssertionExecution must be a boolean'
    );
  },

  getOptionName: () => {
    return 'requireShouldAssertionExecution';
  }
};

export default requireShouldAssertionExecution;
