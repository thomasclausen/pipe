/**
 * Main JS file for Pipe
 **/

(function () {
	'use strict';

	var documentState = null,
		body = document.body;

	function poorMansDebugging(string) {
		if (window.console) {
			console.log(string);
		}
	}

	function init() {
		if (classie.has(body, 'post-template')) {
			var postMeta = document.querySelectorAll('.post-meta time');
			postMeta.innerHTML(postMeta.innerHTML.replace('st', '<sup>st</sup>'));
			postMeta.innerHTML(postMeta.innerHTML.replace('nd', '<sup>nd</sup>'));
			postMeta.innerHTML(postMeta.innerHTML.replace('rd', '<sup>rd</sup>'));
			postMeta.innerHTML(postMeta.innerHTML.replace('th', '<sup>th</sup>'));
		}
	}

	documentState = setInterval(function () {
		poorMansDebugging('documentState: ' + document.readyState);
		if (document.readyState === 'complete') {
			clearInterval(documentState);
			init();
		}
	}, 100);
})();
