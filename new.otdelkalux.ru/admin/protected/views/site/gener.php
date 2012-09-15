<h3><? echo ' Генерация страниц сайта';?></h3>
<div id="page_area">
<?=$data?>
</div>
<?if(!empty($redirect)) { ?>
<script>setTimeout('location.href="/admin/site/<?=$redirect?>"',1000);</script>
<?}?>