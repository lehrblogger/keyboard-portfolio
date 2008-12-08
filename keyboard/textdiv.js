// a separate file for the Key class, since the other one was getting long
var TextDiv = new Class ( 
{
	initialize: function (element, duration, fps, transition) {
		this.duration = duration;
		this.fps = fps;
		this.transition = transition;
		
		
		this.element = element;
		this.sizeMorph = new Fx.Morph(this.element, {duration: this.duration, fps: this.fps, transition: this.transition});
		
		this.fontSize = this.element.getStyle('font-size').toInt();
	},
	
	// updates the size of the key - 
 	updateSize: function(zoomLevel, useTween) {						
		this.sizeMorph.cancel();
		
		if (useTween) {
			this.sizeMorph.start({
				'font-size': (this.fontSize * zoomLevel)
			});
 		} else {
			this.sizeMorph.set({
				'font-size': (this.fontSize * zoomLevel)
			});
		}
	}
});