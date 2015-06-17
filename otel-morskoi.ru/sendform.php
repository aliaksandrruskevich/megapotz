<?php
function server_parse($socket, $expected_response)
{
	$server_response = '';
	while (substr($server_response, 3, 1) != ' ')
	{
		if (!($server_response = fgets($socket, 256)))
			echo 'Couldn\'t get mail server response codes.', __FILE__, __LINE__;
	}

	if (!(substr($server_response, 0, 3) == $expected_response))
		echo 'Unable to send e-mail. Please contact the forum administrator with the following error message reported by the SMTP server: "'.$server_response.'"', __FILE__, __LINE__;
}

function smtp_mail($to, $subject, $message, $headers)
{
	$recipients = explode(',', $to);
	$user = 'book@otel-morskoi.ru';
	$pass = 'QqWw12345';
	$smtp_host = 'ssl://smtp.mail.ru';
	$smtp_port = 465;

	if (!($socket = fsockopen($smtp_host, $smtp_port, $errno, $errstr, 15)))
		echo "Could not connect to smtp host '$smtp_host' ($errno) ($errstr)", __FILE__, __LINE__;

	server_parse($socket, '220');

	fputs($socket, "EHLO smtp.mail.ru\r\n");
	server_parse($socket, '250');

	fwrite($socket, 'AUTH LOGIN'."\r\n");
	server_parse($socket, '334');

	fwrite($socket, base64_encode($user)."\r\n");
	server_parse($socket, '334');

	fwrite($socket, base64_encode($pass)."\r\n");
	server_parse($socket, '235');

	fwrite($socket, 'MAIL FROM: <book@otel-morskoi.ru>'."\r\n");
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

$name	= $_POST['name'];
$tel	= $_POST['tel'];
$more	= $_POST['more'];
$email	= $_POST['email'];
$check	= $_POST['check'];

if ($check == 5) {


	$subject = "Отель Морской: Бронирование отдыха";
	$to_client = "<p><b>$name</b>,</p><p>Ваша заявка принята, и в ближайшее время с вами свяжется менеджер. Пожалуйста, проверьте, правильно ли вы указали номер телефона: <b>$tel</b>.</p><p>Спасибо!</p>";
	$to_manager = "<p>Имя: $name</p><p>Телефон: $tel</p><p>Email: $email</p><p>Комментарий: $more</p>";
	
	if(smtp_mail($email, $subject, $to_client, "MIME-Version: 1.0\r\nContent-Type: text/html; charset=utf-8\r\nContent-Transfer-Encoding: 8bit"))
	{
		smtp_mail("book@otel-morskoi.ru", $subject, $to_manager, "Reply-To: $email\r\nMIME-Version: 1.0\r\nContent-Type: text/html; charset=utf-8\r\nContent-Transfer-Encoding: 8bit");
		//enikologorskaya@gmail.com From: Елена Никологорская\r\n
		header('Location: http://www.otel-morskoi.ru/thanks.html');
	}
	else
	{
		header('Location: http://www.otel-morskoi.ru/sorry.html');
	}
}
?>