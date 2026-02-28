/* eslint-disable */

var ua = navigator.userAgent.toLowerCase();
var is_local = (document.location.toString().indexOf("local")>-1 || document.location.toString().indexOf("vagrantshare.com")>-1);

function otrace_str( obj, match_str, delimiter ) {
	var str = "";
	if ( delimiter===undefined ) delimiter = "\n";
	var count = 0;
	for ( var i in obj ) if ( typeof(obj[i])!="function" ) {
		if ( match_str===undefined || match_str==="" || i.toLowerCase().indexOf(match_str)>-1 ) {
			if ( count++>0 ) str += delimiter;
			str += i + ": " + obj[i];
		}
	}
	return str;
}

function otrace( obj, match_str ) {
	alert( otrace_str( obj, match_str ) );
}

function readable( obj ) {
	return JSON.stringify( obj, "\t", 4 );
}

function scrollTo( y, dont_animate, callback, speed, delay_time ) {
	if ( y<0 ) y = 0;
	if ( speed===undefined ) speed = 500;

	if ( dont_animate ) {
		jQuery("html, body").stop().scrollTop( y );
	} else {
		if ( delay_time!==undefined ) {
			jQuery("html").stop().delay(delay_time).animate(
				{scrollTop: y},
				speed
			);
			jQuery("body").stop().delay(delay_time).animate(
				{scrollTop: y},
				speed,
				callback
			);
		} else {
			jQuery("html").stop().animate(
				{scrollTop: y},
				speed
			);
			jQuery("body").stop().animate(
				{scrollTop: y},
				speed,
				callback
			);
		}
	}
}

function offset_top( selector ) {
	var offset = (typeof(selector)=="object" ? selector.offset() : jQuery(selector).offset());
	return (offset!=undefined ? offset.top : 0);
}

function offset_left( selector ) {
	var offset = (typeof(selector)=="object" ? selector.offset() : jQuery(selector).offset());
	return (offset!=undefined ? offset.left : 0);
}

function random( min, max ) {
	if ( max===undefined ) {
		max = min-1;
		min = 0;
	}
	return Math.round( min + ((max-min)*(Math.random() % 1)));
}

function posInArray( arr, val ) {
	var index = -1;
	var length = arr.length;
	for ( var i=0; i<length; i++ ) {
		if ( arr[i]==val ) {
			index = i;
			break;
		}
	}
	return index;
}

function fieldIndex( arr, prop, val ) {
	var index = -1;
	var length = arr.length;
	for ( var i=0; i<length; i++ ) {
		if ( arr[i][prop]==val ) {
			index = i;
			break;
		}
	}
	return index;
}

function lz( n, length ) {
	var str = (n>0 ? n : -n) + "";
	var zeros = "";
	for ( var i=length-str.length; i>0; i-- ) zeros += "0";
	zeros += str;
	return (n>=0 ? zeros : "-"+zeros);
}

function cloneObject( obj ) {
	if ( Object.prototype.toString.call(obj)==="[object Array]" ) {
		var out = [], i = 0, len = obj.length;
		for ( ; i < len; i++ ) {
			out[i] = arguments.callee( obj[i] );
		}
		return out;
	}
	if ( typeof(obj)==="object" ) {
		var out = {}, i;
		for ( i in obj ) {
			out[i] = arguments.callee( obj[i] );
		}
		return out;
	}
	return obj;
}

function is_fullscreen() {
	return (!window.screenTop && !window.screenY);
}

function requestFullScreen( element ) {
	var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullscreen;

	if ( requestMethod ) {
		requestMethod.call(element);
	} else if (typeof window.ActiveXObject !== "undefined") {
		var wscript = new ActiveXObject("WScript.Shell");
		if (wscript !== null) {
			wscript.SendKeys("{F11}");
		}
	}
}

function exitFullScreen() {
	if ( document.exitFullscreen ) {
		document.exitFullscreen();
	} else if ( document.msExitFullscreen ) {
		document.msExitFullscreen();
	} else if ( document.mozCancelFullScreen ) {
		document.mozCancelFullScreen();
	} else if ( document.webkitExitFullscreen ) {
		document.webkitExitFullscreen();
	}
}



jQuery.fn.reverse = [].reverse;





