//(function () {
	"use strict";
	
	// Итератор по ключам объекта
	Object.prototype.forEach = function(callback) {
		if (this.constructor === Object) {
			for (var i = 0, keys = Object.keys(this), l = keys.length, key, value; key = keys[i], value = this[key], i < l; i++) {
				if (callback(value, key, i) === false) break;
			}
		}
	};
	
	// Работа с  CSS3 Transitions
	// http://www.w3.org/TR/css3-transitions/
	var animate = (function () {		// cfg = {transition:'', from: {}, to: {}, callback:fn}
		var transitionSupported = 'transition' in document.createElement('div').style;
		var animatableProps = {'backgroundColor':1,'backgroundPosition':1,'borderBottomColor':1,'borderBottomWidth':1,'borderLeftColor':1,'borderLeftWidth':1,'borderRightColor':1,'borderRightWidth':1,'borderSpacing':1,'borderTopColor':1,'borderTopWidth':1,'bottom':1,'clip':1,'color':1,'fontSize':1,'fontWeight':1,'height':1,'left':1,'letterSpacing':1,'lineHeight':1,'marginBottom':1,'marginLeft':1,'marginRight':1,'marginTop':1,'maxHeight':1,'maxWidth':1,'minHeight':1,'minWidth':1,'opacity':1,'outlineColor':1,'outlineWidth':1,'paddingBottom':1,'paddingLeft':1,'paddingRight':1,'paddingTop':1,'right':1,'textIndent':1,'textShadow':1,'top':1,'verticalAlign':1,'visibility':1,'width':1,'wordSpacing':1,'zIndex':1};

		// Моментальная анимация выставляет сначала стили до, потом стили после на случай, если в стилях "до" были какие-то непересекающиеся с "после" стили
		var instantTransition = function(node, cfg) {
			cfg.from.forEach(function(value, prop) {
				node.style[prop] = value;
			});
			cfg.to.forEach(function(value, prop) {
				node.style[prop] = value;
			});
			cfg.callback && cfg.callback();
		};

		var setRules = function(node, css, animatable) {		// если animatable, то ставит только анимируемые, если false - то только не анимируемые, если не передать - то все
			if (typeof css == 'object') {
				css.forEach(function(value, prop) {
					if ( (animatable && animatableProps[prop]) || (!animatable && !animatableProps[prop]) || animatable === undefined ) node.style[prop] = value;
				});
			} else node.className = css;
		};

		// Если браузер не поддерживает анимацию, то просто ставим конечные стили и вызываем колбэк
		if (!transitionSupported) {
			return instantTransition;
		} else return function(node, cfg) {
			// Моментальная анимация теоретически возможна, если from и to - хэши стилей. Если передали класс, то пропускать нельзя никак
			var skipAnimation = typeof cfg.from == 'object' && typeof cfg.to == 'object';

			// Анимацию можно пропустить если в итоговых стилях нет анимируемых свойств, ИЛИ если юзер идиот и он в from и to указал совпадающие значения у анимируемых свойств
			skipAnimation && cfg.to.forEach(function(value, prop) {
				if (animatableProps[prop] && value != cfg.from[prop]) skipAnimation = false;
			});

			if (skipAnimation) {
				instantTransition(node, cfg);
			} else {
				node.style.transition = cfg.transition;
				setRules(node, cfg.from);
				// Запускаем анимацию
				window.setTimeout(setRules.bind(null, node, cfg.to, true), 10);

				// не надо вешать эвентлистенеры, если на них нечего вешать (нет колбэка и неанимируемых атрибутов)
				// определяем наличие неанимируемых css правил в конечных стилях
				var hasNonAnimatable = false;
				typeof cfg.to == 'object' && cfg.to.forEach(function(value, prop) {
					if (!animatableProps[prop]) hasNonAnimatable = true;
				});

				if (cfg.callback || hasNonAnimatable) {
					var ontransitionend = function(e) {
						console.info('transition ended');
						setRules(node, cfg.to, false);
						cfg.callback && cfg.callback();
						node.removeEventListener('transitionend', ontransitionend);
					};
					node.addEventListener('transitionend', ontransitionend, false);
				}
			}
		};
	})();
	
	// Утилита для вычисления строки, подставляемой в параметр времени анимации
	var getSpeed = function(speed) {
		if (typeof speed == 'string' || typeof speed == 'number') {
			var speedPreset = {'slow': '1s', 'normal': '0.6s', 'fast': '0.3s'};
			return typeof speed == 'string' ? speedPreset[speed] : (speed / 1000).toFixed(1) + 's';
		}
		return '0.3s';
	};

	var fadeIn = function(node, speed, fn) {	// slow, normal, fast
		animate(node, {
			transition:	'opacity linear ' + getSpeed(speed),
			from:		{opacity: 0, display: 'block'},
			to:			{opacity: 1},
			callback:	fn
		});
	};

	var fadeOut = function(self, speed, fn) {
		animate(node, {
			transition:	'opacity linear ' + getSpeed(speed),
			from:		{},
			to:			{opacity: 0, display: 'none'},
			callback:	fn
		});
	};
	
	
	// КАЛЬКУЛЯТОР
	function Calculator(root) {
		// Инициализация
		var nodes = {
			wc:			document.getElementById('wc'),
			area:		document.getElementById('area'),
			eastimate:	root.querySelectorAll('tbody td:not(:first-child)'),
			total:		root.querySelectorAll('tfoot td:not(:first-child)'),
		};
		var wc = 3, area = 400, roomType = 'cott';
		
		// Подстановка изначальных данных для подсчета
		// Из Яндекс Островов более приоритетно, чем из cookies
		var pairs = document.cookie.split('; ').concat(document.location.search.substring(1).split('&'));
		for (var i = 0, l = pairs.length; i < l; i++) {
			var pair = pairs[i].split('=');
			if (pair[0] == 'wc') wc = +pair[1];
			if (pair[0] == 'area') area = +pair[1];
		}
		
		// Показываем подсказку
		var showHint = function () {
			root.removeEventListener('mouseover', showHint, false);
			var hint = root.querySelector('.calc-hint');
			fadeIn(hint, 'slow');
			
			// Убираем
			var hideHint = function () {
				root.removeEventListener('click', hideHint, false);
				hint.parentNode.removeChild(hint);
			};
			root.addEventListener('click', hideHint, false);
		}
		root.addEventListener('mouseover', showHint, false);

		// Форматированный вывод сумм
		var formatCurrency = function(num) {
			return num.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
		};
		
		// Калькуляция сметы и вывод
		var recalculate = function () {
			// Забираем значения из инпутов
			wc = +nodes.wc.value;
			area = +nodes.area.value;
			// Пишем их в куки
			var date = new Date('2025').toUTCString();
			document.cookie = 'area=' + area + ';path=/;expires=' + date;
			document.cookie = 'wc=' + wc + ';path=/;expires=' + date;
			// Пересчитываем таблицу
		
			var results = [];
			var totalBusiness = 0;
			var totalLuxe = 0;
		
			results[2]	= 140000 + 220 * area;		// работа электрика бизнес
			results[3]	= 160000 + 220 * area;		// работа электрика люкс
			results[4]	= 36000 * (wc + 0.5);		// работа сантехника бизнес
			results[5]	= 42000 * (wc + 0.5);		// работа сантехника люкс
			results[8]	= 3500 * area;				// материал отделка бизнес
			results[9]	= 4000 * area;				// материал отделка люкс
			results[10]	= 40000 + 200 * area;		// материал электрика бизнес
			results[11]	= 60000 + 200 * area;		// материал электрика люкс
			results[12]	= 22500 * (wc + 0.5);		// материал сантехника бизнес
			results[13]	= 30000 * (wc + 0.5);		// материал сантехника люкс

			// Коттедж
			if (roomType == 'cott') {
				results[0]	= 7000 * area;			// работа отделка бизнес
				results[1]	= 8500 * area;			// работа отделка люкс
				results[6]	= 110000 + 200 * area;	// работа отопление бизнес
				results[7]	= 130000 + 200 * area;	// работа отопление люкс
				results[14]	= 100000 + 800 * area;	// материал отопление бизнес
				results[15]	= 140000 + 800 * area;	// материал отопление люкс
			}
			// Квартира
			else {
				results[1]	= 9000 * area;			// отделка люкс
				results[0]	= 7500 * area;			// отделка бизнес
				results[6]	= results[7] = results[14] = results[15] = 0;	// Зануляем отопление в квартире
			}

			// Проставляем значения сметы в таблицу
			for (var i = 0, l = nodes.eastimate.length, node; node = nodes.eastimate[i], i < l; i++) {
				if (i % 2 == 0) totalBusiness += results[i];
				else totalLuxe += results[i];
				node.textContent = formatCurrency(results[i]);
			}
			
			// Вычисляем итог
			nodes.total[0].textContent = formatCurrency(totalBusiness);
			nodes.total[1].textContent = formatCurrency(totalLuxe);
		};

		// Привязываем события к кнопке Пересчитать
		root.addEventListener('keyup', recalculate, false);

		// Переключение между вкладками и пересчет таблицы
		root.addEventListener('change', function(e) {
			var target = e.target;
			if (target.type == 'radio') roomType = root.className = e.target.id;
			recalculate();
		});

		var form = root.querySelector('form');
		form.reset();	// Сбрасываем форму, потому что Firefox кэширует состояние радиокнопок

		// Перед отправкой форму необходимо в hidden поле записать innerHTML калькуляции
		form.addEventListener('submit', function(e) {
			e.preventDefault();
			// TODO вычищать ноды лишние
			form.html.value = form.querySelector('table').innerHTML.replace(/\s{2,}/g, '');
			form.submit();
		});
		
		// Простановка начальных значений в калькулятор
		nodes.wc.value = wc;
		nodes.area.value = area;
		document.getElementById(roomType).click();
	}
	
	
	// Album covers
	function AlbumView(root) {
		function getPicSize() {
			return Math.round( parseInt(window.getComputedStyle(root).width) / 4 - 30 );
		}

		// Забираем код тэгов картинок из noindex, чтобы не прогружать их в стандартных размерах попусту с гугла
		// Сразу подставляем в них нужные размеры и после этого грузим...
		var stub = document.createElement('div');
		
		// !!! может это не надо??!!!!!!!!!!!!!!!!!!!
		stub.style.display = 'none';
		document.body.appendChild(stub);
		var picSize = getPicSize();
		var picIndex = [];
		
		var noscriptNodes = root.querySelectorAll('noscript');
		for (var i = 0, l = noscriptNodes.length, node; i < l; i++) {
			var str = noscriptNodes[i].textContent;
			var parts = [], pos = 0;
			// var re = /([^/]+)\.jpg/g; str = str.replace(re, 's20-c/');	- http://jsperf.com/myregexptest-megapotz
			while ( (pos = str.indexOf('https://') + 83) != 82 ) {
				parts.push(str.substr(0, pos) + 's' + picSize + '-c/');
				str = str.substr(pos);
			}
			stub.innerHTML = parts.join('') + str;

			var frag = document.createDocumentFragment();
			for (var i1 = 0, l1 = stub.children.length, node; i1 < l1; i1++) {
				node = stub.removeChild(stub.children[0]);
				frag.appendChild(node);
				picIndex.push({
					node:		node,
					baseUrl:	node.src.substring(0,83)
				});
			}
			
			noscriptNodes[i].parentNode.replaceChild(frag, noscriptNodes[i]);
		}
		document.body.removeChild(stub);

		var timer;
		var albums = root.querySelectorAll('.album');
		function resize(){
			var picSide = getPicSize();
			
			for (var i = 0, l = albums.length, album; album = albums[i], i < l; i++) {
				album.style.width =  picSide + 25 + 'px';
				album.style.height = picSide + 60 + 'px';
			}
			
			for (var i = 0, l = picIndex.length, pic; pic = picIndex[i], i < l; i++) {
				pic.node.style.width =  picSide + 'px';
				pic.node.style.height = picSide + 'px';
			}

			if (timer) window.clearTimeout(timer);
			timer = window.setTimeout(load, 1000);
		}
		
		function load() {
			timer = undefined;
			var picSide = getPicSize();
			for (var i = 0, l = picIndex.length, pic; pic = picIndex[i], i < l; i++) {
				pic.node.src = pic.baseUrl + 's' + picSide + '-c/';
			}
		}
		
		// При изменении размеров экрана надо делать ресайз альбомов, но перегружать фотографии гугла только по таймауту
		window.addEventListener('resize', resize, false);
		resize();
	}


