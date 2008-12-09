var Key = new Class ( 
{
	initialize: function (element, slug, row, col, originX, originY, zoomLevels) {
		this.duration = 400;
		this.fps = 24;
		this.transition = Fx.Transitions.linear;
		
		this.element = element;
		this.slug = slug;
		this.letter = this.element.getProperty('id');
		this.row = row;
		this.col = col;
		this.originX = originX;
		this.originY = originY;
		this.locMorph = new Fx.Morph(this.element, {duration: this.duration, fps: this.fps, transition: this.transition});// declare these here so we can cancel them easily
		this.sizeMorph = new Fx.Morph(this.element, {duration: this.duration, fps: this.fps, transition: this.transition});
		
		this.border = this.element.getStyle('border-width').toInt();
		this.width = this.element.getStyle('width').toInt();
		this.height = this.element.getStyle('height').toInt();
		this.fontSize = this.element.getStyle('font-size').toInt();
		
		this.zoomLevels = zoomLevels;
		this.zoomLevel = this.zoomLevels[0];
		
		this.children = new Array();

		
		// Listen for clicks
	    this.element.addEvent('click', function(e) {
			 //BROKEN FIX LATER handleKeyPress(e.key, true);
	    }.bind(this));
	    

	},
	
	// updates the size of the key - 
 	updateSize: function(newSize, dimension, useTween) {
 		this.updateZoomLevel(newSize);
 	
		this.setSizes(dimension);	// this has to be passed because we won't know what we are tweeing to until we get there,
									// and updateLoc will need that information immediately
									
		this.sizeMorph.cancel();// cancel the old morph wherever it is, since now there is a new destination
		if (useTween) {		
			this.sizeMorph.start({
		    	'border-width': (this.border * zoomLevel),
		    	'width': (this.width * zoomLevel),
		    	'height': (this.height * zoomLevel)
			});
 		} else {
			this.sizeMorph.set({
		    	'border-width': (this.border * zoomLevel),
		    	'width': (this.width * zoomLevel),
		    	'height': (this.height * zoomLevel)
			});
		}
		for(var i = 0; i < this.children.length; i++) {
			this.children[i].updateSize(zoomLevel, useTween);
		}
	},
	
	// updates the location of the key, as specified by the left and top CSS sttyles
	updateLoc: function(offsetX, offsetY, useTween) {
	 	this.originX += offsetX;	// the location will be dependent on where the current key is, so these offsets should be passed
	 	this.originY += offsetY;
		var targetX = this.originX + ((this.dim + this.buffer) * this.col);
		var targetY = this.originY + ((this.dim + this.buffer) * this.row);
		
		this.locMorph.cancel(); //why not link: 'cancel'?
		if (useTween) {
			this.locMorph.start({
		    	'left': targetX,
		    	'top': targetY
			});
		} else {
			this.locMorph.set({
		    	'left': targetX,
		    	'top': targetY
			});
		}
	},
	
	updateZoomLevel: function(newSize) {	//later i can just use an int for size
		if (newSize == 'keySmall') {
			zoomLevel = zoomLevels[0];			
		} else	if (newSize == 'keyMedium') {
			zoomLevel = zoomLevels[1];			
		} else	if (newSize == 'keyLarge') {
			zoomLevel = zoomLevels[2];			
		} else	if (newSize == 'keyImage') {
			zoomLevel = zoomLevels[3];			
		}
	},
	
	// a simple function to update the Key's size info
	setSizes: function(dimension) {
		this.dim = dimension;
		this.buffer = this.dim / 5;
	},
	
	initSizeLoc: function() {
		this.updateSize('keySmall', this.width, false);
		this.setSizes(this.element.getStyle('width').toInt());	//we can use this because the previous call isn't tweening and finishes by the time it gets here
		this.updateLoc(0, 0, false);
	},
	
	initTextDivs: function() {
		for(var i = 0; i < this.element.getChildren('div').length; i++) {
			this.children.push(new TextDiv(this.element.getChildren('div')[i], this.duration, this.fps, this.transition));
		}
	},
	
	initPhotoDiv: function() {
		var newDiv = new Element('div', {'class': 'photos'});
		newDiv.inject(this.element, 'bottom');
		this.children.push(new FlickrDiv(newDiv, this.slug, this.zoomLevel, this.duration, this.fps, this.transition));
	}
});


var ProjectKey = new Class({
	Extends: Key,
	initialize: function(element, slug, row, col, originX, originY, zoomLevels) {
		this.parent(element, slug, row, col, originX, originY, zoomLevels);
		this.initTextDivs();
		this.initPhotoDiv();
		this.initSizeLoc();
	}
});

var CategoryKey = new Class({
	Extends: Key,
	initialize: function(element, slug, row, col, originX, originY, zoomLevels) {
		element.getChildren('div[class=body-text]')[0].destroy();
		var nameDiv = element.getChildren('div[class=name-text]')[0];
		nameDiv.addClass('cat-text');
		nameDiv.removeClass('name-text');
	
		this.parent(element, slug, row, col, originX, originY, zoomLevels);
		this.initTextDivs();
		this.initSizeLoc();
	}
});

var HiddenKey = new Class({
	Extends: Key,
	initialize: function(element, slug, row, col, originX, originY, zoomLevels) {
		this.letter = "";
		element.destroy();
	},
	
	updateSize: function(newSize, dimension, useTween) {},
	
	updateLoc: function(offsetX, offsetY, useTween) {},
	
	setSizes: function(dimension) {}
});

var BlankKey = new Class({
	Extends: Key,
	initialize: function(element, slug, row, col, originX, originY, zoomLevels) {
		var childDivs = element.getChildren('div');
		for(var i = 0; i < childDivs.length; i++) {
			if (!childDivs[i].hasClass('letter-text'))
				childDivs[i].destroy();
		}
		
		this.parent(element, slug, row, col, originX, originY, zoomLevels);
		this.initTextDivs();
		this.initSizeLoc();
	}
});


