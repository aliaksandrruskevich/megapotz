<!DOCTYPE html>
<!-- Разработка сайта: Михаил Шестаков (mike.shestakov@gmail.com) -->
<html lang="ru" itemscope itemtype="http://schema.org/GeneralContractor">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=Edge, chrome=1"/>
<meta name="viewport" content="width=1000"/>
<meta name="keywords" content="<?=!empty($object->seo_keywords)?$object->seo_keywords:""?>"/>
<meta name="description" content="<?=!empty($object->seo_description)?$object->seo_description:""?>"/>
<meta itemprop="image" content="http://farm8.staticflickr.com/7079/7064821993_68d9fa0357_b.jpg"/>
<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
<title><?=!empty($object->seo_title)?$object->seo_title:""?></title>

<link rel="stylesheet" type="text/css" href="http://static.otdelkalux.ru/css/common.css"/>
<!--[if lte IE 8]><link rel="stylesheet" type="text/css" href="http://static.otdelkalux.ru/css/ie8.css"/><![endif]-->
<link rel="stylesheet" type="text/css" href="http://static.otdelkalux.ru/gplus/gplus.css"/>
<!--[if lte IE 8]><link rel="stylesheet" type="text/css" href="http://static.otdelkalux.ru/gplus/gplus.ie8.css"/><![endif]-->
<link rel="shortcut icon" href="http://static.otdelkalux.ru/favicon.ico" type="image/x-icon" />
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<script type="text/javascript" src="http://static.otdelkalux.ru/gplus/jquery.gplus.js"></script>
<script type="text/javascript" src="/js/main.js"></script>
<script type="text/javascript">var _gaq = _gaq || [];_gaq.push(['_setAccount', 'UA-17254104-1']);_gaq.push(['_trackPageview']);(function() {var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;ga.src = 'http://www.google-analytics.com/ga.js';var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);})();</script>

<!--[if lt IE 9]>
<script type="text/javascript" src="https://raw.github.com/aFarkas/html5shiv/master/dist/html5shiv.js"></script>
<![endif]-->
</head>
<body id="page-portfolio" itemscope itemtype="http://schema.org/SingleFamilyResidence">
<!--[if lt IE 8]><p style="text-align: center; margin: 100px; font: normal 60px Arial; color: #f00">Сайт не предназначен для просмотра в безнадежно устаревших браузерах Internet Explorer 6 и 7.<br/><a href="http://browser-update.org/ru/update.html">Обновите ваш браузер</a> или посмотрите старую версию нашего сайта: <a href="http://old.otdelkalux.ru">old.otdelkalux.ru</a></p><![endif]-->
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
<section>
<div class="column">
<div class="center">
<div class="back"><a href="/portfolio/">◄ Все объекты</a></div>
<h1 itemprop="name"><?=$object->title?></h1>
<p itemprop="description"><?=$object->work_date?></p>
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
</section>
<section id="descrip">
<div class="likeholder">
<span>Понравился объект?</span>
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
<?if($object->type==3) {?>
<dl>
<?if(!empty($object->area)) { ?>
<dt>Общая площадь</dt>
<dd><?=$object->area?></dd>
<?} if(!empty($object->cost)) {  ?>
<dt>Стоимость работ</dt>
<dd><?=$object->cost?></dd>
<?}?>
</dl>
<?} else { ?>
<dl>
<?if(!empty($object->area)) { ?>
<dt>Общая площадь</dt>
<dd><?=$object->area?> м²</dd>
<?} if(!empty($object->cost)) {  ?>
<dt>Стоимость за м²</dt>
<dd><?=$object->cost?></dd>
<?}?>
<dt>Класс ремонта</dt>
<dd>«<?
if($object->repair_class==0) {
echo "Стандарт";
}
elseif($object->repair_class==1) {
echo "Бизнес";
}
elseif($object->repair_class==2) {
echo "Люкс";
}
?>»</dd>
</dl>
<?}?>
<div class="text">
<?=$object->description?>
</div>
<hr/>
<div class="table" id="backnext">
<div class="tr">
<?if(!empty($last_next[0]->link)) {?>
<div class="td l"><a href="/portfolio/<?=$last_next[0]->link?>/"><img src="<?=$last_next[0]->image?>s50-c/" alt="<?=$last_next[0]->title?>"/><?=$last_next[0]->title?></a><p class="small"><?=$last_next[0]->picasa_images?> фото</p></div>
<? } if(!empty($last_next[1]->link)) {?>
<div class="td r"><a href="/portfolio/<?=$last_next[1]->link?>/"><img src="<?=$last_next[1]->image?>s50-c/" alt="<?=$last_next[1]->title?>"/><?=$last_next[1]->title?></a><p class="small"><?=$last_next[1]->picasa_images?> фото</p></div>
<?}?>
</div>
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
<p><a href="http://ремонт-коттеджей.рф/">ремонт-коттеджей.рф</a></p>
</div>
<div class="qr"><img src="http://static.otdelkalux.ru/i/qr.png" alt="Контактная информация на QR коде"/></div></div>
<div id="year">© <span>2006</span> «Отделка Люкс» — <a href="/">ремонт и отделка коттеджей</a>.</div>
</footer>
</section>
</body>
</html>