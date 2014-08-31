<?php
function server_parse($socket, $expected_response)
{
	$server_response = '';
	while (substr($server_response, 3, 1) != ' ')
	{
		if (!($server_response = fgets($socket, 256)))
			echo 'Couldn\'t get mail server response codes. Please contact the forum administrator.', __FILE__, __LINE__;
	}

	if (!(substr($server_response, 0, 3) == $expected_response))
		echo 'Unable to send e-mail. Please contact the forum administrator with the following error message reported by the SMTP server: "'.$server_response.'"', __FILE__, __LINE__;
}

function smtp_mail($to, $subject, $message, $headers)
{
	$recipients = explode(',', $to);
	$user = 'hello@otdelkalux.ru';
	$pass = 'serge775150';
	$smtp_host = 'ssl://smtp.gmail.com';
	$smtp_port = 465;

	if (!($socket = fsockopen($smtp_host, $smtp_port, $errno, $errstr, 15)))
		echo "Could not connect to smtp host '$smtp_host' ($errno) ($errstr)", __FILE__, __LINE__;

	server_parse($socket, '220');

	fwrite($socket, 'EHLO '.$smtp_host."\r\n");
	server_parse($socket, '250');

	fwrite($socket, 'AUTH LOGIN'."\r\n");
	server_parse($socket, '334');

	fwrite($socket, base64_encode($user)."\r\n");
	server_parse($socket, '334');

	fwrite($socket, base64_encode($pass)."\r\n");
	server_parse($socket, '235');

	fwrite($socket, 'MAIL FROM: <hello@otdelkalux.ru>'."\r\n");
	server_parse($socket, '250');

	foreach ($recipients as $email)
	{
		fwrite($socket, 'RCPT TO: <'.$email.'>'."\r\n");
		server_parse($socket, '250');
	}

	fwrite($socket, 'DATA'."\r\n");
	server_parse($socket, '354');

	fwrite($socket, 'Subject: '.$subject."\r\n".'To: <'.implode('>, <', $recipients).'>'."\r\n".$headers."\r\n\r\n".$message."\r\n");

	fwrite($socket, '.'."\r\n");
	server_parse($socket, '250');

	fwrite($socket, 'QUIT'."\r\n");
	fclose($socket);

	return true;
}

if (isset($_POST['name']) && isset($_POST['email'])) {
	$name = $_POST['name'];
	$type = $_POST['type'];
	$area = $_POST['area'];
	$wc = $_POST['wc'];
	$html = $_POST['html'];
	$email = $_POST['email'];

	$msg = <<<EOF
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
	$subject = "Калькуляция стоимости ремонта (www.otdelkalux.ru)";
	
	if(smtp_mail($email, $subject, $msg, "MIME-Version: 1.0\r\nContent-Type: text/html; charset=utf-8\r\nContent-Transfer-Encoding: 8bit"))
	{
		echo "<!DOCTYPE html><html><head><script type=\"text/javascript\">alert('Калькуляция отправлена вам на почту. Спасибо!');</script><title>Спасибо</title></head></html>";
	}
	else
	{
		echo "<!DOCTYPE html><html><head><script type=\"text/javascript\">alert('Произошла ошибка и письмо не было отправлено!');</script><title>Спасибо</title></head></html>";
	}
}
?>