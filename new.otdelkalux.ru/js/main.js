if (navigator.appName == 'Microsoft Internet Explorer') {
	var ua = navigator.userAgent;
	var re  = new RegExp("MSIE (.+) ");
	if (re.exec(ua) != null) var ver = parseFloat( RegExp.$1 );
	if (ver == 8) document.location = 'http://ie.otdelkalux.ru';
	else if (ver < 8) document.location = 'http://old.otdelkalux.ru';
}

(function () {
	"use strict";

	// Итератор по ключам объекта
	Object.defineProperty(Object.prototype, 'forEach', {
		value: function(callback) {
			if (this.constructor === Object) {
				for (var i = 0, keys = Object.keys(this), l = keys.length, key, value; key = keys[i], value = this[key], i < l; i++) {
					if (callback(value, key, i) === false) break;
				}
			}
		},
		writable: true
	});

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
						setRules(node, cfg.to, false);
						cfg.callback && cfg.callback();
						node.removeEventListener('transitionend', ontransitionend);
					};
					node.addEventListener('transitionend', ontransitionend, false);
				}
			}
		};
	})();
	
	var deferredLoader = (function() {
		var nodes = [];
		
		function getY(el) {
			var y = 0;
			while (el.offsetParent !== null) {
				y += el.offsetTop;
				el = el.offsetParent;
			}
			return y;
		}

		var timer = null;
		function onEvent() {
			if (timer) window.clearTimeout(timer);
			timer = window.setTimeout(step, 50);
		}
		
		function step() {
			var curPos = (document.body.scrollTop || document.documentElement.scrollTop) + window.innerHeight;
			nodes.forEach(function(el, i) {
				var pos = getY(el.node);
				if (curPos + 200 > pos) {
					el.fn(el.node);
					delete nodes[i];
				}
			});
		}
		
		window.addEventListener('scroll', onEvent, false);
		window.addEventListener('resize', onEvent, false);
		window.addEventListener('DOMContentLoaded', onEvent, false);
		return nodes;
	})();

	// Утилита для вычисления строки, подставляемой в параметр времени анимации
	var getSpeed = function(speed) {
		if (typeof speed == 'string' || typeof speed == 'number') {
			var speedPreset = {'slow': '1s', 'normal': '0.6s', 'fast': '0.3s'};
			return typeof speed == 'string' ? speedPreset[speed] || '0.3s' : (speed / 1000).toFixed(1) + 's';
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

	var fadeOut = function(node, speed, fn) {
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
			total:		root.querySelectorAll('tfoot td:not(:first-child)')
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
			if (document.getElementById('email').value != '') {
				form.html.value = form.querySelector('table').innerHTML.replace(/\s{2,}/g, '');
				// Сообщаем в метрику о нашей удаче :)
				try { yaCounter13794628.reachGoal('estimate_send', {area: area, wc: wc}); } catch(e) {}
				
				form.submit();
			}
		});

		// Простановка начальных значений в калькулятор
		nodes.wc.value = wc;
		nodes.area.value = area;
		document.getElementById(roomType).click();
	}

	// Album covers
	function AlbumView(root) {
		function getPicSide() {
			return Math.floor( parseInt(window.getComputedStyle(root).width) / 4 - 31 );
		}

		// Забираем код тэгов картинок из noindex, чтобы не прогружать их в стандартных размерах попусту с гугла
		// Сразу подставляем в них нужные размеры и после этого грузим...
		var stub = document.createElement('div');

		var picSide = getPicSide();
		var picIndex = [];
		var re = /([^/]+)\.jpg/g;
		var curAlbumShown = 0; // какие альбомы уже докрутили и можно показывать

		function processNoscripts() {
			var noscriptNodes = root.querySelectorAll('noscript');
			for (var i = 0, l = (noscriptNodes.length > curAlbumShown ? curAlbumShown : noscriptNodes.length), noscript; noscript = noscriptNodes[i], i < l; i++) {
				stub.innerHTML = noscript.textContent.replace(re, 's' + picSide + '-c/');

				var frag = document.createDocumentFragment();
				for (var i1 = 0, l1 = stub.children.length, node; i1 < l1; i1++) {
					node = stub.removeChild(stub.children[0]);
					frag.appendChild(node);
					picIndex.push({
						node:		node,
						baseUrl:	node.src.substring(0,83)
					});
				}

				noscript.parentNode.replaceChild(frag, noscript);
			}
		}

		var timer;
		var albums = root.querySelectorAll('.album');

		function resize(){
			var picSide = getPicSide();

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
			var picSide = getPicSide();
			for (var i = 0, l = (picIndex.length > curAlbumShown ? curAlbumShown : picIndex.length), pic; pic = picIndex[i], i < l; i++) {
				pic.node.src = pic.baseUrl + 's' + picSide + '-c/';
			}
		}

		// При изменении размеров экрана надо делать ресайз альбомов, но перегружать фотографии гугла только по таймауту
		window.addEventListener('resize', resize, false);
		resize();
		
		// для отложенной загрузки
		
		var defers = [];
		for (var i = 0, l = albums.length, album; album = albums[i], i < l; i += 4) {
			defers.push({
				node: album,
				fn: (function(i) {
					return function() {
						curAlbumShown = i;
						processNoscripts();
					}
				})(i+4)
			});
		}
		return defers;
	}

	// Переключалка ездящая
	function initTumbler()	{
		var sel = document.getElementById('selector');
		sel.addEventListener('click', function(e) {
			e.preventDefault();
			animate(sel, {
				transition: '',	// анимируется не сам этот элемент, поэтому смысла задавать transition нет
				from: e.target.className == 'left' ? 'left' : 'right',
				to: e.target.className == 'right' ? 'right' : 'left',
				callback: function(){if (e.target.href) document.location = e.target.href;}
			});
		}, false);
	}

	function initContactsMap() {
		var loc = {
			'millennium':	{
				zoom: 10,
				latlng: new google.maps.LatLng(55.789745, 37.039345),
				addr: 'Новорижское ш.,<br/>посёлок Millennium Park,<br/>владение 3041'
			},
			'madison':	{
				zoom: 10,
				latlng: new google.maps.LatLng(55.778093, 36.944855),
				addr: 'Новорижское ш.,<br/>посёлок Madison Park,<br/>владение 15'
			}
		};

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

		// Определяем текущий адрес по хэшу строке УРЛа
		var hash = document.location.hash = document.location.hash == '#madison' ? 'madison' : 'millennium';
		document.getElementById('selector').className = hash == 'millennium' ? 'left' : 'right';
		document.getElementById('addr').innerHTML = loc[hash].addr;

		var map = new google.maps.Map(document.getElementById("map_canvas"), {
			center: loc[hash].latlng,
			scrollwheel: false,
			zoom: loc[hash].zoom,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		});

		map.setOptions({
			styles: [{
				stylers: [
					{ saturation: -100 },
					{ lightness: 50 }
				]
			}]
		});

		loc['millennium'].marker = new google.maps.Marker({position: loc['millennium'].latlng, map: map, animation: google.maps.Animation.DROP, icon: icon, shadow: shadow, visible: hash=='millennium' });
		loc['madison'].marker = new google.maps.Marker({position: loc['madison'].latlng, map: map, animation: google.maps.Animation.DROP, icon: icon, shadow: shadow, visible: hash=='madison' });
		window.addEventListener('hashchange', panMap, false);

		function panMap() {
			loc[hash].marker.setVisible(false);
			hash = document.location.hash = document.location.hash == '#madison' ? 'madison' : 'millennium';
			map.panTo(loc[hash].latlng);
			map.setZoom(loc[hash].zoom);
			loc[hash].marker.setVisible(true);
			loc[hash].marker.setAnimation(google.maps.Animation.DROP);
			document.getElementById('addr').innerHTML = loc[hash].addr;
		}
	}

	function initProcessMap() {
		var mapOptions = {
			scrollwheel: false,
			center: new google.maps.LatLng(55.9, 37),
			zoom: 10,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		var styles = [{
			stylers: [
				{ saturation: -100 },
				{ lightness: 50 }
			]
		}];

		var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
		map.setOptions({styles: styles});

		var objects = document.querySelectorAll('#objects .object');
		var current;

		for (var i = 0, l = objects.length, obj; obj = objects[i], i < l; i++) {
			(function(){
				var gps = obj.getAttribute('data-gps').split(',');
				var myLatLng = new google.maps.LatLng(+gps[0],+gps[1]);

				var marker = new google.maps.Marker({
					position: myLatLng,
					map: map
				});

				var infowindow = new google.maps.InfoWindow({content: obj.parentNode.removeChild(obj)});

				google.maps.event.addListener(marker, 'click', function() {
					if (current) current.close();
					current = infowindow;
					infowindow.open(map,marker);
				});
			})();
		}
	}



////////////////////////
// Initializing pages //
////////////////////////

	function initGPlus() {
		var spinner = window.Spinner && new Spinner({ lines: 13, length: 7, width: 4, radius: 10, rotate: 0, color: '#000', speed: 1, trail: 60, shadow: false, hwaccel: true, className: 'spinner', zIndex: 2e9 });
		$('#GPlus').GPlusGallery(photos);
		Array.prototype.push.apply(deferredLoader, window.GPlusDefers);
		delete window.GPlusDefers;
	}

	document.addEventListener("DOMContentLoaded", function(event) {
		var page_name = document.body.id;
		// Убирание подсказки про "крутите дальше" по скроллу
		var onScroll = function() {
			fadeOut(document.getElementById('mouse'), 300);
			window.removeEventListener('scroll', onScroll);
		}

		switch (page_name) {
			case 'page-index':
				if (window.devicePixelRatio == 2) {
					document.getElementById('ingos').src='http://static.otdelkalux.ru/i/ingos-2x.png';
				}
				Array.prototype.push.apply(deferredLoader, AlbumView(document.getElementById('album_grid')));
				Calculator(document.getElementById('calculator'));

				initGPlus();
				$('#GPlus div').last().on('click', function(e){e.stopPropagation()}).find('img').wrap('<a href="/osmotr/"/>');
				
				// Убирание подсказки про "крутите дальше" по скроллу
				window.addEventListener('scroll', onScroll, false);
				deferredLoader.push({
					node: document.getElementById('youtube'),
					fn: function(node) {
						node.innerHTML = '<iframe width="420" height="315" src="//www.youtube.com/embed/7_wzJNQhK00?rel=0" frameborder="0" allowfullscreen></iframe>' + node.innerHTML;
					}
				});
				break;
			case 'page-contacts':
				initContactsMap();
				initTumbler();
				break;

			case 'page-price':
				var calc = document.getElementById('calculator');
				if (calc !== null) Calculator(calc);
				initTumbler();
				break;

			case 'page-portfolio':
				var album_grid = document.getElementById('album_grid');
				if (album_grid !== null) Array.prototype.push.apply(deferredLoader, AlbumView(document.getElementById('album_grid')));

				var selector_hint = document.getElementById('selector_hint');
				if (selector_hint !== null) window.setTimeout(function (){fadeIn(selector_hint);}, 2000);

				var selector = document.getElementById('selector');
				if (selector !== null) initTumbler();
				
				if (document.getElementById('GPlus')) {
					initGPlus();

					// оборачиваем картинки в уголочки
					var imgs = document.querySelectorAll('#backnext img');
					imgs.length && ['l','r'].forEach(function(side, i) {
					var img = imgs[i];
						img.style.backgroundImage = 'url("' + img.src + '")';
						img.src = 'http://static.otdelkalux.ru/i/arr-' + side + '.png';
					});
				}

				break;

			case 'page-process':
				initTumbler();
				window.addEventListener('scroll', onScroll, false);
				initProcessMap();
				break;
		}

		// Год внизу страницы
		var this_year = new Date().getFullYear();
		var el = document.querySelector('#year span');
		var established = parseInt(el.textContent);
		if (this_year > established) el.innerHTML = established + '—' + this_year;
		
		// 
		
		////////////// Подмена телефона
		var phoneNodes = document.querySelectorAll("p");
		for (var i = 0, l = phoneNodes.length; i < l; i++) {
			var html = phoneNodes[i].innerHTML;
			if (html.indexOf('99-88-347')) {
				phoneNodes[i].innerHTML = phoneNodes[i].innerHTML.replace(/\(?495\)? 99-88-347/, "(909) 151-31-56");
			}
		}

		// Счетчики грузим в последнюю очередь
		(function () {
			// инициализируем говносчетчики и шарилку только если юзер крутит ниже, чтобы все быстрее прогружалось
			deferredLoader.push({
				node: document.querySelector('.yashare-auto-init'),
				fn: function() {
					var d = document, w = window, n = navigator;
					var scrTpl = d.createElement('script'); scrTpl.type = 'text/javascript'; scrTpl.async = true;
					var pos = document.getElementsByTagName('script')[0];
					
					/* Mail.ru */
					var r, s;
					(new Image).src='http://db.ce.b2.a2.top.mail.ru/counter?id=2288412;js=13'+((r=d.referrer)?';r='+escape(r):'')+((s=w.screen)?';s='+s.width+'*'+s.height:'')+';_='+Math.random();

					/* Liveinternet */
					(new Image).src = "//counter.yadro.ru/hit?r" + escape(r)+((typeof(s)=="undefined")?"" : ";s"+s.width+"*"+s.height+"*"+(s.colorDepth?s.colorDepth:s.pixelDepth))+";u"+document.URL+";"+Math.random();

					/* Rambler*/
					var scr = scrTpl.cloneNode(true); scr.src = '//counter.rambler.ru/top100.jcn?2890004'; pos.parentNode.insertBefore(scr, pos);

					/* Яндекс шарилка */
					scr = scrTpl.cloneNode(true); scr.src = '//yandex.st/share/share.js'; pos.parentNode.insertBefore(scr, pos);
				}
			});
			deferredLoader.push({
				node: document.getElementById('badge_holder'),
				fn: function() {
					window.___gcfg = {lang: 'ru'};
					var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
					po.src = 'https://apis.google.com/js/plusone.js';
					var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
				}
			});
		})();
	});
})();

/* Google Analytics: если оставить в блоке выше, то не пашет... */
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-17254104-1']);
_gaq.push(['_trackPageview']);

(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

/* Яндекс Метрика */
(function (d, w, c) {
if (document.location.pathname == '/') return;

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