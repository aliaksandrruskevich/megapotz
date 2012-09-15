<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/style.css" />
	<?php  Yii::app()->clientScript->registerCoreScript('jquery'); ?>
	<?php  Yii::app()->clientScript->registerScriptFile(Yii::app()->request->baseUrl.'/js/main.js');?>
	<title><?php echo CHtml::encode($this->pageTitle); ?></title>
</head>

  <body>
    <div id="wrapper">
		<div id="login_form">
		<div id="login_title"><img id="title_icon" src="<?=Yii::app()->request->baseUrl?>/images/login_title.png"/></div>
		<div class="info">
          <?php $form=$this->beginWidget('CActiveForm', array(
          'id'=>'login-form',
          'enableClientValidation'=>true,
          'clientOptions'=>array(
              'validateOnSubmit'=>true,
      ),
      )); ?>
		<div id="login"><p>Логин</p></div>
			<div class="input_field">
				<div id="lt_lg"></div>
				<div id="center_lg"><?php echo $form->textField($model,'username'); ?></div>
				<div id="rt_lg"></div>
			</div>
		</div>
		<div class="info">
		<div id="password"><p>Пароль</p></div>
			<div class="input_field">
				<div id="lt_lg"></div>
				<div id="center_lg"><?php echo $form->passwordField($model,'password'); ?></div>
				<div id="rt_lg"></div>
			</div>
		</div>
        <div id="rememberMe">
		<?php echo $form->checkBox($model,'rememberMe'); ?>
		<?php echo $form->label($model,'rememberMe'); ?>
        </div>
		<!--<div id="forgot"><a href="" onclick="send_password();return false;">Забыли пароль?</a></div>/-->
		<?php echo CHtml::submitButton('Войти',array('class'=>'bt','id'=>'log_in')); ?>
<?php $this->endWidget(); ?>
		</div>
		</div>
	<div id="err_message"><?echo $form->errorSummary($model);?></div>
  </body>
</html>
