'use strict';

// Avoid `console` errors in browsers that lack a console.
(function() {
	var method;
	var noop = function noop() {};
	var methods = [
		'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
		'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
		'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
		'timeStamp', 'trace', 'warn'
	];
	var length = methods.length;
	var console = (window.console = window.console || {});

	while (length--) {
		method = methods[length];

		// Only stub undefined methods.
		if (!console[method]) {
			console[method] = noop;
		}
	}
}());

String.prototype.formatArray = function(a){
	return this.replace(/\{(\d+)\}/g, function(r,e){return a[e];});
};
String.prototype.render = function(obj){
	return this.replace(/\{(\w+)\}/g, function(r,e){return obj[e];});
};

if (!String.prototype.trim) {
	String.prototype.trim = function () {
		return this.replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g,'');
	};
}

if (!String.prototype.capitalize) {
	String.prototype.capitalize = function() {
		return this.charAt(0).toUpperCase() + this.slice(1);
	};
}

if (!Array.prototype.forEach) {
	Array.prototype.forEach = function (f, c) {
		for (var i = 0; i < this.length; i++) f.call(c, this[i], i, this);
	};
}
if(!Array.prototype.map){
	Array.prototype.map = function (f, c) {
		for (var r = [], i = 0; i < this.length; i++) {
			r[i] = f.call(c, this[i], i, this);
		}
		return r;
	};
}
if(!Array.prototype.filter){
	Array.prototype.filter = function (f, c) {
		for (var r = [], j = 0, i = 0, s = this, t; i < s.length; i++) {
			if (f.call(c, t = s[i], i, s)) {
				r[j++] = t;
			}
		}
		return r;
	};
}
if(!Array.prototype.some){
	Array.prototype.some = function (f, c) {
		for (var i = 0; i < this.length; i++){
			if (f.call(c, this[i], i, this)) break;
		}
		return i < this.length;
	};
}
if (!Function.prototype.bind) {
	Function.prototype.bind = function(oThis) {
		if (typeof this !== 'function') {
			// closest thing possible to the ECMAScript 5
			// internal IsCallable function
			throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
		}

		var aArgs = Array.prototype.slice.call(arguments, 1),
			fToBind = this,
			Noop	= function() {},
			fBound	= function() {
				return fToBind.apply(this instanceof Noop ? this : oThis,
							aArgs.concat(Array.prototype.slice.call(arguments)));
			};

		Noop.prototype = this.prototype;
		fBound.prototype = new Noop();

		return fBound;
	};
}

if (!Object.keys) {
	Object.keys = (function() {
		var hasOwnProperty = Object.prototype.hasOwnProperty,
			hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
			dontEnums = [
				'toString',
				'toLocaleString',
				'valueOf',
				'hasOwnProperty',
				'isPrototypeOf',
				'propertyIsEnumerable',
				'constructor'
			],
			dontEnumsLength = dontEnums.length;

		return function(obj) {
			if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
				throw new TypeError('Object.keys called on non-object');
			}

			var result = [], prop, i;

			for (prop in obj) {
				if (hasOwnProperty.call(obj, prop)) {
					result.push(prop);
				}
			}

			if (hasDontEnumBug) {
				for (i = 0; i < dontEnumsLength; i++) {
					if (hasOwnProperty.call(obj, dontEnums[i])) {
						result.push(dontEnums[i]);
					}
				}
			}
			return result;
		};
	}());
}

