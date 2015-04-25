function Player(scene, x, y) {

	this.scene = scene;
	this.components = [];

	this.x = x;
	this.y = y;
	this.width = globals.playerWidth;
	this.height = globals.playerHeight;

}

Player.prototype.init = function() {

	this.components.push(new RigidBody(this.scene, this));

}

Player.prototype.update = function() {

	for (var i = 0; i < this.components.length; i++) {
		this.components[i].update();
	}

}

Player.prototype.draw = function(ctx) {

	ctx.fillStyle = "blue";
	ctx.fillRect(this.x - 20, this.y - 20, this.width, this.height);

}