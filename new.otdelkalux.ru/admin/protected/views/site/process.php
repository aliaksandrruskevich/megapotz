<!DOCTYPE html>
<!-- Разработка сайта: Михаил Шестаков (mike.shestakov@gmail.com) -->
<html lang="ru">
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Осмотр объектов</title>
<meta name="keywords" content="осмотр объектов"/>
<meta name="description" content="Вы можете лично приехать и осмотреть любой из объектов, на котором мы ведем работы. Все текущие проекты отмечены на карте с указанием текущего состояния ремонта."/>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
<link rel="stylesheet" type="text/css" href="/css/common.css">
<link rel="stylesheet" media="(max-width: 640px)" href="/css/max-640px.css">
<script type="text/javascript" src="/js/main.js"></script>
<script type="text/javascript" src="//maps.googleapis.com/maps/api/js?key=AIzaSyCMahDawtiuAa1DX48AKcjiOufGdJZ8I8M"></script>
<script type="text/javascript" src="//www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" async defer></script>
</head>
<body id="page-process">
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
<div id="mouse">Прокрутите вниз, <br>чтобы увидеть карту</div>
<div id="selector" class="right">
<div class="current"></div>
<a href="/portfolio/" class="left">Завершенные <sup><?=$count['finished']?></sup></a>
<a href="/osmotr/" class="right">В работе <sup><?=$count['notfinished']?></sup></a>
</div>
<h1 class="center">Лучше один раз увидеть!</h1>
<div class="gotakealook">
	<img class="petunin" src="https://lh6.googleusercontent.com/-tA-Yr-ZRJqI/UEoo-61MQVI/AAAAAAAAB1E/uTM00UyxDWk/s150-c/" alt="Сергей Петунин"/>
	<div class="arrange">
		<p class="tel">+7 495 99-88-347</p>
		<p class="email"><a href="mailto:hello@otdelkalux.ru?subject=Осмотр%20объекта&amp;body=Пожалуйста,%20укажите%20Ваш%20мобильный%20телефон.">hello@otdelkalux.ru</a></p>
	</div>
	<div class="speech">
	<p>Чтобы не ошибиться с выбором подрядчика, нужно приехать к нему на объект и посмотреть своими глазами, что там происходит.</p>
	<p>Вы увидите весь процесс изнутри: специалистов, инвентарь, организацию работы и условия труда. За одну встречу вы поймёте, стоит с этим человеком работать или нет.</p>
	<p>На карте отмечены объекты, на которых мы в данный момент делаем ремонт. Вы можете осмотреть любой из них.</p>
	<p>Просто позвоните, и мы назначим встречу на одном из наших объектов!</p>
	</div>
</div>

<div id="map_canvas"></div>
<section id="process">
<?php
$i=1;
?>
<?foreach($objects as $obj) { ?>

<div class="object" data-gps="<?=$obj->lat?>,<?=$obj->lng?>">
<?if ($obj->link != '/') {?>
<a href="/osmotr/<?=$obj->link?>/" target="_blank"><img src="<?=$obj->image?>" alt="<?=$obj->title?>"/></a>
<p class="h"><?=$obj->title?></p>
<p><?=strtok($obj->description, "\n")?></p>
<p><a href="/osmotr/<?=$obj->link?>/">Посмотреть процесс ремонта</a></p>
<?} else { ?>
<p class="h"><?=$obj->title?></p>
<p><?=strtok($obj->description, "\n")?></p>
<?}?>
</div>
<?}?>

</section>

<div class="actioncall">
	<p>Если у вас уже есть проект ремонта, и вы хотите узнать, сколько стоит его реализация, пишите:</p>
	<p><a href="mailto:hello@otdelkalux.ru?subject=Запрос%20калькуляции&amp;body=Пожалуйста,%20укажите%20Ваш%20мобильный%20телефон,%20чтобы%20я%20мог%20оперативно%20уточнить%20у%20Вас%20какие-то%20вопросы.">hello@otdelkalux.ru</a></p>
	<p class="small">Я постараюсь ответить в течение <b>двух</b> рабочих дней.</p>
	<p>Также мы можем встретиться у вас на объекте для проведения замеров:</p>
</div>
<div class="form_bg">
	<div class="form mobile-form">
		<form action="/novayariga.php" method="POST" target="send_estimate">
		<input type="hidden" name="secret" value="5">
			<div>
				<label for="name_2">Имя:</label>
				<input type="text" required name="name" id="name_2" placeholder="Имя">
			</div>
			<div>
				<label for="phone">Телефон:</label>
				<input type="text" required name="phone" id="phone" placeholder="Телефон">
			</div>
			<div>
				<label for="email_2">Email:</label>
				<input type="email" required name="email" id="email_2" placeholder="vasha@pocha.ru">
			</div>
			<div class="g-recaptcha"></div>
			<input type="submit" class="button red" value="Начать работу" style="margin-top: 30px">
		</form>
	</div>
</div>


<section class="center">
<div style="margin: 50px auto;" class="likes yashare-auto-init" data-yashareL10n="ru" data-yashareQuickServices="vkontakte,gplus,facebook,twitter" data-yashareTheme="counter" data-yashareType="small"></div>
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