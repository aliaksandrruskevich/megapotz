//////////////////////////
// Calculator		    //
//////////////////////////
function Calculator(){
	this.area=0;
	this.wc=0;
	this.room_type='';
	this.init();
}

Calculator.prototype.evaluate = function(room_type, work_type){
	if(room_type=='cott')
		switch(work_type)	{
			case 'otd-pk':
				return [4500*this.area, 6000*this.area, 7500*this.area];
			case 'ele-pk':
				return [120000+220*this.area, 140000+220*this.area, 160000+220*this.area];
			case 'san-pk':
				return [30000*(this.wc+0.5), 36000*(this.wc+0.5), 42000*(this.wc+0.5)];
			case 'oto-pk':
				return [90000+200*this.area, 110000+200*this.area, 130000+200*this.area];
			case 'otd-m':
				return [3000*this.area, 3500*this.area, 4000*this.area];
			case 'ele-m':
				return [20000+200*this.area, 40000+200*this.area, 60000+200*this.area];
			case 'san-m':
				return [17500*(this.wc+0.5), 22500*(this.wc+0.5), 30000*(this.wc+0.5)];
			case 'oto-m':
				return [60000+800*this.area, 100000+800*this.area, 140000+800*this.area];
			default:
				return false;
		}
	else
		switch(work_type)	{
			case 'otd-pk':
				return [5000*this.area, 6500*this.area, 8000*this.area];
			case 'ele-pk':
				return [120000+200*this.area, 140000+220*this.area, 160000+220*this.area];
			case 'san-pk':
				return [30000*(this.wc+0.5), 36000*(this.wc+0.5), 42000*(this.wc+0.5)];
			case 'otd-m':
				return [3000*this.area, 3500*this.area, 4000*this.area];
			case 'ele-m':
				return [20000+200*this.area, 40000+200*this.area, 60000+200*this.area];
			case 'san-m':
				return [17500*(this.wc+0.5), 22500*(this.wc+0.5), 30000*(this.wc+0.5)];
			default:
				return false;
		}
}

Calculator.prototype.init = function(){
	var _this=this;
	$('#do_calc').click(function(){
		_this.update_values();
	});

	$('#calc .selector').click(function(){
		_this.room_type=this.className.substring(9);
		$('#price')[0].className=_this.room_type;
		_this.update_values();
	});
	
	// Tooltip
	var hint_pos=find_pos($('#calc_hint')[0]);
	
	$(window).bind('scroll', function(){
		if($(this).scrollTop() > hint_pos-500) {
			window.setTimeout(function(){$('#calc_hint').addClass('shown');}, 300);
		}
	});

	$('#calc input').one('focus',function(){
		$('#calc_hint').removeClass('shown');
		$(window).unbind('scroll');
	});
	
	$('#calc .cott').click();
}

