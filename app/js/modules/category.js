'use strict';

require('modules/core');

Harpy.module('category', ['core'], function(core) {

	var category = [];
	var obj = {};

	obj.event 		= (window._appHarpy.event) ? window._appHarpy.event : '';
	obj.harpyId 	= (window._appHarpy.harpyId) ? window._appHarpy.harpyId : '';
	obj.hitType 	= 'detail';
	obj.pageType 	= 'Category';

	if(window._propsHarpy.category) {
		$(window._propsHarpy.category).each(function(i,e) { 
			var cat = {};

			cat.id 		= (e.id) ? e.id : '';
			cat.name 		= (e.name) ? e.name : '';

			category.push(cat);
		});

		window._propsHarpy = {}, window._appHarpy = {};
		window._propsHarpy.props = {};
		window._propsHarpy.props.category = category;
		window._appHarpy = obj;

		core.send();

	} else { throw "Please set the category info";  }

});





