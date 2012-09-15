<?
if(!empty($_REQUEST['tel']) && !empty($_REQUEST['name'])) {
  
  $title = trim("Просьба перезвонить"); 
  $mess =  htmlspecialchars(trim("Клиент: $_REQUEST[name], телефон: $_REQUEST[tel] просит ему перезвонить")); 
  // $to - кому отправляем 
  $to = 'rso2000@mail.ru'; 
  //$to = 'dimanmurzin@gmail.com';
  // $from - от кого 
  $from='feedback@otdelkalux.ru'; 

  // функция которая отправляет смс
  $ret=send_sms('79091513156', $mess, 'megapotz', 'QqWw123');

  // функция, которая отправляет наше письмо. 
  mail($to, $title, $mess, 'From:'.$from); 

  
}

function send_sms($to, $msg, $login, $password)
  {
	$msg= iconv('utf-8', 'windows-1251', $msg); // кирилица
	$u = 'http://www.websms.ru/http_in5.asp';
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_TIMEOUT, 10);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS,
	'Http_username='.urlencode($login).'&Http_password='.urlencode($password).'&Phone_list='.$to.'&Message='.urlencode($msg).'&fromPhone=otdelkalux');
	curl_setopt($ch, CURLOPT_URL, $u);
	$u = trim(curl_exec($ch));
	curl_close($ch);
	preg_match("/message_id\s*=\s*[0-9]+/i", $u, $arr_id );
	$id = preg_replace("/message_id\s*=\s*/i", "", @strval($arr_id[0]) );
	return $id;
  }

?>
<!DOCTYPE html><html>
  <head>
	<script type="text/javascript">parent.document.getElementById('callback_form').className='sent';</script>
  </head>
  <body>
	
  </body>
</html>