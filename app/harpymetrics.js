'use strict';

if(VERSION) {
	console.log('HarpyMetrics Build %s', VERSION);
	window.harpy = { version: VERSION };
}

require('jquery');
require('helpers/polyfills');
require('helpers/extensions');
require('vendors/harpymetrics');

/**
 * Sets the properties info.
 * @var {_optHarpy} Array
 */
window._propsHarpy   = window._propsHarpy || {};

/**
 * Sets the main info.
 * @var {_appHarpy} Object
 */
window._appHarpy = window._appHarpy || {};

Harpy.init([], function() { 
	var modules = require.context('modules', true, /\.js$/);
	modules.keys().forEach(modules);
});


