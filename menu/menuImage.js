function MenuImage(center, image) {

	this.origin = new Point(0,0);
	this.center = center;

	this.image = image;

	this.width = image.width;
	this.height = image.height;

	this.scale = 1;
	this.scaleTarget = 1;
	this.scaleVel = 1;

	this.easer = new Easer();

	this.update = function() {

		if (this.scale !== this.scaleTarget) {
			if (this.scale > this.scaleTarget) {
				this.scale -= this.scaleVel * globals.delta;
				if (this.scale < this.scaleTarget) {
					this.scale = this.scaleTarget;
				}
			}
			else {
				this.scale += this.scaleVel * globals.delta;
				if (this.scale > this.scaleTarget) {
					this.scale = this.scaleTarget;
				}
			}
		}

		if (this.easer.isEasing) {

			this.center.x = this.easer.value();

		}

		this.calculateDimensions();

	}

	this.draw = function() {

		if (this.image) {
			globals.bufferCtx.drawImage(this.image, this.origin.x, this.origin.y, this.width, this.height);
		}

	}

	this.calculateDimensions = function() {

		this.width = image.width * this.scale;
		this.height = image.height * this.scale;
		this.origin.x = Math.round(this.center.x - (this.width/2));
		this.origin.y = Math.round(this.center.y - (this.height/2));

	}
	
	this.moveTo = function(target, duration) {

		this.target = target;
		this.duration = duration;

	}

	this.calculateDimensions();

}