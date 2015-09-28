
;(function($, window, document, undefined){

	'use strict';

	var Harpy = window.Harpy = (function() {

		var modules = {};

		return {

			init: function(dep, func) {
				if( $.isFunction(dep) ) { func = dep; }
				if( ! $.isArray(dep) ) {  dep = []; }

				return $(function(){
					$(document).ready(function() {
						func.apply({}, dep.map(Harpy.module) );
					});
				});
			},

			module: function(name, dep, func) {

				if( $.isFunction(dep) ) { func = dep; }
				if( ! $.isArray(dep) ) {  dep = []; }

				if( modules[name] ) {

					var m = {}; 

					modules[name].apply(m, modules[name].dep.map(Harpy.module) );

					console.log('modules ' + name + ' started');

					return m;

				}else if( $.isFunction(func) ) {
					console.log('defining module', name);

					func.dep = dep;

					modules[name] = func;
				}
				
			}


		};
	})();

	return Harpy;

})(jQuery, window, document);