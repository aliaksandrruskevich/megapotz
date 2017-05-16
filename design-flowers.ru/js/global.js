document.onkeydown = esc;
function esc(e) {var kC=(window.event)?event.keyCode:e.keyCode;var Esc=(window.event)?27:e.DOM_VK_ESCAPE;if(kC==Esc)close_pic();}

document.addEventListener("DOMContentLoaded", function() {
	var products = document.querySelector('.right');
	if (products) products.addEventListener('click', function(e) {
		var node = e.target;
		if (node.type == 'button') {
			var input = node.previousSibling;
			var id = input.id;
			var saved = localStorage.getItem(id)
			
			var data = {};
			// если уже добавляли, то считываем и прибавляем счетчик
			if (saved) {
				data = JSON.parse(saved);
				data.quantity += (+input.value);
			} else {
				var itemHolder = node.parentNode.parentNode;
				data.name = itemHolder.querySelector('.p p b').innerHTML;
				data.price = parseFloat(itemHolder.querySelector('.price').innerHTML);
				data.quantity = (+input.value);
				data.id = +input.id.substr(2);
			}
			localStorage.setItem(id, JSON.stringify(data));
			alert("Заказ добавлен в корзину.\nТовар, доступный в разных цветах, отпускается только в ассортименте цвета (все цета).");
			yaCounter47049.reachGoal('ADD'); 
			basketStatus();
		}
	}, false);
	
	function basketStatus() {
		var keys = Object.keys(localStorage);
		var count = 0;
		for (var i = 0; i < keys.length; i++) {
			if (keys[i].indexOf('id') == 0) {
				var item = JSON.parse(localStorage.getItem(keys[i]));
				count += (item.price * item.quantity);
			}
		}
		document.getElementById('quantity').innerHTML = count + ' руб.';
		var node = document.getElementById('total');
		if (node) {
			node.innerHTML = count + ' руб.';
			document.getElementById('min_sum').style.display = count >= 3000 ? 'none' : 'inline-block';
			document.body.className = count ? 'order' : 'empty';
		}
		money = count;
	}
	var money = 0;
	basketStatus();
	
	// если мы в корзине
	if (document.getElementById('order_form')) {
		var table = document.getElementById('order_list');
		var trTemplate = table.querySelector('tr:last-child');
		trTemplate.parentNode.removeChild(trTemplate);
		
		for (var i = 0, keys = Object.keys(localStorage), l = keys.length; i < l; i++) {
			if (keys[i].indexOf('id') == 0) {
				var item = JSON.parse(localStorage.getItem(keys[i]));
				var tr = trTemplate.cloneNode(true);
				tr.setAttribute('data-id', item.id);
				var input = tr.querySelector('input');
				input.value = item.quantity;
				input.name = keys[i];
				var tds = tr.getElementsByTagName('td');
				tds[0].innerHTML = item.name;
				tds[1].innerHTML = item.price + 'руб.';
				table.appendChild(tr);
				
				// пересчет чека
				(function(id, tr) {
					input.addEventListener('blur', function(e) {
						var data = JSON.parse(localStorage.getItem(id));
						data.quantity = +e.target.value;
						localStorage.setItem(id, JSON.stringify(data));
						basketStatus();
					}, false);
					tr.querySelector('img').addEventListener('click', function() {
						localStorage.removeItem(id);
						tr.parentNode.removeChild(tr);
						basketStatus();
					}, false);
				})(keys[i], tr);
			}
		}
		
		// валидатор итп
		document.getElementById('form').addEventListener('submit', function(e) {
			if (money < 3000) {
				alert('Минимальная сумма заказа - 3000 рублей');
				e.preventDefault();
			}
		}, false);
	}
	
	(function () {
		var divs=document.querySelectorAll('.spring .banner');
		var cur=0;
		console.info(divs.length);
		if (divs.length) window.setInterval(change_banner,3000);
		
		function change_banner(){
			divs[cur].style.display = 'none';
			cur=cur+1==divs.length?0:cur+1;
			divs[cur].style.display = 'block';
		}
	})();

		
	(function () {
		var divs=document.querySelectorAll('.wedding .banner');
		var cur=0;
		if (divs.length) window.setInterval(change_banner,3000);
		
		function change_banner(){
			divs[cur].style.display = 'none';
			cur=cur+1==divs.length?0:cur+1;
			divs[cur].style.display = 'block';
		}
	})();


});

/* Cloud IM */

var script = document.createElement('script');
script.src = '//static.cloudim.ru/js/chat.js';
script.type = 'text/javascript';
var pos = document.querySelector('script');
pos.parentNode.insertBefore(script,pos);

window.addEventListener('load', function() {
	var div = document.createElement('div');
	div.id = 'cloudim_widget';
	document.body.appendChild(div);
	Cloudim.Chat.init({uid:839});
}, false);

/* Universal Analytics */
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-2900270-1', 'design-flowers.ru');
ga('send', 'pageview');


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