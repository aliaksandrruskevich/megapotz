<!DOCTYPE html>
<!-- Разработка сайта: Михаил Шестаков (mike.shestakov@gmail.com) -->
<html lang="ru" itemscope itemtype="http://schema.org/GeneralContractor">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=Edge, chrome=1">
<meta name="viewport" content="width=1000">
<meta name="keywords" content="ремонт, отделка, коттедж, загородный дом, стоимость, фото, таунхаус, элитный, под ключ">
<meta name="description" content="Выполняем весь комплекс отделочных и ремонтных работ в коттеджах, загородных домах и таунхаусах: отопление, электрика, сантехника, внутренняя отделка под ключ. Фотографии завершенных объектов, калькулятор стоимости ремонта.">
<title>Ремонт и отделка коттеджей, загородных домов и таунхаусов под ключ: цены, фото</title>
<meta itemprop="image" content="http://farm8.staticflickr.com/7079/7064821993_68d9fa0357_b.jpg">
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<link rel="canonical" href="http://www.otdelkalux.ru/">
<meta name="robots" content="noyaca">
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
<link rel="stylesheet" type="text/css" href="http://static.otdelkalux.ru/css/common.css">
<script type="text/javascript" src="/js/main.js"></script>
<!-- gplus gallery-->
<script type="text/javascript" src="http://yandex.st/jquery/2.0.3/jquery.min.js"></script>
<script type="text/javascript" src="http://static.otdelkalux.ru/gplus/jquery.gplus.js"></script>
<link rel="stylesheet" type="text/css" href="http://static.otdelkalux.ru/gplus/gplus.css">
<script type="application/ld+json">{"@context":"http://schema.org","@type":"CalculateAction","url":"http://www.otdelkalux.ru/","specificationUrl":"http://www.otdelkalux.ru/calc.xml"}</script>
</head>
<body id="page-index">
<section id="title">
<header class="column">
<a itemprop="url" href="http://www.otdelkalux.ru/" id="logo">
<img itemprop="logo" src="http://static.otdelkalux.ru/i/logo.svg" alt="Артель Сергея Петунина">
<span itemprop="name">Артель Сергея Петунина</span>
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
<div id="bg" style="background-image: url('http://static.otdelkalux.ru/i/bg.jpg');">
<div style="position: relative">
<div id="text_holder">
<h1><span class="u">Полный комплекс работ</span> <br><span class="u">по элитному ремонту и внутренней отделке загородных домов,</span> <br>коттеджей и таунхаусов <span class="red">под ключ</span></h1>
<p class="since">Работаем с <span itemprop="foundingDate">1998</span> года</p>
</div>
</div>
<!--noindex-->
<script type="text/javascript">
(function() {
// Адаптируем тайтл под запрос юзера. Нужно оставить здесь, чтобы не мигало...
var html = ['квартир', 'таунхаусов', 'загородных', 'коттеджей'];
var query = ['квартир', 'таунхаус', 'загородн', 'коттедж'];
var ref = decodeURIComponent(document.referrer);
for (var i = 0; i < 3; i++) {
if (ref.match(query[i])) break;
}
var h1 = document.querySelector('#text_holder h1');
h1.innerHTML = h1.innerHTML.replace('внутренней отделке загородных домов', 'отделке').replace('коттеджей и таунхаусов', html[i]);
// Прягаем к калькулятору, если юзер пришел с островов
if (ref.match(/фот/)) document.location.hash = 'gallery';
if (document.location.search.match(/area|wc/) || ref.match(/стоит|стоимост|цен/)) document.location.hash = 'price';
})();
</script>
<div id="mouse">Прокрутите вниз, <br>чтобы узнать больше</div>
<!--/noindex-->
</div>
</section>
<section id="whatwedo">
<p class="h2 center">Все перечисленные работы мы выполняем <br>только своими силами, <span class="red">без субподряда</span>.</p>
<div class="stage">
<p>Подготовка проекта</p>
<ul>
<li id="project">Проектная документация</li>
</ul>
</div>
<div class="stage">
<p>Ремонт под ключ</p>
<ul>
<li id="electric">Электрика</li>
<li id="santech">Сантехника</li>
<li id="heating">Отопление</li>
<li id="decor">Внутренняя отделка под ключ</li>
</ul>
</div>
<div class="stage">
<p>Внешние работы</p>
<ul>
<li id="land">Ландшафтные работы</li>
<li id="fasad">Фасадные работы</li>
</ul>
</div>
</section>
<section id="objects">
<div class="column">
<p class="h1 center">Завершенные объекты</p>
<div id="album_grid">
<?foreach($objects as $obj) { 
$user_id=!empty($obj->picasa_user_id)?$obj->picasa_user_id:"104094916837036848285";
$images=  SiteController::getImages($obj->picasa_album_id,$user_id);
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
<img alt="<?=$images[$j]['title']?>" src="<?=$images[$j]['url']?>">
<?
if ($i>=3) break;
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
<div class="center"><div class="button red"><a href="/portfolio/">Смотреть все объекты</a></div></div>
</div>
</section>
<section id="gallery" class="column">
<h2 class="h1 center">Фото ремонта коттеджей</h2>

<div id="GPlus"></div>
<script type="text/javascript" src="http://fgnass.github.io/spin.js/dist/spin.min.js"></script>
<script type="text/javascript">
var photos = [
{title: "Художественная укладка мрамора класса &quot;люкс&quot;.", url: "https://lh4.googleusercontent.com/-BlYXdflG-_E/UAhF58bs7HI/AAAAAAAABNs/t5WwXg3GOlY/6917955734.jpg", width: 717, height: 1080 },
{title: "Холл на втором этаже", url: "https://lh5.googleusercontent.com/-u0CvAjW8bmk/UAhAWCy8fkI/AAAAAAAABFA/SCm7GS25k1I/6918005218.jpg", width: 1624, height: 1080 },
{title: "Статуя Марка Аврелия", url: "https://lh5.googleusercontent.com/-xf73iCkQAuI/UAhAbQuLq-I/AAAAAAAABGQ/SgwJEgL3-vk/7064083653.jpg", width: 1624, height: 1080 },
{title: "Кабинет класса &quot;люкс&quot;", url: "https://lh6.googleusercontent.com/-J55XDS4POFs/UAhC5pa3qkI/AAAAAAAABKQ/EOY3RkKs3Z0/7064957277.jpg", width: 1626, height: 1080 },
{title: "Гостиная в классическом стиле", url: "https://lh6.googleusercontent.com/-RsRci7ARGSc/UAhGMcJsp_I/AAAAAAAABRQ/tAzTM5jgQAk/7064032869.jpg", width: 1626, height: 1080 },
{title: "Гипсовая лепнина", url: "https://lh6.googleusercontent.com/-q4DRJQ3CwGY/UAhAbXkoACI/AAAAAAAABGI/ujiSwZ6AZeY/7064083333.jpg", width: 1624, height: 1080 },
{title: "Пол в кабинете", url: "https://lh5.googleusercontent.com/-570Q7GhjRUI/UAhHwhIKB6I/AAAAAAAABXg/tIRurGQZ1Lg/7064817625.jpg", width: 1620, height: 1080 },
{title: "Мраморный пол, лестница", url: "https://lh3.googleusercontent.com/-ExlpDSaMLkw/UAhGeeUR3nI/AAAAAAAABVE/UCqLb-84UCU/7064038015.jpg", width: 717, height: 1080 },
{title: "Потолки класса &quot;люкс&quot;", url: "https://lh3.googleusercontent.com/-UU8OHxvIBek/UAhC2mXQIeI/AAAAAAAABJg/aoxmFYCcRpM/7064955377.jpg", width: 1626, height: 1080 },
{title: "Укладка плитки класса &quot;люкс&quot;", url: "https://lh3.googleusercontent.com/-b_WrvYzVODA/UAhCvsM0b4I/AAAAAAAABH0/E2XCwPyFMPA/6918880148.jpg", width: 717, height: 1080 },
{title: "Санузел класса &quot;люкс&quot;", url: "https://lh3.googleusercontent.com/-dcy6rJvJXW0/UAhHp8jfzPI/AAAAAAAABWQ/8vG-Wkoh-6c/6918740720.jpg", width: 1620, height: 1080 },
{title: "Санузел класса &quot;люкс&quot;", url: "https://lh4.googleusercontent.com/-YSn6yqpoP1k/UAhHz0nAU3I/AAAAAAAABYM/z6qug4au8Go/7064818405.jpg", width: 1620, height: 1080 },
{title: "Система водоснабжения", url: "https://lh4.googleusercontent.com/-eWGZqO68ZTw/UAhHtqyhx5I/AAAAAAAABXI/B9UglgYd6tk/6918745226.jpg", width: 1620, height: 1080 },
{title: "Кабинет", url: "https://lh6.googleusercontent.com/-rAZWWHhYWDU/UAhHpR3UYtI/AAAAAAAABWU/piHJJPuEB-Y/6918740014.jpg", width: 1620, height: 1080 },
{title: "Переоборудование нежилого чердака в жилую комнату.", url: "https://lh5.googleusercontent.com/-p1fzWGlIG_s/UAhGW8ntgBI/AAAAAAAABTY/k4kYCvnEwLY/7064035629.jpg", width: 1626, height: 1080 },
{title: "Коридор между гостевой комнатой, кухней и столовой.", url: "https://lh6.googleusercontent.com/-Pt_rssHE32o/UAhAZSgMmCI/AAAAAAAABFw/cw-0D_FUdTc/7064081883.jpg", width: 1624, height: 1080 },
{title: "", url: "https://lh6.googleusercontent.com/-i3gJKv6bFU8/T_RtEqJ1abI/AAAAAAAAAhY/CE_1wyg-Kfo/s600", width: 512, height: 340}
];
</script>
<div class="center"><div class="button red"><a href="/portfolio/best/">Смотреть другие фотографии</a></div></div>
</section>
<section id="price" class="column">
<h2 class="h1 center">Сколько стоит ремонт?</h2>
<div id="calculator">
<form method="post" action="/offer.php" target="send_estimate">
<div class="calc-head">
<input type="radio" name="type" value="cott" id="cott" class="dn"><label for="cott" class="cott">Коттедж</label>
<input type="radio" name="type" value="appt" id="appt" class="dn"><label for="appt" class="appt">Квартира</label>
<div class="input" style="padding-left: 130px"><label for="area">Площадь, м²</label><input type="number" name="area" id="area" value="400" min="100" max="2000" step="1"></div>
<div class="input"><label for="wc">Санузлы</label><input type="number" name="wc" id="wc" value="3" min="1" max="8" step="1"></div>
</div>
<div class="calc-hint"><p>Задайте параметры, чтобы рассчитать стоимость работ</p></div>
<div class="calc-body">
<table>
<thead><tr><th></th><th>Бизнес</th><th>Люкс</th></tr></thead>
<tfoot><tr><td>Общая сумма (работа + материал)</td><td></td><td></td></tr></tfoot>
<tbody>
<tr><td>Отделка под ключ</td><td></td><td></td></tr>
<tr><td>Электрика под ключ</td><td></td><td></td></tr>
<tr><td>Сантехника под ключ</td><td></td><td></td></tr>
<tr><td>Отопление под ключ</td><td></td><td></td></tr>
<tr><td>Черновой материал отделка</td><td></td><td></td></tr>
<tr><td>Черновой материал электрика</td><td></td><td></td></tr>
<tr><td>Черновой материал сантехника</td><td></td><td></td></tr>
<tr><td>Черновой материал отопление</td><td></td><td></td></tr>
</tbody>
</table>
</div>
<div class="sendback">
<label for="name">Отправить эту калькуляцию на почту:</label>
<input type="text" placeholder="Имя" title="Наличие вашего имени в тексте письма снижает вероятность попадания в спам" id="name" value="" name="name" required="required">
<input type="email" placeholder="vasha@pochta.ru" title="Не волнуйтесь, кроме этого письма ничего отправлять не будем :)" id="email" value="" name="email" required="required">
<input type="hidden" name="html" value="" id="html">
<input type="submit" class="button red" value="Отправить">
</div>
</form>
<iframe src="about:blank" id="send_estimate" name="send_estimate" class="dn"></iframe>
</div>
<div class="disclaimer">
<p><img src="http://static.otdelkalux.ru/i/alert.svg" alt=""></p>
<p>В таблице указана приблизительная стоимость ремонта, основанная на опыте работы на объектах соответствующего класса. Более точную информацию по ценам мы сможем дать только после ознакомления с дизайн-проектом.</p>
</div>
</section>
<section id="circles" class="column">
<div class="cholder">
<div class="circle">
<p><b><br><br>Минимальная<br>предоплата</b></p>
<p>Оплата производится по факту завершения каждого этапа работ. Предоплата только за материал <br>+ 20% от стоимости этапа работ.</p>
</div>
</div>
<div class="cholder">
<div class="circle">
<p><b><br><br>Гарантия</b></p>
<p>В договоре прописывается гарантия <br>на ремонт и внутреннюю отделку <br>на 2 года.</p>
</div>
</div>
<div class="cholder">
<div class="circle">
<p><b><br><br>Страхование</b></p>
<p>Бесплатное страхование <br>гражданской ответственности перед <br>третьими лицами на период <br>проведения ремонта на сумму <br>1 000 000 рублей *</p>
<p><img id="ingos" src="http://static.otdelkalux.ru/i/ingos.png" alt="Страхование ответственности в Ингосстрах"></p>
</div>
<p class="comment">* — Страховой договор заключает собственник помещения, а после проведения ремонта мы компенсируем страховую премию.</p>
</div>
</section>

<section id="serge_petunin">
<div class="column">
<div class="cite">
<blockquote>
<p>Более пятнадцати лет я руковожу работами по ремонту и отделке элитных загородных домов. Я – профессионал, и знаю, что и как надо делать, и отвечаю за то, что делаю.</p>
<p>Обращаясь ко мне, вы снимаете с себя всю головную боль, связанную с ремонтом. Когда всё в одних руках, от вас требуется только поставить задачу и принять результат. Все промежуточные процессы я проведу на высшем уровне.</p>
</blockquote>
<div class="author">
<p><b itemprop="founder">Сергей Петунин</b>, руководитель работ</p>
</div>
</div>
</div>
</section>

<section id="official">
<p class="h1 center">Работаю официально</p>
<div class="docs">
<figure>
<a target="_blank" href="https://lh5.googleusercontent.com/-9W9unrwpMsM/T_6xSa50vkI/AAAAAAAAAjU/Emi7DteexcI/s1000/inn.jpg"><img src="https://lh5.googleusercontent.com/-9W9unrwpMsM/T_6xSa50vkI/AAAAAAAAAjU/Emi7DteexcI/s256/" alt="Свидетельство о присвоении ИНН"></a>
<figcaption>Свидетельство о присвоении ИНН</figcaption>
</figure>
<figure>
<a target="_blank" href="https://lh5.googleusercontent.com/-2RJvpn4FvvY/T_6xSV-ubjI/AAAAAAAAAjQ/WrSqcx0Z1n4/s1000/ogrn.jpg"><img src="https://lh5.googleusercontent.com/-2RJvpn4FvvY/T_6xSV-ubjI/AAAAAAAAAjQ/WrSqcx0Z1n4/s256/" alt="Свидетельство о регистрации юридического лица"></a>
<figcaption>Свидетельство о регистрации юридического лица</figcaption>
</figure>
<figure>
<a target="_blank" href="https://lh5.googleusercontent.com/-5QaamqERlq0/T_6xR-HCJUI/AAAAAAAAAjM/FuCI5_hhXu0/s1000/sro.jpg"><img src="https://lh5.googleusercontent.com/-5QaamqERlq0/T_6xR-HCJUI/AAAAAAAAAjM/FuCI5_hhXu0/s256/" alt="Допуск от СРО (лицензия на работу)"></a>
<figcaption>Свидетельство о допуске к работам, выданное СРО (лицензия на работу)</figcaption>
</figure>
</div>
<div class="center"><div class="button white"><a href="/docs.html">Смотреть все документы</a></div></div>
</section>

<section id="contact">
<div class="call">
<p class="w">Есть вопросы? <br>Или вы хотите согласовать <a href="/osmotr/">осмотр объекта</a>, <br>на котором мы сейчас работаем? <br>Звоните:</p>
<p class="y">+7 (495) 99-88-347</p>
</div>
<hr>
<div class="email">
<p class="w">Если у вас есть проект, и вы хотите <br>узнать, сколько будет стоить ремонт, пишите:</p>
<p class="y"><a href="mailto:hello@otdelkalux.ru?subject=Запрос%20калькуляции&amp;body=Пожалуйста,%20укажите%20Ваш%20мобильный%20телефон,%20чтобы%20я%20мог%20оперативно%20уточнить%20у%20Вас%20какие-то%20вопросы.">hello@otdelkalux.ru</a></p>
<p>Я постараюсь ответить в течение <b>двух</b> рабочих дней.</p>
</div>
<hr>
<div class="ready"><img src="https://lh3.googleusercontent.com/-JvCJh1G2RCk/T75YMe9Xg-I/AAAAAAAAAhQ/v0P0lGT7j9A/s56/" alt="Сергей Петунин">Готов <b>оперативно</b> приехать к вам на объект для знакомства и обсуждения деталей предстоящего ремонта!</div>
</section>


<section id="other" class="center">
<figure id="youtube">
<figcaption>Запись выпуска передачи «<b>Проект мечты</b>» на телеканале «<b>Усадьба</b>» о строительстве <a href="/portfolio/leningradskoe_37/">дома в римском стиле</a> с участием руководителя проекта&nbsp;— Сергея Петунина. <br><a href="http://www.tv-stream.ru/tv/usadba" rel="nofollow" target="_blank"><img src="http://static.otdelkalux.ru/i/usadba.png" alt="Телеканал Усадьба"></a></figcaption>
</figure>
<div style="margin: 50px auto;" class="likes yashare-auto-init" data-yashareL10n="ru" data-yashareTitle="Артель Сергея Петунина" data-yashareDescription="Полный комплекс работ по элитному ремонту и внутренней отделке коттеджей, загородных домов и таунхаусов под ключ. Наша специализация: внутренняя отделка, монтаж электрики, сантехники, отопления, а также ландшафтные работы." data-yashareImage="https://lh6.googleusercontent.com/-tA-Yr-ZRJqI/UEoo-61MQVI/AAAAAAAAB1E/uTM00UyxDWk/s150-c/" data-yashareQuickServices="vkontakte,gplus,facebook,twitter" data-yashareTheme="counter" data-yashareType="small"></div>
</section>

<footer>
<p class="title">Артель Сергея Петунина</p>
<div class="info">
<div itemprop="description">
<p>Полный комплекс работ по элитному ремонту и внутренней отделке коттеджей, загородных домов и таунхаусов под ключ.</p>
<p>Наша специализация: внутренняя отделка, монтаж электрики, сантехники, отопления, а также ландшафтные работы.</p>
</div>
<div>
<p><b>Офис в Millennium Park</b></p>
<p itemprop="address">Московская область, Новорижское ш., посёлок Миллениум Парк, вл. 3041</p>
<p><a itemprop="map" target="_blank" href="http://maps.yandex.ru/-/CVuAJ6O4">На карте</a></p>
<br>
<p><b>Офис в Madison Park</b></p>
<p itemprop="address">Московская область, Новорижское ш., посёлок Мэдисон Парк, вл. 15</p>
<p><a itemprop="map" target="_blank" href="http://maps.yandex.ru/-/CVEO74NH">На карте</a></p>
</div>
<div>
<p><b>Связаться со мной</b></p>
<p itemprop="telephone">+7 (495) 99-88-347</p>
<p><a itemprop="email" href="mailto:hello@otdelkalux.ru">hello@otdelkalux.ru</a></p>
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