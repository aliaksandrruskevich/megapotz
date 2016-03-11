<?php
class SiteController extends Controller
{
	public function actions()
	{
		return array(
			// captcha action renders the CAPTCHA image displayed on the contact page
			'captcha'=>array(
				'class'=>'CCaptchaAction',
				'backColor'=>0xFFFFFF,
			),
			// page action renders "static" pages stored under 'protected/views/site/pages'
			// They can be accessed via: index.php?r=site/page&view=FileName
			'page'=>array(
				'class'=>'CViewAction',
			),
		);
	}

	public function accessRules()
	{
      $isAdmin = "isset(Yii::app()->user->role) && (Yii::app()->user->role==='admin')";
      $isEditor = "isset(Yii::app()->user->role) && (Yii::app()->user->role==='editor')";
		return array(
			array('allow',
              'users'=>array('@'),
			  'actions'=>array('GenerateSite,GetImagesXHR'),
              'expression' =>$isAdmin,
			),
            array('allow',
              'users'=>array('@'),
			  'actions'=>array('GenerateSite,GetImagesXHR'),
              'expression' =>$isEditor,
			),
			array('deny',
                'actions'=>array('GenerateSite,GetImagesXHR'),
                'users'=>array('*'),
            ),

			
		);
	}
	
	public function actionIndex()
	{
		$this->render('index');
	}

	
	public function actionError()
	{
	    if($error=Yii::app()->errorHandler->error)
	    {
	    	if(Yii::app()->request->isAjaxRequest)
	    		echo $error['message'];
	    	elseif($error['code']==403) {
			  $this->renderPartial('error403', $error);
			}
			else {
	          $this->render('error', $error);
			}
	    }
	}

//	public function actionContact()
//	{
//		$model=new ContactForm;
//		if(isset($_POST['ContactForm']))
//		{
//			$model->attributes=$_POST['ContactForm'];
//			if($model->validate())
//			{
//				$headers="From: {$model->email}\r\nReply-To: {$model->email}";
//				mail(Yii::app()->params['adminEmail'],$model->subject,$model->body,$headers);
//				Yii::app()->user->setFlash('contact','Thank you for contacting us. We will respond to you as soon as possible.');
//				$this->refresh();
//			}
//		}
//		$this->render('contact',array('model'=>$model));
//	}

