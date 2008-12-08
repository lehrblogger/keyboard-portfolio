var absolutePath = 'http://localhost/~palimpsest/keyboard-portfolio/cms/';

function init() {
	var req = new Request.JSON({
		url: absolutePath + 'getTable.php',
	    method: 'get',
		onComplete: function(jsonFromPHP) {
			drawTable(jsonFromPHP);	
		}
	}).send();
}

function drawTable(jsonObj) {
	var table = new Element('table');
    table.injectInside(document.body);

	var tr = new Element('tr');
	buildCell(tr, 'Key', true);
	buildCell(tr, 'Row', true);
	buildCell(tr, 'Col', true);
	buildCell(tr, 'Type', true);
	buildCell(tr, 'Name', true);
	buildCell(tr, 'URL Slug', true);
	buildCell(tr, 'Description Text', true);
	buildLinkCell(tr, 'New Key', '', true);
	tr.inject(table);
	
	var jsonLength = 0;
	for (var row in jsonObj) {
	    jsonLength++;
	}
	
	for (var i = 1; i < jsonLength; i++) {
		var tr = new Element('tr');
		buildRow(tr, jsonObj[i]);
		tr.inject(table);
	}
}

function buildRow(tableRow, jsonRow) {
	buildCell(tableRow, jsonRow.key_char, false);
	buildCell(tableRow, jsonRow.row, false);
	buildCell(tableRow, jsonRow.col, false);
	buildCell(tableRow, jsonRow.type, false);
	buildCell(tableRow, jsonRow.name, false);
	buildCell(tableRow, jsonRow.slug, false);
	buildCell(tableRow, jsonRow.text, false);

	var phpParams = '/?key_char=' + jsonRow.key_char + '&row=' + jsonRow.row + '&col=' + jsonRow.col + '&type=' + jsonRow.type + '&name=' + jsonRow.name + '&slug=' + jsonRow.slug + '&text=' + jsonRow.text;
	buildLinkCell(tableRow, 'Update', phpParams, false);
}

function buildCell(tableRow, data, bold) {
	var td;
	td = new Element('td');
	td.addClass('TableCell');
	if (bold) 	td.addClass('Heading');
	td.innerHTML = data;
	td.inject(tableRow);	
}

function buildLinkCell(tableRow, linkText, phpParams, bold) {
	
	var td = new Element('td');
	td.addClass('TableCell');
	if (bold) 	td.addClass('Heading');
	var link = new Element('a');
	link.setProperty('href', absolutePath + 'editKey.php' + phpParams);
	link.innerHTML = linkText;
	link.inject(td);
	td.inject(tableRow);
}