Image.prototype.load = function( url, callback, progress_function ) {
	var thisImg = this, xmlHTTP = new XMLHttpRequest();

	thisImg.completedPercentage = 0;

	xmlHTTP.open( 'GET', url , true );
	xmlHTTP.responseType = 'arraybuffer';

	xmlHTTP.onload = function( e ) {
		var h = xmlHTTP.getAllResponseHeaders(), m = h.match( /^Content-Type\:\s*(.*?)$/mi ), mimeType = m[1] || 'image/png';

		if ( !jQuery("html").hasClass("ie9") ) {
			var blob = new Blob( [this.response], {type:mimeType} );
			thisImg.src = window.URL.createObjectURL( blob );
		}

		if ( callback ) setTimeout(
			function() {
				callback( this, thisImg );
			},
			10
		);
	};

	xmlHTTP.onprogress = function( e ) {
		if ( e.lengthComputable ) {
			thisImg.completedPercentage = parseInt( ( e.loaded / e.total ) * 100 );
			if ( progress_function ) progress_function( thisImg.completedPercentage );
		}
	};

	xmlHTTP.onloadstart = function() {
		thisImg.completedPercentage = 0;
	};

	xmlHTTP.onloadend = function() {
		thisImg.completedPercentage = 100;
	}

	xmlHTTP.send();
};






var is_ie10 = false;
/*@cc_on
if (/^10/.test(@_jscript_version)) {
	is_ie10 = true;
}
@*/


