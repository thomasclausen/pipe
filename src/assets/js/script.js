/**
 * Main JS file for Pipe
 **/

+function () {
	'use strict';

	var documentState = null,
		html = document.querySelectorAll('html'),
		body = document.body;
		
	function poorMansDebugging(string) {
		if (window.console) {
			console.log(string);
		}
	}

	function init() {
		classie.remove(html, 'no-js'); // Modernizr normally fixes this ?

		if (classie.has(body, 'post-template')) {
			var postMeta = document.querySelectorAll('.post-meta time');
			postMeta.innerHTML(postMeta.innerHTML.replace('st', '<sup>st</sup>'));
			postMeta.innerHTML(postMeta.innerHTML.replace('nd', '<sup>nd</sup>'));
			postMeta.innerHTML(postMeta.innerHTML.replace('rd', '<sup>rd</sup>'));
			postMeta.innerHTML(postMeta.innerHTML.replace('th', '<sup>th</sup>'));
		}
	}

	documentState = setInterval(function () {
		poorMansDebugging('state: ' + document.readyState);
		if (document.readyState === 'complete') {
			clearInterval(documentState);
			init();
		}
	}, 100);
}();