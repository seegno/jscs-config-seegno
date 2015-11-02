'use strict';

/**
 * Module dependencies.
 */

import Checker from 'jscs';
import path from 'path';

/**
 * Tests for `jscs-config-seegno`.
 */

describe('jscs-config-seegno', () => {
  let checker;

  beforeEach(() => {
    checker = new Checker();
    checker.configure({ plugins: [path.join(__dirname, '..', 'src')] });
  });

  it('should load a valid config file', () => {
    const preset = checker.getConfiguration().getRegisteredPresets().seegno;

    preset.should.be.an.Object().and.should.not.be.empty();
    preset.should.containEql(['additionalRules', 'esnext', 'excludeFiles']);
  });

  it('should define the proper environment', () => {
    const preset = checker.getConfiguration().getRegisteredPresets().seegno;

    preset.esnext.should.be.true();
    preset.excludeFiles.should.be.an.Array().and.should.not.be.empty();
    preset.excludeFiles.should.have.length(3);
    preset.excludeFiles.should.eql(['.git', 'dist', 'node_modules']);
  });

  it('should include the additional custom rules', () => {
    const preset = checker.getConfiguration().getRegisteredPresets().seegno;

    preset.additionalRules.should.be.an.Array().and.should.not.be.empty();
    preset.additionalRules.should.have.length(1);
    preset.additionalRules.should.eql(['./dist/rules/*.js']);
    preset.disallowGeneratorsInDescribeFunctions.should.be.true();
    preset.disallowOnlyFilterInTestFunctions.should.be.true();
    preset.requireShouldAssertionExecution.should.be.true();
    preset.requireSqlTemplateInQueryFunction.should.be.true();
  });
});
