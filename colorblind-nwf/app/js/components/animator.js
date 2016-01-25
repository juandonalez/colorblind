function Animator(ent, baseURL, fps) {

	this.ent = ent;

	this.baseURL = baseURL;
	this.fps = fps;
	this.frameTime = 1/fps;
	this.accum = 0;
	this.index = 0;

	if (this.ent.state) {
		this.currState = this.ent.state;
	}

	if (this.ent.dir) {
		this.currDir = this.ent.dir;
	}

}

Animator.prototype.update = function() {

	// accumulate time passed until it is time for another frame
	this.accum += globals.delta;

	if (this.accum >= this.frameTime) {

		var url = this.baseURL;

		if (this.ent.state) {
			if (this.ent.state !== this.currState) {
				this.currState = this.ent.state;
				this.index = 0;
			}
			url = url + this.currState + "/";
		}

		var frames = fileManager.images[url];

		if (this.index >= frames.length) {
			this.index = 0;
		}

		this.ent.image = frames[this.index];

		this.index++;
		this.accum = 0;

	}

}

Animator.prototype.activate = function() {

	this.accum = 0;
	this.index = 0;

	if (this.ent.state) {
		this.currState = this.ent.state;
	}

	if (this.ent.dir) {
		this.currDir = this.ent.dir;
	}

}