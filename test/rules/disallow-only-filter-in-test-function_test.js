'use strict';

/**
 * Module dependencies.
 */

import Checker from 'jscs';
import Rule from '../../src/rules/disallow-only-filter-in-test-function';

/**
 * Tests for `disallow-only-filter-in-test-function`.
 */

describe('disallow-only-filter-in-test-function rule', () => {
  let checker;

  beforeEach(() => {
    checker = new Checker();
    checker.configure({
      additionalRules: [new Rule()],
      disallowOnlyFilterInTestFunctions: true
    });
  });

  it('should return an error if the source contains `describe.only()` statements', () => {
    const results = checker.checkString('describe.only("foobar")');
    const errors = results.getErrorList();

    errors.should.have.length(1);
    errors[0].rule.should.equal('disallowOnlyFilterInTestFunctions');
  });

  it('should return an error if the source contains `test.only()` statements', () => {
    const results = checker.checkString('test.only("foobar")');
    const errors = results.getErrorList();

    errors.should.have.length(1);
    errors[0].rule.should.equal('disallowOnlyFilterInTestFunctions');
  });

  it('should allow regular `describe()` statements', () => {
    const results = checker.checkString('describe("foobar")');
    const errors = results.getErrorList();

    errors.should.have.length(0);
  });

  it('should allow regular `test()` statements', () => {
    const results = checker.checkString('test("something")');
    const errors = results.getErrorList();

    errors.should.have.length(0);
  });
});
