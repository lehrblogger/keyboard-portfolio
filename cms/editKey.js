var absolutePath = 'http://localhost/~palimpsest/keyboard-portfolio/cms/';

function init() {
  $('save').addEvent('click', function(e) { 
    console.log("Updating/Adding " + $('key_char').value + " to databse.");
	var req = new Request({
		url: absolutePath + 'keyAddUpdate.php', 
	    method: 'get',
	    data: 
	    { 
	    	key_char: $('key_char').value, 
			row: $('row').value, 
			col: $('col').value, 
			type: $('type').value, 
			name: $('name').value, 
			slug: $('slug').value,
			text: $('text').value
	    },
	    onComplete: window.location = absolutePath + 'index.html'
	}).send();
  });

  $('delete').addEvent('click', function(e) { 
    console.log("Deleting " + $('key_char').value + " from databse.");
	var req = new Request({
		url: absolutePath + 'keyDelete.php', 
	    method: 'get',
	    data: 
	    { 
	    	key_char: $('key_char').value
	    },
	    onComplete: window.location = absolutePath + 'index.html'
	}).send();
  });
}

function checkCharacterCount(textElem, textCount) {
	var maxLength = textElem.getAttribute('maxlength');
	var curLength = textElem.value.length;
	
	if (curLength > maxLength) {
		textElem.value = textElem.value.substring(0, maxLength);
	} else {
		textCount.textContent = curLength;
	}
}