////////////////////////
// Initializing pages //
////////////////////////

var page_name = document.body.id;

switch (page_name) {
	case 'page-index':
		if ( window.devicePixelRatio == 2 ) {
			document.getElementById('ingos').src='http://static.otdelkalux.ru/i/ingos-2x.png';
		}
		AlbumView(document.getElementById('album_grid'));
		Calculator(document.getElementById('calculator'));
		
		$('#GPlus').GPlusGallery(photos);
		$('#GPlus div').last().on('click', function(e){e.stopPropagation()}).find('img').wrap('<a href="/portfolio/process/"/>');
		
		// Убирание подсказки про "крутите дальше"
		function onScroll() {
			fadeOut(document.getElementById('mouse'));
			window.removeEventListener('scroll', onScroll);
		}
		window.addEventListener('scroll', onScroll, false);

		break;
	case 'page-contacts':
		init_maps();
		//init_callback();
		init_selector();

		var to;
		$('#selector .left, #kuusinena_hint').hover(function (){
			window.clearTimeout(to);
			$('#madison_hint').css('opacity','0');
			$('#kuusinena_hint').css({'visibility': 'visible','opacity':'1'});
		}, function (){
			to=window.setTimeout(function (){$('#kuusinena_hint').css({'opacity':'0','visibility':'hidden'})},1000);
		});
		$('#selector .right, #madison_hint').hover(function (){
			window.clearTimeout(to);
			$('#kuusinena_hint').css('opacity','0');
			$('#madison_hint').css({'visibility': 'visible','opacity':'1'});
		}, function (){
			to=window.setTimeout(function (){$('#madison_hint').css({'opacity':'0','visibility':'hidden'})},1000);
		});
		break;
}


