var engine={
	"yandex": {
		"base_url": "http://suggest.yandex.ru/suggest-ya.cgi?v=2&callback=suggest.apply&lr=213&part=",
		"max_results": 10,
		"reg_exp": /.+\((.+)\)/,
		"keywords":[]
	},
	"rambler": {
		"base_url": "http://r0.ru/suggest?v=2&query=",
		"max_results": 7,
		"reg_exp": /.+\((.+)\);/,
		"keywords":[]
	},
	"mail": {
		"base_url": "http://suggests.go.mail.ru/sg?q=",
		"max_results": 9,
		"reg_exp": false,
		"keywords":[]
	},
	"google": {
		"base_url": "http://www.google.ru/s?hl=ru&xhr=t&q=",
		"max_results": 10,
		"reg_exp": false,
		"keywords":[]
	}
};

var alphabet=[
	' ','а','б','в','г','д','е','ё','ж','з','и','й','к','л','м','н','о','п','р','с','т','у','ф','х','ц','ч','ш','щ','ъ','ы','ь','э','ю','я'
];

var req=new XMLHttpRequest(); // определен глобально, чтобы не пересоздавать объект каждый раз.

// Получает название поисковика, базовый запрос (неизменяемый), и добавочную строку (к которой итерируются символы)
function get_suggest(se_name,query,add_str){
	// делаем запрос
	netscape.security.PrivilegeManager.enablePrivilege('UniversalBrowserRead');
	req.open("GET",encodeURI(engine[se_name].base_url+query+add_str),false);
	req.send(null);
	result=req.responseText;

	// преобразуем в объект
	if(engine[se_name].reg_exp)
		result = result.replace(engine[se_name].reg_exp, "\[$1\]");

	var result_obj=eval( "(" + result + ")" );
	
	// вычленяем ключивеки
	var keywords=[];
	
	if(se_name=='yandex')
		keywords=result_obj[1];

	if(se_name=='google')
		for (var i in result_obj[1])
			keywords[i]=result_obj[1][i][0];

	if(se_name=='mail')
		for (var i in result_obj['items'])
			keywords[i]=result_obj['items'][i].text;

	if(se_name=='rambler')
		for (var i in result_obj[1])
			keywords[i]=result_obj[1][i][0];
	
	//alert(se_name+': "'+query+add_str+'"'+"\n***\n"+keywords.join("\n"));
	
	// запихиваем ключевики в массивы
	var found;
	for(var i in keywords){
		for(var j in engine[se_name].keywords){
			if(keywords[i]==engine[se_name].keywords[j]){
				found=true;
				break;
			}
		}
		if(!found)
			engine[se_name].keywords.push(keywords[i]);
	}
	
	// вызываем делаем рекурсивный вызов
	
	if(keywords.length >= engine[se_name].max_results){
		var start=(add_str.charAt(add_str.length-1)==' ')?1:0;

		for(var i=start;i<alphabet.length;i++){
		
			//pause if google
			if(se_name=='google'){
				var s=''
				for (var q=1;q<1000000;q++)
					s+='_'+q;
			}

			get_suggest(se_name,query,add_str+alphabet[i]);
		}
	}
	else return;
	
}

function start(){
	for (var i in engine)
		engine[i].keywords=[];
	base_str=document.getElementById('base').value;
	
	get_suggest('yandex',base_str,'');document.getElementById('yandex').value=engine['yandex'].keywords.join("\n");
	alert('yandex');
	get_suggest('google',base_str,'');document.getElementById('google').value=engine['google'].keywords.join("\n");
	alert('google');
	get_suggest('mail',base_str,'');document.getElementById('mail').value=engine['mail'].keywords.join("\n");
	alert('mail');
	get_suggest('rambler',base_str,'');document.getElementById('rambler').value=engine['rambler'].keywords.join("\n");
	alert('rambler');
}




/************************************************************

ЯНДЕКС: 10 результатов, 1 сайт
suggest.apply("компьютерная",["компьютерная помощь","компьютерная томография","компьютерная томография в москве","компьютерная мышь","компьютерная графика","компьютерная помощь на дому","компьютерная диагностика автомобиля","компьютерная томография брюшной полости","компьютерная помощь москва","компьютерная диагностика организма"],{r:1,n:0})
suggest.apply("ремонт компьютеров мозк",[],{bli:1,r:1,n:0})
*/

/*

RAMBLER: 7 результатов, 1 сайт (последний в массиве)

suggest.apply("компьютерная помощь", [
	["компьютерная помощь екатеринбург", "28", ""],
	["компьютерная помощь на дому", "25", ""],
	["компьютерная помощь в челябинске", "12", ""],
	["компьютерная помощь калуга", "12", ""],
	["компьютерная помощь спб", "11", ""],
	["компьютерная помощь москва", "11", ""],
	["компьютерная помощь в видном", "9", ""]],
[]);

suggest.apply("ремонт компьютеров мозк", [], []);
*/

/*

GOOGLE: 10 результатов

["ремонт компьютеров м",[
	["ремонт компьютеров москва","","0"],
	["ремонт компьютеров марьино","","1"],
	["ремонт компьютеров митино","","2"],
	["ремонт компьютеров минск","","3"],
	["ремонт компьютеров мурманск","","4"],
	["ремонт компьютеров могилев","","5"],
	["ремонт компьютеров мытищи","","6"],
	["ремонт компьютеров москва цены","","7"],
	["ремонт компьютеров москва вакансии","","8"],
	["ремонт компьютеров магнитогорск","","9"]
],{"k":1}]

["ремонт компьютеров micex",[],{"k":1}]
*/

/*

MAIL: 9 результатов

{
	"terms": { "query": "компьютерная помощь" },
	"usr": "92:1:24:213",
	"gentime": 0.006294,
	"sites": [ ],
	"items": [
		{ "text": "компьютерная помощь в москве", "textMarked": "\x3Cb\x3Eкомпьютерная помощь\x3C\/b\x3E в москве", "type": "lite" },
		{ "text": "компьютерная помощь митино", "textMarked": "\x3Cb\x3Eкомпьютерная помощь\x3C\/b\x3E митино", "type": "lite" },
		{ "text": "компьютерная помощь химки", "textMarked": "\x3Cb\x3Eкомпьютерная помощь\x3C\/b\x3E химки", "type": "lite" },
		{ "text": "компьютерная помощь скорая", "textMarked": "\x3Cb\x3Eкомпьютерная помощь\x3C\/b\x3E скорая", "type": "lite" },
		{ "text": "компьютерная помощь красногорск", "textMarked": "\x3Cb\x3Eкомпьютерная помощь\x3C\/b\x3E красногорск", "type": "lite" },
		{ "text": "компьютерная помощь строгино", "textMarked": "\x3Cb\x3Eкомпьютерная помощь\x3C\/b\x3E строгино", "type": "lite" },
		{ "text": "компьютерная помощь спб", "textMarked": "\x3Cb\x3Eкомпьютерная помощь\x3C\/b\x3E спб", "type": "lite" },
		{ "text": "компьютерная помощь на выезде", "textMarked": "\x3Cb\x3Eкомпьютерная помощь\x3C\/b\x3E на выезде", "type": "lite" },
		{ "text": "компьютерная помощь в митино", "textMarked": "\x3Cb\x3Eкомпьютерная помощь\x3C\/b\x3E в митино", "type": "lite" }
	]
}

{ "terms": { "query": "компьютерная помощь micex" }, "gentime": 0.005294, "sites": [ ], "items": [ ] }
*/