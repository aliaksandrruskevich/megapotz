<!DOCTYPE html>
<!-- Разработка сайта: Михаил Шестаков (mike.shestakov@gmail.com) -->
<html lang="ru">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=Edge, chrome=1"/>
<meta name="viewport" content="width=1000"/>
<meta name="keywords" content="осмотр объектов"/>
<meta name="description" content="Вы можете лично приехать и осмотреть любой из объектов, на котором мы ведем работы. Все текущие проекты отмечены на карте с указанием текущего состояния ремонта."/>
<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
<title>Осмотр объектов</title>
<link rel="stylesheet" type="text/css" href="http://static.otdelkalux.ru/css/common.css"/>
<!--[if lte IE 8]><link rel="stylesheet" type="text/css" href="http://static.otdelkalux.ru/css/ie8.css"/><![endif]-->
<link rel="shortcut icon" href="http://static.otdelkalux.ru/favicon.ico" type="image/x-icon" />
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<script type="text/javascript" src="/js/main.js"></script>
<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>

<script type="text/javascript">var _gaq = _gaq || [];_gaq.push(['_setAccount', 'UA-17254104-1']);_gaq.push(['_trackPageview']);(function() {var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;ga.src = 'http://www.google-analytics.com/ga.js';var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);})();</script>
<script type="text/javascript">
var places=<?=$map?>;
function init_maps() {
var mapOptions = {
center: new google.maps.LatLng(56, 37.6),
zoom: 9,
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
}
}
</script>
<!--[if lt IE 9]>
<script type="text/javascript" src="https://raw.github.com/aFarkas/html5shiv/master/dist/html5shiv.js"></script>
<![endif]-->
</head>
<body id="page-process">
<!--[if lt IE 8]>
<p style="text-align: center; margin: 100px; font: normal 60px Arial; color: #f00">Сайт не предназначен для просмотра в безнадежно устаревших браузерах Internet Explorer 6 и 7.<br/><a href="http://browser-update.org/ru/update.html">Обновите ваш браузер</a> или посмотрите старую версию нашего сайта: <a href="http://old.otdelkalux.ru">old.otdelkalux.ru</a></p>
<![endif]-->
<section>
<div class="column">
<div class="td" id="nav">
<a href="/" id="logo"><!--[if lte IE 8]><img src="http://static.otdelkalux.ru/i/logo.png" /><![endif]--><!--[if gte IE 9]><img src="http://static.otdelkalux.ru/i/logo.svg" /><![endif]--><!--[if !IE]> --><img src="http://static.otdelkalux.ru/i/logo.svg" alt=""/><!-- <![endif]--><span>Артель строительных бригад Сергея Петунина</span></a>
<nav>
<a class="index" href="/">Главная</a>
<a class="portfolio" href="/portfolio/">Фото</a>
<a class="process" href="/portfolio/process/">Осмотр объектов</a>
<a class="price" href="/price/calculator.html">Цены</a>
<a class="docs" href="/docs.html">Документы</a>
<a class="warranty" href="/warranty.html">Гарантия</a>
<a class="articles" href="/articles/">Статьи</a>
<a class="contacts" href="/contacts.html">Контакты</a>
</nav>
</div>
</div>
</section>
<h1>Осмотр объектов</h1>
<p class="small">Вы можете лично приехать и осмотреть любой из объектов, на котором мы ведем работы. Все текущие проекты отмечены на карте с указанием текущего состояния ремонта.</p>
<div id="selector" class="right">
<div class="current"></div>
<span class="left"><a href="/portfolio/">Завершенные <sup><?=$count['finished']?></sup></a></span>
<span class="right"><a href="/portfolio/process/">В работе <sup><?=$count['notfinished']?></sup></a></span>
<div id="button"></div>
</div>
<div class="center">
<p class="h1">Вы можете лично осмотреть любой из объектов:</p>
<p><?=$date?></p>
</div>
<section id="map">
<div id="map_canvas"></div>
<div id="text">
<p class="redline" style="margin-top: 400px"><span>Вы можете лично посмотреть</span></p>
<p class="redline"><span>любой из этих объектов!</span></p>
</div>
</section>
<div class="yline"><span id="showhide">Скрыть карту</span></div>
<section id="objects">
<div class="col470">
<p class="title">На этих объектах сейчас ведётся чистовая отделка:</p>
<?foreach($objects as $obj) { 
if($obj->type==2) { ?>
<div class="object">

<p class="h"><?=$obj->title?></p>
<?if(!empty($obj->image)) { ?>
<a href="<?=$obj->link?>" target="_blank"><img src="<?=$obj->image?>" alt="<?=$obj->title?>"/></a>
<?}?>
<p><?=$obj->description?></p>
</div>
<?}
}
?>
<div class="gotakealook">
<img src="https://lh6.googleusercontent.com/-tA-Yr-ZRJqI/UEoo-61MQVI/AAAAAAAAB1E/uTM00UyxDWk/s100-c/" alt="Сергей Петунин"/>
<p class="text">Вы можете приехать на ЛЮБОЙ из этих объектов и лично посмотреть, какие у меня рабочие, как работают, каким инструментом, а также поговорить с заказчиками!</p>
<div class="arrange">
<p class="tel">+7 495 99-88-347</p>
<p class="email"><a href="mailto:hello@otdelkalux.ru?subject=Осмотр%20объекта&amp;body=Пожалуйста,%20укажите%20Ваш%20мобильный%20телефон.">hello@otdelkalux.ru</a></p>
</div>
</div>
</div>
<div class="yline"></div>
<div class="col470">
<p class="title">На этапе черновой отделки:</p>
<?foreach($objects as $obj) { 
if($obj->type==1) { ?>
<div class="object">
<?if(!empty($obj->image)) { ?>
<a href="<?=$obj->link?>" target="_blank"><img src="<?=$obj->image?>" alt="<?=$obj->title?>"/></a>
<?}?>
<p class="h"><?=$obj->title?></p>
<p><?=$obj->description?></p>
</div>
<?}
}
?>
</div>
</section>
<section id="counters">
<div class="like_holder">
<div class="like">
<div class="g-plusone"></div>
<script type="text/javascript">
window.___gcfg = {lang: 'ru'};
(function() {
var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
po.src = 'https://apis.google.com/js/plusone.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
})();
</script>
</div>

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
<p><a target="_blank" href="http://maps.yandex.ru/-/CVuAJ6O4">На карте</a></p>
<br/>
<p><b>Офис в Madison Park</b></p>
<p>Московская область, Новорижское ш., посёлок Madison Park, вл. 15</p>
<p><a target="_blank" href="http://maps.yandex.ru/-/CVEO74NH">На карте</a></p>
</div>
<div>
<p><b>Связаться со мной</b></p>
<p>+7 (495) 998-83-47</p>
<p><a href="mailto:hello@otdelkalux.ru">hello@otdelkalux.ru</a></p>
<br/>
<p><b>Online</b></p>
<p class="social flickr"><a target="_blank" href="http://www.flickr.com/photos/otdelkalux/sets">Портфолио на Flickr</a></p>
<p class="social gplus"><a target="_blank" href="https://plus.google.com/104094916837036848285/">Сергей Петунин на Google+</a></p>
<p><a href="http://ремонт-коттеджей.рф/">ремонт-коттеджей.рф</a></p>
</div>
<div class="qr"><img src="http://static.otdelkalux.ru/i/qr.png" alt="Контактная информация на QR коде"/></div></div>
<div id="year">© <span>2006</span> «Отделка Люкс» — <a href="/">отделка таунхаусов</a>.</div>
</footer>
</section>
</body>
</html>