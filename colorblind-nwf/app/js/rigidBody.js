function RigidBody(scene, gameObject) {

	this.scene = scene;
	this.gameObject = gameObject;

	this.init = function() {

		

	}

	this.update = function() {

		var newY = this.gameObject.y + this.scene.gravity;

		var colliders = this.scene.colliders;

		for (var i = 0; i < colliders.length; i++) {

			var col = colliders[i];
			var vertical = this.checkVertical(col.y, col.height, newY);
			if (vertical) {
				newY = this.gameObject.y;
			}

		}

		this.gameObject.y = newY;

	}

	this.draw = function(ctx) {

		

	}

	this.checkVertical = function(objectY, objectHeight, playerY) {

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

	}

}