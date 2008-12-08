// a separate file for the Key class, since the other one was getting long
var Key = new Class ( 
{
	initialize: function (element, row, col, type, originX, originY, zoomLevels) {
		this.duration = 500;
		this.fps = 24;
		this.transition = Fx.Transitions.linear;
		
		this.element = element;
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
		for(var i = 0; i < this.element.getChildren('div').length; i++) {
			this.children.push(new TextDiv(this.element.getChildren('div')[i], this.duration, this.fps, this.transition));
		}
		
		// Listen for clicks
	    this.element.addEvent('click', function(e) {
	      	increaseCurrentSize();
			zoomOnKey(this.letter.toLowerCase());
	    }.bind(this));
	
		this.updateSize('keySmall', this.width, false);
		this.setSizes(this.element.getStyle('width').toInt());	//we can use this because the previous call isn't tweening and finishes by the time it gets here
		this.updateLoc(0, 0, false);
	},
	
	// updates the size of the key - 
 	updateSize: function(newSize, dimension, useTween) {
 		this.updateZoomLevel(newSize);
 	
		this.setSizes(dimension);	// this has to be passed because we won't know what we are tweeing to until we get there,
									// and updateLoc will need that information immediately
									
		this.sizeMorph.cancel();// cancel the old morph wherever it is, since now there is a new destination
		if (useTween) {		
			this.sizeMorph =

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
	}
});