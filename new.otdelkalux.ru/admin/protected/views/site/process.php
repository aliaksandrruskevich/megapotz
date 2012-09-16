<!DOCTYPE html>
<!-- Разработка сайта: Михаил Шестаков (mike.shestakov@gmail.com) -->
<html lang="ru">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=Edge, chrome=1"/>
<meta name="viewport" content="width=1000"/>
<meta name="keywords" content="просмотр объектов"/>
<meta name="description" content="Любой из этих объектов вы можете посмотреть лично. Позвоните по телефону +7 495 99-88-347, чтобы согласовать время осмотра."/>
<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
<title>Объекты, на которых мы сейчас работаем</title>
<link rel="stylesheet" type="text/css" href="http://static.otdelkalux.ru/css/retina.css" media="only screen and (-webkit-min-device-pixel-ratio: 2)" />
<link rel="stylesheet" type="text/css" href="http://static.otdelkalux.ru/css/common.css"/>
<!--[if lte IE 8]><link rel="stylesheet" type="text/css" href="http://static.otdelkalux.ru/css/ie8.css"/><![endif]-->
<link rel="shortcut icon" href="http://static.otdelkalux.ru/favicon.ico" type="image/x-icon" />
<script type="text/javascript" src="http://yandex.st/jquery/1.7.2/jquery.min.js"></script>
<script type="text/javascript" src="/js/main.js"></script>
<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
<script type="text/javascript" src="http://userapi.com/js/api/openapi.js?49"></script>
<script type="text/javascript">VK.init({apiId: 2956871, onlyWidgets: true});</script>
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
<body id="page-portfolio">
<!-- Yandex.Metrika counter --><script type="text/javascript">(function (d, w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter13794628 = new Ya.Metrika({id:13794628, enableAll: true, webvisor:true}); } catch(e) { } }); var n = d.getElementsByTagName("script")[0], s = d.createElement("script"), f = function () { n.parentNode.insertBefore(s, n); }; s.type = "text/javascript"; s.async = true; s.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//mc.yandex.ru/metrika/watch.js"; if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f); } else { f(); } })(document, window, "yandex_metrika_callbacks");</script><noscript><div><img src="//mc.yandex.ru/watch/13794628" style="position:absolute; left:-9999px;" alt="" /></div></noscript><!-- /Yandex.Metrika counter -->
<!--[if lt IE 8]>
<p style="text-align: center; margin: 100px; font: normal 60px Arial; color: #f00">Сайт не предназначен для просмотра в безнадежно устаревших браузерах Internet Explorer 6 и 7.<br/><a href="http://browser-update.org/ru/update.html">Обновите ваш браузер</a> или посмотрите старую версию нашего сайта: <a href="http://old.otdelkalux.ru">old.otdelkalux.ru</a></p>
<![endif]-->
<section>
<div class="column">
<div class="td" id="nav">
<a href="/" id="logo"><!--[if lte IE 8]><img src="http://static.otdelkalux.ru/i/logo.png" /><![endif]--><!--[if gte IE 9]><img src="http://static.otdelkalux.ru/i/logo.svg" /><![endif]--><!--[if !IE]> --><img src="http://static.otdelkalux.ru/i/logo.svg" alt=""/><!-- <![endif]--><span>Артель строительных бригад Сергея Петунина</span></a>
<nav>
<a class="index" href="/">Главная</a>
<a class="portfolio" href="/portfolio/">Объекты</a>
<a class="price" href="/price/calculator.html">Цены</a>
<a class="docs" href="/docs.html">Документы</a>
<a class="warranty" href="/warranty.html">Гарантия</a>
<a class="articles" href="/articles/">Статьи</a>
<a class="contacts" href="/contacts.html">Контакты</a>
</nav>
</div>
</div>
</section>
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
  <?if(!empty($obj->image)) { ?>
<img src="<?=$obj->image?>" alt="<?=$obj->title?>"/>
  <?}?>
  <p class="h"><?=$obj->title?></p>
  <p><?=$obj->description?></p>