	public function actionLogin()
	{
		$this->layout=false;
		$model=new LoginForm;

		// if it is ajax validation request
		if(isset($_POST['ajax']) && $_POST['ajax']==='login-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}

		// collect user input data
		if(isset($_POST['LoginForm']))
		{
			$model->attributes=$_POST['LoginForm'];
			if($model->validate() && $model->login())
            {
               $user=Users::model()->find('LOWER(login)=:login',array(':login'=>strtolower($_POST['LoginForm']['username'])));
               $user->last_login_date=date('Y-m-d H:i:s');
               $user->save();
               $this->redirect(Yii::app()->request->baseUrl.'/objects/index/?type=1');
            }
		}
		// display the login form
		$this->render('login',array('model'=>$model));
	}

	public function actionLogout()
	{
		Yii::app()->user->logout();
		$this->redirect(Yii::app()->homeUrl);
	}
	
	function actionGenerateSite() {
	  $data="";
	  $data.= '<b>Генерация главной страницы</b><br/>';	 
	  $data.= $this->index_page();
	  
	  $data.= '<b>Генерация страницы портфолио</b><br/>';	  
	  $data.= $this->portfolio_page();

	  $data.= '<b>Генерация объектов в процессе</b><br/>';	  
	  $data.= $this->process_page();
	  
	  $objects=$this->get_all_objects();
	  foreach($objects as $obj) {
		$data.= '<b>Генерация страницы объекта: '.$obj->title.' </b><br/>';
		$data.= $this->object_page($obj->id);
	  }
	  
	  //$data.= '<b>Генерация страницы лучших объектов</b><br/>';	  
	  //$data.=$this->best_page();
	  $objects=$this->get_all_process();
	  $data.='__'.count($objects);
	  foreach($objects as $obj) {
		$data.= '<b>Генерация страницы объекта В ПРОЦЕССЕ: '.$obj->title.' </b><br/>';
		$data.= $this->object_page($obj->id);
	  }
	  
	   
	  $data.= '<b>Генерация страницы sitemap.xml</b><br/>';	  
	  $data.=$this->sitemap();
	  $data.='<h3>Генерация всех страниц успешно завершена</h3><br/>';
	  
	  $this->render('gener',array('data'=>$data,'redirect'=>''));
	}
	/*
	function actionPortfolio() {
	   $data="";
	   $data.= '<b>Генерация страницы портфолио</b><br/>';	  
	   $data.= $this->portfolio_page();
	   $this->render('gener',array('data'=>$data,'redirect'=>'process'));
	}
	
	function actionProcess() {
	  $data="";
	   $data.= '<b>Генерация объектов в процессе</b><br/>';	  
	   $data.= $this->process_page();
	   $this->render('gener',array('data'=>$data,'redirect'=>'objects'));
	}	
	function actionObjects() {
	  $data="";
	  $objects=$this->get_all_objects();
	  foreach($objects as $obj) {
		$data.= '<b>Генерация страницы объекта: '.$obj->title.' </b><br/>';
		$data.= $this->object_page($obj->id);
	  }
	  $this->render('gener',array('data'=>$data,'redirect'=>'best'));
	}
	function actionBest() {
	  $data="";
	  $data.= '<b>Генерация страницы лучших объектов</b><br/>';	  
	  $data.=$this->best_page();
	  $this->render('gener',array('data'=>$data,'redirect'=>'sitemap'));
	}	
	function actionSitemap() {
	  $data="";
	  $data.= '<b>Генерация страницы sitemap.xml</b><br/>';	  
	  $data.=$this->sitemap();
	  $data.='<h3>Генерация всех страниц успешно завершена</h3><br/>';	
	  $this->render('gener',array('data'=>$data,'redirect'=>''));
	}*/
	
	function index_page() {
	  $criteria=new CDbCriteria;
	  $criteria->order= "t.sort, t.date";
	  $criteria->condition="(t.status=0 OR t.status is NULL) AND t.show_in_main=1 AND (t.type=0 OR t.type IS NULL OR t.type=3)";
	  
	  $objects=Objects::model()->findAll($criteria);
	  
	  //$this->save_to_file('index.html',$this->renderPartial('index',array('objects'=>$objects),true));
	  return " успешно <br>";
	}
	
	function portfolio_page() {
	  $objects=$this->get_all_objects();
	  $count['finished']=(int)Objects::get_count(false);
	  $count['notfinished']=(int)Objects::get_count(true);
	  if(!is_dir($_SERVER['DOCUMENT_ROOT']."/portfolio")) {
		mkdir($_SERVER['DOCUMENT_ROOT']."/portfolio",0777);
	  }
	  $this->save_to_file('portfolio/index.html',$this->renderPartial('portfolio',array('objects'=>$objects,'count'=>$count),true));
	  return " успешно <br>";
	}
	
	function object_page($id) {
	  $criteria=new CDbCriteria;
	  $criteria->order= "t.sort, t.date";
	  $criteria->condition="id='".$id."'";
	  
	  $obj=Objects::model()->findAll($criteria);
	  
	  if(!empty($obj[0])) {
		$obj=$obj[0];
		
		$objects=$this->get_all_objects();
		$i=0;
		foreach($objects as $object) {
		  if($object->id==$id) {
			//echo $object->id." ".$i;
			$last_id=$i-1;
			$next_id=$i+1;
			if($last_id<0) {
			  $last_id=count($objects)-1;
			}
			if($next_id>(count($objects)-1)) {
			  $next_id=0;
			}
		  }
		  $i++;
		}

		$user_id=!empty($objects[$last_id]->picasa_user_id)?$obj->picasa_user_id:"104094916837036848285";
		$objects[$last_id]->picasa_images=(int)count($this->getImages($objects[$last_id]->picasa_album_id,$user_id));
		$last_images=$this->getImages($objects[$last_id]->picasa_album_id,$user_id);

		$objects[$last_id]->image=!empty($last_images[0]['url'])?preg_replace('/[^\/]*$/','',$last_images[0]['url']):$objects[$last_id]->image;

		//echo $objects[$last_id]->image."<br>";
		$user_id=!empty($objects[$last_id]->picasa_user_id)?$obj->picasa_user_id:"104094916837036848285";
		$next_images=$this->getImages($objects[$next_id]->picasa_album_id,$user_id);
		$objects[$next_id]->picasa_images=(int)count($this->getImages($objects[$next_id]->picasa_album_id,$user_id));
		$objects[$next_id]->image=!empty($next_images[0]['url'])?preg_replace('/[^\/]*$/','',$next_images[0]['url']):$objects[$next_id]->image;
		//echo $objects[$next_id]->image."<br>";
		$last_next=array(0=>$objects[$last_id],1=>$objects[$next_id]);
		
		$user_id=!empty($obj->picasa_user_id)?$obj->picasa_user_id:"104094916837036848285";
		$images=$this->getImages($obj->picasa_album_id,$user_id);
		
		//echo "<pre>"; print_r($data); echo "</pre>";
	  }
	  $path = $obj->type == '1' ? 'osmotr': 'portfolio';
	  
	  if(!is_dir($_SERVER['DOCUMENT_ROOT']."/".$path."/".$obj->link)) {
		mkdir($_SERVER['DOCUMENT_ROOT']."/".$path."/".$obj->link,0777);
	  }
	  $this->save_to_file($path.'/'.$obj->link.'/index.html',$this->renderPartial('object',array('object'=>$obj,'images'=>$images,'last_next'=>$last_next),true));
	  
	  return '/'.$path.'/'.$obj->link." - успешно $path<br>";
	}
	
	function process_page () {
	   $count['finished']=(int)Objects::get_count(false);
	   $count['notfinished']=(int)Objects::get_count(true);
	   
	   $criteria=new CDbCriteria;
	   $criteria->order= "FIELD(type,'2','1'), t.sort, t.date";
	   $criteria->condition="(t.status=0 OR t.status is NULL) AND (t.type=1 OR t.type=2)";
	   
	   $month_arr=$this->getMonthList();
	   $objects=Objects::model()->findAll($criteria);

	   if(!is_dir($_SERVER['DOCUMENT_ROOT']."/osmotr")) {
		 mkdir($_SERVER['DOCUMENT_ROOT']."/osmotr",0777);
	   }
	   $this->save_to_file('osmotr/index.html',$this->renderPartial('process',array('count'=>$count,'objects'=>$objects),true));
	   return " успешно <br>";
	}
	
	function best_page($id) {
	 	
	  $data=$this->getImages('','','best');
		
		//echo "<pre>"; print_r($data); echo "</pre>";
	  
	  
	  $this->save_to_file('portfolio/best/index.html',$this->renderPartial('best',array('images'=>$data),true));
	  //$this->save_to_file('portfolio/best/fullscreen.json',json_encode($data));
	  return " успешно <br>";
	}
	
	function sitemap() {
	  $objects=$this->get_all_objects();
	  $this->save_to_file('sitemap.xml',$this->renderPartial('sitemap',array('objects'=>$objects),true));
	  return " успешно <br>";
	  
	}
	
	function save_to_file($filename,$text) {
	  //echo $text;
	  $filename=$_SERVER['DOCUMENT_ROOT']."/".$filename;
	  $fp = fopen($filename, 'w+');
	  flock($fp, LOCK_EX); // Блокирование файла для записи
	  fwrite($fp, $text);
	  flock($fp, LOCK_UN); // Снятие блокировки
	  fclose($fp);
	}
	
	function get_all_objects() {
	  $criteria=new CDbCriteria;
	  $criteria->order= "t.sort, t.date";
	  $criteria->condition="(t.status=0 OR t.status is NULL) AND (t.type=0 OR t.type IS NULL OR t.type=3)";
	  
	  $objects=Objects::model()->findAll($criteria);
	  return $objects;
	}
	
	function get_all_process() {
	  $criteria=new CDbCriteria;
	  $criteria->order= "t.sort, t.date";
	  $criteria->condition="(t.type=1)";
	  
	  $objects=Objects::model()->findAll($criteria);
	  return $objects;
	}
	
	function actionGetImagesXHR() {
	  $data.="Синхронизируем базу фотографий объектов!<br/>";
	  $objects=array_merge($this->get_all_objects(), $this->get_all_process());
	  Images::model()->deleteAll();
	  foreach($objects as $obj) {
		$data.= 'Фотографии объекта: <b>'.$obj->title.' </b><br/>';
		$data.= $this->setImages($obj->picasa_album_id,$obj->picasa_user_id);
	  }
	  $data.="Синхронизируем базу фотографий по тегу 'best'!<br/>";
	  $this->setImages('','','best');
	  $this->render('gener',array('data'=>$data,'redirect'=>''));
	}
	
	
	function setImages($album_id,$user_id,$tag) {
	  
	  $user_id=!empty($user_id)?$user_id:"104094916837036848285";
	  if(!empty($album_id) && empty($tag)) {
		$images=@json_decode(file_get_contents("https://picasaweb.google.com/data/feed/api/user/$user_id/albumid/$album_id?alt=json&prettyprint=true&v=2.0&fields=entry(summary,gphoto:width,gphoto:height,content/@src)"));
	  }
	  else {
		$images=@json_decode(file_get_contents("https://picasaweb.google.com/data/feed/api/user/$user_id/?alt=json&tag=$tag&prettyprint=true&kind=photo&v=2.0&fields=entry(summary,gphoto:width,gphoto:height,content/@src)"));
	  }
	  if(!empty($images)) {
		  
		  $i=0;
		  foreach($images->feed->entry as $img) {

			$model=new Images();
			$model->attributes=array('title'=>$img->summary->{'$t'},
					'url'=>$img->content->src,
					'width'=>$img->{'gphoto$width'}->{'$t'}, 
					'height'=>$img->{'gphoto$height'}->{'$t'},
					'album_id'=>$album_id,
					'user_id'=>$user_id,
					'tag'=>$tag);
			$model->save();
			$i++;
		  }
		return "Данные успешно добавлены! количество фотографий - $i <br/>";
	  }
	  else {
		return "Не удалось получить данные!<br/>";
	  }

	  //echo "<pre>"; print_r($data); echo "</pre>";
	}
	
	
	function getImages($album_id,$user_id,$tag='') {
	  $request=array();
	  $criteria=new CDbCriteria;
	   
	  if(!empty($album_id) && empty($tag))  {
		$criteria->condition="user_id='$user_id' AND album_id='$album_id'";
	  }
	  else{
		$criteria->condition="tag='$tag'";
	  }
	 
	  
	  $images=Images::model()->findAll($criteria);
	  $data=array();
	  foreach($images as $img) {
		$data[]=array('title'=>$img->title,
					'url'=>$img->url,
					'width'=>$img->width, 
					'height'=>$img->height);				
	  }
	  return $data;
	}
	
	
	static function getMonthList()
	{
		return array(
			1 => 'января',
			2 => 'февраля',
			3 => 'марта',
			4 => 'апреля',
			5 => 'мая',
			6 => 'июня',
			7 => 'июля',
			8 => 'августа',
			9 => 'сентября',
			10 => 'октября',
			11 => 'ноября',
			12 => 'декабря',
		);
	}
}