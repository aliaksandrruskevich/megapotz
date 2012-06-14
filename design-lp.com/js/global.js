function set_period()
{
	var copy = document.getElementById('copy');
	if(copy) {
		var span_date = copy.getElementsByTagName('span')[0];
		var today = new Date();
		var current_year = today.getFullYear();
			var release_year = parseInt( span_date.innerHTML );

		if ( current_year > release_year ) {
			span_date.innerHTML = release_year + '\u2014' + current_year;
		}
	}
}


function start()
{
	set_period();
	var body=document.getElementsByTagName('body')[0];body.oncopy=function(){return false;};body.oncontextmenu=function(){return false;};body.ondragstart=function(){return false;};if(body.attachEvent){body.attachEvent("onselectstart",function(){return false});}if(window.opera){body.onmousedown=function(){return false;}};
}

function clearActiveSpan()
{
	var span = $('#nav').find('span');
	for (var i = 0, l = span.length; i < l; i++){
		span[i].className='';
	}
}

//////////////////////////////////////////////////
var gallery = new Array();

function Gallery(gallery){
	this._gallery = gallery;
	this.photo = new Array();
	this.active = false;
}

Gallery.prototype.init = function(){
	this.init_events();
	this.find_photos();
	this.init_photos();
}

Gallery.prototype.init_events = function(){
	var _my = this;
	var span = $('#nav').find('span');
	if (span[0]) {
		for (var i = 0, l = span.length; i < l; i++){
			$(span[i]).click(new Function('if(!gallery['+i+'].active){for (var j = 0; len = gallery.length; j++){if( gallery[j].active ){clearActiveSpan();this.className="c";gallery[j].hide();break;}}gallery['+i+'].show();gallery['+i+'].photo[0].show();}'));
		}
		span[0].className='c';
	}
}

Gallery.prototype.find_photos = function(){
	var _my = this;
	$('.pic', this._gallery).each((function(){
		_my.photo.push(new Photo(this, _my));
	}));
}

Gallery.prototype.init_photos = function(){
	for(var i=0, l = this.photo.length; i < l; i++) {
		this.photo[i].init();
	}
}

Gallery.prototype.show = function(){
	this._gallery.style.display = 'block';
	for(var i=0;i<this.photo.length;i++){
		var href=this.photo[i]._photo.getElementsByTagName('a')[1].href;
		this.photo[i].big_photo.firstChild.firstChild.src=href;
		this.photo[i].preview_photo.firstChild.src=href;
	}
	this.active=true;
}

Gallery.prototype.hide = function(){
	for ( var i = 0, p = this.photo; i < p.length; i++ ){
		if(p[i].active){
			p[i].hide();
			break;
		}
	}
	this._gallery.style.display = 'none';
	this.active = false;
}

///////////////////
function Photo(photo, gallery){
	this._gallery = gallery;
	this._photo = photo;
	this.active = false;
}

Photo.prototype.init = function(){
	this.find_photos()
	this.init_events();
}

Photo.prototype.find_photos = function(){
	_my = this;
	var bf=this._photo.firstChild;
	var href=this._photo.getElementsByTagName('a')[0].href;

	var a=document.createElement('a');
	var idx=href.lastIndexOf('/');
	var tmp=href.substr(0,idx);
	idx=tmp.lastIndexOf('/');
	var beg=href.substr(0,idx);
	var end=href.substr(idx+1);
	href=beg+'/800/'+end;
	a.href=href;
	a.target='_blank';
	a.appendChild(bf.firstChild.cloneNode(true));
	bf.replaceChild(a,bf.firstChild);
	
	this.big_photo=this._photo.firstChild;
	this.preview_photo = this.big_photo.nextSibling;
}

Photo.prototype.init_events = function(){
	var _my = this;
	$(this.preview_photo).click(function(evt){ 
		for ( var i = 0, p = _my._gallery.photo; i < p.length; i++ ){
			if(p[i].active){
				p[i].hide();
				break;
			}
		}
		_my.show();
		return false;
	});
}

Photo.prototype.show = function(){
	var _my = this;
	if ( this.active ) { return; }
	
	this.preview_photo.style.backgroundColor = '#f0a5e1';
	$(this.big_photo).animate({top: '0', duration: 300}, function(){$('p', _my.big_photo).fadeIn("slow");});
	this.active = true;

}

Photo.prototype.hide = function(){
	var _my = this;
	if ( !this.active ) { return; }
	
	this.preview_photo.style.backgroundColor = '#fde';
	this.big_photo.style.top = '-350px';
	this.big_photo.getElementsByTagName('p')[0].style.display = 'none';
	this.active = false;
}

$(document).ready(function(){
	$('.gallery').each(function(){gallery.push(new Gallery(this));})
	for(var i=0; i < gallery.length; i++) {
		gallery[i].init();
	}
	if(gallery[0]) {
		gallery[0].show();
		gallery[0].photo[0].show();
		gallery[0].photo[0].active = true;
	}
})

window.onload=start;