</div>
  <?}
}
?>
<div class="gotakealook">
<img src="https://lh3.googleusercontent.com/-JvCJh1G2RCk/T75YMe9Xg-I/AAAAAAAAAhQ/v0P0lGT7j9A/s100-c/" alt="Сергей Петунин"/>
<p class="text">Вы можете приехать на ЛЮБОЙ из этих объектов и лично посмотреть, какие у меня рабочие, как работают, каким инструментом, а также поговорить с заказчиками!</p>
<div class="arrange">
<p class="tel">+7 495 99-88-347</p>
<p class="email"><a href="mailto:rso2000@mail.ru?subject=Осмотр%20объекта&amp;body=Пожалуйста,%20укажите%20Ваш%20мобильный%20телефон.">rso2000@mail.ru</a></p>
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
  <img src="<?=$obj->image?>" alt="<?=$obj->title?>"/>
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
<div class="like">
<div id="vk_like"></div>
<script type="text/javascript">
VK.Widgets.Like("vk_like", {type: "button"});
</script>
</div>
</div>
</section>
<section id="footer">
<footer>
<p class="title">Артель строительных бригад Сергея Петунина</p>
<div class="info">
<div>
<p>Полный комплекс работ по элитному ремонту и отделке коттеджей и загородных домов «под ключ»</p>
</div>
<div>
<p><b>Основной офис</b></p>
<p>Москва, ул. Куусинена 19 А</p>
<p><a href="http://maps.yandex.ru/-/CFu7NB7J">На карте</a></p>
<br/>
<p><b>Мобильный офис</b></p>
<p>Московская область, Новорижское ш., посёлок Madison Park, вл. 15</p>
<p><a href="http://maps.yandex.ru/-/CVEO74NH">На карте</a></p>
</div>
<div>
<p><b>Связаться со мной</b></p>
<p>+7 (495) 998-83-47</p>
<p><a href="mailto:rso2000@mail.ru">rso2000@mail.ru</a></p>
<br/>
<p><b>Online</b></p>
<p class="social flickr"><a href="http://www.flickr.com/photos/otdelkalux/sets">Портфолио на Flickr</a></p>
<p class="social gplus"><a href="https://plus.google.com/104094916837036848285/">Сергей Петунин на Google+</a></p>
<p><a href="http://www.otdelkalux.ru/">www.OtdelkaLux.ru</a></p>
</div>
<div class="qr"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4AQMAAAADqqSRAAAABlBMVEX///8AAABVwtN+AAABdElEQVR4Xu3HoYGAIBQA0E+RFT4FVsOiK2BBKLICFFgNiq4ARS5c/Ybr99qDv/qnpvf1cHDMTh5ZBCu1ag7Ji1HaC9qyEj9+yQXM2T5fulzv9evIUnEqtOaQvJrp1+zkARAWy1MFIC/XJ7Su5TEqeZQqeWfX+RryoFpdNt551OTFpdl7Pi2zTl6erer9cdxX8tyBNiCy5p38Iu41RMtToS+luLdNRNRAf32B39sZuibPX2mPdB/x7OSlKj4F32aI5BfJU8lm9y+QZ35G5VPmtyEvtT1nX5A5TZ7N2+5ZpbpX8rgsZ7qEv4UjL1q3+/MEpzV52CxvzUfUQF6e6XESz7p28iwf0ehtvxHJA782ZBE1r+R5PkI1R+SNvniSd9yJkjp5QFHtssc1G/K4z+GLv9So5AGQzzBGRySvZlSpW3OUSh6Zv9lzoVGRvBh+jPTu8zUfT/PJyOumPx5S37QK2ZBHlqUqFUTX5NVMbV5spIv43/z7AZHRqkZ0yRK6AAAAAElFTkSuQmCC" alt="Контактная информация на QR коде"/></div>
</div>
<div id="year">© <span>2006</span></div>
</footer>
</section>
</body>
</html>