document.onkeydown = esc;
function esc(e) {var kC=(window.event)?event.keyCode:e.keyCode;var Esc=(window.event)?27:e.DOM_VK_ESCAPE;if(kC==Esc)close_pic();}

var curr=new Date();
var past=new Date();
var future=new Date();
past.setTime(1);
future.setTime(curr.getTime()+15724800000);

var MyApp = {
	MAX: 100
};
MyApp.createCookie = function(name, value, days) {
	var date, expires;
	if (days) {
		date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = '; expires=' + date.toGMTString();
	} else {
		expires = '';
	}
	document.cookie = name + '=' + value + expires + '; path=/';
}

MyApp.readCookie = function(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

MyApp.eraseCookie = function(name) {
    this.createCookie(name, '', -1);
}

MyApp.eraseAllCookie = function() {
	var arr = document.cookie.split(';');
	var i = 0,
		max = arr.length;
	for (i; i < max; i++) {
		this.createCookie(arr[i].split('=')[0], '', -1);	
	}    
}

MyApp.getCookies = function() {
	return document.cookie.split(';').length;
}

MyApp.cookieTest = function() {
	var max = this.readCookie('_m');
	if (max && max > 0) {
		this.createCookie('_m', max, 3600 * 24 * 365);
		this.MAX = max;
	} else {
		var i = 0,
			length = 300,
			size = 0;
		this.eraseAllCookie();
		for (i; i < length; i++) {
			size = this.getCookies();
			this.createCookie('test' + i, 'test' + i, 60, true);
			if (size == this.getCookies()) {
				break;
			} 
		}
		this.MAX = i - 1;
		this.eraseAllCookie();
		this.createCookie('_m', this.MAX, 3600 * 24 * 365);
	}
	return this.MAX;
}

MyApp.buy = function(id) {
	var txt = document.getElementById(id);
	if (this.getCookies() >= this.MAX) {
		alert('В этот заказ нельзя добавить больше позиций. Отправьте этот заказ. После этого Вы сможете продолжить покупки.');
	} else {
		var size = this.getCookies();
		this.createCookie(id, txt.value, 3600 * 24 * 365);
		alert("Заказ добавлен в корзину.\nТовар, доступный в разных цветах, отпускается только в ассортименте цвета (все цета).");
	}
	count();
	calculate()
}

/* Починим клиентов с плохими cookies */
if (MyApp.readCookie('max')) {
	MyApp.eraseAllCookie();
}

MyApp.cookieTest();

var ie6;
function enlarge(num)
{
	var fly=document.getElementById('fly_ie6');
	var tr,bl;
	if(fly){
		ie6=true;
		tr=document.getElementById('tr');
		bl=document.getElementById('bl');
		tr.style.height='500px';
		bl.style.height='500px';
	}
	else{fly=document.getElementById('fly');}
	fly.style.display='block';
	
	if(ie6){
		var big=document.getElementById('big_ie6');
		big.src='/img/big/'+num+'.jpg';
		tr.style.height=((big.height*1)+56)+'px';
		bl.style.height=((big.height*1)+56)+'px';
		fly.getElementsByTagName('table')[0].style.width=big.width+'px';
	}
	else{
		var big=document.getElementById('big');
		big.src='/img/big/'+num+'.jpg';
	}
}

function close_pic()
{
	var fly=document.getElementById(ie6?'fly_ie6':'fly');
	var big=document.getElementById(ie6?'big_ie6':'big');
	fly.style.display='none';
	big.src='/i/wait.gif';
}

function set_period(){var t=new Date();var cy=t.getFullYear();var s=document.getElementById('copy').getElementsByTagName('span')[0];var r=parseInt( s.innerHTML );if(cy>r)s.innerHTML=r+'–'+cy;}
function buy(id){
	MyApp.buy(id);
}

function count(){
	var total=0;
	if(document.cookie){
		var ca=document.cookie.split(';');
		for(var i=0,l=ca.length;i<l;i++){
			var c=ca[i].split('=');
			if(c[0]&&c[0].match(/id/)){
				total+=c[1]*1;
			}
		}
	}
	var b=document.getElementById('basket');
	if(total){
		var q=document.getElementById('quantity');
		if(q){
			var t=document.createTextNode(total);
			q.replaceChild(t,q.firstChild);
		}
		else{
			var html_frag=' (<b id="quantity">'+total+'</b>)';
			b.parentNode.innerHTML+=html_frag;
		}
	}
	else{while(b.nextSibling)b.parentNode.removeChild(b.nextSibling)}set_period();
}


function set_cookie(id,quantity){document.cookie=id+'='+((get_cookie(id)*1)+(quantity*1))+';path=/;expires='+future.toGMTString();}
function get_cookie(name){if(document.cookie.length>0){var s=document.cookie.indexOf(name+'=');if(s!=-1){s=s+name.length+1; e=document.cookie.indexOf(";",s);if(e==-1)e=document.cookie.length;return unescape(document.cookie.substring(s,e));}}return '';}
function delete_all_cookies() {
	MyApp.eraseAllCookie();
	count();
}

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
			document.getElementById('min_sum').style.display=sum<1000?'inline-block':'none';
		}
	}
}

