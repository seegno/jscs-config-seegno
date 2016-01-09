'use strict';

/**
 * Module dependencies.
 */

const Checker = require('jscs');
const Rule = require('../../src/rules/disallow-generators-in-describe-functions');

/**
 * Tests for `disallow-generators-in-describe-functions`.
 */

describe('disallow-generators-in-describe-functions rule', () => {
  let checker;

  beforeEach(() => {
    checker = new Checker();
    checker.configure({
      additionalRules: [new Rule()],
      disallowGeneratorsInDescribeFunctions: true
    });
  });

  it('should return an error if the source contains `describe("foobar", function* () {});` statements', () => {
    const results = checker.checkString('describe("foobar", function* () {});');
    const errors = results.getErrorList();

    errors.should.have.length(1);
    errors[0].rule.should.equal('disallowGeneratorsInDescribeFunctions');
  });

  it('should allow regular `describe("foobar", function() {});` statements', () => {
    const results = checker.checkString('describe("foobar", function() {});');
    const errors = results.getErrorList();

    errors.should.have.length(0);
  });
});
