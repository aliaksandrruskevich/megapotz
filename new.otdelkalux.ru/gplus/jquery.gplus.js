/*!
 * Author: Mikhail Shestakov (mike.shestakov@gmail.com)
 */

;(function ( $, window, document ) {
	'use strict';
    var pluginName = 'GPlusGallery';

	// Defaults
	var defaults = {
		pictureMarginRight: 6,
		minRowAspectRatio: 4,
		tickDuration: 300,
		hideUIDelay: 6,
		slideInterval: 10,
		fullscreenHintDelay: 5000,
		spinner: undefined
	};

	// Constructor
	function GPlusGallery( element, photos, options ) {
		this.element = element;
		this.photos = photos;
		this.options = $.extend( {}, defaults, options );

		this.rows = [];
		
		// Properties for building gallery's DOM tree
		this.treeBuilt = false;
		this.oRootDiv = document.createElement('div' );
		this.oImgs = [];

		this.init();
	}

	GPlusGallery.prototype = {
		init: function() {

			this.oRootDiv.setAttribute('id', 'gplus-gallery-grid');
			this.element.appendChild( this.oRootDiv );
			var _this = this;
			
			$(this.oRootDiv).on('click', 'div', function() {
				_this.oFullscreen = new GPlusFullscreen( $( this ).index(), _this.photos, _this.options, function() { delete _this.oFullscreen; _this.show(); } );
			});

			for ( var i = 0, l = this.photos.length; i < l; i++ )	{
				this.photos[i].aspectRatio = this.photos[i].width / this.photos[i].height;
				this.photos[i].url = this.photos[i].url.substring( 0, 83 );	// Length of URL of G+ picture without resize params and filename
			}

			var minRowAspectRatio = this.options.minRowAspectRatio;

			for ( var i = 0, start = 0, rowAspectRatio = 0, l = this.photos.length; i < l; i++ )	{
				rowAspectRatio += this.photos[i].aspectRatio;

				if( rowAspectRatio > minRowAspectRatio )	{
					this.rows.push({ 'rowAspectRatio': rowAspectRatio, 'startIndex': start, 'endIndex': i });
					start = i + 1;
					rowAspectRatio = 0;
				}
			}

			// If rowAspectRatio == 0, than all rows are filled completely and no photos are left. If not, we need to make one last row.
			if ( rowAspectRatio !== 0 )	{
				this.rows.push({ 'rowAspectRatio': minRowAspectRatio, 'startIndex': start, 'endIndex': i - 1 });
			}
			
			this.show();
			
			var TO = false;
			$( window ).on( 'resize', function() {
				if( TO !== false )	{
					window.clearTimeout( TO );
				}
				TO = window.setTimeout( function(){ _this.show(); }, 500 );
			});

		},
			
		show: function() {

			// If user is in fullscreen gallery mode, do nothing
			if ( this.oFullscreen )	{
				return false;
			}

			var width = $(this.oRootDiv).width();

			if( ! this.treeBuilt ) {
				var fragment = document.createDocumentFragment();
			}

			for ( var i = 0, l = this.rows.length; i < l; i++ ) {
				// Fast access to some useful variables
				var row = this.rows[i];
				var margins = this.options.pictureMarginRight * ( row.endIndex - row.startIndex );

				// Calculating height of the row
				var fractionalRowHeight = ( width - margins ) / row.rowAspectRatio;
				var rowHeight = Math.floor( fractionalRowHeight );

				// Calculating widths of photos in row
				var sumOfWidths = 0;
				for( var j = row.startIndex, end = row.endIndex; j <= end; j++ ) {
					var photoWidth = Math.floor( this.photos[j].aspectRatio * fractionalRowHeight );
					sumOfWidths += photoWidth;
					this.photos[j].calculatedWidth = photoWidth;
					this.photos[j].calculatedHeight = rowHeight;
				}

				// Distribute rest of pixels
				var pixelsToDistribute = width - ( sumOfWidths + margins );

				for( var j = row.startIndex, end = row.endIndex; j <= end && pixelsToDistribute; j++ )	{
					this.photos[j].calculatedWidth++;
					pixelsToDistribute--;
				}
				
				// Show images
				if( ! this.treeBuilt )	{
					for( var j = row.startIndex, end = row.endIndex; j <= end; j++ )	{
						var oDiv = document.createElement('div');
						oDiv.setAttribute( 'class', 'pic' );

						if( j === end )	{
							oDiv.setAttribute( 'style', 'margin-right: 0' );
						}
						
						var oImg = document.createElement( 'img' );
						oImg.setAttribute( 'style', 'width: ' + this.photos[j].calculatedWidth + 'px; height: ' + this.photos[j].calculatedHeight + 'px' );
						oImg.setAttribute( 'src', this.photos[j].url + 'w' + this.photos[j].calculatedWidth + '-h' + this.photos[j].calculatedHeight + '-n/' );
						oImg.setAttribute( 'alt', this.photos[j].title );
						
						this.oImgs.push(oImg);

						oDiv.appendChild(oImg);
						fragment.appendChild(oDiv);
					}
				}
			}

			// If fragment is built, we just need to set new dimensions to pictures
			if( this.treeBuilt )	{
				for ( var i = 0, l = this.photos.length; i < l; i++ )	{
					var photo = this.photos[i];
					this.oImgs[i].setAttribute('style', 'width: ' + photo.calculatedWidth + 'px; height: ' + photo.calculatedHeight + 'px' );
					this.oImgs[i].setAttribute('src', photo.url + 'w' + photo.calculatedWidth + '-h' + photo.calculatedHeight + '-n/');
				}
			}

			if( ! this.treeBuilt )	{
				this.oRootDiv.appendChild( fragment );
				this.treeBuilt = true;
			}
		}
	};

	/* Google+ fullscreen photo view mode class */

	function GPlusFullscreen( current, photos, options, destructor )	{

		// Setting core properties
		
		this.options = options;
		this.photos = photos;
		
		// Setting runtime properties
		this.screenHeight	= 0;
		this.screenWidth	= 0;
		this.screenRatio	= 1;
		this.selfDestroy = destructor;
		
		// Make sure current photo is not out of range
		this.current = current  >= photos.length ? 0 : current;
		this.state = this.current === photos.length - 1 ? 'replay' : 'play';
		
		// HTML templates for fullscreen slideshow
		this.HTMLTemplate	= {
			layout:	'<div id="gplus-fullscreen-layout"><div class="gplus-picture-holder"><div class="gplus-picture-aligner"><img id="gplus-picture" src="/i/0.gif" alt=""/></div></div><div id="gplus-ui"><div id="gplus-go-left"><div class="gplus-arrow"></div></div><div id="gplus-go-right"><div class="gplus-arrow"></div></div><div class="gplus-pult"><div id="gplus-button-left"><div class="gplus-button-highlighter"></div></div><div id="gplus-button-right"><div class="gplus-button-highlighter"></div></div><div id="gplus-caption-left"><div class="gplus-caption-icon"></div><span class="gplus-caption-play">Приостановить</span><span class="gplus-caption-stop">Продолжить</span><span class="gplus-caption-replay">Начать заново</span></div><div id="gplus-caption-right"><div class="gplus-caption-icon"></div></div></div></div><div id="gplus-spinner"></div></div>',
			fullscreenHint:	'<div id="gplus-fullscreen-tip" class="hidden"><p>Нажмите <span style="color: #f00">Enter</span>, чтобы смотреть фото во весь размер экрана.</p></div>'
		};

		this.init();
	}

    GPlusFullscreen.prototype = {

	init: function() {
		var _this = this;

		$('body').css( 'overflow', 'hidden' );
		$('body').append( this.HTMLTemplate.layout );
		this.rootNode = $( '#gplus-fullscreen-layout' );

		// Initializing spinner
		if ( this.options && this.options.spinner )	{
			this.spinner = this.options.spinner;	// If spinner.js object passed, use it
		}
		else	{
			this.spinner = {
				el: document.getElementById('gplus-spinner'),
				spin: function(){
					this.el.className = 'css-spinner';
				},
				stop: function(){
					this.el.className = 'css-spinner hidden';
				}
			};
		}

		this.getScreenDimensions();
		this.updatePicture();

		// Throw 'Use fullscreen mode' hint if browser supports it
		if ( document.cancelFullScreen || document.mozCancelFullScreen || document.webkitCancelFullScreen ) {
			this.fullscreenHint = $( this.HTMLTemplate.fullscreenHint ).appendTo( '#gplus-fullscreen-layout' ).removeClass( 'hidden' );
			window.setTimeout( function() {
				_this.fullscreenHint.addClass( 'hidden' ).on('webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd', function() {
					this.style.display = 'none';
				});
			}, this.options.fullscreenHintDelay );
		}

		// Main ticker
		var slideTicker = 0;

		// These vars are intended to show/hide UI on user idle
		var	ticksSinceMouseMove = 0,
			lastMouseX = 0,	// Cursor X position at previous tick
			lastMouseY = 0;	// Cursor Y position at previous tick
		
		// This helps to prevent superfluous resized picture reloads from Google+
		var resizeTicker = 0;

		// Timer
		this.ticker = window.setInterval( function() {

			// Sends a signal to update picture
			if( slideTicker === _this.options.slideInterval ) {
				_this.autoplay();
				slideTicker = 0;
			}

			// Hide controls on user idle
			if( ticksSinceMouseMove === _this.options.hideUIDelay ) {
				$( '#gplus-fullscreen-layout' ).addClass( 'no-ui' );
			}
			
			// Resize picture at 2nd tick after last window resize event
			if( resizeTicker === 2 ) {
				_this.getScreenDimensions();
				_this.updatePicture();
			}
			
			slideTicker++;
			resizeTicker++;
			ticksSinceMouseMove++;

		}, this.options.tickDuration );

		// Show UI on user action
		$( document ).on( 'mousemove.GPlusFullscreen', function ( e ) {

			// User is considered as idle if mouse move is less than 5px by X or Y
			if( Math.abs( lastMouseX - e.pageX ) > 5 || Math.abs( lastMouseY - e.pageY ) > 5 )	{
				ticksSinceMouseMove = 0;
				$( '#gplus-fullscreen-layout' ).removeClass( 'no-ui' );
			}

			lastMouseX = e.pageX;
			lastMouseY = e.pageY;
		});
		
		// Drop resize ticker on resize
		$(window).on( 'resize.GPlusFullscreen', function(){
			resizeTicker=0;
		});
		
		// Keyboard events
		$( document ).on( 'keydown.GPlusFullscreen', function( e ) {
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
		$( '#gplus-picture' ).load( function(){
			_this.spinner.stop();
			slideTicker = 0;
		});
		
		// Animating  controls
		$('#gplus-go-left, #gplus-go-right').on('mouseenter mouseleave', function() { $(this).toggleClass('hover'); });
		$('#gplus-caption-left').on('mouseenter mouseleave', function() { $('#gplus-button-left').toggleClass('hover'); });
		$('#gplus-caption-right').on('mouseenter mouseleave', function() { $('#gplus-button-right').toggleClass('hover'); });
		
		// Prev / Next
		$('#gplus-go-left').on( 'click', function() { _this.prev(); });
		$('#gplus-go-right').on( 'click', function() { _this.next(); });

		// Play / stop control
		$('#gplus-caption-left').on( 'click', function() {
			switch (_this.state) {
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

		// Removing event handlers
		$( document ).off( '.GPlusFullscreen' );
		$( window ).off( 'resize.GPlusFullscreen' );
		$('#gplus-picture').off();
		$('#gplus-go-left, #gplus-go-right, #gplus-caption-left, #gplus-caption-right').off();
		this.fullscreenHint.off();

		// Removing DOM
		$('#gplus-fullscreen-layout').remove();
		this.selfDestroy();
	},

	updatePicture: function(){
		// Show/hide navigation controls
		$('#gplus-go-left').removeClass().addClass( this.current === 0 ? 'hidden' : '' );
		$('#gplus-go-right').removeClass().addClass( this.current === (this.photos.length - 1) ? 'hidden' : '' );

		var photoholder = $('#gplus-picture')[0];
		
		// Making URL to photo of appropriate size
		var src = this.photos[this.current].url;
		
		if( this.photos[this.current].aspectRatio > this.screenRatio )	{
			src += 'w' + this.screenWidth + '/';
		}
		else	{
			src += 'h' + this.screenHeight + '/';
		}

		if( photoholder.src !== src )	{
			photoholder.src = src;
			this.spinner.spin( $('#gplus-spinner')[0] );
		}

		$('#gplus-caption-left')[0].className = this.state;
	},

	prev: function(){
		if( this.current > 0 ) {
			this.current--;
			this.updatePicture();
		}
	},

	next: function(){

		if( this.current < this.photos.length - 1 ) {
			this.current++;

			if( this.current === this.photos.length - 1 ) {
				this.state = 'replay';
				// Show controls
				$( '#gplus-fullscreen-layout' ).removeClass( 'no-ui' );
			}
		}

		this.updatePicture();
	},

	autoplay: function(){
		if( this.state === 'play' ) {
			this.next();
		}
	},

	getScreenDimensions: function() {
		this.screenWidth = this.rootNode.width();
		this.screenHeight = this.rootNode.height();
		this.screenRatio = this.screenWidth / this.screenHeight;
	},
	
	toggleFullscreen: function(){
		if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
			if (this.rootNode[0].requestFullScreen) {
				this.rootNode[0].requestFullScreen();
			} else if (this.rootNode[0].mozRequestFullScreen) {
				this.rootNode[0].mozRequestFullScreen();
			} else if (this.rootNode[0].webkitRequestFullScreen) {
				this.rootNode[0].webkitRequestFullScreen();
			}
			$( '#gplus-fullscreen-tip' ).hide();
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
    $.fn[pluginName] = function ( photos, options ) {
        return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new GPlusGallery( this, photos, options ));
			}
        });
    };

})( jQuery, window, document );