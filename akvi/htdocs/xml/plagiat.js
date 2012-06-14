//var url='http://xmlsearch.yandex.ru/xmlsearch?user=bestkomputer&key=03.66421749:7549709e5c2b66224b790c3f5b5ca7ad'; //bestkomputer:77.232.15.157
var url='http://xmlsearch.yandex.ru/xmlsearch?user=hostingLP&key=03.15469057:215a34c3d02ee95be1767a653d1578d9'; //megapotz:129.107.35.132; proxy:144.206.66.56	3127 

var xml_beg='<?xml version="1.0" encoding="utf-8"?><request><query>"';
var xml_end='"</query><groupings><groupby attr="d" mode="flat" groups-on-page="100" docs-in-group="100"/></groupings></request>';
var plagiat=[];

function init(){
	document.getElementById('search').addEventListener('click',parse_lines,false);
}

function parse_lines(){
	var result='';
	plagiat=[];
	document.getElementById('plagiat').value='';

	document.getElementById('progress').style.display='block';
	var bar=document.getElementById('bar');

	var src_host=document.getElementById('src').value;
	var request_lines=document.getElementById('q').value.split('\n');

	var req=new XMLHttpRequest();
	netscape.security.PrivilegeManager.enablePrivilege('UniversalBrowserRead');

	var xsl=new XMLHttpRequest();
	xsl.open('GET','http://www.akvi.ru/xml/plagiat.xsl',false);
	xsl.send(null);
	xsldoc=xsl.responseXML;
	var processor=new XSLTProcessor();
	processor.importStylesheet(xsldoc);

	for(var i=0;i<request_lines.length;i++){
		var xml_request=xml_beg+request_lines[i]+xml_end;
		req.open('POST',url,false);
		
		req.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		req.setRequestHeader("Content-length",xml_request.length);
		req.send(xml_request);
		var xmldoc=req.responseXML;

		var fragment=processor.transformToFragment(xmldoc,document);

		var s=new XMLSerializer();
		var str=s.serializeToString(fragment);

		var result_response=str.split('\n');
		// Detecting src page
		var src_url='';
		for(var j=0;j<result_response.length;j++){
			var data=result_response[j].split('	',2);
			if(data[0]==src_host){
				src_url=data[1];
				break;
			}
		}
		
		for(var j=0;j<result_response.length;j++){
			// [0]:host	[1]:url	[2]:text
			var data=result_response[j].split('	');
			if(data[0]!=src_host){
				if(plagiat[data[1]]===undefined){
					plagiat[data[1]]={};
					plagiat[data[1]].text=[];
				}

				plagiat[data[1]].text.push(request_lines[i]);
				plagiat[data[1]].host=data[0];
				plagiat[data[1]].src=src_url;
			}
		}
		bar.style.width=parseInt(i/request_lines.length*100)+'%';
	}
	
	for(var i in plagiat){
		if(i!='undefined')
			result+=plagiat[i].src+'	'+plagiat[i].host+'	'+i+'	'+(plagiat[i].text.length*100)/request_lines.length+'	'+plagiat[i].text+'\n';
	}

	document.getElementById('progress').style.display='none';
	document.getElementById('plagiat').value=result;
}