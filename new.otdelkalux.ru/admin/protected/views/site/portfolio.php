<!DOCTYPE html>
<!-- Разработка сайта: Михаил Шестаков (mike.shestakov@gmail.com) -->
<html lang="ru">
<head>
<meta name="viewport" content="width=1024">
<title>Фото</title>
<meta name="keywords" content="объекты, ремонт, работы, отделка, фото, интерьер, ландшафтные работы"/>
<meta name="description" content="Фото объектов, на которых ремонт уже завершен."/>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
<link rel="stylesheet" type="text/css" href="/css/common.css">
<script type="text/javascript" src="/js/main.js"></script>
</head>
<body id="page-portfolio">
<header class="column">
<a href="https://www.otdelkalux.ru/" id="logo">
<img src="/i/logo.svg" alt="Артель Сергея Петунина">
<span>Артель Сергея Петунина</span>
</a>
<nav><ul>
<li><a class="index" href="/">Ремонт и отделка</a></li>
<li><a class="portfolio" href="/portfolio/">Фото</a></li>
<li><a class="osmotr" href="/osmotr/">Осмотр объектов</a></li>
<li><a class="price" href="/price/calculator.html">Цены</a></li>
<li><a class="articles" href="/articles/">Статьи</a></li>
<li><a class="contacts" href="/contacts.html">Контакты</a></li>
</ul></nav>
</header>

<h1>Фото</h1>
<section id="objects">
<div class="column">
<div id="selector" class="left">
<div class="current"></div>
<a href="/portfolio/" class="left">Завершенные <sup><?=$count['finished']?></sup></a>
<a href="/osmotr/" class="right">В работе <sup><?=$count['notfinished']?></sup></a>
<div id="selector_hint">Эти объекты можно посмотреть лично!</div>
</div>




<div id="album_grid">
<? $best_images = SiteController::getImages('','','best');
?>
<div class="album">
<a href="/portfolio/best/" class="image_stack">
<noscript>
<?
$i=0;
foreach($best_images as $img) {
$i++;
$j=2-$i;
?>
<img alt="<?=$best_images[$j]['title']?>" src="<?=$best_images[$j]['url']?>"/>
<?
if ($i>=2)break;
}?>
<img alt="Лучшие работы" src= "https://lh4.googleusercontent.com/-kHaGCq9iTas/UAzo8BxPM2I/AAAAAAAABhU/9wACqbVw3qE/best.jpg"/>
</noscript>
</a>

<p class="link"><a href="/portfolio/best/">Лучшие работы</a></p>
<p class="count"><?=count($best_images)?> фото</p>
</div>

<?foreach($objects as $obj) { 
$user_id=!empty($obj->picasa_user_id)?$obj->picasa_user_id:"104094916837036848285";
$images= SiteController::getImages($obj->picasa_album_id,$user_id);
?>
<div class="album">
<a href="/portfolio/<?=$obj->link?>/" class="image_stack">
<noscript>
<?
$i=0;
foreach($images as $img) {
$i++;
$j=3-$i;
?>
<img alt="<?=$images[$j]['title']?>" src="<?=$images[$j]['url']?>"/>
<?
if ($i>=3)break;
}?>
</noscript>
</a>
<p class="link"><a href="/portfolio/<?=$obj->link?>/"><?=$obj->title?></a></p>
<p class="count"><?=count($images)?> фото</p>
</div>
<?
unset($images);
}?>
</div>

<div class="center" style="margin: 40px 0">
<p><img src="/i/alert.svg" alt=""/></p>
<p class="h1">Мы показываем объекты!</p>
<p style="margin: 20px auto 50px auto; width: 500px; line-height: 1.4em; font-size: 14px;">В интернете каждый может украсть фото у конкурента и разместить их у себя на сайте, как свои собственные. Поэтому единственный способ убедиться в качестве работы потенциального подрядчика — лично посмотреть его объекты! Только так, и никак иначе, вы сможете получить представление о реальном качестве работы. У нас всегда несколько объектов находятся на завершающем этапе ремонта, и их можно посмотреть лично.</p>
<div class="button red"><a href="/osmotr/">Согласовать осмотр</a></div>
</div>
</div>
</section>
<section class="center">
<div style="margin: 50px auto;" class="likes yashare-auto-init" data-yashareL10n="ru" data-yashareQuickServices="vkontakte,gplus,facebook,twitter" data-yashareTheme="counter" data-yashareType="small"></div>
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
<p><a target="_blank" href="maps.yandex.ru/-/CVuAJ6O4">На карте</a></p>
</div>
<div>
<p><b>Связаться со мной</b></p>
<p>+7 (495) 99-88-347</p><p>+7 (926) 709-62-18</p>
<p><a href="mailto:hello@otdelkalux.ru">hello@otdelkalux.ru</a></p>
<br>
<p><b>Online</b></p>
<p class="social flickr"><a target="_blank" href="//www.flickr.com/photos/otdelkalux/sets">Портфолио на Flickr</a></p>
<p class="social gplus"><a target="_blank" rel="author" href="https://plus.google.com/104094916837036848285/?rel=author">Сергей Петунин на Google+</a></p>
<p><a href="https://www.otdelkalux.ru/">www.OtdelkaLux.ru</a></p>
</div>
<div id="badge_holder"><div class="g-page" data-width="180" data-href="//plus.google.com/u/0/104572237617615451669" data-rel="publisher"></div></div>
</div>
<div id="year">© <span>2006</span> «Отделка Люкс»</div>
</footer>
<!-- Yandex.Metrika counter --><script src="//mc.yandex.ru/metrika/watch.js" type="text/javascript"></script><script type="text/javascript">try { var yaCounter13794628 = new Ya.Metrika({id:13794628, webvisor:true, clickmap:true, trackLinks:true, accurateTrackBounce:true}); } catch(e) { }</script><noscript><div><img src="//mc.yandex.ru/watch/13794628" style="position:absolute; left:-9999px;" alt="" /></div></noscript><!-- /Yandex.Metrika counter --></body>
</html>