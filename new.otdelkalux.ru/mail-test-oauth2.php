<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\OAuth;
use League\OAuth2\Client\Provider\Google;

date_default_timezone_set('Etc/UTC');
require 'vendor/autoload.php';

$mail = new PHPMailer;

$mail->isSMTP();
$mail->SMTPDebug = 2;
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