(function ($) {
	if ( ua.indexOf("msie")>-1 || ua.indexOf("trident")>-1 ) $("html").addClass( "ie" );
	if ( ua.indexOf("firefox")>-1 ) $("html").addClass( "ff" );
	if ( ua.indexOf("windows")>-1 ) $("html").addClass( "windows" );
	if ( ua.indexOf("macintosh")>-1 ) $("html").addClass( "macintosh" );
	if ( ua.indexOf("android")>-1 ) $("html").addClass( "android" );
	if ( ua.indexOf("safari")>-1 && ua.indexOf("chrome")==-1 && ua.indexOf("opr")==-1 ) $("html").addClass( "safari" );
	if ( ua.indexOf("chrome")>-1 && ua.indexOf("edge")==-1 ) $("html").addClass( "chrome" );
	if ( ua.indexOf("edge")>-1 ) $("html").addClass( "edge" );
	if ( ua.indexOf("trident/7.0")>-1 ) $("html").addClass( "ie11" );
	if ( is_ie10 ) $("html").addClass( "ie10" );
	if ( ua.indexOf("firefox")>-1 ) {
		var p = ua.indexOf("firefox");
		var version = parseInt(ua.substr( p+8 ));
		if ( !isNaN(version) ) {
			$("html").addClass( "ff" + version );
			if ( version<28 ) $("html").addClass( "ff-esr" );
		}
	}

	var logged_in = false;



	var mobile_navigation, mobile_btn_svg, mobile_btn_svg_tl;

	function toggleNavigation( show ) {
		if ( show==undefined ) show = mobile_navigation.is(":hidden");

		if ( show ) {
			mobile_navigation.stop().slideDown(150);
			$("body").addClass("nav-open");

			for ( var i=0; i<3; i++ ) {
				TweenLite.set( mobile_btn_svg[i], {transformOrigin: "50% 50% 50%"} );
			}

			mobile_btn_svg_tl.play();
		} else {
			mobile_navigation.stop().slideUp(150);
			$("body").removeClass("nav-open");

			mobile_btn_svg_tl.reverse();
		}
	}




	$(document).ready(
		function() {
			logged_in = $("body").hasClass("logged-in");


            const printButtons = document.querySelectorAll('[data-print-button]');

            [...printButtons].forEach((button) => {
                button.addEventListener('click', (event) => {
                    event.preventDefault();
                    window.print();
                });
            });

			$(".ar-global-form-search input.form-text").focus(
				function() {
					$(this).parents(".ar-global-form-search").addClass("form--focused");
					$("#navigation").addClass("navigation--search-focused");
				}
			).blur(
				function() {
					var str = $.trim($(this).val()), form = $(this).parents(".ar-global-form-search");
					$(this).val( str );
					form.removeClass("form--focused");
					$("#navigation").removeClass("navigation--search-focused");
					if ( str!="" ) form.addClass("form--not-empty");
					else form.removeClass("form--not-empty");
				}
			);

			$(".ar-global-form-search input.form-submit").click(
				function(e) {
					var input = $("input.form-text",$(this).parents(".ar-global-form-search"));
					if ( input.val()=="" ) {
						e.preventDefault();

						input.focus();
						setTimeout(
							function() {
								$("#wrapper").scrollLeft(0);
							},
							1
						);
						return false;
					}
				}
			);


			mobile_btn_svg = $("#navigation .navigation__toggle-menu a svg rect");
			mobile_btn_svg_tl = new TimelineLite( {paused:true} );

			mobile_btn_svg_tl.addLabel(
				"startpoint"
			).to(
				mobile_btn_svg[0], 0.3, {rotation:-45, y:5, ease:Power1.easeOut}, "startpoint"
			).to(
				mobile_btn_svg[1], 0.3, {scaleX:0, opacity:0, ease:SlowMo.easeNone}, "startpoint"
			).to(
				mobile_btn_svg[2], 0.3, {rotation:45, y:-5, ease:Power2.easeOut}, "startpoint"
			);


			$("#navigation .navigation__toggle-menu a").click(
				function() {
					toggleNavigation();
				}
			);


			mobile_navigation = $("#navigation .navigation__menu");
			mobile_navigation.hide();



			if ( $("a.btn-fullscreen").length ) {
				var lightbox_div = $(
					'<div id="wieni-lightbox">' +
						'<div class="wieni-lightbox__bg"></div>' +
						'<div class="wieni-lightbox__content">' +
							'<picture id="wieni-lightbox__content__image"></picture>' +
						'</div>' +
						'<div class="wieni-lightbox__info">' +
							'<div class="wieni-lightbox__info__caption"></div>' +
						'</div>' +
						'<div class="wieni-lightbox__nav">' +
							'<a class="prev" href="javascript:void(0)" title="' + Drupal.t('Previous') + '">' +
								'<span>' + Drupal.t('Previous') + '</span>' +
								'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 16" xml:space="preserve">' +
									'<path d="M6.1,8l6.9,6.5L11.4,16L3,8l8.4-8L13,1.5L6.1,8z"/>' +
								'</svg>' +
							'</a>' +
							'<a class="next" href="javascript:void(0)" title="' + Drupal.t('Next') + '">' +
								'<span>' + Drupal.t('Next') + '</span>' +
								'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 16" xml:space="preserve">' +
									'<path d="M3,1.468L4.551,0L13,8l-8.449,8L3,14.532L9.899,8L3,1.468z"/>' +
								'</svg>' +
							'</a>' +
						'</div>' +
						'<div class="wieni-lightbox__page">' +
							'<div class="wieni-lightbox__page__box"></div>' +
						'</div>' +
						'<div class="wieni-lightbox__controls">' +
							'<a class="wieni-lightbox__controls__fullscreenbtn" href="javascript:void(0)" title="' + Drupal.t('Full screen') + '">' +
								'<span>' + Drupal.t('Full screen') + '</span>' +
								'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 12 12" xml:space="preserve">' +
									'<path d="M2,9L0,7v5h5l-2-2l7-7l2,2V0H7l2,2L2,9z"/>' +
								'</svg>' +
							'</a>' +
							'<a class="wieni-lightbox__controls__closebtn" href="javascript:void(0)" title="' + Drupal.t('Close') + '">' +
								'<span>' + Drupal.t('Close') + '</span>' +
								'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 12 12" xml:space="preserve">' +
									'<polygon points="12,1.1 10.9,0 6,4.9 1.1,0 0,1.1 4.9,6 0,10.9 1.1,12 6,7.1 10.9,12 12,10.9 7.1,6 "/>' +
								'</svg>' +
							'</a>' +
						'</div>' +
					'</div>'
				);
				var lightbox_items = [], lightbox_page = 0, lightbox_max = 0;

				function openLightbox( id ) {
					lightbox_div.stop().fadeTo( 300, 1 );

					updateLightbox( id );
				}

				function closeLightbox() {
					lightbox_div.stop().fadeTo( 300, 0, function() {$(this).hide();} );
				}

				function updateLightbox( id ) {
					if ( id==undefined ) id = lightbox_page;
					else lightbox_page = id;

					var obj = lightbox_items[id];

					var img = new Image();
					img.load( obj.fn,
						function() {
							$("#wieni-lightbox__content__image",lightbox_div).html(
								'<img src="' + obj.fn + '" alt="' + obj.alt + '">'
							).removeClass().addClass('orientation-' + (img.width>=img.height ? 'landscape' : 'portrait'));
							lightbox_div.removeClass("image-loading").addClass("image-loaded");
							$("#wieni-lightbox__content__image img").on( "dragstart",
								function(e) {
									e.preventDefault();
									return false;
								}
							);

							$(".wieni-lightbox__page__box").html(
								'<span class="current">' + (id+1) + '</span>&sol;' + (lightbox_max+1)
							);

							$(".wieni-lightbox__info__caption").html( obj.caption );

							if ( obj.caption!="" ) $(".wieni-lightbox__content",lightbox_div).addClass("has-caption");
							else $(".wieni-lightbox__content",lightbox_div).removeClass("has-caption");
						},
						function( num ) {
							$(".loading_bar__progress",lightbox_div).css( "width", num+"%" );
						}
					);

					lightbox_div.removeClass().addClass("image-loading");
				}

				$("a.btn-fullscreen").each(
					function(index) {
						var btn = $(this), figure = btn.siblings("figure");
						if ( !figure.length ) figure = btn.parent();
						if ( figure.data("full")!=undefined ) {
							var pos = fieldIndex( lightbox_items, "fn", figure.data("full") ), img = $("img",figure), caption = figure.siblings(".caption");
							if ( pos==-1 ) {
								lightbox_items.push( {
									fn: figure.data("full"),
									alt: img.attr("alt"),
									caption: caption.length ? caption.html() : ""
								} );
								pos = lightbox_items.length-1;
							}
							btn.click(
								function() {
									openLightbox( pos );
								}
							);

							if (!figure.parents(".gallery.format-horizontal").length ) {
								figure.on( "dragstart",
									function(e) {
										e.preventDefault();
										return false;
									}
								).click(
									function() {
										openLightbox( pos );
									}
								).hover(
									function() {
										btn.addClass("hover")
									},
									function() {
										btn.removeClass("hover")
									}
								).addClass("clickable");
							} else {
								figure.click(
									function() {
										if ( $(this).parents(".item").hasClass("active") ) openLightbox( pos );
									}
								).hover(
									function() {
										if ( $(this).parents(".item").hasClass("active") ) btn.addClass("hover")
									},
									function() {
										if ( $(this).parents(".item").hasClass("active") ) btn.removeClass("hover")
									}
								).addClass("clickable");
							}
						} else {
							btn.remove();
						}
					}
				);

				lightbox_max = lightbox_items.length-1;

				$(".wieni-lightbox__bg, .wieni-lightbox__controls__closebtn",lightbox_div).click(
					function() {
						if ( is_fullscreen() ) {
							exitFullScreen();
						}
						closeLightbox();
					}
				);

				$(".wieni-lightbox__controls__fullscreenbtn",lightbox_div).click(
					function() {
						if ( !is_fullscreen() ) {
							requestFullScreen( document.body );
						} else {
							exitFullScreen();
						}
					}
				);

				$(".wieni-lightbox__nav a.prev",lightbox_div).mousedown(
					function() {
						lightbox_page--;
						if ( lightbox_page<0 ) lightbox_page = lightbox_max;
						updateLightbox();
					}
				);

				$(".wieni-lightbox__nav a.next",lightbox_div).mousedown(
					function() {
						lightbox_page++;
						if ( lightbox_page>lightbox_max ) lightbox_page = 0;
						updateLightbox();
					}
				);


				lightbox_div.css( "opacity", 0 ).hide();
				if ( lightbox_max==0 ) {
					$(".wieni-lightbox__page, .wieni-lightbox__nav",lightbox_div).hide();
				}
				$("#wrapper").append( lightbox_div );

				$(document).keydown(
					function(e) {
						if ( !lightbox_div.is(":hidden") ) {
							var block = false;
							//console.log( e.keyCode );

							switch ( e.keyCode ) {
								case 27: // escape
								case 32: // space
								case 37: // left
								case 39: // right
								case 38: // up
								case 40: // down
									block = true;
									break;
							}

							switch ( e.keyCode ) {
								case 27:
									closeLightbox();
									break;
								case 37:
									lightbox_page--;
									if ( lightbox_page<0 ) lightbox_page = lightbox_max;
									updateLightbox();
									break;
								case 39:
									lightbox_page++;
									if ( lightbox_page>lightbox_max ) lightbox_page = 0;
									updateLightbox();
									break;
							}

							if ( block ) {
								e.preventDefault();
								return false;
							}
						}
					}
				);

				$(window).on( "scroll touchmove mousewheel",
					function(e) {
						if ( !lightbox_div.is(":hidden") ) {
							e.preventDefault();
							return false;
						}
					}
				);

			}



			/*$("html.ie #wrapper").mouseover(
				function() {
					$(this).scrollLeft(0);
				}
			);*/



			if ( $(".footnotes").length>1 ) {
				var list = $(".footnotes").slice( 0, $(".footnotes").length-1 ), last_div = $(".footnotes").last();
				list.reverse().each(
					function() {
						$("ol",last_div).prepend( $("ol",this).children() );
						$("ul",last_div).prepend( $("ul",this).children() );
					}
				).remove();
			}

			if ( $(".footnotes").length ) {
				$(".paragraph-type-body:last .paragraph--body__text").append( $(".footnotes") );
				$("a[rel=footnote]").each(
					function(index) {
						$(this).html( index+1 );
					}
				);
			}



			if ( $("a[href*='#']").length ) {
				$("a[href*='#']").click(
					function(e) {
						e.preventDefault();
						e.stopPropagation();

						var hash = $(this)[0].hash.substr(1);
						var a = $("a[name='" + hash + "']" );
						if ( !a.length ) a = $("#"+hash.replace( ":", "\\:" ));
						if ( !a.length && hash=="top" ) a = $("body");

						if ( a.length ) {
							var y = offset_top(a);
							if ( a.data("nav_offset")!=undefined ) y += a.data("nav_offset");

							scrollTo( y, false,
								function() {
									window.location.hash = hash;
									$("body").addClass( "hashnav" );
								}
							);

							window_resized = true;
						}
					}
				).each(
					function() {
						var hash = $(this)[0].hash.substr(1);
						if ( hash.indexOf(":")>-1 ) {
							var a = $("a[name='" + hash + "']" );
							if ( !a.length ) a = $("#"+hash.replace( ":", "\\:" ));
							$(this).data( "nav_offset", logged_in ? -40 : -20 );
							a.data( "nav_offset", logged_in ? -40 : -20 );
						}
					}
				);

				$(window).bind( "hashchange",
					function (e) {
						var hash = window.location.hash.slice(1);

						if ( hash==="" ) scrollTo( 0 );
						else {
							var a = $("a[name='" + hash + "']" );
							if ( !a.length ) a = $("#"+hash.replace( ":", "\\:" ));

							if ( a.length ) {
								var y = offset_top(a);
								if ( a.data("nav_offset")!=undefined ) y += a.data("nav_offset");

								scrollTo( y, true );

								window_resized = true;
							}
						}
					}
				);
			}

			var hash = window.location.hash.slice(1);
			if ( hash!=="" ) {
				$("body").addClass( "hashnav" );
			}


		}
	);

    Drupal.behaviors.dirtyHideIntroTextOfSomeForms = {
        attach: function () {
            var confirmation = document.querySelector('.page-top__sidebar .confirmation');
            var intro = document.querySelector('.page-top__sidebar .intro');

            try {
                if (confirmation && intro) {
                    intro.parentElement.removeChild(intro);
                }
            } catch (error) {
                // be progressive
            }
        }
    };

    Drupal.behaviors.ar_crm = {
        attach: function (context, settings) {
            checkLabel();
        }
    };

    function checkLabel() {
        $field = $(':input[name^="field_donation_country"]');
        if ($field.length) {
            $field.on('change', function() {
                var val = this.value == 'BE' ? 'be' : 'nl';
                changeLabel(val);
            });
        };
    }

    function changeLabel($lang) {
        $checkbox = $('.field-name-field-donation-domiciliation');

        if ($checkbox.length) {
            $span = $('.form-checkbox .form-checkbox__copy', $checkbox);
            $span.html(Drupal.settings.ar_crm['dd_' + $lang]);
        };
    }


	// Script to block ie8 users from seeing our beautiful gem of a website
	Drupal.behaviors.ie8blocker = {
		attach: function(context, settings) {
			$(document).ready(
				function() {
					if ( $("html").hasClass("lt-ie9") ) {
						var name = $("#wrapper").attr("data-site-name");
						if ( name==undefined ) name = Drupal.t('This website');

						$("html").addClass("ie8blocker");
						$("body").html(
							'<table><tr><td><div>' +
								'<h5>' + name + ' ' + Drupal.t('isn\'t available on Internet Explorer 8 and lower!') + '</h5>' +
								'<p>' +
									Drupal.t('We recommend you to') + ' <a href="http://windows.microsoft.com/en-us/internet-explorer/download-ie">' + Drupal.t('upgrade Internet Explorer!') + '</a><br /><br />' +
									Drupal.t('Or even better:') + '<br />' +
									'<a href="http://www.google.com/chrome/">' + Drupal.t('Download Chrome') + '</a><br />' +
									'<a href="https://www.mozilla.org/en-US/firefox/new/">' + Drupal.t('Download Firefox') + '</a>' +
								'</p>' +
							'</div></td></tr></table>'
						);
					}
				}
			);
		}
	};



})(jQuery);
;