function del(obj){
	var tr=obj.parentNode.parentNode;
	MyApp.eraseCookie(tr.getElementsByTagName('input')[0].name);
	var table=tr.parentNode;table.removeChild(tr);
	table.lastChild.className='b';
	count();
	calculate();
}
function empty_order(){var p=document.getElementById('noorder');var div=document.getElementById('order_form');div.parentNode.removeChild(div);p.style.display='block';}

/*******************************/
/*             FORM            */
/*******************************/
var add_event;
if (document.addEventListener){add_event=function(o,e,f){o.addEventListener(e,f,false);};}
else if (document.attachEvent){add_event=function(o,e,f){o.attachEvent('on'+e,f);};}

function Form(o){
	this.element=o;
	this.ready;
	this.field=[];
	this.init();
}

Form.prototype.init=function(){
	this.get_fields();
}

Form.prototype.get_fields=function(){
	var input=this.element.getElementsByTagName('input');
	for(var i=0,l=input.length;i<l;i++){
		if(input[i].type=='text'){
			this.field.push(new Field(input[i]));
		}
	}
}

Form.prototype.check=function(){
	this.ready=true;

	var rows=document.getElementById('order_list').getElementsByTagName('tr');
	var sum=0;
	for(var i=1,len=rows.length;i<len;i++){
		var cells=rows[i].getElementsByTagName('td');
		var price=cells[1].firstChild.nodeValue.split(' ',1)*1;
		var amount=cells[2].firstChild.value*1;
		sum+=price*amount;
	}
	if(sum<1000){
		alert('Минимальная сумма заказа 1000 рублей');
		this.ready=false;
	}

	for(var i=0,l=this.field.length;i<l;i++){
		if(this.field[i].ready===undefined)
			this.field[i].check();
		if(!this.field[i].ready){
			if(this.ready)this.field[i].element.focus();
			this.ready=false;
			this.field[i].highlight();
		}
	}
}

Form.prototype.submit=function(){
	this.check();
	if(this.ready){
		this.submit.disabled=true;
		this.element.submit();
	}
}

function Field(o){
	this.element=o;
	this.ready;
	this.init();
}

Field.prototype.init=function(){
	this.required=this.element.getAttribute('required')?true:false;
	var re_str=this.element.getAttribute('regexp');
	if(re_str){this.regexp=new RegExp(re_str);}
	this.init_events();
}

Field.prototype.init_events=function(){
	var _my=this;
	add_event(_my.element,'blur',function(){_my.check()});
}

Field.prototype.check=function(){
	if(this.value!=this.element.value||this.ready===undefined){
		if(this.required&&this.regexp&&this.element.value!=''&&this.regexp.test(this.element.value)){
			this.ready=true;
		}
		else if(this.required&&!this.regexp&&this.element.value!=''){
			this.ready=true;
		}
		else if(!this.required&&this.regexp&&this.element.value!=''&&this.regexp.test(this.element.value)){
			this.ready=true;
		}
		else if(!this.required&&this.element.value==''){
			this.ready=true;
		}
		else if(!this.required&&!this.regexp){
			this.ready=true;
		}
		else{
			this.ready=false;
		}
	}
}

Field.prototype.highlight=function(){
	this.element.style.backgroundColor="#ffc2c2";
	this.element.style.border="1px solid #f00";
	var _my=this;
	add_event(_my.element,'blur',function(){_my.check();if(_my.ready){_my.element.style.backgroundColor='#fff';_my.element.style.borderColor='#ccc';}});
}


$(document).ready(function() {
	var divs=$('#body .banner');
	divs.hide();
	var cur=0;
	window.setInterval(change_banner,3000);
	
	function change_banner(){
		$(divs[cur]).fadeOut('fast',function(){
			cur=cur+1==6?0:cur+1;
			$(divs[cur]).fadeIn('slow');
		});
	}
});