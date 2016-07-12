<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\OAuth;
use League\OAuth2\Client\Provider\Google;

date_default_timezone_set('Etc/UTC');
require 'vendor/autoload.php';

$mail = new PHPMailer;

$mail->isSMTP();
$mail->SMTPDebug = 0;
$mail->Host = 'smtp.gmail.com';
$mail->Port = 587;
$mail->SMTPSecure = 'tls';
$mail->SMTPAuth = true;
$mail->AuthType = 'XOAUTH2';

$email = 'hello@otdelkalux.ru';
$clientId = '407883698840-g6u0bk2ik8gvsurmcqvdnedkfvr0cbd1.apps.googleusercontent.com';
$clientSecret = 'CbKXl9CL05GuSqL_BrE-lOEs';
$refreshToken = '1/O8n1h5Xr49CTOFTkyCLHsyJoVlp8Z_JFTWUf289x8aA';

//Create a new OAuth2 provider instance
$provider = new Google([
    'clientId' => $clientId,
    'clientSecret' => $clientSecret
]);

//Pass the OAuth provider instance to PHPMailer
$mail->setOAuth(
    new OAuth([
        'provider' => $provider,
        'clientId' => $clientId,
        'clientSecret' => $clientSecret,
        'refreshToken' => $refreshToken,
        'userName' => $email
    ])
);

$mail->CharSet = 'UTF-8';
$mail->setFrom('hello@otdelkalux.ru', 'Сергей Петунин');
$mail->AddBCC('rso2000@mail.ru');

if (isset($_POST['name']) && isset($_POST['email'])) {
	$name = $_POST['name'];
	$type = $_POST['type'];
	$area = $_POST['area'];
	$wc = $_POST['wc'];
	$html = $_POST['html'];
	$email = $_POST['email'];

	$mail->addAddress($email);
	$mail->isHTML(true);
	$mail->Subject = 'Калькуляция стоимости ремонта (www.otdelkalux.ru)';

	$mail->Body    =  <<<EOF
<!DOCTYPE html>
<html lang="ru">
<head>
<title>Калькуляция стоимости ремонта коттеджа/квартиры $type (www.otdelkalux.ru)</title>
<meta http-equiv="X-UA-Compatible" content="IE=Edge, chrome=1"/>
<meta name="viewport" content="width=1000"/>
<style type="text/css">
body	{ font-family: Arial; }
table		{ width: 100%; font-weight: bold; border-collapse: collapse; border: 2px solid #666; margin: 40px 0; }
tbody td	{ border-bottom: 1px solid #bbb; padding: 12px; font-size: 14px; color: #919191; }
th			{ padding: 20px 0; background-color: #eee; }
tfoot td	{ font-size: 17px; color: #383838; padding: 30px 10px; }
.otd-pk td	{ border-top: 1px solid #000; }
tr:first-child td	{ border-top: 1px solid #000; }
td:nth-child(n+1)	{ text-align: center; }
td:nth-child(1)		{ text-align: left; width: 400px; }
tr:nth-child(4n) td	{ border-color: #000; }
</style>
</head>
<body>
<h1>Здравствуйте, $name!</h1>
<p>Высылаю приблизительную смету на ремонт вашего загородного дома площадью <b>$area м²</b> с <b>$wc санузлами</b><!-- 1 санузлоМ -->.</p>
<p>Смета расчитана с помощью <a href="https://www.otdelkalux.ru/price/calculator.html?utm_source=estimate&utm_medium=email&utm_campaign=otdelkalux">калькулятора</a> и является приблизительной оценкой.</p>
<p>Если у вас уже есть проектная документация по ремонту дома, <mark><b>высылайте её в ответ на это письмо</b></mark> с указанием:</p>
<ol>
<li>вашего номера мобильного телефона</li>
<li>географического расположения объекта</li>
</ol>
<p>Я составлю детальную смету, <b>учитывающую все особенности</b> вашего проекта.</p>
<table>

$html

</table>

<p><b>Осмотр объектов</b></p>
<p>Приглашаю вас на осмотр любого из объектов, на которых мы сейчас работаем. </p>
<p>Вы сможете лично увидеть процесс ремонта, оборудование, специалистов, организацию их размещения и питания, и сделать вывод о нашей квалификации. Такая оценка даёт гораздо лучшее представление об уровне компании, чем любые фотографии и отзывы в интернете.</p>
<p>Полный и актуальный список объектов, на которых мы сейчас работаем, можно найти здесь: <a href="http://www.otdelkalux.ru/osmotr/?utm_source=estimate&utm_medium=email&utm_campaign=otdelkalux">www.otdelkalux.ru/osmotr/</a>.</p>
<p>Мне действительно есть что показать, приезжайте в удобное время!</p>


<hr style="margin: 30px 0"/>
<img style="float: left" alt="Сергей Петунин" src="https://lh6.googleusercontent.com/-tA-Yr-ZRJqI/UEoo-61MQVI/AAAAAAAAB1E/uTM00UyxDWk/s150-c/" />
<div style="margin-left: 250px">
<p><b>Сергей Петунин</b>, руководитель работ</p>
<p><a href="https://www.otdelkalux.ru/?utm_source=estimate&utm_medium=email&utm_campaign=otdelkalux">www.otdelkalux.ru/</a></p>
<p>+7 (495) 99-88-347</p><p>+7 (926) 709-62-18</p>
<a href="mailto:hello@otdelkalux.ru">hello@otdelkalux.ru</a>
<p>Портфолио работ на Flickr: <a href="//www.flickr.com/photos/otdelkalux/sets/">//www.flickr.com/photos/otdelkalux/sets/</a></p>
</div>
</body>
</html>
EOF;
	
	if (!$mail->send()) {
		echo "<!DOCTYPE html><html><head><script type=\"text/javascript\">alert('Произошла ошибка и письмо не было отправлено!');</script><title>Спасибо</title></head></html>";
	} else {
		echo "<!DOCTYPE html><html><head><script type=\"text/javascript\">alert('Калькуляция отправлена вам на почту. Спасибо!');</script><title>Спасибо</title></head></html>";
	}
}
?>