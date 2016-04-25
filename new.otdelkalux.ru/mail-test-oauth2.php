<?php

namespace PHPMailer\PHPMailer;
date_default_timezone_set('Etc/UTC');
require 'phpmailer.php';

$mail = new PHPMailer;
$mail->isSMTP();
$mail->SMTPDebug = 2;
$mail->Debugoutput = 'html';

$mail->Host = 'smtp.gmail.com';
$mail->Port = 587;
$mail->SMTPSecure = 'tls';
$mail->SMTPAuth = true;
//$mail->AuthType = 'XOAUTH2';

//Username to use for SMTP authentication - use full email address for gmail
$mail->Username = "hello@otdelkalux.ru";

//Password to use for SMTP authentication
$mail->Password = "serge775150";

/*
$email = 'hello@otdelkalux.ru';
$clientId = '407883698840-47e4rhg839eh8fm3qsfuva8b46acnl36.apps.googleusercontent.com';
$clientSecret = 'xr1Q08dGYjpSFLrwWB7laBb3';
$refreshToken = '1/JRTle_utTpfG4Mz_Z1fQiCf-qrNXzkS2PDg4iaqSHa4';

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

*/

$mail->CharSet = 'UTF-8';
$mail->setFrom('hello@otdelkalux.ru', 'Сергей Петунин');
$mail->addAddress('mike.shestakov@gmail.com');     // Add a recipient
$mail->isHTML(true);                               // Set email format to HTML

$mail->Subject = 'Here is the subject';
$mail->Body    = 'This is the HTML message body <b>in bold!</b>';
$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message has been sent';
}