Animator.prototype = new Component();
Animator.prototype.constructor = Animator;

function Animator(go, baseURL, fps) {

	this.go = go;

	this.baseURL = baseURL;
	this.fps = fps;
	this.frameTime = 1/fps;
	this.accum = 0;
	this.index = 0;

	if (this.go.state) {
		this.currState = this.go.state;
	}

	if (this.go.dir) {
		this.currDir = this.go.dir;
	}

}

Animator.prototype.update = function() {

	// accumulate time passed until it is time for another frame
	this.accum += globals.delta;

	if (this.accum >= this.frameTime) {

		var url = this.baseURL;

		if (this.go.state) {
			if (this.go.state !== this.currState) {
				this.currState = this.go.state;
				this.index = 0;
			}
			url = url + this.currState + "/";
		}

		var frames = fileManager.images[url];

		if (this.index >= frames.length) {
			this.index = 0;
		}

		this.go.image = frames[this.index];

		this.index++;
		this.accum = 0;

	}

}

Animator.prototype.reset = function() {

	this.accum = 0;
	this.index = 0;

	if (this.go.state) {
		this.currState = this.go.state;
	}

	if (this.go.dir) {
		this.currDir = this.go.dir;
	}

}