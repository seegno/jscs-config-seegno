'use strict';

/**
 * Module dependencies.
 */

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _jscsLibCliConfig = require('jscs/lib/cli-config');

var _jscsLibCliConfig2 = _interopRequireDefault(_jscsLibCliConfig);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

/**
 * Instances.
 */

var dir = _path2['default'].join(__dirname, '..');
var config = _jscsLibCliConfig2['default'].load('.jscsrc', dir);

/**
 * Export custom configuration.
 */

function register(conf) {
  conf.registerPreset('seegno', config);
}

exports['default'] = register;
module.exports = exports['default'];