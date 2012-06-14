function init(){
	document.getElementById('generate').addEventListener('click',parse_lines,false);
}

function parse_lines(){
	var input=[],i=0,output='';
	
	var re0 = /[\r?\n]+/g;									// Разделяем абзацы на первом этапе
	var re1 = /[\u00ab\u00bb,;:]|\s+\d+\.\s+|\s+\*\s+/g;	// Cleaning odd symbols
	var re2 = / - | – |\s\s+/g;								// Some more...

	var text = document.getElementById('q').value;
	text=text.replace(re0,'~');
	text=text.replace(re1,'');
	text=text.replace(re2,' ');
	input=text.split('~');

	for(i=0;i<input.length;i++){
		split_it(80);
	}
	document.getElementById('r').value=output;
	
	/****/
	function split_it(n){
		while(input[i].length>n){
			if(input[i].length>n+10){
				var space_index=input[i].indexOf(' ', n);
				if(space_index!=-1){
					output+=input[i].substring(0,space_index)+'\n';
					input[i]=input[i].substring(space_index+1);
				}
				else{
					output+=input[i]+'\n';
					input[i]='';
				}
			}
			else{
				output+=input[i]+'\n';
				input[i]='';
			}
		}
	}
	
}