/////////////
// CLASSES //
/////////////

// Calculator
function Calculator() {
	this.area = 0;
	this.wc = 0;
	this.roomType = '';
	
	this.element = $('#calculator')[0];
	this.init();
}

Calculator.prototype = {

	init: function() {
		var _this=this;
		
		//cookies
		var cookies = document.cookie.split(';');
		
		for(var i = 0, l = cookies.length; i < l; i++){
			if(cookies[i].indexOf('wc=') !== -1){
				this.wc = cookies[i].split('=')[1];
				$('#wc').val(this.wc);
			}
			if(cookies[i].indexOf('area=') !== -1){
				this.area = cookies[i].split('=')[1];
				$('#area').val(this.area);
			}
		}

		$( this.element ).find( '.button' ).on( 'click', function() {
			_this.updateValues();
		});

		$(this.element).on( 'click', '.selector', function() {
			_this.roomType = $(this).data( 'type' );
			_this.element.className = _this.roomType;
			_this.updateValues();
		});
		
		function updatePosition(obj) {
			var curtop = 0;
			if ( obj.offsetParent ) {
				do {
					curtop += obj.offsetTop;
				} while ( obj = obj.offsetParent );
			}
			return curtop;
		}

		var hint = $(_this.element).find('.calc-hint')[0];
		
		$( window ).on( 'scroll.CalcHint', function(){
			if( $(this).scrollTop() > updatePosition( hint ) - 400 ) {
				window.setTimeout( function(){ 
					$( hint ).addClass( 'shown' );
					$( window ).off('.CalcHint');
					$( _this.element ).one( 'click' , function(){
						$( hint ).removeClass('shown');
					});
				}, 300 );
			}
		});
		
		$( this.element ).find('.cott').click();
	},

	evaluate: function( roomType, workType ) {
		if( roomType == 'cott' ) {
			switch( workType ) {
				case 'otd-pk':
					return [/* 4500 * this.area,  */7000 * this.area, 8500 * this.area];
				case 'ele-pk':
					return [/* 120000 + 220 * this.area,  */140000 + 220 * this.area, 160000 + 220 * this.area];
				case 'san-pk':
					return [/* 30000 * (this.wc + 0.5),  */36000 * (this.wc + 0.5), 42000 * (this.wc + 0.5)];
				case 'oto-pk':
					return [/* 90000 + 200 * this.area,  */110000 + 200 * this.area, 130000 + 200 * this.area];
				case 'otd-m':
					return [/* 3000 * this.area,  */3500 * this.area, 4000 * this.area];
				case 'ele-m':
					return [/* 20000 + 200 * this.area,  */40000 + 200 * this.area, 60000 + 200 * this.area];
				case 'san-m':
					return [/* 17500 * (this.wc + 0.5),  */22500 * (this.wc + 0.5), 30000 * (this.wc + 0.5)];
				case 'oto-m':
					return [/* 60000 + 800 * this.area,  */100000 + 800 * this.area, 140000 + 800 * this.area];
				default:
					return false;
			}
		}
		else {
			switch( workType ) {
				case 'otd-pk':
					return [/* 5000 * this.area,  */7500 * this.area, 9000 * this.area];
				case 'ele-pk':
					return [/* 120000 + 200 * this.area,  */140000 + 220 * this.area, 160000 + 220 * this.area];
				case 'san-pk':
					return [/* 30000 * (this.wc + 0.5),  */36000 * (this.wc + 0.5), 42000 * (this.wc + 0.5)];
				case 'otd-m':
					return [/* 3000 * this.area,  */3500 * this.area, 4000 * this.area];
				case 'ele-m':
					return [/* 20000 + 200 * this.area,  */40000 + 200 * this.area, 60000 + 200 * this.area];
				case 'san-m':
					return [/* 17500 * (this.wc + 0.5),  */22500 * (this.wc + 0.5), 30000 * (this.wc + 0.5)];
				default:
					return false;
			}
		}
	},

	updateValues: function() {
		var _this = this;
		this.area = parseInt( $('#area').val() );
		this.wc = parseInt( $('#wc').val() );
		
		document.cookie = 'area=' + this.area + ';path=/';
		document.cookie = 'wc=' + this.wc + ';path=/';
		
		var itog=[0,0,0];
		$(this.element).find('tbody tr').each(function(){
			var vals=_this.evaluate(_this.roomType, $(this).attr('class'));
			
			if( vals ){
				for( var i=0; i<3; i++ )
					itog[i]+=vals[i];

				$(this).find('td:nth-child(n+2)').each(function(i){
					$(this).text(vals[i].toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 '));
				});
			}
		});
		$(this.element).find('tfoot td:nth-child(n+2)').each(function(i){
			$(this).text(itog[i].toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 '));
		});
	}
};

// Album covers
function AlbumView(element){
	this.element=element;
	this.init();
}

AlbumView.prototype = {
	init: function() {

		$(this.element).on( 'mouseenter mouseleave', '.image_stack', function(e) {
			if( e.type === 'mouseenter' ) {
				$(this).addClass('rotated');
			}
			else {
				$(this).removeClass('rotated');
			}
		});

		$(this.element).on( 'click', '.image_stack', function() {
			document.location = $(this).parent().find('a').attr('href');
		});
		
		var _this = this, timer = false;
		$( window ).on('resize', function() { 		
			if( timer !== false )
				window.clearTimeout( timer );
			timer = window.setTimeout( function(){ _this.show(); }, 500 );
		});

		this.show();
	},

	show: function() {
		var picSide = Math.round( $(this.element).width() / 4 - 30 );
		$(this.element).hide();

		$(this.element).find('.album').css( { 'height' : picSide + 60 + 'px', 'width' : picSide + 25 + 'px'} )
		$(this.element).find('img')
			.css({ 'height': picSide + 'px', 'width': picSide + 'px'})
			.each(function() {
				this.src = this.src.substring(0,83) + 's' + picSide + '-c/';
			}
		);

		$(this.element).find('p').width( picSide - 10 );
		$(this.element).find('.link').css( { 'top': ( picSide + 20 ) + 'px' } );
		$(this.element).find('.count').css( { 'top': ( picSide + 40 ) + 'px' } );
		$(this.element).show();
	}
};

////////////////////////
// Initializing pages //
////////////////////////
$(document).ready(function() {
	var page_name = $('body').attr('id');

	switch (page_name) {
		// Initializing main page
		case 'page-index':
			// Set cover background
			$('#bg').css({'background-image':'url("https://lh3.googleusercontent.com/-InPyuNzqhv4/T-cKtkttLpI/AAAAAAAAAck/NZS1nov73xE/w'+$('#bg').width()+'-h'+$('#bg').height()+'-n/i.jpg")'});

			/*@cc_on
			@if (@_jscript_version <= 5.8)

				// IE8: Reload background picture on window resize (no css3 backgrounds support)
				var timer = false;
				$( window ).on('resize', function() { 		
					if( timer !== false )
						window.clearTimeout( timer );
					timer = window.setTimeout( function(){ $('#bg').css({'background-image':'url("https://lh3.googleusercontent.com/-InPyuNzqhv4/T-cKtkttLpI/AAAAAAAAAck/NZS1nov73xE/w'+$('#bg').width()+'-h'+$('#bg').height()+'-n/i.jpg")'}); }, 500 );
				});

			@end
			@*/		
			
			// Ingosstrakh logo
			if ( window.devicePixelRatio == 2 ) {
				var logo=$('#ingos')[0];
				logo.src='http://static.otdelkalux.ru/i/ingos-2x.png';
			}
			
			// Albums
			var album=new AlbumView($('#album_grid')[0]);

			// Best photos
			var spinner = new Spinner({ lines: 13, length: 7, width: 4, radius: 10, rotate: 0, color: '#000', speed: 1, trail: 60, shadow: false, hwaccel: true, className: 'spinner', zIndex: 2e9 });
			$('#GPlus').GPlusGallery(photos, {'spinner': spinner});
			$('#GPlus div').last().on('click', function(e){e.stopPropagation()}).find('img').wrap('<a href="/portfolio/process/"/>');

			// Show / hide call-me-back form
			init_callback();

			// Calculator
			var calc = new Calculator();
			
			// Mouse hint
			$('#mouse').css('opacity', 1);
			$(window).one( 'scroll', function() { $('#mouse').css('opacity', 0); });

			break;

		case 'page-contacts':
			init_maps();
			init_callback();
			init_selector();

			var to;
			$('#selector .left, #kuusinena_hint').hover(function(){
				window.clearTimeout(to);
				$('#madison_hint').css('opacity','0');
				$('#kuusinena_hint').css({'visibility': 'visible','opacity':'1'});
			}, function(){
				to=window.setTimeout(function(){$('#kuusinena_hint').css({'opacity':'0','visibility':'hidden'})},1000);
			});
			$('#selector .right, #madison_hint').hover(function(){
				window.clearTimeout(to);
				$('#kuusinena_hint').css('opacity','0');
				$('#madison_hint').css({'visibility': 'visible','opacity':'1'});
			}, function(){
				to=window.setTimeout(function(){$('#madison_hint').css({'opacity':'0','visibility':'hidden'})},1000);
			});
			break;

		case 'page-price':
			// CALC
			if($("#calculator").length > 0)
				var calc=new Calculator();
			init_selector();

			break;
		case 'page-portfolio':
			if($("#album_grid").length > 0)
				new AlbumView($('#album_grid')[0]);
			if($("#selector_hint").length > 0)
				window.setTimeout(function(){$("#selector_hint").css({'opacity':1});}, 2000);
			if($("#selector").length > 0)
				init_selector();
			if($("#backnext").length > 0){
				var d = ['http://static.otdelkalux.ru/i/arr-l.png','http://static.otdelkalux.ru/i/arr-r.png'];
				$("#backnext img").each(function(i){
					this.style.backgroundImage="url('"+this.src+"')";
					this.src=d[i];
				});
			}
			break;
		case 'page-process':
			init_selector();
			init_maps();
			$('#showhide').toggle(function(){
					$('#map').css({'height':0});
					$(this).text('Показать карту');
				},
				function(){
					$('#map').css({'height':'500px'});
					$(this).text('Скрыть карту');
				}
			);
			break;
	}

	// Years in footer
	var today = new Date();
	var this_year = today.getFullYear(); 
	var el=$('#year span');
	var established=parseInt(el.text());
	if(this_year>established)
		el.text(established+'—'+this_year);
		
		
		
		//////////////
		/*$("p:contains('47')").each(function(){
			$(this).text($(this).text().replace("(495) 99-88-347", "(909) 151-31-56").replace("(495) 998-83-47", "(909) 151-31-56"));
		});*/
		///////////
});

function init_callback()	{
	$('#show_form_btn,#callback_form input[type=reset], #close').click(function(){
		$('#contact').toggleClass('callback_shown');
	});
	
	/*@cc_on
	@if (@_jscript_version <= 5.8)
	return;
	@end
	@*/
	$('#check').val(5).prop('type','hidden').prev().remove();
}

function init_selector()	{
	$('#selector .right, #selector .left').click(function(e){
		this.parentNode.className = this.className;
		/*@cc_on
		@if (@_jscript_version <= 9)
		return;
		@end
		@*/
		e.preventDefault();
		var _this=this;
		$('#selector .current').on('webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd otransitionend', function(){
			document.location = $(_this).find('a').attr('href');
		});

	});
}

(function(w,n,d,r,s){(new Image).src='http://db.ce.b2.a2.top.mail.ru/counter?id=2288412;js=13'+((r=d.referrer)?';r='+escape(r):'')+((s=w.screen)?';s='+s.width+'*'+s.height:'')+';_='+Math.random();})(window,navigator,document);