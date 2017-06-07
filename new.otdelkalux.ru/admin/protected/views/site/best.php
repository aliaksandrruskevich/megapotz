<!DOCTYPE html>
<!-- Разработка сайта: Михаил Шестаков (mike.shestakov@gmail.com) -->
<html lang="ru">
<head>
<meta name="viewport" content="width=1024">
<title>Галерея лучших работ</title>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
<link rel="stylesheet" type="text/css" href="/css/common.css">
<script type="text/javascript" src="/js/main.js"></script>
<!-- gplus gallery-->
<script type="text/javascript" src="//yandex.st/jquery/2.1.1/jquery.min.js"></script>
<script type="text/javascript" src="/gplus/jquery.gplus.js"></script>
<link rel="stylesheet" type="text/css" href="/gplus/gplus.css">
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

<section>
<div class="column">
<div class="center">
<div class="back"><a href="/portfolio/">◄ Все объекты</a></div>
<h1>Фотографии лучших работ</h1>
</div>
<div id="GPlus"></div>
<script type="text/javascript" src="//fgnass.github.io/spin.js/spin.min.js"></script>
<script type="text/javascript">
var photos =<?=preg_replace_callback(
'/\\\u([0-9a-fA-F]{4})/',
create_function('$match', 'return mb_convert_encoding("&#" . intval($match[1], 16) . ";", "UTF-8", "HTML-ENTITIES");'),
json_encode($images)
)?>;
</script>
</div>
</section>
<section id="descrip">
<div class="center" style="margin: 100px 0 40px 0">
<p><img src="/i/alert.svg" alt=""/></p>
<p class="h1">Мы показываем объекты!</p>
<p style="margin: 20px auto 50px auto; width: 500px; line-height: 1.4em; font-size: 14px;">В интернете каждый может украсть фото у конкурента и разместить их у себя на сайте, как свои собственные. Поэтому единственный способ убедиться в качестве работы потенциального подрядчика — лично посмотреть его объекты! Только так, и никак иначе, вы сможете получить представление о реальном качестве работы. У нас всегда несколько объектов находятся на завершающем этапе ремонта, и их можно посмотреть лично.</p>
<div class="button red"><a href="/osmotr/">Согласовать осмотр</a></div>
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
<p>Московская область, Новорижское ш., посёлок Миллениум Парк, вл. 7-024</p>
<p><a target="_blank" href="//maps.yandex.ru/-/CVuAJ6O4">На карте</a></p>
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
<!-- Yandex.Metrika counter --> <script src="https://mc.yandex.ru/metrika/tag.js" type="text/javascript"></script> <script type="text/javascript"> try { var yaCounter13794628 = new Ya.Metrika2({ id:13794628, clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true }); } catch(e) { } </script> <noscript><div><img src="https://mc.yandex.ru/watch/13794628" style="position:absolute; left:-9999px;" alt="" /></div></noscript> <!-- /Yandex.Metrika counter --></body>
</html>