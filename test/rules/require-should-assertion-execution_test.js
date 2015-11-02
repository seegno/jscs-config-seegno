'use strict';

/**
 * Module dependencies.
 */

import Checker from 'jscs';
import Rule from '../../src/rules/require-should-assertion-execution';

/**
 * Tests for `require-should-assertion-execution`.
 */

describe('require-should-assertion-execution rule', () => {
  let checker;

  beforeEach(() => {
    checker = new Checker();
    checker.configure({
      additionalRules: [new Rule()],
      requireShouldAssertionExecution: true
    });
  });

  it('should return an error if the source contains `foo.should.be.ok;` type of statements', () => {
    const results = checker.checkString('foo.should.be.ok;');
    const errors = results.getErrorList();

    errors.should.have.length(1);
    errors[0].rule.should.equal('requireShouldAssertionExecution');
  });

  it('should allow `foo.should.be.ok()` statements', () => {
    const results = checker.checkString('foo.should.be.ok()');
    const errors = results.getErrorList();

    errors.should.have.length(0);
  });
});
