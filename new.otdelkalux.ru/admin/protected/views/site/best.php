<!DOCTYPE html>
<!-- Разработка сайта: Михаил Шестаков (mike.shestakov@gmail.com) -->
<html lang="ru" itemscope itemtype="http://schema.org/GeneralContractor">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=Edge, chrome=1"/>
<meta name="viewport" content="width=1000"/>
<meta name="keywords" content=""/>
<meta name="description" content=""/>
<meta itemprop="image" content="http://farm8.staticflickr.com/7079/7064821993_68d9fa0357_b.jpg">
<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
<title>Галерея лучших работ</title>

<link rel="stylesheet" type="text/css" href="http://static.otdelkalux.ru/css/common.css"/>
<!--[if lte IE 8]><link rel="stylesheet" type="text/css" href="http://static.otdelkalux.ru/css/ie8.css"/><![endif]-->
<link rel="stylesheet" type="text/css" href="http://static.otdelkalux.ru/gplus/gplus.css"/>
<!--[if lte IE 8]><link rel="stylesheet" type="text/css" href="http://static.otdelkalux.ru/gplus/gplus.ie8.css"/><![endif]-->
<link rel="shortcut icon" href="http://static.otdelkalux.ru/favicon.ico" type="image/x-icon" />
<script type="text/javascript" src="http://yandex.st/jquery/1.8.2/jquery.min.js"></script>
<script type="text/javascript" src="http://static.otdelkalux.ru/gplus/jquery.gplus.js"></script>
<script type="text/javascript" src="/js/main.js"></script>
<script type="text/javascript">var _gaq = _gaq || [];_gaq.push(['_setAccount', 'UA-17254104-1']);_gaq.push(['_trackPageview']);(function() {var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;ga.src = 'http://www.google-analytics.com/ga.js';var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);})();</script>
<script type="text/javascript" src="http://userapi.com/js/api/openapi.js?49"></script>
<script type="text/javascript">VK.init({apiId: 2956871, onlyWidgets: true});</script>
<!--[if lt IE 9]><script type="text/javascript" src="https://raw.github.com/aFarkas/html5shiv/master/dist/html5shiv.js"></script><![endif]-->
</head>
<body id="page-portfolio" itemscope itemtype="http://schema.org/SingleFamilyResidence">
<!-- Yandex.Metrika counter --><script type="text/javascript">(function (d, w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter13794628 = new Ya.Metrika({id:13794628, enableAll: true, webvisor:true}); } catch(e) { } }); var n = d.getElementsByTagName("script")[0], s = d.createElement("script"), f = function () { n.parentNode.insertBefore(s, n); }; s.type = "text/javascript"; s.async = true; s.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//mc.yandex.ru/metrika/watch.js"; if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f); } else { f(); } })(document, window, "yandex_metrika_callbacks");</script><noscript><div><img src="//mc.yandex.ru/watch/13794628" style="position:absolute; left:-9999px;" alt="" /></div></noscript><!-- /Yandex.Metrika counter -->
<!--[if lt IE 8]><p style="text-align: center; margin: 100px; font: normal 60px Arial; color: #f00">Сайт не предназначен для просмотра в безнадежно устаревших браузерах Internet Explorer 6 и 7.<br/><a href="http://browser-update.org/ru/update.html">Обновите ваш браузер</a> или посмотрите старую версию нашего сайта: <a href="http://old.otdelkalux.ru">old.otdelkalux.ru</a></p><![endif]-->
<section>
<div class="column">
<div class="td" id="nav">
<a href="/" id="logo"><!--[if lte IE 8]><img src="http://static.otdelkalux.ru/i/logo.png" /><![endif]--><!--[if gte IE 9]><img src="http://static.otdelkalux.ru/i/logo.svg" /><![endif]--><!--[if !IE]> --><img src="http://static.otdelkalux.ru/i/logo.svg" alt=""/><!-- <![endif]--><span>Артель строительных бригад Сергея Петунина</span></a>
<nav>
<a class="index" href="/">Главная</a>
<a class="portfolio" href="/portfolio/">Фото</a>
<a class="portfolio" href="/portfolio/process/">Осмотр объектов</a>
<a class="price" href="/price/calculator.html">Цены</a>
<a class="docs" href="/docs.html">Документы</a>
<a class="warranty" href="/warranty.html">Гарантия</a>
<a class="articles" href="/articles/">Статьи</a>
<a class="contacts" href="/contacts.html">Контакты</a>
</nav>
</div>
</div>
</section>
<section>
<div class="column">
<div class="center">
<div class="back"><a href="/portfolio/">◄ Все объекты</a></div>
<h1 itemprop="name">Фотографии лучших работ</h1>
</div>
<div id="GPlus"></div>
<script type="text/javascript" src="http://fgnass.github.com/spin.js/dist/spin.min.js"></script>
<script type="text/javascript">
var photos =<?=preg_replace_callback(
'/\\\u([0-9a-fA-F]{4})/',
create_function('$match', 'return mb_convert_encoding("&#" . intval($match[1], 16) . ";", "UTF-8", "HTML-ENTITIES");'),
json_encode($images)
)?>;
var spinner = new Spinner({ lines: 13, length: 7, width: 4, radius: 10, rotate: 0, color: '#000', speed: 1, trail: 60, shadow: false, hwaccel: true, className: 'spinner', zIndex: 2e9 });
var fs = $('#GPlus').GPlusGallery(photos, {'spinner': spinner});
</script>
</div>
<div class="center" style="margin: 100px 0 40px 0">
<p><!--[if lte IE 8]><img src="http://static.otdelkalux.ru/i/alert.png" /><![endif]--><!--[if !IE]>--><img src="http://static.otdelkalux.ru/i/alert.svg" alt=""/><!--<![endif]--></p>
<p class="h1">Мы показываем объекты!</p>
<p style="margin: 20px auto 50px auto; width: 500px; line-height: 1.4em; font-size: 14px;">В интернете каждый может украсть фото у конкурента и разместить их у себя на сайте, как свои собственные. Поэтому единственный способ убедиться в качестве работы потенциального подрядчика — лично посмотреть его объекты! Только так, и никак иначе, вы сможете получить представление о реальном качестве работы. У нас всегда несколько объектов находятся на завершающем этапе ремонта, и их можно посмотреть лично.</p>
<div class="button red"><a href="/portfolio/process/">Согласовать осмотр</a></div>
</div>
</section>
<section id="footer">
<footer>
<p class="title">Артель строительных бригад Сергея Петунина</p>
<div class="info">
<div>
<p>Полный комплекс работ по элитному ремонту и отделке коттеджей и загородных домов под ключ</p>
</div>
<div>
<p><b>Офис в Millennium Park</b></p>
<p>Московская область, Новорижское ш., посёлок Millennium Park, вл. 3041</p>
<p><a href="http://maps.yandex.ru/-/CVuAJ6O4">На карте</a></p>
<br/>
<p><b>Офис в Madison Park</b></p>
<p>Московская область, Новорижское ш., посёлок Madison Park, вл. 15</p>
<p><a href="http://maps.yandex.ru/-/CVEO74NH">На карте</a></p>
</div>
<div>
<p><b>Связаться со мной</b></p>
<p>+7 (495) 998-83-47</p>
<p><a href="mailto:hello@otdelkalux.ru">hello@otdelkalux.ru</a></p>
<br/>
<p><b>Online</b></p>
<p class="social flickr"><a href="http://www.flickr.com/photos/otdelkalux/sets">Портфолио на Flickr</a></p>
<p class="social gplus"><a href="https://plus.google.com/104094916837036848285/">Сергей Петунин на Google+</a></p>
<p><a href="http://www.otdelkalux.ru/">www.OtdelkaLux.ru</a></p>
</div>
<div class="qr"><img src="http://static.otdelkalux.ru/i/qr.png" alt="Контактная информация на QR коде"/></div>
</div>
<div id="year">© <span>2006</span> «Отделка Люкс» — <a href="/">элитный ремонт коттеджей</a>.</div>
</footer>
</section>
</body>
</html>