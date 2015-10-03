//jQuery extensions
(function ($) {

	$.hasLocalStorage = function () {
	  if ('localStorage' in window) {
	    try {
	      window.localStorage.setItem('_tmptest', 'tmpval');
	      window.localStorage.removeItem('_tmptest');
	      return true;
	    } catch (BogusQuotaExceededErrorOnIos5) {
	      // Thanks be to iOS5 Private Browsing mode which throws
	      // QUOTA_EXCEEDED_ERRROR DOM Exception 22.
	      return false;
	    }
	  }else{
	    return false;
	  }
	};

	$.mergeObject = function(obj1,obj2) {
	    var obj3 = {};
	    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
	    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
	    return obj3;
	};

	$.getCookie = function(name) {
	    if (document.cookie.length > 0) {
	        start = document.cookie.indexOf(name + "=");
	        if (start != -1) {
	            start = start + name.length + 1;
	            end = document.cookie.indexOf(";", start);
	            if (end == -1) {
	                end = document.cookie.length;
	            }
	            return unescape(document.cookie.substring(start, end));
	        }
	    }
	    return "";
	};

	$.setCookie = function(name, value, days) {
	    var expires;
	    if (days) {
	        var date = new Date();
	        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
	        expires = "; expires=" + date.toGMTString();
	    } else {
	        expires = "";
	    }
	    document.cookie = name + "=" + value + expires + "; path=/";
	    return $.getCookie(name);
	};

	$.removeCookie = function(name) {
	    $.setCookie(name,'',-1);
	};

	$.appendUrl = function(obj){
		$.each(obj, function(key, value){
			$(key).each(function(){
				var self = $(this),
					href = self.attr('href') || '';
				if( href.indexOf('#') !== -1 || href.indexOf('javascript') !== -1 ) return;
				self.attr('href', href + ( href.indexOf('?') === -1 ? '?' : '&') + value);
			});
		});
	};

	$.reduce = function(arr, fnReduce, valueInitial) {
		if (Array.prototype.reduce) {
			return Array.prototype.reduce.call(arr, fnReduce, valueInitial);
		}

		$.each(arr, function(i, value) {
			valueInitial = fnReduce.call(null, valueInitial, value, i, arr);
		});
		return valueInitial;
	};

	$.getParameterByName = function(name, string) {
		name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
		var regex = new RegExp('(?:[\\?&]|^)' + name + '=([^&#]*)'),
			results = regex.exec(string || window.location.search || '');
		return results ? decodeURIComponent(results[1].replace(/\+/g, ' ')) : '';
	};
	
	$.replaceSpecialChars = function(str){
		return str.toLowerCase()
				.replace(/[àáâãäå]/ig,'a')
				.replace(/[éèëê]/ig, 'e')
				.replace(/[íìïî]/ig, 'i')
				.replace(/[óòõöô]/ig, 'o')
				.replace(/[uúùüû]/ig, 'u')
				.replace(/[ç]/ig,'c')
				.replace(/^[0-9]/ig,'')
				.replace(/\s/ig,'-');
	};
	
	$.resizeImage = function( url, width, height ) {
		return (url = url.replace(/ids\/.+-(\d+)-(\d+)/, function(e, w, h) {
			return e.replace(w,width).replace(h, height);
		})), url.replace(/(ids\/[0-9]+)\//, '$1-' + width + '-' + height + '/');
	};

	$.extend($.fn, {
		toScroll: function(offset){
			var self = $(this);
			if( !self || self.length === 0 || ! self.is(':visible') ) return;
			
			$('html, body').stop().animate({
				scrollTop: self.offset().top + (offset || 0) + 'px'
			}, 1000);
		},
		scrollTo: function( target, offset ){
			$( target || $(this).attr('href') ).toScroll(offset);
		},
		exists: function () {
			return $(this).length > 0 ? true : false;
		},
		validEmail: function() {
			return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test( $(this).val());
		},
		validFullName: function(){
			return /(.*){3,}\s(.*).{3,}/i.test( $(this).val() );
		}
	});

	$.extend($.expr[':'], {
		// http://jqueryvalidation.org/blank-selector/
		blank: function( a ) { return !$.trim('' + $(a).val()); },
		// http://jqueryvalidation.org/filled-selector/
		filled: function( a ) { return !!$.trim('' + $(a).val()); },
		// http://jqueryvalidation.org/unchecked-selector/
		unchecked: function( a ) { return !$(a).prop('checked'); },

		//Contains: function( elem ) { return $(elem).text().toUpperCase().indexOf(args.toUpperCase()) >= 0; }
	});

}(jQuery));