/*
$(document).ready(function () {
	var page_name = $('body').attr('id');

	switch (page_name) {
		// Initializing main page
		case 'page-index':

			// Ingosstrakh logo
			if ( window.devicePixelRatio == 2 ) {
				var logo=$('#ingos')[0];
				logo.src='http://static.otdelkalux.ru/i/ingos-2x.png';
			}
			
			// Albums
			//var album=AlbumView($('#album_grid')[0]);

			// Best photos
			var spinner = new Spinner({ lines: 13, length: 7, width: 4, radius: 10, rotate: 0, color: '#000', speed: 1, trail: 60, shadow: false, hwaccel: true, className: 'spinner', zIndex: 2e9 });
			//$('#GPlus').GPlusGallery(photos, {'spinner': spinner});
			$('#GPlus div').last().on('click', function(e){e.stopPropagation()}).find('img').wrap('<a href="/portfolio/process/"/>');

			// Show / hide call-me-back form
			init_callback();

			// Calculator
			Calculator($("#calculator")[0]);
			
			// Mouse hint
			$('#mouse').css('opacity', 1);
			$(window).one( 'scroll', function () { $('#mouse').css('opacity', 0); });

			break;

		case 'page-contacts':
			init_maps();
			init_callback();
			init_selector();

			var to;
			$('#selector .left, #kuusinena_hint').hover(function (){
				window.clearTimeout(to);
				$('#madison_hint').css('opacity','0');
				$('#kuusinena_hint').css({'visibility': 'visible','opacity':'1'});
			}, function (){
				to=window.setTimeout(function (){$('#kuusinena_hint').css({'opacity':'0','visibility':'hidden'})},1000);
			});
			$('#selector .right, #madison_hint').hover(function (){
				window.clearTimeout(to);
				$('#kuusinena_hint').css('opacity','0');
				$('#madison_hint').css({'visibility': 'visible','opacity':'1'});
			}, function (){
				to=window.setTimeout(function (){$('#madison_hint').css({'opacity':'0','visibility':'hidden'})},1000);
			});
			break;

		case 'page-price':
			// CALC
			if($("#calculator").length > 0)
				Calculator($("#calculator")[0]);
			init_selector();

			break;
		case 'page-portfolio':
			if($("#album_grid").length > 0)
				AlbumView($('#album_grid')[0]);
			if($("#selector_hint").length > 0)
				window.setTimeout(function (){$("#selector_hint").css({'opacity':1});}, 2000);
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
			$('#showhide').toggle(function (){
					$('#map').css({'height':0});
					$(this).text('Показать карту');
				},
				function (){
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
		/*$("p:contains('47')").each(function (){
			$(this).text($(this).text().replace("(495) 99-88-347", "(909) 151-31-56").replace("(495) 998-83-47", "(909) 151-31-56"));
		});*/
		///////////
});*/

