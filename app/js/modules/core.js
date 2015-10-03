'use strict';

Harpy.module('core',[], function() {

	var self = this, cHarpy = {};

	this.init = function() {
		var data = {}, $document = document;
		data.url 			= window.location.href;
		data.referrerURL	= ($document.referrer) ? $document.referrer : '';
		data.title 			= $document.title;
		data.userId 		= self.userId();
		data.deviceType 	= self.deviceType();
		data.startTimestamp = $.now(); 

		if($.hasLocalStorage()){
		    data.referrerTitle = (localStorage.getItem('referrerTitle')) ? localStorage.getItem('referrerTitle') : '';
		    localStorage.setItem('referrerTitle', data.title);
		}

		return data;
	};

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

	this.userId = function() {
		return ($.getCookie('harpyUs')) ? 
					$.getCookie('harpyUs') : 
					$.setCookie('harpyUs', $.now());
	};

	cHarpy = self.init();

	this.prepareData = function() {
		cHarpy.scrollDepth 	= self.scrollDepth();
		cHarpy.timestamp 	= $.now();
		
		var data = $.mergeObject(cHarpy, window._appHarpy);
		data 	 = $.mergeObject(data,window._propsHarpy);
		return data;

	};

	this.send = function(endpoint) {
		var data = self.prepareData();
		$.ajax({
		    url : 'localhost:3000/save',
		    type : "post",
		    data: data,
		    async : true,
		    success : function(data) {
		    	console.log('success', data);
		    },
		    error: function(data) {
		    	console.log('error', data);	
		    }
		});
	};

});




