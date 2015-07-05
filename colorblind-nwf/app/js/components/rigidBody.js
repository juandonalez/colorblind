function RigidBody(gameObject) {

	this.gameObject = gameObject;

}

RigidBody.prototype.update = function() {

	/*var go = this.gameObject;
	var target = new Point(0, 0);

	target.x = Math.round((go.vel.x + globals.currScene.friction) * globals.delta);
	target.y = Math.round((go.vel.y + globals.currScene.gravity) * globals.delta);
	target.x = Math.round(go.vel.x * globals.delta);
	target.y = Math.round(go.vel.y);

	this.targetX = (this.entity.x + this.velX) * globals.delta;
	this.targetY = this.entity.y + ((this.velY + this.scene.gravity) * 1);

	var colliders = this.scene.currentColliders;

	for (var i = 0; i < colliders.length; i++) {

		var col = colliders[i];

		var hori = this.checkHorizontal(col.x, col.width);
		if (hori) {
			col.onHorizontalCollision(this.entity);
		}

		var vert = this.checkVertical(col.y, col.height);
		if (vert) {
			col.onVerticalCollision(this);
		}

	}

	this.entity.x = this.targetX;
	this.entity.y = this.targetY;

	go.vel = target;
	go.translate(target);*/

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