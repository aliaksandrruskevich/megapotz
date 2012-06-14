var data = [ 'Ассортимент', [ 'Искусственные цветы', 'Искусственные ветки и листья', 'Искусственные фрукты, овощи, грибы', 'Ампельные растения, кусты, лианы', 'Суккуленты', 'Декоративные вазы', 'Товары для флористов', 'Кашпо' ], 'Продукция', [ 'Искусственные деревья', 'Флористические коллажи', 'Композиции из искусственных цветов и сухоцветов' ] ];
var parsed = 0;

function showcat()
{
	var newArr = new Array();

	for ( i = 0; i < data.length; i += 2 )
	{
		var str = '<span onclick="clicked(this.innerHTML, this.parentNode.id, ' + i + ')">' + data[i] + '</span>';
		newArr.push( str );
	}

	var cat_div = document.getElementById( 'categ' );
	cat_div.innerHTML = newArr.join(', ');
}


function showsubcat( id )
{
	var newArr = new Array();
	id++;

	var input_fld = document.getElementById( 'subcateg_field' );
	input_fld.value = '';

	for ( var i in data[id] )
	{
		var str = '<span onclick="clicked(this.innerHTML, this.parentNode.id)">' + data[id][i] + '</span>';
		newArr.push( str );
	}

	var com_div = document.getElementById( 'subcateg' );
	com_div.innerHTML = newArr.join(', ');
}

function clicked( msg, id, i )
{
	id += '_field';
	document.forms['add_form'].elements[id].value = msg;

	if ( id == 'categ_field' )
		{ showsubcat(i); }

}


function parse_text()
{

	if ( parsed == 0 )
	{
		var lines = document.forms['add_form'].elements['numbers'].value;
		re = /^(.+?)\s(.+?)\t(\d.+?)\t(\d.+?)$/gm;
		lines = lines.replace(re, '$2|$1|$3|$4');
		lines = lines.replace(/[\r\n]+$/, '');
		document.forms['add_form'].elements['numbers'].value = lines;
		parsed = 1;
		alert("Данные преобразованы\nУбедитесь, что данные теперь представлены в таком виде:\n\nНазвание|артикул|цена\n\nЕсли есть ошибки, их нужно исправить вручную.");
	}

}

function before_submit()
{

	if ( document.forms['add_form'].elements['subcateg_field'].value == '' ) {
		window.alert('Введите подкатегорию');
		return false;
	}

	if ( parsed == 0 ) {
		window.alert('Необходимо преобразовать данные'); 
		return false;
	}
	else {
		document.forms['add_form'].submit();
	}

}