//////////////////////////
// Calculator		    //
//////////////////////////
function Calculator(){
	this.area=0;
	this.wc=0;
	this.state='';
	this.init();
}

Calculator.prototype.init = function(){
	var _this=this;
	$('#do_calc').click(function(){
		_this.update_values();
	});

	$('#calc .selector').click(function(){
		_this.state=this.className.substring(9);
		$('#price')[0].className=_this.state;
		_this.update_values();
	});
	
	$('#calc .cott').click();
}

Calculator.prototype.update_values = function(){
	var _this=this;
	this.area=$('#area').val();
	this.wc=$('#wc').val();
	
	var calc_cott = {
	'cott':	{
		'otd-pk': function(){
			return [4000*_this.area, 5500*_this.area, 7000*_this.area];
		},
		'ele-pk': function(){
			return [110000+200*_this.area, 130000+200*_this.area, 150000+200*_this.area];
		},
		'san-pk': function(){
			return [20000*_this.wc, 25000*_this.wc, 30000*_this.wc];
		},
		'oto-pk': function(){
			return [90000+200*_this.area, 110000+200*_this.area, 130000+200*_this.area];
		},
		'otd-m': function(){
			return [3000*_this.area, 3500*_this.area, 4000*_this.area];
		},
		'ele-m': function(){
			return [20000+200*_this.area, 40000+200*_this.area, 60000+200*_this.area];
		},
		'san-m': function(){
			return [20000+200*_this.area, 40000+200*_this.area, 60000+200*_this.area];
		},
		'oto-m': function(){
			return [60000+800*_this.area, 100000+800*_this.area, 140000+800*_this.area];
		}
	},
	'appt':	{
		'otd-pk': function(){
			return [5000*_this.area, 6000*_this.area, 8000*_this.area];
		},
		'ele-pk': function(){
			return [110000+200*_this.area, 130000+200*_this.area, 150000+200*_this.area];
		},
		'san-pk': function(){
			return [20000*_this.wc, 25000*_this.wc, 30000*_this.wc];
		},
		'otd-m': function(){
			return [3000*_this.area, 3500*_this.area, 4000*_this.area];
		},
		'ele-m': function(){
			return [20000+200*_this.area, 40000+200*_this.area, 60000+200*_this.area];
		},
		'san-m': function(){
			return [20000+200*_this.area, 40000+200*_this.area, 60000+200*_this.area];
		},
	}
	}
	
	var itog=[0,0,0];
	$('#price tbody tr').each(function(){
		var vals=[0,0,0];

		if(calc_cott[_this.state][this.id]!=undefined)
			vals=calc_cott[_this.state][this.id]();
		
		for(var i=0;i<3;i++)
			itog[i]+=vals[i];
		
		$(this).find('td:nth-child(n+2)').each(function(i){
			this.textContent=vals[i].toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
		});
	});
	$('tfoot td:nth-child(n+2)').each(function(i){
		this.textContent=itog[i].toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
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
// Gallery. G+ style ///
////////////////////////

function Row(){
	this.photos=[];
	this.line_ratio=0;
}
	
function GalleryView(node){
	this.container=node;
	this.MIN_RATIO=4; 
	this.MARGIN=6;
	this.rows=[];
	this.init();
}

GalleryView.prototype.init = function(){
	// Grouping images into rows
	var _this=this;
	this.rows.push(new Row());
	
	$(this.container).find('img').each(function(i) {
		var ratio = $(this).width()/$(this).height();
		_this.rows[_this.rows.length-1].line_ratio+=ratio;

		_this.rows[_this.rows.length-1].photos.push(
			{
				index: i,
				src: this.src.substring(0,83),
				ratio: ratio
			}
		);	

		if(_this.rows[_this.rows.length-1].line_ratio > _this.MIN_RATIO){
			_this.rows.push(new Row());
		}
	});
}


GalleryView.prototype.show = function(){
	var width = $('#gallery_grid').width();
	
	for(var i=0; i < this.rows.length; i++) {
		// Calculating height of the row
		// Correcting line_ratio in case when line is short
		var line_ratio = this.rows[i].line_ratio > this.MIN_RATIO ? this.rows[i].line_ratio : this.MIN_RATIO;
		var fractional_height=(width-this.MARGIN*(this.rows[i].photos.length-1))/line_ratio;

		// Calculating widths of photos in row
		var summed_width=0;
		for(var j=0;j<this.rows[i].photos.length;j++){
			var pic_width=Math.floor(this.rows[i].photos[j].ratio*fractional_height);
			summed_width+=pic_width;
			this.rows[i].photos[j].width=pic_width;
		}
		var current_width=summed_width+this.MARGIN*(this.rows[i].photos.length-1);
		this.rows[i].height=Math.floor(fractional_height);
		
		// distribute rest of pixels
		var pixels_to_distribute=width-current_width;
		for(var j=0;j<this.rows[i].photos.length&&pixels_to_distribute>0;j++){
			this.rows[i].photos[j].width++;
			pixels_to_distribute--;
		}

		//show images
		var img_elems = $(this.container).find('img');
		for(var j=0;j<this.rows[i].photos.length;j++){
			var oImg= img_elems[this.rows[i].photos[j].index];
			oImg.style.width = this.rows[i].photos[j].width+'px';
			oImg.style.height = this.rows[i].height+'px';
			oImg.src=this.rows[i].photos[j].src+'w'+this.rows[i].photos[j].width+'-h'+this.rows[i].height+'-n/';
			if(j==this.rows[i].photos.length-1)
				oImg.parentNode.parentNode.style.marginRight=0;
			
		}
	}
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
	
		// Tooltip
		var hint_pos=find_pos($('#calc_hint')[0]);
		
		$(window).bind('scroll', function(){
			if($(this).scrollTop() > hint_pos-300) {
				window.setTimeout(function(){$("#calc_hint").addClass('shown');}, 1000);
			}
		});

		$('#calc input').one('focus',function(){
			$("#calc_hint").removeClass('shown');
			$(window).unbind('scroll');
		});
		
		// Years in footer
		var today = new Date();
		var this_year = today.getFullYear(); 
		var el=$('#year span')[0];
		var established=parseInt(el.textContent);
		if(this_year>established)
			el.textContent=established+'—'+this_year;
		
		// Show / hide call-me-back form
		$('#callback_form .opacity').bind('webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd', function () {
			if(!$(this).hasClass('o1')){
				$('#contact').toggleClass('callback_shown');
			}
		});
		$('#show_form_btn').click(function(){
			$('#contact').toggleClass('callback_shown');
			window.setTimeout(function(){$('#callback_form .opacity').toggleClass('o1');},100);
		});
		$('#callback_form input[type=reset]').click(function(){
			$('#callback_form .opacity').toggleClass('o1');
/*@cc_on
@if (@_jscript_version <= 9)
$('#contact').toggleClass('callback_shown');
@end
@*/
		});

		// Resize event
		function on_resize() {
			album.show();
			gallery.show();
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
		break;
}

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