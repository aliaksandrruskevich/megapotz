var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
	if (xhr.readyState == 4 && xhr.status == 200) {
		process(xhr.responseXML);
	}
};
xhr.open('GET', 'http://www.villagio.ru/renaissancepark.xml', true);
xhr.send(null);

function process(doc) {
	var grounds = doc.querySelectorAll('ground');

	var res = [];
	for (var i = 0; i < grounds.length; i++) {
		var g = grounds[i];
		res[i] = {
			id: g.querySelector('area1').textContent,
			state: g.querySelector('area2').textContent
		};
		var area3 = g.querySelector('area3');
		console.info(area3);
		for (var j = 0; j < area3.childNodes.length; j++) {
			var child = area3.childNodes[j];
			res[i][child.getAttribute('name').replace(':', '')] = child.getAttribute('value');
		}
	}

	var sorted = [];
	res.forEach(function (obj) {
		sorted.push({
			state: obj.state.match(/продан/i) ? 'sold' : 'free',
			title: obj.id,
			project: obj['Проект'],
			houseArea: parseInt(obj['Площадь дома']),
			landArea: parseInt(obj['Площадь участка']),
			sortProp: parseInt(obj.id.match(/\d+/)[0])
		});
	});

	sorted.sort(function (a, b) {
		return a.sortProp - b.sortProp;
	});

	sorted.forEach(function (o) {delete o.sortProp});

	window.clipboardData.setData("Text", JSON.stringify(sorted, undefined, 4));
}