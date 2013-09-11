<?
if(!empty($_REQUEST['tel']) && !empty($_REQUEST['name'])) {
  
  $title = trim("Просьба перезвонить"); 
  
  $msg = <<<EOF
  
  <!DOCTYPE html>
<html lang="ru">
<head>
<title>Калькуляция стоимости ремонта (www.otdelkalux.ru)</title>
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
<h1>Здравствуйте, Иван!</h1>
<p>Высылаю приблизительную смету на ремонт вашего загородного дома площадью <b>400 м?</b> с <b>3 санузлами</b><!-- 1 санузлоМ -->.</p>
<p>Смета расчитана с помощью <a href="www.otdelkalux.ru/price/calculator.html?utm_source=estimate&utm_medium=email&utm_campaign=otdelkalux">калькулятора</a> и является приблизительной оценкой.</p>
<p>Если у вас уже есть проектная документация по ремонту дома, <mark><b>высылайте её в ответ на это письмо</b></mark> с указанием:</p>
<ol>
<li>вашего номера мобильного телефона</li>
<li>географического расположения объекта</li>
</ol>
<p>Я составлю детальную смету, <b>учитывающую все особенности</b> вашего проекта.</p>
<table>
<thead>
<tr><th></th><th>Бизнес</th><th>Люкс</th></tr>
</thead>
<tfoot>
<tr><td>Общая сумма (работа + материал)</td><td>2000</td><td>2000</td></tr>
</tfoot>
<tbody>
<tr><td>Отделка под ключ</td><td>1000</td><td>1000</td></tr>
<tr><td>Электрика под ключ</td><td>1000</td><td>1000</td></tr>
<tr><td>Сантехника под ключ</td><td>1000</td><td>1000</td></tr>
<tr><td>Отопление под ключ</td><td>1000</td><td>1000</td></tr>
<tr><td>Черновой материал отделка</td><td>1000</td><td>1000</td></tr>
<tr><td>Черновой материал электрика</td><td>1000</td><td>1000</td></tr>
<tr><td>Черновой материал сантехника</td><td>1000</td><td>1000</td></tr>
<tr><td>Черновой материал отопление</td><td>1000</td><td>1000</td></tr>
</tbody>
</table>

<p><b>Осмотр объектов</b></p>
<p>Приглашаю вас на осмотр любого из объектов, на которых мы сейчас работаем. </p>
<p>Вы сможете лично увидеть процесс ремонта, оборудование, специалистов, организацию их размещения и питания, и сделать вывод о нашей квалификации. Такая оценка даёт гораздо лучшее представление об уровне компании, чем любые фотографии и отзывы в интернете.</p>
<p>Полный и актуальный список объектов, на которых мы сейчас работаем, можно найти здесь: <a href="http://www.otdelkalux.ru/osmotr/?utm_source=estimate&utm_medium=email&utm_campaign=otdelkalux">www.otdelkalux.ru/osmotr/</a>.</p>
<p>Мне действительно есть что показать, приезжайте в удобное время!</p>


<hr style="margin: 30px 0"/>
<img style="float: left" alt="Сергей Петунин" src="data:image/jpeg;base64,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" />
<div style="margin-left: 250px">
<p><b>Сергей Петунин</b>, руководитель работ</p>
<p><a href="http://www.otdelkalux.ru/?utm_source=estimate&utm_medium=email&utm_campaign=otdelkalux">www.otdelkalux.ru/</a></p>
<p>+7 (495) 99-88-347</p>
<a href="mailto:hello@otdelkalux.ru">hello@otdelkalux.ru</a>
<p>Портфолио работ на Flickr: <a href="http://www.flickr.com/photos/otdelkalux/sets/">http://www.flickr.com/photos/otdelkalux/sets/</a></p>
</div>
</body>
</html>
EOF;
  
  $mess =  htmlspecialchars(trim($msg)); 
  // $to - кому отправляем 
  $to = '_mike_@list.ru'; 
  // $from - от кого 
  $from='hello@otdelkalux.ru'; 

  // функция которая отправляет смс
  //$ret=send_sms('79859988347', $mess, 'megapotz', 'QqWw123');

  // функция, которая отправляет наше письмо. 
  mail($to, $title, iconv('utf-8', 'windows-1251', $msg), 'From:'.$from); 
  
  echo $msg;

  
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
<!DOCTYPE html>
<html>
<head>
<script type="text/javascript">alert('Калькуляция отправлена вам на почту. Спасибо!');</script>
<title>Спасибо</title>
</head>
</html>