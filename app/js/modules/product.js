'use strict';

require('modules/core');

Harpy.module('product', ['core'], function(core) {

	var products = [];
	var obj = {};

	obj.event 		= (window._appHarpy.event) ? window._appHarpy.event : '';
	obj.harpyId 	= (window._appHarpy.harpyId) ? window._appHarpy.harpyId : '';
	obj.hitType 	= (window._appHarpy.hitType) ? window._appHarpy.hitType : '';
	obj.pageType 	= 'Product';

	if(window._propsHarpy.product) {
		$(window._propsHarpy.product).each(function(i,e) { 
			var prod = {};

			prod.id 		= (e.id) ? e.id : '';
			prod.name 		= (e.name) ? e.name : '';
			prod.price 		= (e.price) ? e.price : '';
			prod.list 		= (e.list) ? e.list : '';
			prod.category 	= (e.category) ? e.category : '';
			prod.variant 	= (e.variant) ? e.variant : '';
			prod.brand 		= (e.brand) ? e.brand : '';
			prod.position 	= (e.position) ? e.position : '';

			products.push(prod);
		});

		window._propsHarpy = {}, window._appHarpy = {};
		window._propsHarpy.props = {};
		window._propsHarpy.props.product = products;
		window._appHarpy = obj;

		core.send();

	} else { throw "Please set the product info";  }

});





