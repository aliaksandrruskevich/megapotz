function Fullscreen(arr){
	this.current=0;
	this.photos=arr;
	this.ticker=0;
	this.state='';
	
	this.screen_height=0;
	this.screen_width=0;
	this.screen_ratio=1;

	this.init_events();
	this.init();
}

Fullscreen.prototype.init = function(){
	var _this=this;
	this.state='play';
	this.set_size();
	
	// fullscreen.html#3 to start from 3rd image
	if(document.location.hash!='')
		this.current = document.location.hash.substr(1);
	
	this.show();
	
	var last_move=0, last_pageX=0, last_pageY=0;
	var resize_ticker=0;
	
	// Timer
	var timer = window.setInterval(function(){
		_this.ticker++;
		
		// Autoplay
		if(_this.ticker%15==0)
			_this.play();

		// Hide controls on idle
		if(_this.ticker%10==0)	{
			if(last_move == 1)	{
				$('#fullscreen')[0].style.cursor='none';
				$('#controls').addClass('hidden');
			}
			last_move++;
		}
		
		// Resize handler
		if(resize_ticker == 3)	{
			_this.set_size();
			_this.show();
		}

		resize_ticker++;
	}, 200);
	
	// Hide tip about using Fullscreen
	//NO if no support
	
	if (document.cancelFullScreen||document.mozCancelFullScreen||document.webkitCancelFullScreen) {
		$('#fs-tip').removeClass();
		window.setTimeout(function(){$('#fs-tip').addClass('hidden')},5000);
	}

	// Show UI on user action
    $(document).mousemove(function (e) {
		if(Math.abs(last_pageX-e.pageX)>10 || Math.abs(last_pageY-e.pageY)>10){
			last_pageX=e.pageX;
			last_pageY=e.pageY;
			last_move=0;
			$('#controls').removeClass('hidden');
			$('#fullscreen')[0].style.cursor='auto';
		}
    });
	
	// Scale pictures on window resize
	$(window).resize(function(){
		resize_ticker=0;
	});
}

Fullscreen.prototype.init_events = function()	{
	var _this=this;
	
	// Keyboard events
	$(document).bind("keydown", function(e) {
		switch (e.keyCode){
		case 13:
			_this.toggle_fullscreen();
			break;
		case 37:
			_this.prev();
			break;
		case 39:
			_this.next();
			break;
		case 32:
			$('#text_caption').click();
			break;
		}
	});
	
	// Animating  controls
	$('#go_left, #go_right').hover(function(){$(this).toggleClass('hover')},function(){$(this).toggleClass('hover')});
	$('#text_caption').hover(function(){$('#text_button').toggleClass('hover')},function(){$('#text_button').toggleClass('hover')});
	$('#exit_caption').hover(function(){$('#exit_button').toggleClass('hover')},function(){$('#exit_button').toggleClass('hover')});
	
	// Prev / Next
	$('#go_left').click(function(){_this.prev();});
	$('#go_right').click(function(){_this.next();});

	// Play / stop control
	$('#text_caption').click(function(){
		if(_this.state=='stop')	{
			_this.state='play';
		}	else if (_this.state=='replay')	{
				_this.current=0;
				_this.ticker=0;
				_this.state='play';
		}
		else	{
			_this.state='stop';
			_this.ticker=0;
		}
		_this.show();
	});
}

Fullscreen.prototype.show = function(){
	var photoholder = $('#photoholder')[0];
	var w=this.photos[this.current].width;
	var h=this.photos[this.current].height;
	var r=w/h;
	
	var src = this.photos[this.current].url.substring(0,83);
	
	if(r>this.screen_ratio)
		src+='w'+this.screen_width+'/';
	else
		src+='h'+this.screen_height+'/';

	photoholder.src=src;
	$('#text_caption').removeClass().addClass(this.state);
}

Fullscreen.prototype.prev = function(){
	if(this.current>0)	{
		this.current--;
		$('#go_right')[0].style.visibility = 'visible';
		this.show();
	}
	else	{
		$('#go_left')[0].style.visibility = 'hidden';
	}
}

Fullscreen.prototype.next = function(){
	if(this.current<this.photos.length-1){
		this.current++;
		$('#go_left')[0].style.visibility = 'visible';
		this.show();
	}
	else	{
		this.state='replay';
		$('#go_right')[0].style.visibility = 'hidden';
		
		// Show controls
		$('#controls').removeClass('hidden');
		$('#fullscreen')[0].style.cursor='auto';
	}
}

Fullscreen.prototype.play = function(){
	if(this.state=='play'){
		this.next();
	}
}

Fullscreen.prototype.set_size = function(){
	this.screen_width=$('#fullscreen').width();
	this.screen_height=$('#fullscreen').height();
	this.screen_ratio=this.screen_width/this.screen_height;
}


Fullscreen.prototype.toggle_fullscreen = function(){
	if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
		if (document.documentElement.requestFullScreen) {
			document.documentElement.requestFullScreen();
		} else if (document.documentElement.mozRequestFullScreen) {
			document.documentElement.mozRequestFullScreen();
		} else if (document.documentElement.webkitRequestFullScreen) {
			document.documentElement.webkitRequestFullScreen();
		}
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


////////////////////

$(document).ready(function() {
	// Window size
	var fs = new Fullscreen(photos);
	/mobile/i.test(navigator.userAgent) && !location.hash && window.setTimeout(function () {
		if (!pageYOffset) window.scrollTo(0, 1);
	}, 200);
});