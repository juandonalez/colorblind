BackgroundScroller.prototype = new GameObject();
BackgroundScroller.constructor = BackgroundScroller;

function BackgroundScroller(scene, d, index, camera, ctx) {

	this.x = 0;
	this.y = Math.round(globals.screenHeight * d.y);
	this.scene = scene;
	this.camera = camera;
	this.ctx = ctx;
	this.speed = d.speed;
	this.random = d.random;
	this.vel = new Point(0, 0);

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

BackgroundScroller.prototype.update = function() {

	var first = this.bgs[0];

	if (this.x + first.width < this.camera.x) {
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

BackgroundScroller.prototype.draw = function() {

	this.ctx.globalAlpha = 1;
	this.ctx.translate(this.camera.roundX * -1, this.camera.roundY * -1);

	var first = this.bgs[0];
	var second = this.bgs[1];

	// *****figure out camera pos stuff ***
	this.ctx.drawImage(first, this.x, this.y);
	this.ctx.drawImage(second, this.x + first.width, this.y);

	this.ctx.translate(this.camera.roundX, this.camera.roundY);
}

BackgroundScroller.prototype.activate = function() {

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