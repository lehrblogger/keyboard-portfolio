var absolutePath = 'http://localhost/~palimpsest/keyboard-portfolio/cms/';

//for br and p conversion, if i ever want it http://ufku.com/personal/autop

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


/*DO I NEED THIS

 // PHP-compatible urlencode() for Javascript from http://us2.php.net/manual/en/function.urlencode.php#85903
 function urlencode(s) {
  s = encodeURIComponent(s);
  return s.replace(/~/g,'%7E').replace(/%20/g,'+');
 }

 // sample usage:  suppose form has text input fields for
 // country, postcode, and city with id='country' and so-on.
 // We'll use GET to send values of country and postcode
 // to "city_lookup.php" asynchronously, then update city
 // field in form with the reply (from database lookup)

 function lookup_city() {
  var elm_country = document.getElementById('country');
  var elm_zip = document.getElementById('postcode');
  var elm_city = document.getElementById('city');
  var qry = '?country=' + urlencode(elm_country.value) +
                '&postcode=' + urlencode(elm_zip.value);
  var xhr;
  try {
   xhr = new XMLHttpRequest(); // recent browsers
  } catch (e) {
   alert('No XMLHttpRequest!');
   return;
  }
  xhr.open('GET',('city_lookup.php'+qry),true);
  xhr.onreadystatechange = function(){
    if ((xhr.readyState != 4) || (xhr.status != 200)) return;
    elm_city.value = xhr.responseText;
  }
  xhr.send(null);
 }
 */