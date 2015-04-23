function RigidBody(scene, entity) {

	this.scene = scene;
	this.entity = entity;

	this.velX = 0;
	this.velY = 0;

	this.targetX = 0;
	this.targetY = 0;

}

RigidBody.prototype.update = function() {

	//this.targetX = (this.entity.x + this.velX) * globals.delta;
	this.targetY = this.entity.y + ((this.velY + this.scene.gravity) * 1);

	var colliders = this.scene.currentColliders;

	for (var i = 0; i < colliders.length; i++) {

		var col = colliders[i];

		/*var hori = this.checkHorizontal(col.x, col.width);
		if (hori) {
			col.onHorizontalCollision(this.entity);
		}*/

		var vert = this.checkVertical(col.y, col.height);
		if (vert) {
			col.onVerticalCollision(this);
		}

	}

	//this.entity.x = this.targetX;
	this.entity.y = this.targetY;

}

RigidBody.prototype.checkHorizontal = function(objX, objWidth) {

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

RigidBody.prototype.checkVertical = function(objY, objHeight) {

	if (this.targetY > (objY + objHeight)) {
		return false;
	}
	else if ((this.targetY + this.entity.height) < objY) {
		return false;
	}
	else {
		return true;
	}

}