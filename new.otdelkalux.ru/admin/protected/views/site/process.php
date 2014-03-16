<!DOCTYPE html>
<!-- Разработка сайта: Михаил Шестаков (mike.shestakov@gmail.com) -->
<html lang="ru">
<head>
<meta name="viewport" content="width=1024">
<title>Осмотр объектов</title>
<meta name="keywords" content="осмотр объектов"/>
<meta name="description" content="Вы можете лично приехать и осмотреть любой из объектов, на котором мы ведем работы. Все текущие проекты отмечены на карте с указанием текущего состояния ремонта."/>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
<link rel="stylesheet" type="text/css" href="http://static.otdelkalux.ru/css/common.css">
<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?key=AIzaSyBm5umJanOaNNHGtcO3OY8wlTtZ-Z9Xw5o&amp;sensor=false"></script>
<script type="text/javascript" src="/js/main.js"></script>
</head>
<body id="page-process">
<header class="column">
<a href="http://www.otdelkalux.ru/" id="logo">
<img src="http://static.otdelkalux.ru/i/logo.svg" alt="Артель Сергея Петунина">
<span>Артель Сергея Петунина</span>
</a>
<nav>
<ul>
<li><a class="index" href="/">Ремонт и отделка</a></li>
<li><a class="portfolio" href="/portfolio/">Фото</a></li>
<li><a class="osmotr" href="/osmotr/">Осмотр объектов</a></li>
<li><a class="price" href="/price/calculator.html">Цены</a></li>
<li><a class="articles" href="/articles/">Статьи</a></li>
<li><a class="contacts" href="/contacts.html">Контакты</a></li>
</ul>
</nav>
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
<section id="objects">
<?php
$i=1;
?>
<?foreach($objects as $obj) { ?>
<div class="object" data-gps="<?=$obj->lat?>,<?=$obj->lng?>">

<?if ($obj->link != '/') {?>
<a href="<?=$obj->link?>" target="_blank"><img src="<?=$obj->image?>" alt="<?=$obj->title?>"/></a>
<p class="h"><?=$obj->title?></p>
<p><?=$obj->description?></p>
<p><a href="<?=$obj->link?>">Посмотреть процесс ремонта</a></p>
<?} else { ?>
<p class="h"><?=$obj->title?></p>
<p><?=$obj->description?></p>
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
		<div class="form">
		<form action="novayariga.php" method="POST" target="send_estimate">
			<div>
				<label for="name">Имя:</label>
				<input type="input" required="true" name="name" id="name">
			</div>
			<div>
				<label for="phone">Телефон:</label>
				<input type="tel" required="true" name="phone" id="phone" placeholder="+7 (495) 998-83-47">
			</div>
			<div>
				<label for="email">Email:</label>
				<input type="email" required="true" name="email" id="email">
			</div>
			<div>
				<label for="date">Дата и время встречи:</label>
				<input type="datetime-local" name="date" id="date">
			</div>
			<div>
				<label for="area">Площадь дома:</label>
				<input type="number" name="area" id="area" min="100" max="1500" step="1" required="true">
			</div>
			<div>
				<label for="vil">Название посёлка:</label>
				<input name="village" list="villages" id="vil" required="true" title="Пожалуйста, укажите название посёлка"><datalist id="villages"><option value="Monteville"></option><option value="Millennium Park"></option><option value="Madison Park"></option><option value="Park Avenue"></option><option value="Гринфилд"></option><option value="Риверсайд"></option><option value="Шервуд"></option><option value="Bosconi"></option><option value="Резиденции Бенилюкс"></option><option value="Онегино"></option><option value="Монолит"></option><option value="Agalarov Estate "></option><option value="Покровский"></option><option value="Lipki Парк"></option><option value="Crystal Istra"></option><option value="Маленькая Италия"></option><option value="Павлово"></option><option value="Никольская слобода"></option><option value="Николо-Урюпино"></option><option value="Архангельское II"></option><option value="Ильинский квартал"></option><option value="Новоархангельское"></option><option value="Sovereign (Соверен)"></option><option value="Тимошкино"></option><option value="Европа"></option><option value="Петрово-Дальнее"></option><option value="Кедры"></option><option value="Усадьба Вельяминово"></option><option value="Крона (Krona Village)"></option><option value="Старая Рига"></option><option value="Белая гора"></option><option value="Спутник"></option><option value="Величъ"></option></datalist>
			</div>
			<div>
				<label for="comment">Комментарий:</label>
				<textarea name="comment" id="comment"></textarea>
			</div>
			<input type="submit" class="button red" value="Согласовать встречу" style="margin-top: 30px">
		</form>
		<iframe src="about:blank" id="send_estimate" name="send_estimate" class="dn"></iframe>
		</div>
	</div>


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
<div id="badge_holder"><div class="g-page" data-width="180" data-href="//plus.google.com/105598601692280332786" data-rel="publisher"></div></div>
</div>
<div id="year">© <span>2006</span> «Отделка Люкс»</div>
</footer>
</body>
</html>