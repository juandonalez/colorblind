function RigidBody(ent) {

	this.ent = ent;

}

RigidBody.prototype.update = function() {

	// check for horizontal collisions first
	this.ent.translate(this.ent.vel.x, 0);

	var colliders;

	for (var i = 0; i < 3; i++) {

		// get the colliders for each of the 3 levels
		colliders = globals.currScene.getColliders(i, this.ent);

		if (colliders) {
			for (var j = 0; j < colliders.length; j++) {
				if (this.ent.intersects(colliders[j])) {
					colliders[j].onHorizontalCollision(this.ent);
				}
			}
		}

		// get the entities for each of the 3 levels
		colliders = globals.currScene.getEntities(i, this.ent);

		if (colliders) {
			for (var j = 0; j < colliders.length; j++) {
				if (this.ent.intersects(colliders[j]) && colliders[j].onHorizontalCollision) {
					colliders[j].onHorizontalCollision(this.ent);
				}
			}
		}

		// check collision with any entity owned by the scene (eg destroyers)
		if (globals.currScene.destroyers) {
			colliders = globals.currScene.destroyers;
			for (var j = 0; j < colliders.length; j++) {
				if (this.ent.intersects(colliders[j]) && colliders[j].onHorizontalCollision) {
					colliders[j].onHorizontalCollision(this.ent);
				}
			}
		}

	}

	// add gravity and check for any vertical collisions
	this.ent.vel.y += globals.currScene.gravity;
	this.ent.translate(0, this.ent.vel.y);

	for (var i = 0; i < 3; i++) {

		// get the colliders for each of the 3 levels
		colliders = globals.currScene.getColliders(i, this.ent);

		if (colliders) {
			for (var j = 0; j < colliders.length; j++) {
				if (this.ent.intersects(colliders[j])) {
					colliders[j].onVerticalCollision(this.ent);
				}
			}
		}

		// get the entities for each of the 3 levels
		colliders = globals.currScene.getEntities(i, this.ent);

		if (colliders) {
			for (var j = 0; j < colliders.length; j++) {
				if (this.ent.intersects(colliders[j]) && colliders[j].onVerticalCollision) {
					colliders[j].onVerticalCollision(this.ent);
				}
			}
		}

		// check collision with any entity owned by the scene (eg destroyers)
		if (globals.currScene.entities) {
			colliders = globals.currScene.entities;
			for (var j = 0; j < colliders.length; j++) {
				if (this.ent.intersects(colliders[j]) && colliders[j].onVerticalCollision) {
					colliders[j].onVerticalCollision(this.ent);
				}
			}
		}

	}

}