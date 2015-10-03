'use strict';

require('modules/core');

Harpy.module('search', ['core'], function(core) {

	var search = [];
	var obj = {};

	obj.event 		= (window._appHarpy.event) ? window._appHarpy.event : '';
	obj.harpyId 	= (window._appHarpy.harpyId) ? window._appHarpy.harpyId : '';
	obj.hitType 	= 'detail';
	obj.pageType 	= 'Search';

	if(window._propsHarpy.search) {
		$(window._propsHarpy.search).each(function(i,e) { 
			var searchObj = {};

			searchObj.searchTerm 	= (e.searchTerm) ? e.searchTerm : '';
			searchObj.totalResult 	= (e.totalResult) ? e.totalResult : '';

			search.push(searchObj);
		});

		window._propsHarpy = {}, window._appHarpy = {};
		window._propsHarpy.props = {};
		window._propsHarpy.props.search = search;
		window._appHarpy = obj;

		core.send();

	} else { throw "Please set the search info";  }

});