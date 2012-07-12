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


GalleryView.prototype.show = function(){console.log('show');
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
		$(window).bind('scroll', function(){
			if($(this).scrollTop() > 3500) {
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
		});

		// Resize event
		function on_resize() {
			album.show();
			gallery.show();
			/*@cc_on
			@if (@_jscript_version <= 5.8)			// a little help for ie8
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

		break;
}

});