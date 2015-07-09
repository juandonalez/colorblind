function Animator(ent, images, fps) {

	this.ent = ent;

	this.images = images;
	this.fps = fps;
	this.frameTime = 1/fps;
	this.accum = 0;
	this.index = 0;

	if (this.ent.state) {
		this.currState = this.ent.state;
	}

}

Animator.prototype.update = function() {

	// accumulate time passed until it is time for another frame
	this.accum += globals.delta;

	if (this.accum >= this.frameTime) {

		this.index++;

		// if entity has states, checks to see if it has changed since last update
		if (this.ent.state) {

			if (this.ent.state !== this.currState) {
				this.currState = this.ent.state;
				// use set image function here so hitbox is recalulated
				this.ent.setImage(this.images[this.currState][0]);
				this.index = 0;
			}
			else {

				// loop back to first frame if we've reached final one
				if (this.index === this.images[this.currState].length) {
					this.index = 0;
				}

				this.ent.image = this.images[this.currState][this.index];

			}

		}
		else {

			// loop back to first frame if we've reached final one
			if (this.index === this.images.length) {
				this.index = 0;
			}

			this.ent.image = this.images[this.index];

		}

		this.accum -= this.frameTime;

	}

}