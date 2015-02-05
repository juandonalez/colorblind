function Player(scene, x, y) {

	this.scene = scene;
	this.components = [];

	this.x = x;
	this.y = y;
	this.width = globals.playerWidth;
	this.height = globals.playerHeight;

	this.init = function() {

		this.components.push(new RigidBody(this.scene, this));

	}

	this.update = function() {

		for (var i = 0; i < this.components.length; i++) {
			this.components[i].update();
		}

	}

	this.draw = function(ctx) {

		ctx.fillStyle = "blue";
		ctx.fillRect(this.x, this.y, this.width, this.height);

	}

}