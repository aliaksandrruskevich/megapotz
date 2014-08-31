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

	fwrite($socket, 'Subject: '.$subject."\r\n".'To: <'.implode('>, <', $recipients).'>'."\r\n".$headers."\r\nFrom: Сергей Петунин <hello@otdelkalux.ru>\r\n\r\n".$message."\r\n");

	fwrite($socket, '.'."\r\n");
	server_parse($socket, '250');

	fwrite($socket, 'QUIT'."\r\n");
	fclose($socket);

	return true;
}

if (isset($_POST['name']) && isset($_POST['email'])) {
	$name = $_POST['name'];
	$area = $_POST['area'];
	$email = $_POST['email'];
	$phone = $_POST['phone'];
	$date = $_POST['date'];
	$village = $_POST['village'];
	$comment = $_POST['comment'];

	$msg = <<<EOF
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
	$subject = "Согласование встречи для осмотра объекта (www.otdelkalux.ru)";
	
	if(smtp_mail($email.', rso2000@mail.ru', $subject, $msg, "MIME-Version: 1.0\r\nContent-Type: text/html; charset=utf-8\r\nContent-Transfer-Encoding: 8bit"))
	{
		echo "<!DOCTYPE html><html><head><script type=\"text/javascript\">alert('В ближайшее время я свяжусь с вами для уточнения деталей. Спасибо!');</script><title>Спасибо</title></head></html>";
	}
	else
	{
		echo "<!DOCTYPE html><html><head><script type=\"text/javascript\">alert('Произошла ошибка и письмо не было отправлено!');</script><title>Спасибо</title></head></html>";
	}
}
?>