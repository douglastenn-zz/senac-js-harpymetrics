'use strict';

require('modules/core');

Harpy.module('checkout', ['core'], function(core) {

	var checkout = [];
	var obj = {};

	obj.event 		= (window._appHarpy.event) ? window._appHarpy.event : '';
	obj.harpyId 	= (window._appHarpy.harpyId) ? window._appHarpy.harpyId : '';
	obj.hitType 	= (window._appHarpy.hitType) ? window._appHarpy.hitType.toLowerCase() : '';
	obj.pageType 	= 'Checkout';

	if(window._propsHarpy.checkout) {
		$(window._propsHarpy.checkout).each(function(i,e) { 
			var check = {};

			check.id 			= (e.id) ? e.id : '';
			check.price 		= (e.price) ? e.price : '';
			check.quantity 		= (e.quantity) ? e.quantity : '';
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
		window._appHarpy = obj;

		core.send();

	} else { throw "Please set the checkout info";  }

});

