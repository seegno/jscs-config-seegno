'use strict';

/**
 * Module dependencies.
 */

import CliEngine from 'jscs/lib/cli-config';
import path from 'path';

/**
 * Instances.
 */

const dir = path.join(__dirname, '..');
const config = CliEngine.load('.jscsrc', dir);

/**
 * Export custom configuration.
 */

function register(conf) {
  conf.registerPreset('seegno', config);
}

export default register;
