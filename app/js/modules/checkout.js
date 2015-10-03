'use strict';

require('modules/core');

Harpy.module('checkout', ['core'], function(core) {

	var checkout = [], products = [];
	var obj = {};

	obj.event 		= (window._appHarpy.event) ? window._appHarpy.event : '';
	obj.harpyId 	= (window._appHarpy.harpyId) ? window._appHarpy.harpyId : '';
	obj.hitType 	= (window._appHarpy.hitType) ? window._appHarpy.hitType : '';
	obj.pageType 	= 'Checkout';


	if(window._propsHarpy.product) {
		$(window._propsHarpy.product).each(function(i,e) { 
			var prod = {};

			prod.id 			= (e.id) ? e.id : '';
			prod.quantity 		= (e.quantity) ? e.quantity : '';

			products.push(prod);
		});
	}


	if(window._propsHarpy.checkout) {
		$(window._propsHarpy.checkout).each(function(i,e) { 
			var check = {};

			check.transactionId	= (e.transactionId) ? e.transactionId : '';
			check.revenue		= (e.revenue) ? e.revenue : '';
			check.tax			= (e.tax) ? e.tax : '';
			check.shipping		= (e.shipping) ? e.shipping : '';
			check.coupon		= (e.coupon) ? e.coupon : '';

			checkout.push(check);
		});

		window._propsHarpy = {}, window._appHarpy = {};
		window._propsHarpy.props = {};
		window._propsHarpy.props.checkout = checkout;
		window._propsHarpy.props.product = products;
		window._appHarpy = obj;

		core.send();

	} else { throw "Please set the checkout info";  }

});

