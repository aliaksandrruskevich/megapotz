var add_event;
if (document.addEventListener){add_event=function(o,e,f){o.addEventListener(e,f,false);};}
else if (document.attachEvent){add_event=function(o,e,f){o.attachEvent('on'+e,f);};}

function ya_maps(){var map=new YMaps.Map(document.getElementById("YMapsID"));map.setCenter(new YMaps.GeoPoint(37.792052,55.812651), 15, YMaps.MapType.MAP);map.addControl(new YMaps.Zoom());map.addControl(new YMaps.ToolBar());map.addControl(new YMaps.TypeControl());var s=new YMaps.Style();s.iconStyle=new YMaps.IconStyle();s.iconStyle.offset=new YMaps.Point(-13,-40);s.iconStyle.href="http://api-maps.yandex.ru/i/0.2/placemarks/pmlbl.png";s.iconStyle.size=new YMaps.Point(36,41);YMaps.Styles.add("wizard#lblPoint", s);var s=new YMaps.Style();s.iconStyle=new YMaps.IconStyle();s.iconStyle.offset=new YMaps.Point(-13,-40);s.iconStyle.href="http://api-maps.yandex.ru/i/0.2/placemarks/pmorl.png";s.iconStyle.size=new YMaps.Point(36,41);YMaps.Styles.add("wizard#orlPoint", s);var s=new YMaps.Style();s.lineStyle=new YMaps.LineStyle();s.lineStyle.strokeColor="33cc007D";s.lineStyle.strokeWidth=5;YMaps.Styles.add("wizard#33cc007D5Line", s);var placemark1=new YMaps.Placemark(new YMaps.GeoPoint(37.786015,55.814507), {style: "wizard#lblPoint", balloonOptions: {maxWidth: 300}});map.addOverlay(placemark1);placemark1.setBalloonContent("Дизайн Цветы ЛП");var placemark2=new YMaps.Placemark(new YMaps.GeoPoint(37.798331,55.810471), {style: "wizard#orlPoint", balloonOptions: {maxWidth: 300}});map.addOverlay(placemark2);placemark2.setBalloonContent("Первый вагон из центра");var polyline1= new YMaps.Polyline([new YMaps.GeoPoint(37.798718,55.810349),new YMaps.GeoPoint(37.798547,55.813324),new YMaps.GeoPoint(37.79207,55.813273),new YMaps.GeoPoint(37.791423,55.812914),new YMaps.GeoPoint(37.789752,55.81301),new YMaps.GeoPoint(37.788288,55.813273),new YMaps.GeoPoint(37.785584,55.813253),new YMaps.GeoPoint(37.785539,55.814361)], {style: "wizard#33cc007D5Line"});map.addOverlay(polyline1);polyline1.setBalloonContent("<div></div>");}
function set_period(){var t=new Date();var cy=t.getFullYear();var s=document.getElementById('copy').getElementsByTagName('span')[0];var r=parseInt( s.innerHTML );if(cy>r)s.innerHTML=r+'–'+cy;}

/*cookies*/
function set_cookie(id,quantity){document.cookie=id+'='+((get_cookie(id)*1)+(quantity*1))+'; path=/; expires='+(new Date((new Date()).getTime()+63072000000)).toGMTString();}
function get_cookie(name){if(document.cookie.length>0){var s=document.cookie.indexOf(name+'=');if(s!=-1){s=s+name.length+1; e=document.cookie.indexOf(";",s);if(e==-1)e=document.cookie.length;return unescape(document.cookie.substring(s,e));}}return '';}
function delete_all_cookies(){if(document.cookie){var ca=document.cookie.split(';');for(var i=0,l=ca.length;i<l;i++){var c=ca[i].split('=');if(c[0]&&c[0].match(/id/)){document.cookie=c[0]+'=0; path=/; expires=Thu, 01-Jan-70 00:00:01 GMT';}}}}

