function Calculator(){this.area=0;this.wc=0;this.roomType="";this.element=$("#calculator")[0];this.init()}function AlbumView(e){this.element=e;this.init()}function init_callback(){$("#show_form_btn,#callback_form input[type=reset], #close").click(function(){$("#contact").toggleClass("callback_shown")});$("#check").val(5).prop("type","hidden").prev().remove()}function init_selector(){$("#selector .right, #selector .left").click(function(e){this.parentNode.className=this.className;e.preventDefault();var t=this;$("#selector .current").on("webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd otransitionend",function(){document.location=$(t).find("a").attr("href")})})}Calculator.prototype={init:function(){function i(e){var t=0;if(e.offsetParent){do{t+=e.offsetTop}while(e=e.offsetParent)}return t}var e=this;var t=document.cookie.split(";");for(var n=0,r=t.length;n<r;n++){if(t[n].indexOf("wc=")!==-1){this.wc=t[n].split("=")[1];$("#wc").val(this.wc)}if(t[n].indexOf("area=")!==-1){this.area=t[n].split("=")[1];$("#area").val(this.area)}}$(this.element).find(".button").on("click",function(){e.updateValues()});$(this.element).on("click",".selector",function(){e.roomType=$(this).data("type");e.element.className=e.roomType;e.updateValues()});var s=$(e.element).find(".calc-hint")[0];$(window).on("scroll.CalcHint",function(){if($(this).scrollTop()>i(s)-400){window.setTimeout(function(){$(s).addClass("shown");$(window).off(".CalcHint");$(e.element).one("click",function(){$(s).removeClass("shown")})},300)}});$(this.element).find(".cott").click()},evaluate:function(e,t){if(e=="cott"){switch(t){case"otd-pk":return[4500*this.area,6e3*this.area,7500*this.area];case"ele-pk":return[12e4+220*this.area,14e4+220*this.area,16e4+220*this.area];case"san-pk":return[3e4*(this.wc+.5),36e3*(this.wc+.5),42e3*(this.wc+.5)];case"oto-pk":return[9e4+200*this.area,11e4+200*this.area,13e4+200*this.area];case"otd-m":return[3e3*this.area,3500*this.area,4e3*this.area];case"ele-m":return[2e4+200*this.area,4e4+200*this.area,6e4+200*this.area];case"san-m":return[17500*(this.wc+.5),22500*(this.wc+.5),3e4*(this.wc+.5)];case"oto-m":return[6e4+800*this.area,1e5+800*this.area,14e4+800*this.area];default:return false}}else{switch(t){case"otd-pk":return[5e3*this.area,6500*this.area,8e3*this.area];case"ele-pk":return[12e4+200*this.area,14e4+220*this.area,16e4+220*this.area];case"san-pk":return[3e4*(this.wc+.5),36e3*(this.wc+.5),42e3*(this.wc+.5)];case"otd-m":return[3e3*this.area,3500*this.area,4e3*this.area];case"ele-m":return[2e4+200*this.area,4e4+200*this.area,6e4+200*this.area];case"san-m":return[17500*(this.wc+.5),22500*(this.wc+.5),3e4*(this.wc+.5)];default:return false}}},updateValues:function(){var e=this;this.area=parseInt($("#area").val());this.wc=parseInt($("#wc").val());document.cookie="area="+this.area+";path=/";document.cookie="wc="+this.wc+";path=/";var t=[0,0,0];$(this.element).find("tbody tr").each(function(){var n=e.evaluate(e.roomType,$(this).attr("class"));if(n){for(var r=0;r<3;r++)t[r]+=n[r];$(this).find("td:nth-child(n+2)").each(function(e){$(this).text(n[e].toString().replace(/(\d)(?=(\d{3})+$)/g,"$1 "))})}});$(this.element).find("tfoot td:nth-child(n+2)").each(function(e){$(this).text(t[e].toString().replace(/(\d)(?=(\d{3})+$)/g,"$1 "))})}};AlbumView.prototype={init:function(){$(this.element).on("mouseenter mouseleave",".image_stack",function(e){if(e.type==="mouseenter"){$(this).addClass("rotated")}else{$(this).removeClass("rotated")}});$(this.element).on("click",".image_stack",function(){document.location=$(this).parent().find("a").attr("href")});var e=this,t=false;$(window).on("resize",function(){if(t!==false)window.clearTimeout(t);t=window.setTimeout(function(){e.show()},500)});this.show()},show:function(){var e=Math.round($(this.element).width()/4-30);$(this.element).hide();$(this.element).find(".album").css({height:e+60+"px",width:e+25+"px"});$(this.element).find("img").css({height:e+"px",width:e+"px"}).each(function(){this.src=this.src.substring(0,83)+"s"+e+"-c/"});$(this.element).find("p").width(e-10);$(this.element).find(".link").css({top:e+20+"px"});$(this.element).find(".count").css({top:e+40+"px"});$(this.element).show()}};$(document).ready(function(){var e=$("body").attr("id");switch(e){case"page-index":$("#bg").css({"background-image":'url("https://lh3.googleusercontent.com/-InPyuNzqhv4/T-cKtkttLpI/AAAAAAAAAck/NZS1nov73xE/w'+$("#bg").width()+"-h"+$("#bg").height()+'-n/i.jpg")'});if(window.devicePixelRatio==2){var t=$("#ingos")[0];t.src="http://static.otdelkalux.ru/i/ingos-2x.png"}var n=new AlbumView($("#album_grid")[0]);var r=new Spinner({lines:13,length:7,width:4,radius:10,rotate:0,color:"#000",speed:1,trail:60,shadow:false,hwaccel:true,className:"spinner",zIndex:2e9});$("#GPlus").GPlusGallery(photos,{spinner:r});$("#GPlus div").last().on("click",function(e){e.stopPropagation()}).find("img").wrap('<a href="/portfolio/process/"/>');init_callback();var i=new Calculator;$("#mouse").css("opacity",1);$(window).one("scroll",function(){$("#mouse").css("opacity",0)});break;case"page-contacts":init_maps();init_callback();init_selector();var s;$("#selector .left, #kuusinena_hint").hover(function(){window.clearTimeout(s);$("#madison_hint").css("opacity","0");$("#kuusinena_hint").css({visibility:"visible",opacity:"1"})},function(){s=window.setTimeout(function(){$("#kuusinena_hint").css({opacity:"0",visibility:"hidden"})},1e3)});$("#selector .right, #madison_hint").hover(function(){window.clearTimeout(s);$("#kuusinena_hint").css("opacity","0");$("#madison_hint").css({visibility:"visible",opacity:"1"})},function(){s=window.setTimeout(function(){$("#madison_hint").css({opacity:"0",visibility:"hidden"})},1e3)});break;case"page-price":if($("#calculator").length>0)var i=new Calculator;init_selector();break;case"page-portfolio":if($("#album_grid").length>0)new AlbumView($("#album_grid")[0]);if($("#selector_hint").length>0)window.setTimeout(function(){$("#selector_hint").css({opacity:1})},2e3);if($("#selector").length>0)init_selector();if($("#backnext").length>0){var o=["http://static.otdelkalux.ru/i/arr-l.png","http://static.otdelkalux.ru/i/arr-r.png"];$("#backnext img").each(function(e){this.style.backgroundImage="url('"+this.src+"')";this.src=o[e]})}break;case"page-process":init_selector();init_maps();$("#showhide").toggle(function(){$("#map").css({height:0});$(this).text("Показать карту")},function(){$("#map").css({height:"500px"});$(this).text("Скрыть карту")});break}var u=new Date;var a=u.getFullYear();var f=$("#year span");var l=parseInt(f.text());if(a>l)f.text(l+"—"+a)})