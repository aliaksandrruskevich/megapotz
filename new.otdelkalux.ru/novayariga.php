<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\OAuth;
use League\OAuth2\Client\Provider\Google;

date_default_timezone_set('Etc/UTC');
require 'vendor/autoload.php';

$recaptcha = new \ReCaptcha\ReCaptcha("6LevMR4TAAAAAPELgNHOhsXFt0MRHSutVB82i0Gu");

$mail = new PHPMailer;

$mail->isSMTP();
$mail->SMTPDebug = 0;
$mail->Host = 'smtp.gmail.com';
$mail->Port = 465;
$mail->SMTPSecure = 'ssl';
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

if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['g-recaptcha-response'])) {

	$name = $_POST['name'];
	$area = $_POST['area'];
	$email = $_POST['email'];
	$phone = $_POST['phone'];
	$date = $_POST['date'];
	$village = $_POST['village'];
	$comment = $_POST['comment'];
	
	$mail->addAddress($email);
	
	$mail->isHTML(true);
	$mail->Subject = 'Согласование встречи для осмотра объекта (www.otdelkalux.ru)';
	$mail->Body    = <<<EOF
<!DOCTYPE html>
<html lang="ru">
<head>
<title>Согласование встречи для осмотра объекта</title>
<meta http-equiv="X-UA-Compatible" content="IE=Edge, chrome=1"/>
<meta name="viewport" content="width=1000"/>
<style type="text/css">
body	{ font-family: Arial; }
</style>
</head>
<body>
<h1>Здравствуйте, $name!</h1>
<p>Я получил ваше приглашение на осмотр. В ближайшее время я с вами свяжусь для уточнения деталей. Спасибо!</p>
<dl>
<dt>Пожалуйста, проверьте правильность данных:</dt>
<dd for="phone" style="margin-top: 20px">Телефон: $phone</dd>
<dd for="email">Email: $email</dd>
<dd for="date">Дата и время встречи: $date</dd>
<dd for="area">Площадь дома: $area</dd>
<dd for="village">Название посёлка: $village</dd>
<dd for="comment">Комментарий: $comment</dd>
</dl>
<hr style="margin: 30px 0"/>
<img style="float: left" alt="Сергей Петунин" src="https://lh6.googleusercontent.com/-tA-Yr-ZRJqI/UEoo-61MQVI/AAAAAAAAB1E/uTM00UyxDWk/s150-c/" />
<div style="margin-left: 250px">
<p><b>Сергей Петунин</b>, руководитель работ</p>
<p><a href="https://www.otdelkalux.ru/?utm_source=estimate&utm_medium=email&utm_campaign=otdelkalux">www.otdelkalux.ru/</a></p>
<p>+7 (495) 99-88-347</p><p>+7 (926) 709-62-18</p>
<a href="mailto:hello@otdelkalux.ru">hello@otdelkalux.ru</a>
<p>Портфолио работ на Flickr: <a href="//www.flickr.com/photos/otdelkalux/sets/">www.flickr.com/photos/otdelkalux/sets/</a></p>
</div>
</body>
</html>
EOF;

	$resp = $recaptcha->verify($_POST['g-recaptcha-response'], $_SERVER['REMOTE_ADDR']);
	if ($resp->isSuccess()) {
		if (!$mail->send()) {
			echo "<!DOCTYPE html><html><head><script type=\"text/javascript\">alert('Произошла ошибка и письмо не было отправлено!');</script><title>Спасибо</title></head></html>";
		} else {
			echo "<!DOCTYPE html><html><head><script type=\"text/javascript\">alert('В ближайшее время я свяжусь с вами для уточнения деталей. Спасибо!');</script><title>Спасибо</title></head></html>";
		}
	} else {
		$errors = implode($resp->getErrorCodes());
		echo "<!DOCTYPE html><html><head><script type=\"text/javascript\">alert('Не пройдена проверка капчи! Ошибка: $errors');</script><title>Спасибо</title></head></html>";
	}
	
}
?>