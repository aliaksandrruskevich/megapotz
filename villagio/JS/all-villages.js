objects.forEach(function (obj) {
	var node = document.getElementById('object_' + obj.ID + '_bubble');
	console.info(obj, node);
	obj.title = node.querySelector('.plan__title').textContent;
	var items = node.querySelectorAll('.plan__data-item');
	for (var i = 0, l = items.length, item; item = items[i], i < l; i++) {
		var key = item.querySelector('em');
		if (key) {
			key = key.textContent;
			if (key == 'Проект') obj.project = $(item).find('a').text();
			if (key == 'Площадь дома') obj.houseArea = parseInt($(item).find('b').text());
			if (key == 'Площадь участка') obj.landArea = parseInt($(item).find('b').text());
		}
		var parts = obj.title.split('-');
		var l1 = parseInt(parts[1]);
		var l2 = parseInt(parts[2]);
		obj.sortProp = l2 ? 1000 * l1 + l2 : l1;
	}
});

var sorted = objects.sort(function (a, b) {
	return a.sortProp - b.sortProp;
});

sorted.forEach(function (obj) {
	delete obj.ID;
	delete obj.sortProp;
});

////////////
var hash = {};
objects.forEach(function (o) {
	hash[o.title] = o.status;
});

var oldKeys = window.prompt().split("\r\n");
var newStatusList = '';
oldKeys.forEach(function (key) {
	newStatusList += key + "\t" + hash[key] + "\n";
	delete hash[key];
});

console.info(newStatusList, Object.keys(hash).join(', '));

////////////
window.clipboardData.setData("Text", JSON.stringify(sorted, undefined, 4));
console.info(JSON.stringify(sorted, undefined, 4));

var str = '';
sorted.forEach(function (item) {
	str += item.title + '	' + item.houseArea + '	' + item.landArea + '	' + item.status + "\n";
});

console.info(str);