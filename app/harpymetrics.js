'use strict';

if(VERSION) {
	console.log('HarpyMetrics Build %s', VERSION);
	window.harpy = { version: VERSION };
}

require('jquery');
require('helpers/polyfills');
require('helpers/extensions');
require('vendors/harpymetrics');

Harpy.init([], function() { 
	var modules = require.context('modules', true, /\.js$/);
	modules.keys().forEach(modules);
});


