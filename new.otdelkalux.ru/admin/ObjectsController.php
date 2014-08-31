<?php

class ObjectsController extends Controller
{

	public $lt_menu='objs';

    public function accessRules()
	{
      $isAdmin = "isset(Yii::app()->user->role) && (Yii::app()->user->role==='admin')";
      $isEditor = "isset(Yii::app()->user->role) && (Yii::app()->user->role==='editor')";
		return array(
			array('allow',
              'users'=>array('@'),
              'expression' =>$isAdmin,
			),
            array('allow',
              'users'=>array('@'),
              'expression' =>$isEditor,
			),
			array('deny',
				'users'=>array('*'),
              ),
		);
	}
	
	 public function actionIndex($type=0)	{
      Controller::setPageTitle('Объекты');

      $model=new Objects ('search');
	  $model->unsetAttributes();
	  if(isset($_GET['Objects']))
		  $model->attributes=$_GET['Objects'];
	  
	  // для кнопки вернутся назад
	  $attrs=$_GET['Objects'];
	  $attrs['type']=$type;

	  $session=new CHttpSession;
	  $session->open();
	  $session['back_url']=$this->createUrl('objects/index',$attrs); 
	  
      $this->render('index',array('type'=>$type,'model'=>$model,));
	}
	
	public function actionCreate($type=0)
	{
        Controller::setPageTitle('Создать объект');
		$model=new Objects;
		$model->type = $type;

		if(isset($_POST['Objects']))
		{
			$post=$_POST['Objects'];
			$post['date']=$this->DateToTtamp($post['date']);
			$model->attributes=$post;
			$model->user_id=Yii::app()->user->id;

			if($model->save()) {				
				Yii::app()->user->setFlash('success',"Изменения сохранены");
				$this->redirect(array('update','id'=>$model->id));
			}
		}

		$this->render('create',array(
			'model'=>$model
		));
	}

	public function actionUpdate($id)
	{
        Controller::setPageTitle('Редактирование');
		$model=$this->loadModel($id);

		
		if(isset($_POST['Objects']))
		{
		  //echo "<pre>"; print_r(Yii::app()->user->id); echo "</pre>";
			$post=$_POST['Objects'];
			$post['date']=$this->DateToTtamp($post['date']);
            $model->attributes=$post;
            $model->user_id=Yii::app()->user->id;


			if($model->save()) {
              Yii::app()->user->setFlash('success',"Изменения сохранены");
				//$this->redirect(array('view','id'=>$model->id));
			}
		}

		
		$this->render('update',array(
			'model'=>$model
		));
	}
	
	public function actionDelete($id)
	{
		if(Yii::app()->request->isPostRequest)
		{
			// we only allow deletion via POST request
			$this->loadModel($id)->delete();

			// if AJAX request (triggered by deletion via admin grid view), we should not redirect the browser
			if(!isset($_GET['ajax']))
				$this->redirect(isset($_POST['returnUrl']) ? $_POST['returnUrl'] : array('admin'));
		}
		else
			throw new CHttpException(400,'Invalid request. Please do not repeat this request again.');
	}

	public function loadModel($id)
	{
		$model=Objects::model()->findByPk($id);
		if($model===null)
			throw new CHttpException(404,'The requested page does not exist.');
		return $model;
	}

//	protected function performAjaxValidation($model)
//	{
//		if(isset($_POST['ajax']) && $_POST['ajax']==='objects-form')
//		{
//			echo CActiveForm::validate($model);
//			Yii::app()->end();
//		}
//	}

    public function actionShow ($id)
    {
        $model = $this->loadModel($id);
        $model->status = 0;
        $model->save();
        $this->redirect(Yii::app()->session['back_url']);
    }

    public function actionHide ($id)
    {
        $model = $this->loadModel($id);
        $model->status = 1;
        $model->save();
        $this->redirect(Yii::app()->session['back_url']);
    }
}