function init_callback()	{
	$('#show_form_btn,#callback_form input[type=reset], #close').click(function (){
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
		$('#selector .current').on('webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd otransitionend', function (){
			document.location = $(_this).find('a').attr('href');
		});

	});
}



/*
var places=[["55.797092","37.023568"],["55.789745","37.039345"],["55.778571","36.946130"],["55.805454","36.971275"],["56.051165","36.802061"],["55.824103","37.620016"]];
function init_maps() {
var mapOptions = {
scrollwheel: false,
center: new google.maps.LatLng(55.8, 37),
zoom: 11,
mapTypeId: google.maps.MapTypeId.ROADMAP
};
var styles = [{
stylers: [
{ saturation: -100 },
{ lightness: 50 }
]
}];
var map = new google.maps.Map(document.getElementById("map_canvas"),mapOptions);
map.setOptions({styles: styles});
setMarkers(map, places);
}
function setMarkers(map, locations) {
var shadow = new google.maps.MarkerImage('http://static.otdelkalux.ru//i/marker-shadow-1.png', new google.maps.Size(96, 37), new google.maps.Point(0,0), new google.maps.Point(16,36));
for (var i = 0; i < locations.length; i++) {
var myLatLng = new google.maps.LatLng(locations[i][0], locations[i][1]);
var marker = new google.maps.Marker({
position: myLatLng,
map: map,
shadow: shadow,
icon: new google.maps.MarkerImage('http://static.otdelkalux.ru//i/markers.png', new google.maps.Size(51,60), new google.maps.Point(0,60*i), new google.maps.Point(20,60)),
});
(function(i){google.maps.event.addListener(marker, 'click', function() {
document.location.hash = 'obj'+i;
});
})(i+1);
}

}


-*--------------------


var map;
var hash;
var loc;
function init_maps() {
// Точки офисов на карте. [0] - Millennium, [1] - Madison.
var point = [new google.maps.LatLng(55.789745, 37.039345), new google.maps.LatLng(55.778093, 36.944855)];
// Объект маркера
var icon = new google.maps.MarkerImage('http://static.otdelkalux.ru/i/marker.png',
new google.maps.Size(68, 96),
new google.maps.Point(0,0),
new google.maps.Point(34, 0)
);
//Тень маркера
var shadow = new google.maps.MarkerImage('http://static.otdelkalux.ru/i/marker-shadow.png',
new google.maps.Size(146, 96),
new google.maps.Point(0,0),
new google.maps.Point(34, 0)
);

loc = {
'millennium':	{
'zoom': 10,
'latlng': point[0],
'selector': 'left',
'addr': 'Новорижское ш.,<br/>посёлок Millennium Park,<br/>владение 3041'
},
'madison':	{
'zoom': 10,
'latlng': point[1],
'selector': 'right',
'addr': 'Новорижское ш.,<br/>посёлок Madison Park,<br/>владение 15'
}};
hash = window.location.hash.substr(1);
if(loc[hash]==undefined){
hash='millennium';
window.location.hash=hash;
}
$('#selector')[0].className = loc[hash].selector;
$('#addr').html(loc[hash].addr);

map = new google.maps.Map(document.getElementById("map_canvas"),{
center: loc[hash].latlng,
scrollwheel: false,
zoom: loc[hash].zoom,
mapTypeId: google.maps.MapTypeId.ROADMAP
});
map.setOptions({styles: [{
stylers: [
{ saturation: -100 },
{ lightness: 50 }
]
}]});

loc['millennium'].marker = new google.maps.Marker({position: point[0], map: map, animation: google.maps.Animation.DROP, icon: icon, shadow: shadow, visible: hash=='millennium' });
loc['madison'].marker = new google.maps.Marker({position: point[1], map: map, animation: google.maps.Animation.DROP, icon: icon, shadow: shadow, visible: hash=='madison' });
if (window.addEventListener) {
window.addEventListener('hashchange', pan_map, false); 
} else if (window.attachEvent)  {
window.attachEvent('onhashchange', pan_map);
}
}
function pan_map(){
loc[hash].marker.setVisible(false);
hash = window.location.hash.substr(1);
if(loc[hash]==undefined){
hash='millennium';
window.location.hash=hash;
}
map.panTo(loc[hash].latlng);
map.setZoom(loc[hash].zoom);
loc[hash].marker.setVisible(true);
loc[hash].marker.setAnimation(google.maps.Animation.DROP);
$('#addr').html(loc[hash].addr);
}
*/


