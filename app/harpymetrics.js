'use strict';

if(VERSION) {
	console.log('HarpyMetrics Build %s', VERSION);
	window.harpy = { version: VERSION };
}

require('vendors/jquery.js');

var $Harpy = jQuery.noConflict();