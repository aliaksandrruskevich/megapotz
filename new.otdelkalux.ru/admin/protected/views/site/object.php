<!DOCTYPE html>
<!-- Разработка сайта: Михаил Шестаков (mike.shestakov@gmail.com) -->
<html lang="ru">
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="keywords" content="<?=!empty($object->seo_keywords)?$object->seo_keywords:""?>"/>
<meta name="description" content="<?=!empty($object->seo_description)?$object->seo_description:""?>"/>
<title><?=!empty($object->seo_title)?$object->seo_title:""?></title>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
<link rel="stylesheet" type="text/css" href="/css/common.css">
<link href="/js/nanogallery2/css/nanogallery2.min.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="//yastatic.net/jquery/3.1.1/jquery.min.js"></script>
<script type="text/javascript" src="/js/nanogallery2/jquery.nanogallery2.min.js"></script>
<script type="text/javascript" src="/js/main.js"></script>
<link rel="stylesheet" media="(max-width: 640px)" href="/css/max-640px.css">
</head>
<body id="page-portfolio">
<header class="column">
	<a href="https://www.otdelkalux.ru/" id="logo"><img src="/i/logo.svg" alt="Артель Сергея Петунина"><span>Артель Сергея Петунина</span></a>
	<nav>
		<label for="menu-switch" class="mobile-nav icon">☰</label><input type="checkbox" id="menu-switch" checked=""><ul>
			<li><a class="index" href="/">Главная</a></li>
			<li><a class="uslugi" href="/uslugi/">Услуги</a></li>
			<li><a class="poselki" href="/poselki/">Посёлки</a></li>
			<li><a class="portfolio" href="/portfolio/">Фото</a></li>
			<li><a class="osmotr" href="/osmotr/">Осмотр объектов</a></li>
			<li><a class="price" href="/price/calculator.html">Цены</a></li>
			<li><a class="articles" href="/articles/">Статьи</a></li>
			<li><a class="contacts" href="/contacts.html">Контакты</a></li>
		</ul>
	</nav>
	<a href="tel:+74959988347" class="phone icon">&#9990;</a>
</header>

<section>
<div class="column">
<div class="center">
<div class="back"><a href="../">◄ Все объекты</a></div>
<h1><?=$object->title?></h1>
<p><?=$object->work_date?></p>
</div>
<div id="GPlus"></div>

<script type="text/javascript">
	var albumID = '<?=$object->picasa_album_id?>';
</script>
</div>
</section>
<section id="descrip">


<div class="likeholder">
<div class="like" style="float: right"><div class="likes yashare-auto-init" data-yashareL10n="ru" data-yashareQuickServices="vkontakte,gplus,facebook,twitter" data-yashareTheme="counter" data-yashareType="small"></div></div>
<span>Понравился объект?</span>
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
<p><img src="/i/alert.svg" alt=""/></p>
<p class="h1">Мы показываем объекты!</p>
<p class="photo-disclaimer">В интернете каждый может украсть фото у конкурента и разместить их у себя на сайте, как свои собственные. Поэтому единственный способ убедиться в качестве работы потенциального подрядчика — лично посмотреть его объекты! Только так, и никак иначе, вы сможете получить представление о реальном качестве работы. У нас всегда несколько объектов находятся на завершающем этапе ремонта, и их можно посмотреть лично.</p>
<div class="button red"><a href="/osmotr/">Согласовать осмотр</a></div>
</div>
</section>

<footer>
<p class="title">Артель Сергея Петунина</p>
<div class="info">
<div class="nomobile">
<p>Полный комплекс работ по элитному ремонту и внутренней отделке коттеджей, загородных домов и таунхаусов под ключ.</p>
<p>Наша специализация: внутренняя отделка, монтаж электрики, сантехники, отопления, а также ландшафтные работы.</p>
</div>
<div>
<p><b>Офис в Millennium Park</b></p>
<p>Московская область, Новорижское ш., посёлок Миллениум Парк, вл. 7-024</p>
<p><a target="_blank" href="//maps.yandex.ru/-/CVuAJ6O4">На карте</a></p>
</div>
<div>
<p><b>Связаться со мной</b></p>
<p>+7 495 99-88-347</p><p>+7 926 709-62-18</p>
<p><a href="mailto:hello@otdelkalux.ru">hello@otdelkalux.ru</a></p>
<br>
<div class="nomobile">
<p><b>Online</b></p>
<p class="social flickr"><a target="_blank" href="//www.flickr.com/photos/otdelkalux/sets">Портфолио на Flickr</a></p>
<p class="social gplus"><a target="_blank" rel="author" href="https://plus.google.com/104094916837036848285/?rel=author">Сергей Петунин на Google+</a></p>
<p><a href="https://www.otdelkalux.ru/">www.OtdelkaLux.ru</a></p>
</div>
</div>
</div>
<div id="year">© <span>2006</span> «Отделка Люкс»</div>
</footer>
<!-- Yandex.Metrika counter --> <script src="https://mc.yandex.ru/metrika/tag.js" type="text/javascript"></script> <script type="text/javascript"> try { var yaCounter13794628 = new Ya.Metrika2({ id:13794628, clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true }); } catch(e) { } </script> <noscript><div><img src="https://mc.yandex.ru/watch/13794628" style="position:absolute; left:-9999px;" alt="" /></div></noscript> <!-- /Yandex.Metrika counter --></body>
</html>