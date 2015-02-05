function RigidBody(scene, entity) {

	this.scene = scene;
	this.entity = entity;

	this.update = function() {

		this.entity.y += this.scene.gravity;

		var colliders = this.scene.currentColliders;

		for (var i = 0; i < colliders.length; i++) {

			var col = colliders[i];

			/*var hori = this.checkHorizontal(col.x, col.width);
			if (hori) {
				col.onHorizontalCollision(this.entity);
			}*/

			var vert = this.checkVertical(col.y, col.height);
			if (vert) {
				col.onVerticalCollision(this.entity);
			}

		}

	}

	this.checkHorizontal = function(objX, objWidth) {

		if (this.entity.x > (objX + objWidth)) {
			return false;
		}
		else if ((this.entity.x + this.entity.width) < objX) {
			return false;
		}
		else {
			return true;
		}

	}

	this.checkVertical = function(objY, objHeight) {

		if (this.entity.y > (objY + objHeight)) {
			return false;
		}
		else if ((this.entity.y + this.entity.height) < objY) {
			return false;
		}
		else {
			return true;
		}

	}

}