Calculator.prototype.update_values = function(){
	var _this=this;
	this.area=parseInt($('#area').val());
	this.wc=parseInt($('#wc').val());
	
	var itog=[0,0,0];
	$('#price tbody tr').each(function(){
		var vals=_this.evaluate(_this.room_type,this.id);
		
		if(vals){
			for(var i=0;i<3;i++)
				itog[i]+=vals[i];

			$(this).find('td:nth-child(n+2)').each(function(i){
				$(this).text(vals[i].toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 '));
			});
		}
	});
	$('tfoot td:nth-child(n+2)').each(function(i){
		$(this).text(itog[i].toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 '));
	});
}

//////////////////////////
// Cover View. G+ style //
//////////////////////////
function AlbumView(node){
	this.container=node;
	this.init();
}

AlbumView.prototype.init = function(){
	this.covers=$(this.container).find('.image_stack');

	$(this.covers).find('img')
		.hover(
			function() {
				$(this).parent().addClass('rotated');
			}, function() {
				$(this).parent().removeClass('rotated');
			}
		)
		.click(function() {
			document.location=$(this).parent().find('a').attr('href');
		});
}

AlbumView.prototype.show = function(){
	var pic_side=Math.round($(this.container).width()/4-30);

	$(this.covers).css({'height':pic_side+60+'px','width':pic_side+25+'px'});
	$(this.covers).find('img')
		.css({'height':pic_side+'px','width':pic_side+'px'})
		.each(function() {
			var new_src = this.src.substring(0,83)+'s'+pic_side+'-c/';
			this.src = new_src;
		}
	);
	$(this.container).find('p').width(pic_side-10);
	$(this.container).find('.link').css({'top': (pic_side+20)+'px'});
	$(this.container).find('.count').css({'top': (pic_side+40)+'px'});
}

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
	
		// Ingosstrakh logo
		if (window.devicePixelRatio == 2) {
			var logo=$('#ingos')[0];
			logo.src='/i/ingos-2x.png';
		}
		
		var spinner = new Spinner({ lines: 13, length: 7, width: 4, radius: 10, rotate: 0, color: '#000', speed: 1, trail: 60, shadow: false, hwaccel: true, className: 'spinner', zIndex: 2e9 });
		var fs = $('#GPlus').GPlusGallery(photos, {'spinner': spinner});
		$('#GPlus div').last()
			.on('click', function(e){e.stopPropagation()})
			.find('img')
			.wrap('<a href="/portfolio/process/"/>');
		
		// Show / hide call-me-back form
		init_callback();

		// Resize event
		function on_resize() {
			album.show();
			find_pos($('#calc_hint')[0]);
/*@cc_on
@if (@_jscript_version <= 5.8)
$('#bg').css({'background-image':'url("https://lh3.googleusercontent.com/-InPyuNzqhv4/T-cKtkttLpI/AAAAAAAAAck/NZS1nov73xE/w'+$('#bg').width()+'-h'+$('#bg').height()+'-n/i.jpg")'});
@end
@*/
		}
		var TO = false;
		$(window).resize(function(){
			if(TO !== false)
			clearTimeout(TO);
			TO = setTimeout(on_resize, 500);
		});

		var calc=new Calculator();
		
		// Mouse hint
		$('#mouse')[0].style.opacity=1;
		$(window).bind('scroll', function(){
			$('#mouse')[0].style.opacity=0;
		});
		
		break;

	case 'page-contacts':
		init_maps();
		init_callback();
		init_selector();
/* ПЕРЕключалка названия, переключалка карты, отрабатывание решетки */
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
		if($("#calc").length > 0)
			var calc=new Calculator();
		init_selector();

		break;
	case 'page-portfolio':
		if($("#selector_hint").length > 0)
			window.setTimeout(function(){$("#selector_hint").css({'opacity':1});}, 2000);
		if($("#selector").length > 0)
			init_selector();
		if($("#backnext").length > 0){
			var d = ['/i/arr-l.png','/i/arr-r.png'];
			$("#backnext img").each(function(i){
				this.style.backgroundImage="url('"+this.src+"')";
				this.src=d[i];
			});
		}
		if($("#map_canvas").length > 0){
			init_maps();
			$('#showhide').toggle(function(){
					$('#map').css({'height':0});
					$(this).text('Показать карту');
				},
				function(){
					$('#map').css({'height':'500px'});
					$(this).text('Скрыть карту');
				});
		}

		break;
		
}

	// Years in footer
	var today = new Date();
	var this_year = today.getFullYear(); 
	var el=$('#year span');
	var established=parseInt(el.text());
	if(this_year>established)
		el.text(established+'—'+this_year);

});

////////////
function find_pos(obj) {
	var curtop = 0;
	if (obj.offsetParent)
		do {
		curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
	return curtop;
}

//
function init_callback()	{
$('#show_form_btn,#callback_form input[type=reset], #close').click(function(){
	$('#contact').toggleClass('callback_shown');
});
$('#check').val(5).prop('type', 'hidden').prev().remove();
}

function init_selector()	{
	// selector
/*@cc_on
@if (@_jscript_version <= 9)
return;
@end
@*/
	$('#selector .right, #selector .left').click(function(e){
		e.preventDefault();
		this.parentNode.className = this.className;
		var _this=this;
		$('#selector .current').bind('webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd', function(){
			document.location = $(_this).find('a').attr('href');
		});

	});
}