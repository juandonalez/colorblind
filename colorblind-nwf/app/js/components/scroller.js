function Scroller(scene, d, index) {

	this.x = 0;
	this.y = Math.round(globals.gameHeight * d.y);
	this.scene = scene;
	this.startSpeed = d.speed;
	this.speed = this.startSpeed;
	this.random = d.random;
	this.accum = 0;

	this.pool = fileManager.images["backgrounds/" + scene.name + "/" + index + "/"];

	this.indexes = new Array(2);
	this.bgs = new Array(2);

	for (var i = 0; i < 2; i++) {

		if (this.random) {
			var rand = Math.floor(Math.random()*this.pool.length);
			this.indexes[i] = rand;
		}
		else {
			this.indexes[i] = i;
		}

		this.bgs[i] = this.pool[this.indexes[i]];
	}

	d = null;

}

Scroller.prototype.update = function() {

	/*this.accum += globals.delta;
	if (this.accum >= this.speed) {
		this.x++;
		this.accum = 0;
	}*/
	this.x += this.speed;

	var first = this.bgs[0];

	if (this.x + first.width < camera.x) {
		this.x += first.width;
		this.indexes[0] = this.indexes[1];

		if (this.random) {
			this.indexes[1] = Math.floor(Math.random()*this.pool.length);
		}
		else {
			if ((this.indexes[0] + 1) === this.pool.length) {
				this.indexes[1] = 0;
			}
			else {
				this.indexes[1] = this.indexes[0] + 1;
			}
		}

		this.bgs[0] = this.pool[this.indexes[0]];
		this.bgs[1] = this.pool[this.indexes[1]];
	}

}

Scroller.prototype.draw = function() {

	var ctx = globals.bufferCtx;
	ctx.globalAlpha = 1;

	var first = this.bgs[0];
	var second = this.bgs[1];

	// *****figure out camera pos stuff ***
	ctx.drawImage(first, this.x, this.y);
	ctx.drawImage(second, this.x + first.width, this.y);

}

Scroller.prototype.activate = function() {

	this.x = 0;
	this.speed = 1/this.startSpeed;
	this.accum = 0;

	for (var i = 0; i < 2; i++) {

		if (this.random) {
			var rand = Math.floor(Math.random()*this.pool.length);
			this.indexes[i] = rand;
		}
		else {
			this.indexes[i] = i;
		}

		this.bgs[i] = this.pool[this.indexes[i]];
	}

}