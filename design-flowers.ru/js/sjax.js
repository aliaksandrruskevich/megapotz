var sjax_ready=true;
var xml_document,xsl_template,msxml;
var cache=[];
var CACHE_SIZE=30;
var cache_cleanup_interval=window.setInterval(cache_cleanup,6000);

if(window.ActiveXObject){
	for(msxml=6;msxml>=3;msxml-=3){
		try{
			xsl_template=new ActiveXObject('Msxml2.XSLTemplate.'+msxml+'.0');
			break;
		}
		catch(e){}
	}
}
else if(window.XMLHttpRequest){
	xml_document=new XMLHttpRequest();
}
else{sjax_ready=false;}

var get,transform;

/* MSIE */
if(msxml){
	get=function(path){
		cache[path]={};

		if(path.match(/\.xml/)){
			xml_document=new ActiveXObject('Msxml2.DOMDocument.'+msxml+'.0');
			xml_document.async=false;
			xml_document.load(path);
			var x=xml_document.documentElement;

			cache[path].type='xml';
			cache[path].doc=x;
			cache[path].xsl=x.getAttribute('xsl');
			cache[path].id=x.getAttribute('id');
			cache[path].code_before=x.getAttribute('code_before');
			cache[path].code_after=x.getAttribute('code_after');
			cache[path].title=x.getAttribute('title');
		}
		else{
			var freethreaded_xml=new ActiveXObject('Msxml2.FreeThreadedDOMDocument.'+msxml+'.0');
			freethreaded_xml.async=false;
			freethreaded_xml.load(path);
			xsl_template.stylesheet=freethreaded_xml;

			cache[path].proc=xsl_template.createProcessor();
			cache[path].type='xsl';
		}
	};

	transform=function(path){
		if(cache[path]===undefined)get(path);	// If not in the cache, downloading...
		set_timestamp(path);

		var xsl_path=cache[path].xsl;
		if(cache[xsl_path]===undefined)get(xsl_path);
		set_timestamp(xsl_path);

		var xslproc=cache[xsl_path].proc;
		xslproc.input=cache[path].doc;

		for(var i=1;i<arguments.length;i+=2)	// setting params
			xslproc.addParameter(arguments[i],arguments[i+1]);

		xslproc.transform();

		if(cache[path].code_before)eval(cache[path].code_before);
		document.getElementById(cache[path].id).innerHTML=xslproc.output;

		for(var i=1;i<arguments.length;i+=2)	// removing params
			xslproc.addParameter(arguments[i],msxml===3?'':null);	// MSXML3 requires '', MSXML4+ requires null

		if(cache[path].code_after)eval(cache[path].code_after);
		if(cache[path].title)document.title=cache[path].title;
		scroll(0,0);
	}
}
else{	// Firefox, Opera, Safari, Chrome
	get=function(path){
		cache[path]={};
		xml_document.open("GET",path,false);
		xml_document.send(null);
		var x=xml_document.responseXML.documentElement;

		if(path.match(/\.xml/)){
			cache[path].type='xml';
			cache[path].doc=x;
			cache[path].xsl=x.getAttribute('xsl');
			cache[path].id=x.getAttribute('id');
			cache[path].code_before=x.getAttribute('code_before');
			cache[path].code_after=x.getAttribute('code_after');
			cache[path].title=x.getAttribute('title');
		}
		else{
			cache[path].type='xsl';
			var xsl_processor=new XSLTProcessor();
			xsl_processor.importStylesheet(x);
			cache[path].proc=xsl_processor;
		}
	};
	
	transform=function(path){
		if(cache[path]===undefined)get(path);
		set_timestamp(path);

		var xsl_path=cache[path].xsl;
		if(cache[xsl_path]===undefined)get(xsl_path);
		set_timestamp(xsl_path);

		for(var i=1;i<arguments.length;i+=2)
			cache[xsl_path].proc.setParameter(null,arguments[i],arguments[i+1]);

		var fragment=cache[xsl_path].proc.transformToFragment(cache[path].doc,document);

		for(var i=1;i<arguments.length;i+=2)
			cache[xsl_path].proc.removeParameter(null,arguments[i]);

		if(cache[path].code_before)eval(cache[path].code_before);
		var node=document.getElementById(cache[path].id);
		var clone=node.cloneNode(false);
		clone.appendChild(fragment);
		node.parentNode.replaceChild(clone,node);
		if(cache[path].code_after)eval(cache[path].code_after);

		if(cache[path].title)document.title=cache[path].title;
		scroll(0,0);
	}
}

function set_timestamp(path){
	var now=new Date();
	var msec=now.getTime();
	cache[path].timestamp=msec;
}

function cache_cleanup(){
	var access=new Array();
	for(var i in cache){access.push(cache[i].timestamp);}
	if(access.length>CACHE_SIZE){
		access.sort();
		var del_since=access[access.length-CACHE_SIZE];
		for(var i in cache){if(cache[i].timestamp<del_since)delete cache[i];}
	}
}

function cache_drop(str){for(var i in cache){if(i.match(str)){delete cache[i];}}}

// HISTORY È BOOKMARKING
var state='';
var history_blocked=false;
var unload_msg='';

function init_history(){
	var hifr=document.getElementById('hifr');
	var hist=setInterval(hifr?iframe_url:hash_url,100);
}

function iframe_url(url_state){
	if(url_state){	// Param url_state is only set when function is called as iframe.onload handler
		if(url_state==state)return;	// First load
		window.location.hash=url_state;
		state=url_state;
		transform(state);
	}
	else{
		var l=window.location.toString();
		var hash_state=l.substr(l.indexOf('#')+1);
		if(state!=hash_state){
			document.getElementById('hifr').src=hash_state+'.html';
			state=hash_state;
			transform(state);
		}
	}
}

function hash_url(url_state){
	var l=window.location.toString();
	var hash_state=l.substr(l.indexOf('#')+1);
	if(state!=hash_state){
		state=hash_state;
		transform(state);
	}
}