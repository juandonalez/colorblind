function Animator(gameObject, images, fps) {

	this.gameObject = gameObject;
	this.images = images;
	this.fps = fps;
	this.frameTime = 1/fps;
	this.accum = 0;
	this.index = 0;

	if (this.gameObject.state) {
		this.currState = this.gameObject.state;
	}

}

Animator.prototype.update = function() {

	this.accum += globals.delta;

	if (this.accum >= this.frameTime) {

		var images = this.images;

		if (this.gameObject.state) {
			if (this.gameObject.state !== this.currState) {
				this.currState = this.gameObject.state;
				this.gameObject.changeImage(this.images[this.currState][0]);
				this.index = 0;
			}

			images = this.images[this.gameObject.state];
		}

		this.gameObject.image = images[this.index];
		this.index++;
		if (this.index === images.length) {
			this.index = 0;
		}

		this.accum -= this.frameTime;

	}

}