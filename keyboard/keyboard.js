var rowArray = new Array(new Array("Q", "W", "E"/*, "R", "T", "Y", "U", "I", "O", "P"*/),
				         new Array("A", "S", "D"/*, "F", "G", "H", "J", "K", "L"*/),
			 	         new Array("Z", "X", "C"/*, "V", "B", "N", "M"*/)
			   )
var rowArray = new Array(new Array("Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"),
				         new Array("A", "S", "D", "F", "G", "H", "J", "K", "L"),
			 	         new Array("Z", "X", "C", "V", "B", "N", "M")
			   )

var allKeyObjects = new Array();
var currentKey;	// will be initialized in init()
var currentSize = 'keySmall';
var keySize;
var keyBuffer;

function init() {	
console.log("test");
	updateCurrentKeySize();
	addKeyObjectsAndEvents();
	updateCurrentKeyByLetter(rowArray[0][0].toLowerCase());
	
	// add one last event for the spacebar
	window.addEvent( 'keydown', function(e) {
     	var evt = new Event(e);
      	if(evt.key == 'space') { // FIX THIS	
			decreaseCurrentSize();
			zoomOnKey(evt.key);
      	}
    });
}
// builds an object and an keypress event for each key
function addKeyObjectsAndEvents() {
	for (var i = 0; i < rowArray.length; i++) {
		for (var j = 0; j < rowArray[i].length; j++) {
			allKeyObjects.push(new Key(rowArray[i][j], i, j, keyBuffer, keyBuffer));
			
			window.addEvent( 'keydown', function(e) {
		     	var evt = new Event(e);
		      	if(evt.key == this.toLowerCase()) {
					increaseCurrentSize();
					zoomOnKey(evt.key);
		      	}
		    }.bind(rowArray[i][j]));
		}
	}	
}

// zooms around one key - in or out depends on if the current size was just increased or decreased
function zoomOnKey(letter) {
	//console.log(currentSize + " " + letter);

	if (currentKey.letter != letter) 	updateCurrentKeyByLetter(letter);	// we only need to update the current letter if it's different (spacebar and that letter keep it the same)
	
	// these offsets will be dependent on the *NEW* keySize and keyBuffer, but the currentKey's origin and row/col won't change
    var offsetX = keyBuffer - (currentKey.originX + ((keySize + keyBuffer) * currentKey.col));
    var offsetY = keyBuffer - (currentKey.originY + ((keySize + keyBuffer) * currentKey.row));	

	// for all the other keys, update the size and location using the tweens
	for (var i = 0; i < allKeyObjects.length; i++) {
		allKeyObjects[i].updateSize(currentSize, keySize, false);
		allKeyObjects[i].updateLoc(offsetX, offsetY, false);
	}
}
// goes through all of the key objects, and find the one with the same letter as is passed
function updateCurrentKeyByLetter(letter) {
	for (var i = 0; i < allKeyObjects.length; i++) {
		if (allKeyObjects[i].letter.toLowerCase() == letter) {
			currentKey = allKeyObjects[i];
		} 
	}
}

// increase the current key size and update the current size
function increaseCurrentSize() {
	if (currentSize == 'keySmall') {
		currentSize = 'keyMedium';
	} else	if (currentSize == 'keyMedium') {
		currentSize = 'keyLarge';
	} else	if (currentSize == 'keyLarge') {
		currentSize = 'keyImage';			
	}	
	updateCurrentKeySize();
}
// decrease the current key size and update the current size
function decreaseCurrentSize() {
	if (currentSize == 'keyImage') {
		currentSize = 'keyLarge';
	} else	if (currentSize == 'keyLarge') {
		currentSize = 'keyMedium';
	} else	if (currentSize == 'keyMedium') {
		currentSize = 'keySmall';			
	}
	updateCurrentKeySize();
}
// creates a key element with the current class, gets the size, and deletes it. there must be a better way to do this
function updateCurrentKeySize() {
	var tempElem = new Element('div', {
		'class': currentSize
	});
	document.body.grab(tempElem);
	// FX TWEEN HERE TO GET THE VALUES!!!
	keySize = tempElem.getStyle('width').toInt();
	keyBuffer = keySize / 5;
	
	tempElem.removeClass(currentSize);
	tempElem.destroy();
	delete tempElem;
}




