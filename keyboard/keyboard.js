var allDivs;
var allKeyObjects = new Array();
var currentKey;	// will be initialized in init()
var keySize;
var keyBuffer;
var initialSize;
var zoomLevels = new Array(1, 2, 4, 8);
var currentZoom = zoomLevels[0];
var currentSize = 'keySmall';


function init() {	
	allDivs = $(document.body).getElements('div[class=key]');
			
	var tempElem = new Element('div', {'class': 'key'});
	document.body.grab(tempElem);
		// FX TWEEN HERE TO GET THE VALUES!!!
	initialSize = tempElem.getStyle('width').toInt();
	tempElem.removeClass(currentSize);
	tempElem.destroy();delete tempElem;
	
	updateCurrentKeySize();
	addKeyObjectsAndEvents();
	updateCurrentKeyByLetter('q');
	
	// add one last event for the spacebar
	window.addEvent( 'keydown', function(e) {
    if(e.key == 'space') { // FIX THIS	
			handleKeyPress(e.key, true);
  	}
  });
}

// builds an object and an keypress event for each key
function addKeyObjectsAndEvents() {
	for (var i = 0; i < allDivs.length; i++) {
			allKeyObjects.push(new Key(allDivs[i], rows[i], cols[i], types[i], keyBuffer, keyBuffer, zoomLevels));
			
			window.addEvent( 'keydown', function(e) {
		    var evt = new Event(e);
		     	if(evt.key == this.toLowerCase()) {
				    handleKeyPress(evt.key, (currentKey.letter == evt.key));
		     	}
		    }.bind(allDivs[i].getProperty('id')));
	  	}
}

//
function handleKeyPress(letter, sameKey) {
	if (!sameKey) {
		updateCurrentKeyByLetter(letter);	// we only need to update the current letter if it's different (spacebar and that letter keep it the same)
	} else if (letter == 'space') {
		decreaseCurrentSize();
	} else {
		increaseCurrentSize();
	}

	// these offsets will be dependent on the *NEW* keySize and keyBuffer, but the currentKey's origin and row/col won't change
	var offsetX = keyBuffer - (currentKey.originX + ((keySize + keyBuffer) * currentKey.col));
  var offsetY = keyBuffer - (currentKey.originY + ((keySize + keyBuffer) * currentKey.row));	
		
	for (var i = 0; i < allKeyObjects.length; i++) {
		if (sameKey) allKeyObjects[i].updateSize(currentSize, keySize, false);
		allKeyObjects[i].updateLoc(offsetX, offsetY, false);
	}
}

// goes through all of the key objects, and find the one with the same letter as is passed
function updateCurrentKeyByLetter(letter) {
	for (var i = 0; i < allKeyObjects.length; i++) {
		if (allKeyObjects[i].letter.toLowerCase() == letter) {
			currentKey = allKeyObjects[i];
			return;
		} 
	}
}

// increase the current key size and update the current size
function increaseCurrentSize() {
	if (currentSize == 'keySmall') {
		currentSize = 'keyMedium';
		currentZoom = zoomLevels[1];		
	} else	if (currentSize == 'keyMedium') {
		currentSize = 'keyLarge';
		currentZoom = zoomLevels[2];		
	} else	if (currentSize == 'keyLarge') {
		currentSize = 'keyImage';			
		currentZoom = zoomLevels[3];			
	}	
	updateCurrentKeySize();
}
// decrease the current key size and update the current size
function decreaseCurrentSize() {
	if (currentSize == 'keyImage') {
		currentSize = 'keyLarge';
		currentZoom = zoomLevels[2];		
	} else	if (currentSize == 'keyLarge') {
		currentSize = 'keyMedium';
		currentZoom = zoomLevels[1];		
	} else	if (currentSize == 'keyMedium') {
		currentSize = 'keySmall';			
		currentZoom = zoomLevels[0];		
	}
	
	updateCurrentKeySize();
}

function updateCurrentKeySize() {
	keySize = initialSize * currentZoom;
	keyBuffer = keySize / 5;
}

