/*!
 * Author: Mikhail Shestakov (mike.shestakov@gmail.com)
 * Use:
 *
 *	var options = {
 *		current:		0,		// Number of first photo to show
 *		photos:			[]		// [{'width': <number>, 'height': <number>, 'title': <string>, 'url': <string>}, ...]
 *		tickDuration:	300,	// Internal timer (in milliseconds)
 *		hideUIDelay:	6,		// Hide UI when user is idle (in ticks)
 *		slideInterval:	10,		// Delay between transitions (in ticks)
 *		fullscreenHintDelay:	5000	// in milleseconds
 *	};
 *
 *	$(el).GPlusFullscreen(options);
 */

;(function ( $, window, document ) {

    // Create the defaults once
    var pluginName = 'GPlusFullscreen',
        defaults = {
			current:		0,
			photos:			[],
            tickDuration:	300,
			hideUIDelay:	6,
			slideInterval:	10,
			fullscreenHintDelay:	5000
        };

	// Constructor
	function GPlusFullscreen( element, options )	{
		// Setting core properties
		this.element = element;
		this.options = $.extend( {}, defaults, options);
		
		// Setting runtime properties
		this.screenHeight	= 0;
		this.screenWidth	= 0;
		this.screenRatio	= 1;
		
		// Make sure current photo is not out of range
		this.current = this.options.current  >= this.options.photos.length ? 0 : this.options.current;
		this.state = this.current == this.options.photos.length - 1 ? 'replay' : 'play';
		
		// HTML templates for fullscreen slideshow
		this.HTMLTemplate	= {
			layout:	'<div id="gplus-fullscreen-layout"><div class="gplus-picture-holder"><div class="gplus-picture-aligner"><img id="gplus-picture" src="/i/0.gif" alt=""/></div></div><div id="gplus-ui"><div id="gplus-go-left"><div class="gplus-arrow"></div></div><div id="gplus-go-right"><div class="gplus-arrow"></div></div><div class="gplus-pult"><div id="gplus-button-left"><div class="gplus-button-highlighter"></div></div><div id="gplus-button-right"><div class="gplus-button-highlighter"></div></div><div id="gplus-caption-left"><div class="gplus-caption-icon"></div><span class="gplus-caption-play">Приостановить</span><span class="gplus-caption-stop">Продолжить</span><span class="gplus-caption-replay">Начать заново</span></div><div id="gplus-caption-right"><div class="gplus-caption-icon"></div></div></div></div><div id="gplus-spinner"></div></div>',
			fullscreenHint:	'<div id="gplus-fullscreen-tip" class="hidden"><p>Нажмите <span style="color: #f00">Enter</span>, чтобы смотреть фото во весь размер экрана.</p></div>'
		};
		
		// Initializing spinner
		if ( options && options.spinner )	{
			this.spinner = options.spinner;	// If spinner.js object passed, use it
		}
		else	{
			$('#gplus-spinner').addClass('css-spinner');
			
			this.spinner = {
				spin: function(){
					$('#gplus-spinner').removeClass('hidden');
				},
				stop: function(){
					$('#gplus-spinner').addClass('hidden');
				}
			}
		}

		this.init();
	}

///////// ADD HTML

    GPlusFullscreen.prototype = {

	init : function () {
		var _this=this;

		$('body').css('overflow','hidden');
		$('body').append(this.HTMLTemplate.layout);
		
		this.updateScreenDimensions();
		this.updatePicture();
		
		// Throw 'Use fullscreen mode' hint if browser supports it
		if (document.cancelFullScreen||document.mozCancelFullScreen||document.webkitCancelFullScreen) {
			this.fullscreenHint = $(this.HTMLTemplate.fullscreenHint).appendTo('#gplus-fullscreen-layout').removeClass( 'hidden' );
			window.setTimeout( function(){
				_this.fullscreenHint.addClass( 'hidden' ).bind('webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd', function(){
					this.style.display='none';
				});
			}, this.options.fullscreenHintDelay );
		}
		
		// Main ticker
		var slideTicker			= 0;
		
		// These vars are intended to show/hide UI on user idle
		var	ticksSinceMouseMove	= 0,
			lastMouseX			= 0,	// Cursor X position at previous tick
			lastMouseY			= 0;	// Cursor Y position at previous tick
		
		// This helps to prevent superfluous resized picture reloads from Google+
		var resizeTicker		= 0;

		// Timer
		this.ticker = window.setInterval(function(){

			// Sends a signal to update picture
			if( slideTicker == _this.options.slideInterval )	{
				_this.autoplay();
				slideTicker = 0;
			}

			// Hide controls on user idle
			if( ticksSinceMouseMove == _this.options.hideUIDelay )	{
				$('#gplus-fullscreen-layout').addClass( 'no-ui' );
			}
			
			// Resize picture at 2nd tick after last window resize event
			if( resizeTicker == 2 )	{
				_this.updateScreenDimensions();
				_this.updatePicture();
			}
			
			slideTicker++;
			resizeTicker++;
			ticksSinceMouseMove++;

		}, this.options.tickDuration);

		// Show UI on user action
		$( document ).mousemove( function ( e ) {

			// User is considered as idle if mouse move is less than 5px by X or Y
			if( Math.abs( lastMouseX - e.pageX ) > 5 || Math.abs( lastMouseY - e.pageY ) > 5 )	{
				ticksSinceMouseMove = 0;
				$('#gplus-fullscreen-layout').removeClass( 'no-ui' );
			}

			lastMouseX = e.pageX;
			lastMouseY = e.pageY;
		});
		
		// Drop resize ticker on resize
		$(window).resize(function(){
			resizeTicker=0;
		});
		
		// Keyboard events
		$( document ).bind( 'keydown', function( e ) {
			switch (e.keyCode)	{
				case 13:	// Enter
					_this.toggleFullscreen();
					break;
				case 37:	// Left
					_this.prev();
					break;
				case 39:	// Right
					_this.next();
					break;
				case 32:	// Space
					$('#gplus-caption-left').click();
					break;
				}
		});
		
		// Image load event
		$('#gplus-picture').load( function(){
			_this.spinner.stop();
			slideTicker = 0;
		});
		
		// Animating  controls
		$('#gplus-go-left, #gplus-go-right').hover(function(){$(this).toggleClass('hover')});
		$('#gplus-caption-left').hover(function(){$('#gplus-button-left').toggleClass('hover')});
		$('#gplus-caption-right').hover(function(){$('#gplus-button-right').toggleClass('hover')});
		
		// Prev / Next
		$('#gplus-go-left').click(function(){_this.prev();});
		$('#gplus-go-right').click(function(){_this.next();});

		// Play / stop control
		$('#gplus-caption-left').click(function(){
			switch (_this.state)	{
				case 'stop':
					_this.state = 'play';
					slideTicker = 0;
					break;
				case 'replay':
					_this.current = 0;
					slideTicker = 0;
					_this.state = 'play';
					break;
				case 'play':
					_this.state='stop';
					break;
			}

			_this.updatePicture();
		});
		
		// Exit button
		$('#gplus-caption-right').click(function(){
			_this.deinit();		
		});
    },
	
	deinit:	function(){
		// General CSS fix
		$('body').css('overflow','auto');
		
		// Clearing timers
		window.clearInterval(this.ticker);

		// remove event
		$( document ).unbind('mousemove');
		$( window ).unbind();
		$('#gplus-picture').unbind();
		$('#gplus-go-left, #gplus-go-right, #gplus-caption-left, #gplus-caption-right').unbind();
		this.fullscreenHint.unbind()

		// removing DOM
		$('#gplus-fullscreen-layout').remove();
	},

	updatePicture: function(){
		// Show/hide navigation controls
		$('#gplus-go-left').removeClass().addClass( this.current == 0 ? 'hidden' : '' );
		$('#gplus-go-right').removeClass().addClass( this.current == (this.options.photos.length - 1) ? 'hidden' : '' );

		var photoholder = $('#gplus-picture')[0];	/////// !!! когда соединятся 2 объекта, можно будет это убрать
		var w = this.options.photos[this.current].width;
		var h = this.options.photos[this.current].height;
		var r = w / h;
		
		// Making URL to photo of appropriate size
		var src = this.options.photos[this.current].url.substring(0,83);	// Length of URL to G+ picture without resize params
		
		if(r > this.screenRatio)
			src += 'w' + this.screenWidth + '/';
		else
			src += 'h' + this.screenHeight + '/';

		if( photoholder.src != src ){
			photoholder.src = src;
			this.spinner.spin($('#gplus-spinner')[0]);
			document.title = this.options.photos[this.current].title;
		}

		$('#gplus-caption-left').removeClass().addClass(this.state);
	},

	prev: function(){
		if( this.current > 0 )	{
			this.current--;
			this.updatePicture();
		}
	},

	next: function(){

		if( this.current < this.options.photos.length - 1 )	{
			this.current++;

			if( this.current == this.options.photos.length - 1 )	{
				this.state='replay';
				// Show controls
				$('#gplus-fullscreen-layout').removeClass('no-ui');
			}
		}

		this.updatePicture();
	},

	autoplay: function(){
		if( this.state == 'play' ){
			this.next();
		}
	},

	updateScreenDimensions: function(){
		this.screenWidth	= $(this.element).width();
		this.screenHeight	= $(this.element).height();
		console.log(this.screenWidth);
		console.log(this.screenHeight);
		this.screenRatio	= this.screenWidth / this.screenHeight;
	},
	
	toggleFullscreen: function(){////!!!!!!!!!!!! this.element
	if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
		if (this.element.requestFullScreen) {
			this.element.requestFullScreen();
		} else if (this.element.mozRequestFullScreen) {
			this.element.mozRequestFullScreen();
		} else if (this.element.webkitRequestFullScreen) {
			this.element.webkitRequestFullScreen();
		}
		$('#gplus-fullscreen-tip').hide();
	} else {
		if (document.cancelFullScreen) {
			document.cancelFullScreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitCancelFullScreen) {
			document.webkitCancelFullScreen();
		}
	}
}
	};

    // A really lightweight plugin wrapper around the constructor, 
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, 
                new GPlusFullscreen( this, options ));
            }
        });
    }

})( jQuery, window, document );



$(document).ready(function() {
	var photos;
	var spinner = new Spinner({ 
				lines: 13, 
				length: 7, 
				width: 4, 
				radius: 10, 
				rotate: 0, 
				color: '#000', 
				speed: 1, 
				trail: 60, 
				shadow: false, 
				hwaccel: true, 
				className: 'spinner', 
				zIndex: 2e9
			});
	
	$.getJSON('/portfolio/best/fullscreen.json', function(data) {
		var fs = $('body').GPlusFullscreen({'photos': data.photos });
	});

	
});