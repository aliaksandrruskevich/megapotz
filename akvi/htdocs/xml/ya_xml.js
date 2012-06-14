var link=[]; 
var url='http://xmlsearch.yandex.ru/xmlsearch?user=hostingLP&key=03.15469057:215a34c3d02ee95be1767a653d1578d9';
var xml_beg='<?xml version="1.0" encoding="utf-8"?><request><query>';
var xml_end='</query><groupings><groupby attr="d" mode="deep" groups-on-page="100" docs-in-group="1"/></groupings></request>';

function init(){
	document.getElementById('parse').addEventListener('click',parse_columns,false);
	document.getElementById('yandex').addEventListener('click',check_links,false);
}

function parse_columns(){
	var re=/^http:\/\/(?:www\.)?(.+)\/.+#a#(.+)#\/a#.+http:\/\/(?:www\.)?(.+?)\t(.+)$/i;
	var re1=/[,"«»\?\!]/g;

	var str=document.getElementById('sape_export').value;
	var line=str.split('\n');

	for(var i=0,j=0,l=line.length;i<l;i++){
		if(line[i]){
			link[j]={};
			var splitted=line[i].split(re);
			link[j].acceptor=splitted[1];
			link[j].anchor=splitted[2].replace(re1,'');
			link[j].donor=splitted[3];
			link[j].request=splitted[4];
			
			link[j].status_error=false;
			link[j].status_acceptor_found=false;
			link[j].status_donor_found=false;
			link[j].position=0;
			j++;
		}
	}
	alert('Найдено ссылок: '+link.length);
	if(link.length>0){
		document.getElementById('yandex').style.display='inline';
		document.getElementById('yandex').focus();
	}
}

function check_links(){
	document.getElementById('progress').style.display='block';
	var bar=document.getElementById('bar');
	var result='';
	
	var req=new XMLHttpRequest();
	for(var i=0,l=link.length; i<l;i++){
		var xml_request=xml_beg+'"'+link[i].anchor+'"'+xml_end;

		netscape.security.PrivilegeManager.enablePrivilege('UniversalBrowserRead');
		req.open("POST", url, false);
		
		req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		req.setRequestHeader("Content-length", xml_request.length);
		req.send(xml_request);
		var xmldoc=req.responseXML;

		// Проверяем наличие ошибок...
		var err_result=xmldoc.evaluate('//error',xmldoc,null,XPathResult.ANY_UNORDERED_NODE_TYPE,null);
		var err_node=err_result.singleNodeValue;

		if(err_node){
			link[i].status_error=true;
		}
		else{
			// Processing acceptor
			var acceptor_result=xmldoc.evaluate('//doc[contains(url,\''+link[i].acceptor+'\')]',xmldoc,null,XPathResult.ANY_UNORDERED_NODE_TYPE,null);
			var acceptor_node=acceptor_result.singleNodeValue;
			
			if(acceptor_node!==null){
				var type_result=xmldoc.evaluate('properties/_PassagesType',acceptor_node,null,XPathResult.NUMBER_TYPE,null);
				var type=type_result.numberValue;
				if(type==1)
					link[i].status_acceptor_found=true;
			}

			// Processing donor
			var donor_result=xmldoc.evaluate('//doc[contains(url,\''+link[i].donor+'\')]',xmldoc,null,XPathResult.ANY_UNORDERED_NODE_TYPE,null);
			var donor_node=donor_result.singleNodeValue;
			
			if(donor_node!==null){
				link[i].status_donor_found=true;
			}
			/*
			// Getting postion
			if(link[i].status_acceptor_found){
				// Making request
				xml_request=xml_beg+link[i].request+xml_end;
				req.open("POST", url, false);
				req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				req.setRequestHeader("Content-length", xml_request.length);
				req.send(xml_request);
				xmldoc=req.responseXML;
				// Detecting position 1...100
				var acceptor_search_result=xmldoc.evaluate('//doc[contains(url,\''+link[i].acceptor+'\')]',xmldoc,null,XPathResult.ANY_UNORDERED_NODE_TYPE,null);
				acceptor_node=acceptor_search_result.singleNodeValue;
				if(acceptor_node){
					acceptor_pos=xmldoc.evaluate('count(preceding::doc)+1',acceptor_node,null,XPathResult.NUMBER_TYPE,null);
					link[i].position=acceptor_pos.numberValue;
				}
			}*/
		}
		result+=link[i].anchor+'	'+link[i].donor+'	'+link[i].status_donor_found+'	'+link[i].status_acceptor_found+'	'+link[i].position+"\n";
		bar.style.width=parseInt(i/link.length*100)+'%';
	}
	
	var links_all=link.length,
		links_donor=0,
		links_acceptor=0,
		links_top100=0;

	for(var i=0,l=links_all; i<l;i++){
		if(link[i].status_donor_found)
			links_donor++;
		if(link[i].status_acceptor_found)
			links_acceptor++;
		if(link[i].position>0)
			links_top100++;
	}
	
	document.getElementById('progress').style.display='none';
	document.getElementById('result').value=result;
}




/*
var type_result=xmldoc.evaluate('properties/_PassagesType',acceptor_node,null,XPathResult.NUMBER_TYPE,null);
var type=type_result.numberValue;
if(type==0){
link[i].status=ACCEPTOR_FOUND_BY_PHRASE;
}
var acceptor_pos=xmldoc.evaluate('count(preceding::doc)+1',acceptor_node,null,XPathResult.NUMBER_TYPE,null);
acceptor_pos=acceptor_pos.numberValue;*/