/*shop*/
function init_page(){
	basket();
	var holder=document.getElementById('order_list');
	var a,b;
	if(holder){
		var f=new Form(document.getElementById('form'));
		a=holder.getElementsByTagName('img');
		b=holder.getElementsByTagName('input');
		for(var i=0,l=a.length;i<l;i++){
			add_event(b[i],'blur',calculate);
			(function(img){add_event(img,'click',function(){del(img);});})(a[i]);
		}
	}
	holder=document.getElementById('shop');
	if(holder){
/*		a=holder.getElementsByTagName('a');
		for(var i=0,l=a.length;i<l;i++){
			if(a[i].className==='enlarge'){
				(function(href){add_event(a[i],'click',function(e){if(e.preventDefault){e.preventDefault();}else{e.returnValue=false;}enlarge(href);});})(a[i].href);
			}
		}
		add_event(document.getElementById('close'),'click',close_pic);*/
		a=holder.getElementsByTagName('input');
		for(var i=0,l=a.length;i<l;i++){
			if(a[i].type=='button'){(function(id){add_event(a[i],'click',function(){buy(id);});})(a[i].previousSibling.id);}
		}
	}
	holder=document.getElementById('banners');
	if(holder){
		a=holder.getElementsByTagName('a');
		for(var i=0,l=a.length;i<l;i++){
			(function(href){add_event(a[i].parentNode.parentNode,'click',function(e){document.location=href;});})(a[i].href);
		}
	}
	set_period();
}
function basket(){var total=0;if(document.cookie){var ca=document.cookie.split(';');for(var i=0,l=ca.length;i<l;i++){var c=ca[i].split('=');if(c[0]&&c[0].match(/id/)){total+=c[1]*1;}}}var b=document.getElementById('basket');if(total){var q=document.getElementById('quantity');if(q){var t=document.createTextNode(total);q.replaceChild(t,q.firstChild);}else{var html_frag=' (<b id="quantity">'+total+'</b>)';b.parentNode.innerHTML+=html_frag;}}else{while(b.nextSibling)b.parentNode.removeChild(b.nextSibling)}}
function buy(id){var txt=document.getElementById(id);set_cookie(id,txt.value);basket();cache_drop('basket.xml');alert("Заказ добавлен в корзину");}

/*enlarge*/
/*
document.onkeydown=esc;
function esc(e){var kC=(window.event)?event.keyCode:e.keyCode;var Esc=(window.event)?27:e.DOM_VK_ESCAPE;if(kC==Esc)close_pic();}
function enlarge(src){var fly=document.getElementById('fly');fly.style.display='block';var big=document.getElementById('big');big.src=src;}
function close_pic(){var fly=document.getElementById('fly');var big=document.getElementById('big');fly.style.display='none';big.src='/i/wait.gif';}
*/

/*basket*/
function del(obj){var tr=obj.parentNode.parentNode;document.cookie=tr.getElementsByTagName('input')[0].name+'=null; expires=Thu, 01-Jan-1970 00:00:01 GMT';var table=tr.parentNode;table.removeChild(tr);table.lastChild.className='b';init_page();calculate();cache_drop('basket.xml');}
function empty_order(){var p=document.getElementById('noorder');var div=document.getElementById('order_form');div.parentNode.removeChild(div);p.style.display='block';}

function calculate()
{
	var table=document.getElementById('order_list');
	if(table){
		var rows=table.getElementsByTagName('tr');
		var sum=0;
		for(var i=1,len=rows.length;i<len;i++){
			var cells=rows[i].getElementsByTagName('td');
			var price=cells[1].firstChild.nodeValue.split(' ',1)*1;
			var amount=cells[2].firstChild.value*1;
			sum+=price*amount;
		}
		if(sum==0){
			empty_order()
		}
		else{
			var b=document.getElementById('total');
			b.innerHTML=Math.round(sum)+' руб.';
			document.getElementById('min_sum').style.display=sum<5000?'inline-block':'none';
		}
	}
}

/*form*/
function Form(o){this.element=o;this.ready;this.field=[];this.init();}
Form.prototype.init=function(){this.get_fields();_my=this;add_event(this.element,'submit',function(e){if(e.preventDefault){e.preventDefault();}else{e.returnValue=false;}_my.submit();});}
Form.prototype.get_fields=function(){var input=this.element.getElementsByTagName('input');for(var i=0,l=input.length;i<l;i++){if(input[i].type=='text'){this.field.push(new Field(input[i]));}}}
Form.prototype.check=function(){this.ready=true;for(var i=0,l=this.field.length;i<l;i++){if(this.field[i].ready===undefined)this.field[i].check();if(!this.field[i].ready){if(this.ready)this.field[i].element.focus();this.ready=false;this.field[i].highlight();}}}
Form.prototype.submit=function(){this.check();if(this.ready){this.submit.disabled=true;this.element.submit();}}

function Field(o){this.element=o;this.ready;this.init();}
Field.prototype.init=function(){this.required=this.element.getAttribute('required')?true:false;var re_str=this.element.getAttribute('regexp');if(re_str){this.regexp=new RegExp(re_str);}this.init_events();}
Field.prototype.init_events=function(){var _my=this;add_event(_my.element,'blur',function(){_my.check()});}
Field.prototype.check=function(){if(this.value!=this.element.value||this.ready===undefined){if(this.required&&this.regexp&&this.element.value!=''&&this.regexp.test(this.element.value)){this.ready=true;}else if(this.required&&!this.regexp&&this.element.value!=''){this.ready=true;}else if(!this.required&&this.regexp&&this.element.value!=''&&this.regexp.test(this.element.value)){this.ready=true;}else if(!this.required&&this.element.value==''){this.ready=true;}else if(!this.required&&!this.regexp){this.ready=true;}else{this.ready=false;}}}
Field.prototype.highlight=function(){this.element.style.backgroundColor="#ffc2c2";this.element.style.border="1px solid #f00";var _my=this;add_event(_my.element,'blur',function(){_my.check();if(_my.ready){_my.element.style.backgroundColor='#fff';_my.element.style.borderColor='#ccc';}});}