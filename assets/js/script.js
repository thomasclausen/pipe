/**
 * Main JS file for Pipe
 */

(function ($) {
	"use strict";

	$(document).ready(function(){
		$('html').removeClass('no-js');

		if ($('body').hasClass('home-template')) {
			$('article').each(function() {
				$('.post-image .rectangle .circle', this).prepend('<div class="image" />');
				$('.post-image .rectangle .circle .image', this).css({
					 backgroundImage: 'url(' + $('.post-image .rectangle .circle img', this).attr('src') + ')'
				});
				$('.post-image .rectangle .circle p', this).remove();
			});
			$('article .post-image').on('click', function() {
				$(this).parent().find('.post-content a').attr('href');
			});
		}

		if ($('body').hasClass('post-template')) {
			$('article .post-content p:first-of-type img:first-of-type').prependTo('article .post-image');

			$('article .post-content .post-meta time').html($('article .post-content .post-meta time').text().substr(0, 2) + '<sup>' + $('article .post-content .post-meta time').text().substr(2, 2) + '</sup>' + $('article .post-content .post-meta time').text().substr(5));

			s.substring(0, s.indexOf('?'))
		}
	});
}(jQuery));