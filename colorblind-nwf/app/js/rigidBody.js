function RigidBody(scene, gameObject) {

	this.scene = scene;
	this.gameObject = gameObject;

	this.update = function() {

		this.gameObject.y += this.scene.gravity;

		var colliders = this.scene.colliders;

		for (var i = 0; i < colliders.length; i++) {

			var col = colliders[i];
			var vertical = this.checkVertical(col.y, col.height);
			if (vertical) {
				col.onVerticalCollision(this.gameObject);
				//this.scene.gravity = 0;
				//console.log("true");
				//this.gameObject.y -= this.scene.gravity;
			}

		}

	}

	this.checkVertical = function(objectY, objectHeight) {

		if (this.gameObject.y > (objectY + objectHeight)) {
			return false;
		}
		else if ((this.gameObject.y + this.gameObject.height) < objectY) {
			return false;
		}
		else {
			return true;
		}

	}

}