'use strict';

/**
 * Module dependencies.
 */

import Checker from 'jscs';
import Rule from '../../src/rules/require-sql-template-in-query-function';

/**
 * Tests for `require-sql-template-in-query-function`.
 */

describe('require-sql-template-in-query-function rule', () => {
  let checker;

  beforeEach(() => {
    checker = new Checker();
    checker.configure({
      additionalRules: [new Rule()],
      requireSqlTemplateInQueryFunction: true
    });
  });

  it('should return an error if the source contains `query("foobar")` statements', () => {
    const results = checker.checkString('foo.query("SELECT bar FROM foobar;");');
    const errors = results.getErrorList();

    errors.should.have.length(1);
    errors[0].rule.should.equal('requireSqlTemplateInQueryFunction');
  });

  it('should allow template `query(sql`foobar`)` statements', () => {
    const results = checker.checkString('foo.query(sql`SELECT bar FROM foobar;`)');
    const errors = results.getErrorList();

    errors.should.have.length(0);
  });
});
