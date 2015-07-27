function Scroller(scene, d) {

	this.x = 0;
	this.y = d.y;
	this.scene = scene;
	this.startSpeed = d.speed;
	this.speed = 1/d.speed;
	this.accum = 0;

	if (d.name === "top") {
		this.pool = fileManager.topBgs[scene.name];
	}
	else if (d.name === "middle") {
		this.pool = fileManager.middleBgs[scene.name];
	}
	else {
		this.pool = fileManager.bottomBgs[scene.name];
	}

	this.indexes = new Array(3);
	this.bgs = new Array(3);

	for (var i = 0; i < 3; i++) {
		var rand = Math.floor(Math.random()*this.pool.length);
		this.indexes[i] = rand;
		this.bgs[i] = this.pool[this.indexes[i]];
	}

	d = null;

}

Scroller.prototype.update = function() {

	this.accum += globals.delta;
	if (this.accum >= this.speed) {
		this.x++;
		this.accum = 0;
	}

	var first = this.bgs[0];

	if (this.x + first.width < camera.origin.x) {
		this.x += first.width;
		this.indexes[0] = this.indexes[1];
		this.indexes[1] = this.indexes[2];
		this.indexes[2] = Math.floor(Math.random()*this.pool.length);
		this.bgs[0] = this.pool[this.indexes[0]];
		this.bgs[1] = this.pool[this.indexes[1]];
		this.bgs[2] = this.pool[this.indexes[2]];
	}

}

Scroller.prototype.draw = function() {

	var ctx = globals.bufferCtx;
	ctx.globalAlpha = 1;

	var first = this.bgs[0];
	var second = this.bgs[1];
	var third = this.bgs[2];

	// *****figure out camera pos stuff ***
	ctx.drawImage(first, this.x, this.y);
	ctx.drawImage(second, this.x + first.width, this.y);
	ctx.drawImage(third, this.x + first.width + second.width, this.y);

}