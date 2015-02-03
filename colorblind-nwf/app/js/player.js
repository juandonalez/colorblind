function Player(scene, x, y) {

	this.scene = scene;
	this.components = [];

	this.x = x;
	this.y = y;
	this.width = globals.playerWidth;
	this.height = globals.playerHeight;

	this.init = function() {

		this.addComponent(new RigidBody(this.scene, this));

	}

	this.update = function() {


		/*var newY = this.y + this.scene.gravity;

		for (var i = 0; i < colliders.length; i++) {

			var col = colliders[i];
			var vertical = this.checkVertical(col.y, col.height, newY);
			if (vertical) {
				newY = this.y;
			}

		}

		this.y = newY;*/

		for (var i = 0; i < this.components.length; i++) {
			this.components[i].update();
		}

	}

	/*this.checkVertical = function(objectY, objectHeight, playerY) {

		if (playerY > objectY && playerY <= (objectY+objectHeight)) {
			return true;
		}
		else if ((playerY+this.height) > objectY && (playerY+this.height) < (objectY+objectHeight)) {
			return true;
		}
		else if (objectY > playerY && objectY < playerY+this.height) {
			return true;
		}
		else {
			return false;
		}

	}*/

	this.draw = function(ctx) {

		ctx.fillStyle = "black";
		ctx.fillRect(this.x, this.y, this.width, this.height);

	}

	this.addComponent = function(component) {

		this.components.push(component);

	}

}