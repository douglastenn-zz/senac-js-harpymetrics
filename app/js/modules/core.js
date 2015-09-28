'use strict';

Harpy.module('core',[], function() {

	var self = this,
	harpyObj = $.getCookie('harpy');

	this.scrollDepth = function(containerA, containerB) {
		if(containerA == undefined)
			containerA = window;
		if(containerB == undefined)
			containerB = document;
		
		var scrollPercent = 100 * $(containerA).scrollTop() / ($(containerB).height() - $(containerA).height());
		return scrollPercent;
	};

	this.deviceType = function() {
		  var deviceType = 'Browser';
		  if(navigator.userAgent.match(/iPad/i)) 		deviceType = 'Ipad';
		  if(navigator.userAgent.match(/iPhone/i)) 		deviceType = 'Iphone';
		  if(navigator.userAgent.match(/Android/i))		deviceType = 'Android';
		  if(navigator.userAgent.match(/BlackBerry/i))	deviceType = 'BlackBerry';
		  if(navigator.userAgent.match(/webOS/i))		deviceType = 'Browser';
	  return deviceType;
	};


	this.getBasicInfo = function() {
		var basic = {}, $document = document, obj = JSON.parse(harpyObj);
		basic.title 		= $document.title;
		basic.url 			= window.location.href;
		basic.referrerTitle = $document.title;
		basic.referrerURL	= $document.referrer;
		console.log('harpyObj', obj);
		$.setCookie('harpy', JSON.stringify(basic) );
	};

});