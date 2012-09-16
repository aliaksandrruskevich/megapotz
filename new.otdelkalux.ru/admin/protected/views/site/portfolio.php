<!DOCTYPE html>
<!-- Разработка сайта: Михаил Шестаков (mike.shestakov@gmail.com) -->
<html lang="ru">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=Edge, chrome=1"/>
<meta name="viewport" content="width=1000"/>
<meta name="keywords" content="объекты, ремонт, работы, отделка"/>
<meta name="description" content="Объекты, на которых ремонт уже завершен."/>
<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
<title>Наши работы</title>
<link rel="stylesheet" type="text/css" href="/css/retina.css" media="only screen and (-webkit-min-device-pixel-ratio: 2)" />
<link rel="stylesheet" type="text/css" href="/css/common.css"/>
<!--[if lte IE 8]><link rel="stylesheet" type="text/css" href="/css/ie8.css"/><![endif]-->
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
<script type="text/javascript" src="http://code.jquery.com/jquery-1.8.1.min.js"></script>
<script type="text/javascript" src="/js/main.js"></script>
<script type="text/javascript" src="http://userapi.com/js/api/openapi.js?49"></script>
<script type="text/javascript">VK.init({apiId: 2956871, onlyWidgets: true});</script>
<script type="text/javascript">var _gaq = _gaq || [];_gaq.push(['_setAccount', 'UA-17254104-1']);_gaq.push(['_trackPageview']);(function() {var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;ga.src = 'http://www.google-analytics.com/ga.js';var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);})();</script>
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
<a href="/" id="logo"><!--[if lte IE 8]><img src="/i/logo.png" /><![endif]--><!--[if gte IE 9]><img src="/i/logo.svg" /><![endif]--><!--[if !IE]> --><img src="/i/logo.svg" alt=""/><!-- <![endif]--><span>Артель строительных бригад Сергея Петунина</span></a>
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
<section id="objects">
<div class="column">
<div id="selector" class="left">
<div class="current"></div>
<span class="left"><a href="/portfolio/">Завершенные <sup><?=$count['finished']?></sup></a></span>
<span class="right"><a href="/portfolio/process/">В работе <sup><?=$count['notfinished']?></sup></a></span>
<div id="button"></div>
<div id="selector_hint">Эти объекты можно посмотреть лично!</div>
</div>
<div id="album_grid">
<? $best_images = SiteController::getImages('','','best');
?>
<div class="album">
<div class="image_stack">
<?
$i=0;
foreach($best_images as $img) {
$i++;
$j=2-$i;
?>
<img alt="<?=$best_images[$j]['title']?>" src="<?=$best_images[$j]['url']?>/"/>
<?
if ($i>=2)break;
}?>
<img alt="Лучшие работы" src= "https://lh4.googleusercontent.com/-kHaGCq9iTas/UAzo8BxPM2I/AAAAAAAABhU/9wACqbVw3qE/s100/"/>
</div>
<p class="link"><a href="/portfolio/best/">Лучшие работы</a></p>
<p class="count"><?=count($best_images)?> фото</p>
</div>
<?foreach($objects as $obj) { 
$user_id=!empty($obj->picasa_user_id)?$obj->picasa_user_id:"104094916837036848285";
$images= SiteController::getImages($obj->picasa_album_id,$user_id);
?>
<div class="album">
<div class="image_stack">
<?
$i=0;
foreach($images as $img) {
$i++;
$j=3-$i;
?>
<img alt="<?=$images[$j]['title']?>" src="<?=$images[$j]['url']?>/"/>
<?
if ($i>=3)break;
}?></div>
<p class="link"><a href="/portfolio/<?=$obj->link?>/"><?=$obj->title?></a></p>
<p class="count"><?=count($images)?> фото</p>
</div>
<?
unset($images);
}?>
</div>
<div class="center" style="margin: 40px 0">
<p><!--[if lte IE 8]><img src="/i/alert.png" /><![endif]--><!--[if !IE]>--><img src="/i/alert.svg" alt=""/><!--<![endif]--></p>
<p class="h1">Мы показываем объекты!</p>
<p style="margin: 20px auto 50px auto; width: 500px; line-height: 1.4em; font-size: 14px;">В интернете каждый может украсть фото у конкурента и разместить их у себя на сайте, как свои собственные. Поэтому единственный способ убедиться в качестве работы потенциального подрядчика — лично посмотреть его объекты! Только так, и никак иначе, вы сможете получить представление о реальном качестве работы. У нас всегда несколько объектов находятся на завершающем этапе ремонта, и их можно посмотреть лично.</p>
<div class="button red"><a href="/portfolio/process/">Согласовать осмотр</a></div>
</div>
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