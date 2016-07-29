Sprite.prototype = new Component();
Sprite.prototype.constructor = Sprite;

function Sprite(go, x, y, baseURL) {

	this.go = go;

	this.x = x;
	this.y = y;

	this.currFrame;
	this.baseURL = baseURL;
	this.frameTime = 1/24;
	this.accum = 0;
	this.index = 0;

	if (this.go.state) {
		this.currState = this.go.state;
	}

}

Sprite.prototype.update = function() {

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

		this.currFrame = frames[this.index];

		this.index++;
		this.accum = 0;

	}

}

Sprite.prototype.draw = function() {

	var ctx = globals.bufferCtx;
	ctx.globalAlpha = 1;

	if (this.currFrame) {
		if (this.go.dir === "l") {
			ctx.translate(this.go.x + this.go.width - this.x, this.y + this.go.y);
			ctx.scale(-1, 1);
			ctx.drawImage(this.currFrame, 0, 0);
			ctx.scale(-1, 1);
			ctx.translate((this.go.x + this.go.width - this.x) * -1, (this.y + this.go.y) * -1);
		}
		else {
			ctx.drawImage(this.currFrame, this.go.x + this.x, this.go.y + this.y);
		}
	}

}

Sprite.prototype.reset = function() {

	this.accum = 0;
	this.index = 0;

	if (this.go.state) {
		this.currState = this.go.state;
	}

}