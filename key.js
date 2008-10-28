// a separate file for the Key class, since the other one was getting long
var Key = new Class ( 
{
	initialize: function (letter, row, col, originX, originY) {
		this.letter = letter;
		this.row = row;
		this.col = col;
		this.originX = originX;
		this.originY = originY;
		this.locMorph = new Fx.Morph(this.element, {});		// declare these here so we can cancel them easily
		this.sizeMorph = new Fx.Morph(this.element, {});
		
		this.element = new Element('div', {
			'id':this.letter,
			'html':this.letter
		});

		document.body.grab(this.element);
		
		// Listen for clicks
	    this.element.addEvent('click', function(e) {
	      	increaseCurrentSize();
			zoomOnKey(this.letter.toLowerCase());
	    }.bind(this));
	
		this.element.addClass('key');
		
		this.updateSize('keySmall', false);
		this.setSizes(this.element.getStyle('width').toInt());	//we can use this because the previous call isn't tweening and finishes by the time it gets here
		this.updateLoc(0, 0, false);
	},
	
	// updates the size of the key - 
 	updateSize: function(newSize, dimension, useTween) {
		this.setSizes(dimension);	// this has to be passed because we won't know what we are tweeing to until we get there,
									// and updateLoc will need that information immediately
		if (useTween) {		
			this.sizeMorph.cancel();// cancel the old morph wherever it is, since now there is a new destination
			this.sizeMorph = new Fx.Morph(this.element, {duration: 500, fps: 24, transition: Fx.Transitions.linear});
			this.sizeMorph.addEvent('complete', function(e) {
	     		this.updateClasses(newSize);	// wait till it is complete to actually update the classes
			}.bind(this));
			this.sizeMorph.start('.' + newSize);
 		} else {
			this.updateClasses(newSize);		// we don't want to use the tween for the initial setup, and this is useful for debugging
		}
	},

	// this removes the old size class, and adds the new one
	// note those styles also need to be removed because the tween DOES NOT ADD A CLASS and only adds the styles in that class
	updateClasses: function(newSize) {
		this.element.removeClass('keySmall');
		this.element.removeClass('keyMedium');
		this.element.removeClass('keyLarge');
		this.element.removeClass('keyImage');
		//this.element.removePropety('style');
		this.element.setStyle('border', "");
		this.element.setStyle('width', "");
		this.element.setStyle('height', "");
		this.element.setStyle('font', "");

		this.element.addClass(newSize);
	},
	
	// updates the location of the key, as specified by the left and top CSS sttyles
	updateLoc: function(offsetX, offsetY, useTween) {
	 	this.originX += offsetX;	// the location will be dependent on where the current key is, so these offsets should be passed
	  	this.originY += offsetY;
		var targetX = this.originX + ((this.dim + this.buffer) * this.col);
		var targetY = this.originY + ((this.dim + this.buffer) * this.row);
		
		if (useTween) {
			this.locMorph.cancel(); //why not link: 'cancel'?
			this.locMorph = new Fx.Morph(this.element, {duration: 500, fps: 24, transition: Fx.Transitions.linear});
			this.locMorph.start({
		    	'left': targetX,
		    	'top': targetY
			});
		} else {
			this.element.setStyle('left', targetX);	// agian, useful for debugging
			this.element.setStyle('top', targetY);
		}
	},
	
	// a simple function to update the Key's size info
	setSizes: function(dimension) {
		this.dim = dimension;
		this.buffer = this.dim / 5;
	}
});