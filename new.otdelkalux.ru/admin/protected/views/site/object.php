<!DOCTYPE html>
<!-- Разработка сайта: Михаил Шестаков (mike.shestakov@gmail.com) -->
<html lang="ru">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=Edge, chrome=1">
<meta name="viewport" content="width=1000">
<meta name="keywords" content="<?=!empty($object->seo_keywords)?$object->seo_keywords:""?>"/>
<meta name="description" content="<?=!empty($object->seo_description)?$object->seo_description:""?>"/>
<title><?=!empty($object->seo_title)?$object->seo_title:""?></title>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
<link rel="stylesheet" type="text/css" href="http://static.otdelkalux.ru/css/common.css">
<script type="text/javascript" src="/js/main.js"></script>
<!-- gplus gallery-->
<script type="text/javascript" src="http://yandex.st/jquery/2.0.3/jquery.min.js"></script>
<script type="text/javascript" src="http://static.otdelkalux.ru/gplus/jquery.gplus.js"></script>
<link rel="stylesheet" type="text/css" href="http://static.otdelkalux.ru/gplus/gplus.css">
</head>
<body id="page-portfolio">
<header class="column">
<a href="http://www.otdelkalux.ru/" id="logo">
<img src="http://static.otdelkalux.ru/i/logo.svg" alt="Артель Сергея Петунина">
<span>Артель Сергея Петунина</span>
</a>
<nav>
<a class="index" href="/">Ремонт и отделка</a>
<a class="portfolio" href="/portfolio/">Фото</a>
<a class="osmotr" href="/osmotr/">Осмотр объектов</a>
<a class="price" href="/price/calculator.html">Цены</a>
<a class="docs" href="/docs.html">Документы</a>
<a class="warranty" href="/warranty.html">Гарантия</a>
<a class="articles" href="/articles/">Статьи</a>
<a class="contacts" href="/contacts.html">Контакты</a>
</nav>
</header>

<section>
<div class="column">
<div class="center">
<div class="back"><a href="/portfolio/">◄ Все объекты</a></div>
<h1><?=$object->title?></h1>
<p><?=$object->work_date?></p>
</div>
<div id="GPlus"></div>
<script type="text/javascript" src="http://fgnass.github.io/spin.js/dist/spin.min.js"></script>
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
<div class="like"></div>
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

<div class="text"><?=$object->description?></div>
<hr>
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
<p><img src="http://static.otdelkalux.ru/i/alert.svg" alt=""/></p>
<p class="h1">Мы показываем объекты!</p>
<p style="margin: 20px auto 50px auto; width: 500px; line-height: 1.4em; font-size: 14px;">В интернете каждый может украсть фото у конкурента и разместить их у себя на сайте, как свои собственные. Поэтому единственный способ убедиться в качестве работы потенциального подрядчика — лично посмотреть его объекты! Только так, и никак иначе, вы сможете получить представление о реальном качестве работы. У нас всегда несколько объектов находятся на завершающем этапе ремонта, и их можно посмотреть лично.</p>
<div class="button red"><a href="/osmotr/">Согласовать осмотр</a></div>
</div>
</section>

<footer>
<p class="title">Артель Сергея Петунина</p>
<div class="info">
<div>
<p>Полный комплекс работ по элитному ремонту и внутренней отделке коттеджей, загородных домов и таунхаусов под ключ.</p>
<p>Наша специализация: внутренняя отделка, монтаж электрики, сантехники, отопления, а также ландшафтные работы.</p>
</div>
<div>
<p><b>Офис в Millennium Park</b></p>
<p>Московская область, Новорижское ш., посёлок Миллениум Парк, вл. 3041</p>
<p><a target="_blank" href="http://maps.yandex.ru/-/CVuAJ6O4">На карте</a></p>
<br>
<p><b>Офис в Madison Park</b></p>
<p>Московская область, Новорижское ш., посёлок Мэдисон Парк, вл. 15</p>
<p><a target="_blank" href="http://maps.yandex.ru/-/CVEO74NH">На карте</a></p>
</div>
<div>
<p><b>Связаться со мной</b></p>
<p>+7 (495) 99-88-347</p>
<p><a href="mailto:hello@otdelkalux.ru">hello@otdelkalux.ru</a></p>
<br>
<p><b>Online</b></p>
<p class="social flickr"><a target="_blank" href="http://www.flickr.com/photos/otdelkalux/sets">Портфолио на Flickr</a></p>
<p class="social gplus"><a target="_blank" rel="author" href="https://plus.google.com/104094916837036848285/?rel=author">Сергей Петунин на Google+</a></p>
<p><a href="http://www.otdelkalux.ru/">www.OtdelkaLux.ru</a></p>
</div>
<div class="qr"><img src="http://static.otdelkalux.ru/i/qr.png" alt="Контактная информация на QR-коде"></div>
</div>
<div id="year">© <span>2006</span> «Отделка Люкс»</div>
</footer>
</body>
</html>