/////////////////////////
// GA
/*  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-17254104-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

  // Metrika
  <!-- Yandex.Metrika counter -->
<script type="text/javascript">
(function (d, w, c) {
    (w[c] = w[c] || []).push(function() {
        try {
            w.yaCounter13794628 = new Ya.Metrika({id:13794628,
                    webvisor:true,
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true,
                    trackHash:true});
        } catch(e) { }
    });

    var n = d.getElementsByTagName("script")[0],
        s = d.createElement("script"),
        f = function () { n.parentNode.insertBefore(s, n); };
    s.type = "text/javascript";
    s.async = true;
    s.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//mc.yandex.ru/metrika/watch.js";

    if (w.opera == "[object Opera]") {
        d.addEventListener("DOMContentLoaded", f, false);
    } else { f(); }
})(document, window, "yandex_metrika_callbacks");
</script>
<noscript><div><img src="//mc.yandex.ru/watch/13794628" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->
  
  .reachGoal(target, [params])
  http://help.yandex.ru/metrika/objects/reachgoal.xml
  http://help.yandex.ru/metrika/content/e-commerce.xml
  var yaParams = {
  order_id: "12345",
  order_price: 123.45, 
  currency: "RUR",
  exchange_rate: 1,
  goods: 
     [
        {
          id: "1", 
          name: "наименование товара", 
          price: 100,
          quantity: 1
        } 
      ]
};
*/


/* статистика */
(function(w,n,d){
var r, s;
/* Mail.ru */
(new Image).src='http://db.ce.b2.a2.top.mail.ru/counter?id=2288412;js=13'+((r=d.referrer)?';r='+escape(r):'')+((s=w.screen)?';s='+s.width+'*'+s.height:'')+';_='+Math.random();
/* Liveinternet */
(new Image).src = "//counter.yadro.ru/hit?r" + escape(r)+((typeof(s)=="undefined")?"" : ";s"+s.width+"*"+s.height+"*"+(s.colorDepth?s.colorDepth:s.pixelDepth))+";u"+escape(document.URL)+";"+Math.random();
/* Rambler*/
var po = document.createElement('script');po.type = 'text/javascript';po.async = true;po.src = 'http://counter.rambler.ru/top100.jcn?2890004';var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(po, s);
})(window,navigator,document);

//})();