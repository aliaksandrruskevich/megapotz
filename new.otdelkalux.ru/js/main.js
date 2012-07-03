$(window).resize(function() {
	var timeout = setTimeout(function(){set_cover();}, 500);
});


function set_cover(){
	var ww=$(window).width();
	var wh=$(window).height();
	$('#cover').css({'height':(wh-78)+'px','background':'url(\'https://lh3.googleusercontent.com/-InPyuNzqhv4/T-cKtkttLpI/AAAAAAAAAck/NZS1nov73xE/w'+ww+'-h'+(wh-78)+'-n/i.jpg\') 0 0 no-repeat'});
}

$(document).ready(function() {
	set_cover();
	// Set main BG

	$('#show_form_btn').click(function(){
		$('#contact')[0].className='callback_shown';
	});
	$('#callback_form input[type=reset]').click(function(){
		$('#contact')[0].className='callback_hidden';
	});
	
	// Album view
	//Calculate image size.
	var new_ag_width = $('#album_grid').width()-100;
	$('#album_grid').width(new_ag_width);
	
	var pic_side=Math.round(new_ag_width/4-30);
	$('#album_grid .image_stack').css({'height':pic_side+60+'px','width':pic_side+25+'px'});
	$('#album_grid .image_stack img').css({'height':pic_side+'px','width':pic_side+'px'});
	$('#objects .image_stack p').width(pic_side-10);
	$('#album_grid .image_stack img').each(function() {
		var new_src = this.src.substring(0,83)+'s'+pic_side+'-c/';
		this.src = new_src;
	});
	$('#album_grid .link').css({'top': (pic_side+20)+'px'});
	$('#album_grid .count').css({'top': (pic_side+40)+'px'});
	
	$(".image_stack")
		.delegate('img', 'mouseenter', function() {
			$(this).parent().addClass('rotated');
		})
		.delegate('img', 'mouseleave', function() {
			$(this).parent().removeClass('rotated');
		})
		.delegate('img', 'click', function() {
			document.location=$(this).parent().find('a').attr('href');
		});
	
	// Gallery
	var MIN_RATIO=4, MARGIN=6;
	
	var new_gal_width = $('#gallery_grid').width()-100;
	$('#gallery_grid').width(new_ag_width+6);
	
	var rows=[];
	rows[0]={};
	rows[0].photos=[];
	rows[0].line_ratio=0;
	var row=0;

	// objects: Row, Photo
	$('#gallery_grid img').each(function(i) {
		var ratio = $(this).width()/$(this).height();
		rows[row].line_ratio+=ratio;

		rows[row].photos.push(
			{
				index: i,
				src: this.src.substring(0,83),
				ratio: ratio
			}
		);	

		if(rows[row].line_ratio > MIN_RATIO){
			// create
			row++;
			rows[row]={};
			rows[row].line_ratio=0;
			rows[row].photos=[];
		}
	});
	
	var img_elems = $('#gallery_grid img');
	//onresize!!
	for(var i=0;i<rows.length;i++) {
		// —читаем высоту
		var divider=rows[i].line_ratio > MIN_RATIO?rows[i].line_ratio : MIN_RATIO;
		rows[i].height=Math.floor((new_gal_width-MARGIN*(rows[i].photos.length-1))/divider);

		// —читаем ширины
		var summed_width=0;
		for(var j=0;j<rows[i].photos.length;j++){
			var pic_width=Math.floor(rows[i].photos[j].ratio*rows[i].height);
			summed_width+=pic_width;
			rows[i].photos[j].width=pic_width;
		}
		var actual_width=summed_width+MARGIN*(rows[i].photos.length-1);
		
		// distribute rest of pixels
		var pixels_to_distribute=new_gal_width-actual_width;
		for(var j=0;j<rows[i].photos.length&&pixels_to_distribute>0;j++){
			rows[i].photos[j].width++;
			pixels_to_distribute--;

		}
		
		//show images
		for(var j=0;j<rows[i].photos.length;j++){
			var oImg= img_elems[rows[i].photos[j].index];
			oImg.style.width = rows[i].photos[j].width+'px';
			oImg.style.height = rows[i].height+'px';
			oImg.src=rows[i].photos[j].src+'w'+rows[i].photos[j].width+'-h'+rows[i].height+'-n/';
			if(j==rows[i].photos.length-1)
				oImg.parentNode.parentNode.style.marginRight=0;
			
		}
	}
});
