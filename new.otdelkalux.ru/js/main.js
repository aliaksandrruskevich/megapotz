if (navigator.appName == 'Microsoft Internet Explorer') {
	var ua = navigator.userAgent;
	var re = new RegExp("MSIE (.+) ");
	if (re.exec(ua) != null) var ver = parseFloat(RegExp.$1);
	if (ver == 8) document.location = 'http://ie.otdelkalux.ru';
	else if (ver < 8) document.location = 'http://old.otdelkalux.ru';
}

(function () {
	"use strict";
	var isMobile = window.innerWidth <= 960;

	// Работа с  CSS3 Transitions
	// http://www.w3.org/TR/css3-transitions/
	var animate = (function () {		// cfg = {transition:'', from: {}, to: {}, callback:fn}
		var transitionSupported = 'transition' in document.createElement('div').style;
		var animatableProps = {'backgroundColor': 1, 'backgroundPosition': 1, 'borderBottomColor': 1, 'borderBottomWidth': 1, 'borderLeftColor': 1, 'borderLeftWidth': 1, 'borderRightColor': 1, 'borderRightWidth': 1, 'borderSpacing': 1, 'borderTopColor': 1, 'borderTopWidth': 1, 'bottom': 1, 'clip': 1, 'color': 1, 'fontSize': 1, 'fontWeight': 1, 'height': 1, 'left': 1, 'letterSpacing': 1, 'lineHeight': 1, 'marginBottom': 1, 'marginLeft': 1, 'marginRight': 1, 'marginTop': 1, 'maxHeight': 1, 'maxWidth': 1, 'minHeight': 1, 'minWidth': 1, 'opacity': 1, 'outlineColor': 1, 'outlineWidth': 1, 'paddingBottom': 1, 'paddingLeft': 1, 'paddingRight': 1, 'paddingTop': 1, 'right': 1, 'textIndent': 1, 'textShadow': 1, 'top': 1, 'verticalAlign': 1, 'visibility': 1, 'width': 1, 'wordSpacing': 1, 'zIndex': 1};

		// Моментальная анимация выставляет сначала стили до, потом стили после на случай, если в стилях "до" были какие-то непересекающиеся с "после" стили
		var instantTransition = function (node, cfg) {
			Object.keys(cfg.from).forEach(function (prop) {var value = cfg.from[prop];
				node.style[prop] = value;
			});
			Object.keys(cfg.to).forEach(function (prop) {var value = cfg.to[prop];
				node.style[prop] = value;
			});
			cfg.callback && cfg.callback();
		};

		var setRules = function (node, css, animatable) {		// если animatable, то ставит только анимируемые, если false - то только не анимируемые, если не передать - то все
			if (typeof css == 'object') {
				Object.keys(css).forEach(function (prop) {var value = css[prop];
					if ((animatable && animatableProps[prop]) || (!animatable && !animatableProps[prop]) || animatable === undefined) node.style[prop] = value;
				});
			} else node.className = css;
		};

		// Если браузер не поддерживает анимацию, то просто ставим конечные стили и вызываем колбэк
		if (!transitionSupported) {
			return instantTransition;
		} else return function (node, cfg) {
			// Моментальная анимация теоретически возможна, если from и to - хэши стилей. Если передали класс, то пропускать нельзя никак
			var skipAnimation = typeof cfg.from == 'object' && typeof cfg.to == 'object';

			// Анимацию можно пропустить если в итоговых стилях нет анимируемых свойств, ИЛИ если юзер идиот и он в from и to указал совпадающие значения у анимируемых свойств
			skipAnimation && Object.keys(cfg.to).forEach(function (prop) {var value = cfg.to[prop];
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
				typeof cfg.to == 'object' && Object.keys(cfg.to).forEach(function (prop) {var value = cfg.to[prop];
					if (!animatableProps[prop]) hasNonAnimatable = true;
				});

				if (cfg.callback || hasNonAnimatable) {
					var ontransitionend = function () {
						setRules(node, cfg.to, false);
						cfg.callback && cfg.callback();
						node.removeEventListener('transitionend', ontransitionend);
					};
					node.addEventListener('transitionend', ontransitionend, false);
				}
			}
		};
	})();

	var deferredLoader = (function () {
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
			nodes.forEach(function (el, i) {
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
	var getSpeed = function (speed) {
		if (typeof speed == 'string' || typeof speed == 'number') {
			var speedPreset = {'slow': '1s', 'normal': '0.6s', 'fast': '0.3s'};
			return typeof speed == 'string' ? speedPreset[speed] || '0.3s' : (speed / 1000).toFixed(1) + 's';
		}
		return '0.3s';
	};

	var fadeIn = function (node, speed, fn) {	// slow, normal, fast
		animate(node, {
			transition: 'opacity linear ' + getSpeed(speed),
			from: {opacity: 0, display: 'block'},
			to: {opacity: 1},
			callback: fn
		});
	};

	var fadeOut = function (node, speed, fn) {
		animate(node, {
			transition: 'opacity linear ' + getSpeed(speed),
			from: {},
			to: {opacity: 0, display: 'none'},
			callback: fn
		});
	};

	// КАЛЬКУЛЯТОР
	function Calculator(root) {
		// Инициализация
		var form = root.querySelector('#calc_form');
		var nodes = {
			eastimate: root.querySelectorAll('tbody td:not(:first-child)'),	// ячейки, куда информацию выводить
			total: root.querySelectorAll('tfoot td:not(:first-child)')		// для итогов
		};
		var area = 400, level = 'standard';	// Дефолтные значения, которые могут быть перезатерты куками или Островами

		// Подстановка изначальных данных для подсчета. Из Яндекс Островов более приоритетно, чем из cookies.
		var pairs = document.cookie.split('; ').concat(document.location.search.substring(1).split('&'));
		for (var i = 0, l = pairs.length; i < l; i++) {
			var pair = pairs[i].split('=');
			if (pair[0] == 'area') area = +pair[1];
			if (pair[0] == 'level' && pair[1].match(/^(?:standard|business)$/)) level = pair[1];
		}

		// Показываем подсказку
		if (!isMobile) {
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
			};
			root.addEventListener('mouseover', showHint, false);
		}

		// Форматированный вывод сумм
		var formatCurrency = function (num) {
			return num.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
		};

		// Калькуляция сметы и вывод
		var recalculate = function () {
			// Забираем значения из инпутов
			area = +form.area.value;
			level = form.level[0].checked ? form.level[0].value : form.level[1].value;

			// Пишем их в куки
			var date = new Date('2025').toUTCString();
			document.cookie = 'area=' + area + ';path=/;expires=' + date;
			document.cookie = 'level=' + level + ';path=/;expires=' + date;

			var results = [];
			var totalWork = 0, totalMaterials = 0;

			results[1] = (7000 - (area - 200) * 2.5) * area;	// материал отделка под ключ
			results[3] = 50000 + area * 300;					// материал электрика под ключ
			results[4] = 30000 + area * 250;					// работа водоснабжение =30000+250*I$1
			results[5] = 30000 + area * 250;					// материал водоснабжение =30000+250*I$1
			results[6] = 30000 + area * 250;					// работа канализация =30000+250*I$1
			results[7] = 10000 + area * 50;						// материал канализация =10000+50*I$1
			results[8] = (600 - (area - 200) / 10 ) * area;		// работа отопление =(600-(I$1-200)/10)*I$1
			results[9] = (1000 - (area - 200) / 2.5 ) * area;	// материал отопление =(1000-(I$1-200)/2,5)*I$1
			results[10] = 50000 + area * 200; 					// теплый пол монтаж =50000+200*I$1
			results[11] = 50000 + area * 300; 					// =50000+300*I$1 теплый пол материал
			results[12] = area <= 300 ? (80000 + (area - 200) * 100) : (130000 + (area - 300) * 300); // монтаж котельная
			results[13] = area <= 300 ? (200000 + (area - 200) * 200) : (300000 + (area - 300) * 600); // материал котельная
			

			// STANDARD
			if (level == 'standard') {
				results[0] = (9200 - (area - 200) * 2) * area;	// !!!работа отделка под ключ
				results[2] = (1000 - (area - 200) / 4) * area;	// !!!работа электрика под ключ
			}

			// BUSINESS
			if (level == 'business') {
				results[0] = (12200 - (area - 200) * 2) * area;	// работа отделка под ключ
				results[2] = (1200 - (area - 200) / 3.333333) * area;	// работа электрика под ключ
				results[9] *= 1.88 // Arbonia
			}

			// Проставляем значения сметы в таблицу
			for (var i = 0, l = nodes.eastimate.length, node; node = nodes.eastimate[i], i < l; i++) {
				results[i] = parseInt(Math.round(results[i] / 1000) * 1000);
				if (i % 2 == 0) totalWork += results[i];
				else totalMaterials += results[i];
				node.textContent = formatCurrency(results[i]);
			}

			// Вычисляем итог
			nodes.total[0].textContent = formatCurrency(totalWork);
			nodes.total[1].textContent = formatCurrency(totalMaterials);
		};

		// Привязываем события к кнопке Пересчитать
		root.addEventListener('change', recalculate, false);
		form.reset();	// Сбрасываем форму, потому что Firefox кэширует состояние радиокнопок

		// Перед отправкой форму необходимо в hidden поле записать innerHTML калькуляции
		form.addEventListener('submit', function (e) {
			e.preventDefault();
			if (document.getElementById('email').value != '') {
				form.html.value = form.querySelector('table').innerHTML.replace(/\s{2,}/g, '');
				// Сообщаем в метрику о нашей удаче :)
				try {
					yaCounter13794628.reachGoal('estimate_send', {area: area});
				} catch (e) {
				}
				form.submit();
			}
		});

		// Простановка начальных значений в калькулятор
		form.area.value = area;
		form.level.value = level;

		recalculate();
	}

	// Album covers
	function AlbumView(root) {
		function getPicSide() {
			return isMobile ? 50 : Math.floor(parseInt(window.getComputedStyle(root).width) / 4 - 31);
		}

		// Забираем код тэгов картинок из noindex, чтобы не прогружать их в стандартных размерах попусту с гугла
		// Сразу подставляем в них нужные размеры и после этого грузим...
		var stub = document.createElement('div');

		var picSide = getPicSide();
		var picIndex = [];
		var re = /([^/]+)\.jpg/ig;
		var curAlbumShown = 0; // какие альбомы уже докрутили и можно показывать

		function processNoscripts() {
			var noscriptNodes = root.querySelectorAll('noscript');
			for (var i = 0, l = (noscriptNodes.length > curAlbumShown ? curAlbumShown : noscriptNodes.length), noscript; noscript = noscriptNodes[i], i < l; i++) {
				stub.innerHTML = noscript.textContent.replace(re, 's' + picSide + '-c/img.jpg');

				var frag = document.createDocumentFragment();

				if (isMobile) {
					frag.appendChild(stub.lastElementChild);
				}
				else {
					for (var i1 = 0, l1 = stub.children.length, node; i1 < l1; i1++) {
						node = stub.removeChild(stub.children[0]);
						frag.appendChild(node);
						picIndex.push({
							node: node,
							baseUrl: node.src.split('/').splice(0, 7, '/').join('/')
						});
					}
				}

				noscript.parentNode.replaceChild(frag, noscript);
			}
		}

		var timer;
		var albums = root.querySelectorAll('.album');

		function resize() {
			if (isMobile) return;
			var picSide = getPicSide();

			for (var i = 0, l = albums.length, album; album = albums[i], i < l; i++) {
				album.style.width = picSide + 25 + 'px';
				album.style.height = picSide + 60 + 'px';
			}

			var pic;
			for (i = 0, l = picIndex.length; pic = picIndex[i], i < l; i++) {
				pic.node.style.width = picSide + 'px';
				pic.node.style.height = picSide + 'px';
			}

			if (timer) window.clearTimeout(timer);
			timer = window.setTimeout(load, 1000);
		}

		function load() {
			timer = undefined;
			var picSide = getPicSide();
			for (var i = 0, l = (picIndex.length > curAlbumShown ? curAlbumShown : picIndex.length), pic; pic = picIndex[i], i < l; i++) {
				pic.node.src = pic.baseUrl + '/s' + picSide + '-c/img.jpg';
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
				fn: (function (i) {
					return function () {
						curAlbumShown = i;
						processNoscripts();
					}
				})(i + 4)
			});
		}
		return defers;
	}

	// Переключалка ездящая
	function initTumbler() {
		var sel = document.getElementById('selector');
		if (sel) sel.addEventListener('click', function (e) {
			e.preventDefault();
			animate(sel, {
				transition: '',	// анимируется не сам этот элемент, поэтому смысла задавать transition нет
				from: e.target.className == 'left' ? 'left' : 'right',
				to: e.target.className == 'right' ? 'right' : 'left',
				callback: function () {
					if (e.target.href) document.location = e.target.href;
				}
			});
		}, false);
	}

	function initContactsMap() {
		var loc = {
			'millennium': {
				zoom: 10,
				latlng: new google.maps.LatLng(55.778846, 37.031636),
				addr: 'Новорижское ш.,<br/>посёлок Millennium Park,<br/>владение 7-024'
			}
		};

		// Объект маркера
		var icon = new google.maps.MarkerImage('/i/marker.png',
			new google.maps.Size(68, 96),
			new google.maps.Point(0, 0),
			new google.maps.Point(34, 0)
		);

		//Тень маркера
		var shadow = new google.maps.MarkerImage('/i/marker-shadow.png',
			new google.maps.Size(146, 96),
			new google.maps.Point(0, 0),
			new google.maps.Point(34, 0)
		);

		// Определяем текущий адрес по хэшу строке УРЛа
		var hash = document.location.hash = document.location.hash == '#madison' ? 'madison' : 'millennium';
		//document.getElementById('selector').className = hash == 'millennium' ? 'left' : 'right';
		document.getElementById('addr').innerHTML = loc[hash].addr;

		var map = new google.maps.Map(document.getElementById("map_canvas"), {
			center: loc[hash].latlng,
			scrollwheel: false,
			draggable: false,
			zoom: loc[hash].zoom,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		});

		map.setOptions({
			styles: [
				{
					stylers: [
						{ saturation: -100 },
						{ lightness: 50 }
					]
				}
			]
		});

		loc['millennium'].marker = new google.maps.Marker({position: loc['millennium'].latlng, map: map, animation: google.maps.Animation.DROP, icon: icon, shadow: shadow, visible: hash == 'millennium' });
		loc['madison'].marker = new google.maps.Marker({position: loc['madison'].latlng, map: map, animation: google.maps.Animation.DROP, icon: icon, shadow: shadow, visible: hash == 'madison' });
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
			draggable: false,
			center: new google.maps.LatLng(55.8, 37),
			zoom: 11,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		var styles = [
			{
				stylers: [
					{ saturation: -100 },
					{ lightness: 50 }
				]
			}
		];

		var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
		map.setOptions({styles: styles});

		var objects = document.querySelectorAll('#process .object');
		var current;

		for (var i = 0, l = objects.length, obj; obj = objects[i], i < l; i++) {
			(function () {
				var gps = obj.getAttribute('data-gps').split(',');
				var myLatLng = new google.maps.LatLng(+gps[0], +gps[1]);

				var marker = new google.maps.Marker({
					position: myLatLng,
					map: map
				});

				var infowindow = new google.maps.InfoWindow({content: obj.cloneNode(true)});

				google.maps.event.addListener(marker, 'click', function () {
					if (current) current.close();
					current = infowindow;
					infowindow.open(map, marker);
				});
			})();
		}
	}


////////////////////////
// Initializing pages //
////////////////////////

	function initGPlus() {
		var params = {
			thumbnailWidth:'auto',
			thumbnailHeight:300,
			thumbnailGutterWidth: 8,
			thumbnailGutterHeight: 8,
			thumbnailBorderHorizontal: 0,
			thumbnailBorderVertical: 0,
			viewerToolbar: {
				display: false,
			},
			photoSorting: location.pathname.search('osmotr') > 0 ? 'reversed' : 'standard',
			locationHash: false,
			kind: 'google2',
			google2URL: 'https://www.otdelkalux.ru/nanogp/dist/nanogp.php',
			userID: '104094916837036848285',
			album: window.albumID,	// hard code in HTML
			thumbnailL1Label:{display:false},
		};

		if (window.nanoParams) {jQuery.extend(params, window.nanoParams);}	// hard code in HTML
		jQuery("#GPlus").nanogallery2(params);
	}

	document.addEventListener("DOMContentLoaded", function () {
		var page_name = document.body.id;
		// Убирание подсказки про "крутите дальше" по скроллу
		var onScroll = function () {
			var el = document.getElementById('mouse');
			if (el) {
				fadeOut(document.getElementById('mouse'), 300);
			}
			window.removeEventListener('scroll', onScroll);
		};
		// Убирание подсказки про "крутите дальше" по скроллу
		window.addEventListener('scroll', onScroll, false);

		var calc = document.getElementById('calculator');
		if (calc !== null) Calculator(calc);

		if (document.getElementById('GPlus')) initGPlus();
		
		var album_grid = document.getElementById('album_grid');
		if (album_grid !== null) Array.prototype.push.apply(deferredLoader, AlbumView(document.getElementById('album_grid')));

		switch (page_name) {
			case 'page-index':
				/*if (window.devicePixelRatio == 2) {
				 document.getElementById('ingos').src='/i/ingos-2x.png';
				 }*/
				 
				var div = document.getElementById('bg');
				var bg = ['https://lh4.googleusercontent.com/-CjgEskSG1Uk/VIgXFRs2X6I/AAAAAAAAALk/nvhLC17_I6w/',
						'https://lh3.googleusercontent.com/-yPrcH2aRQKk/VIgXF6Z0zhI/AAAAAAAAALs/2U0eAKvs2ys/',
						'https://lh3.googleusercontent.com/-MyNokKanXbM/VIgXHGqbQUI/AAAAAAAAAL0/3riAHdYIhIc/',
						'https://lh3.googleusercontent.com/-5-eF3hpPBFE/VIgXIPwZuaI/AAAAAAAAAMA/EftzUi1fXoo/',
						'https://lh3.googleusercontent.com/-7ddEmPvzb-E/VIgXIm8uDkI/AAAAAAAAAME/RzcVMum5ess/',
						'https://lh5.googleusercontent.com/-63HGTs67txs/VIgXJdWq74I/AAAAAAAAAMM/0IVw9luJxME/',
						'https://lh6.googleusercontent.com/-YtsZB50oGTU/VIgXKZZPpAI/AAAAAAAAAMY/_9hnSu501aM/',
						'https://lh3.googleusercontent.com/-k-SR9ObLf-c/VIgXK1i3rzI/AAAAAAAAAMg/qWGdh7x3wjE/',
						'https://lh5.googleusercontent.com/-TZj2ezI20b4/VIgXLZgM2pI/AAAAAAAAAMk/c0fDAVH1GtI/',
						'https://lh3.googleusercontent.com/-kgczYZoQTHc/VIgXGNw6e2I/AAAAAAAAALo/dn0fQa8QA_Q/'];
				
				if (!isMobile) {
					var counter = 0;
					var changeBG = function () {
						var w = div.offsetWidth, h = div.offsetHeight;
						if (bg[counter]) {
							div.style.backgroundImage = 'url(' + bg[counter] + 'w' + w + '-h' + h + '-n/cover.jpg)';
							var img = new Image();
							img.src = bg[counter] + 'w' + w + '-h' + h + '-n/cover.jpg';
							window.setTimeout(changeBG, 5000);
							counter++;
						} else {
							counter = 0;
							changeBG();
						}
					};
					changeBG();
				}
				
				if (document.querySelector('#map_canvas') && !isMobile) initProcessMap();
				
				deferredLoader.push({
					node: document.getElementById('youtube'),
					fn: function (node) {
						node.innerHTML = '<iframe width="420" height="315" src="//www.youtube.com/embed/7_wzJNQhK00?rel=0" frameborder="0" allowfullscreen></iframe>' + node.innerHTML;
					}
				});
				break;
			case 'page-contacts':
				initContactsMap();
				initTumbler();
				break;

			case 'page-price':

				initTumbler();
				break;

			case 'page-portfolio':
				var selector_hint = document.getElementById('selector_hint');
				if (selector_hint !== null) window.setTimeout(function () {
					fadeIn(selector_hint);
				}, 2000);

				var selector = document.getElementById('selector');
				if (selector !== null) initTumbler();

				if (document.getElementById('GPlus')) {
					// оборачиваем картинки в уголочки
					var imgs = document.querySelectorAll('#backnext img');
					imgs.length && ['l', 'r'].forEach(function (side, i) {
						var img = imgs[i];
						img.style.backgroundImage = 'url("' + img.src + '")';
						img.src = '/i/arr-' + side + '.png';
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
/*
		var phoneNodes = document.getElementsByTagName('p');
		for (var i = 0, l = phoneNodes.length; i < l; i++) {
			var html = phoneNodes[i].innerHTML;
			if (html.indexOf('99-88-347')) {
				phoneNodes[i].innerHTML = phoneNodes[i].innerHTML.replace(/\(?495\)? 99-88-347/, "(909) 151-31-56");
			}
		}*/
		/*
		if (document.cookie.indexOf('close') == -1) {
			document.body.innerHTML += '<div id="work" style="position: fixed; top: 40px;left: 40%;font-size: 15px;margin: 0 auto;background: #fff;box-shadow: 0px 0px 14px #666;padding: 10px;z-index: 100;cursor: pointer;">Мы работаем в праздники! Звоните!</div>';
			var bubble = document.getElementById('work');
			bubble.onclick=function () {
				bubble.parentNode.removeChild(bubble);
				document.cookie = 'close=1';
			}	
		}
		*/

		// Счетчики грузим в последнюю очередь
		(function () {
			// инициализируем говносчетчики и шарилку только если юзер крутит ниже, чтобы все быстрее прогружалось
			deferredLoader.push({
				node: document.querySelector('.yashare-auto-init'),
				fn: function () {
					var d = document, w = window, n = navigator;
					var scrTpl = d.createElement('script');
					scrTpl.type = 'text/javascript';
					scrTpl.async = true;
					var pos = document.getElementsByTagName('script')[0];

					/* Яндекс шарилка */
					var scr = scrTpl.cloneNode(true);
					scr.src = '//yandex.st/share/share.js';
					pos.parentNode.insertBefore(scr, pos);
				}
			});
		})();
		
		window.onloadCallback = function() {
			grecaptcha.render(document.querySelector('.g-recaptcha'), {"sitekey": "6LevMR4TAAAAAIaY8TYcwXaSbrc5ig4d_Og2P6wL"});
		};
	});
})();