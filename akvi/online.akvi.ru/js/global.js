function set_period(){var t=new Date();var cy=t.getFullYear();var s=$('#copy span');var r=parseInt(s.text());if(cy>r)s.text(r+'—'+cy);}

function faq(){
	$('.question span').css('borderBottom','dashed 1px #000');
	$('.answer').hide();
	$('.question span').toggle(
		function(){
			$(this).parent().next().fadeIn();
			$(this).css('borderBottom','dashed 1px #fff');
		}, 
		function(){
			$(this).parent().next().fadeOut();
			$(this).css('borderBottom','dashed 1px #000');
		}
	);
}

$(document).ready(function(){
// Устанавливаем годы работы компании...
	set_period();
// Запускаем мигалку брендов...
	var brand_num=0;
	var $brands=$('#brands a');
	var brands_len=$brands.length;
	$brands.slice(1).hide();

	function blink(){
		$brands.eq(brand_num).animate({opacity: 'toggle'},1000,function(){
			brand_num=(brand_num+1)%brands_len;
			$brands.eq(brand_num).animate({opacity: 'toggle'},1000);
		});
	}

	var brands_timer=window.setInterval(blink,7000);
	$('#brands').hover(function(){window.clearInterval(brands_timer)},function(){brands_timer=window.setInterval(blink,7000);});
	
// Анимируем город
	var city_width=$('#city').outerWidth();
	var left=parseInt((city_width-528)/2);

	$('#banners > div').each(function(){
		this.style.left=left+(city_width+400)*arguments[0]+'px';
	});
	
	$('#menu li').each(function(){
		var i=arguments[0];
		$(this).bind('click',function(){
			if(this.className!='curr'){
				$('#city_bg').stop();
				$('#banners').stop();

				$('#menu li.curr').removeClass('curr');
				$(this).addClass('curr');
				
				$('#city_bg').animate({left: (-90*i)+'px'},1000);
				$('#banners').animate({left: (-(city_width+400)*(i+1))+'px'},1000);
			}
			return false;
		})
	}
	);
// :)
	left=parseInt((city_width-513)/2);
	$('#city_bg').css({backgroundPosition:-554+left+'px 0'});
	$('#city_bg img').css({marginLeft:245+left+'px'});
	$('.index img.bond').css({left:left+'px'});
	$('.ball').css({left:left+150+'px'});
	$('#b1').fadeIn(2000);

	var cnt=0;
	$('#city_bg img').bind('mousedown',function(){
		cnt++;
		if(cnt>=3){
			$('#b1').fadeOut('slow',function(){
				$('#bond_bad').fadeIn(2000);
				$('#b2').fadeIn(2000);
				$('#city_bg img').unbind();
			});
		}
	});
}
);

