'use strict';

/**
 * Module dependencies.
 */

const Checker = require('jscs');
const Rule = require('../../src/rules/require-sql-template');

/**
 * Tests for `require-sql-template`.
 */

describe('require-sql-template rule', () => {
  let checker;

  beforeEach(() => {
    checker = new Checker();
    checker.configure({
      additionalRules: [new Rule()],
      requireSqlTemplate: true
    });
  });

  it('should return an error if the source contains function calls with unwrapped SQL statements using interpolation', () => {
    const results = checker.checkString('const column = "*"; foo.query(`SELECT ${column} FROM foobar`);');
    const errors = results.getErrorList();

    errors.should.have.length(1);
    errors[0].rule.should.equal('requireSqlTemplate');
  });

  it('should return an error if the source contains variables with unwrapped SQL statements using interpolation', () => {
    const results = checker.checkString('const column = "*"; const query = `SELECT ${column} FROM foobar`; foo.query(query);');
    const errors = results.getErrorList();

    errors.should.have.length(1);
    errors[0].rule.should.equal('requireSqlTemplate');
  });

  it('should allow function calls with wrapped SQL statements with interpolation', () => {
    const results = checker.checkString('const column = "*"; foo.query(sql`SELECT ${column} FROM foobar`);');
    const errors = results.getErrorList();

    errors.should.have.length(0);
  });

  it('should allow variables with wrapped SQL statements not using interpolation', () => {
    const results = checker.checkString('const column = "*"; const query = sql`SELECT ${column} FROM foobar`; foo.query(query);');
    const errors = results.getErrorList();

    errors.should.have.length(0);
  });

  it('should ignore function calls with SQL statements not using interpolation', () => {
    const results = checker.checkString('foo.query(`SELECT column FROM foobar`);');
    const errors = results.getErrorList();

    errors.should.have.length(0);
  });

  it('should ignore variables with SQL statements not using interpolation', () => {
    const results = checker.checkString('const query = `SELECT column FROM foobar`; foo.query(query);');
    const errors = results.getErrorList();

    errors.should.have.length(0);
  });

  it('should ignore function calls with templates containing arbitrary data with interpolation', () => {
    const results = checker.checkString('const foo = "bar"; baz.greet(`hello ${foo}`);');
    const errors = results.getErrorList();

    errors.should.have.length(0);
  });

  it('should ignore variables with templates containing arbitrary data with interpolation', () => {
    const results = checker.checkString('const foo = "bar"; const baz = `hello ${foo}`; qux.greet(baz);');
    const errors = results.getErrorList();

    errors.should.have.length(0);
  });

  it('should ignore function calls with templates containing arbitrary data without interpolation', () => {
    const results = checker.checkString('foo.greet(`hello`);');
    const errors = results.getErrorList();

    errors.should.have.length(0);
  });

  it('should ignore variables with templates containing arbitrary data without interpolation', () => {
    const results = checker.checkString('const foo = `bar`; baz.greet(foo);');
    const errors = results.getErrorList();

    errors.should.have.length(0);
  });
});
