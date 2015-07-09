function RigidBody(ent) {

	this.ent = ent;

}

RigidBody.prototype.update = function() {

	var colliders = globals.currScene.getColliders(this.ent);

	// check for horizontal collisions first
	this.ent.translate(Math.round(this.ent.vel.x * globals.delta), 0);

	for (var i = 0; i < colliders.length; i++) {

		if (this.ent.intersects(colliders[i])) {
			colliders[i].onHorizontalCollision(this.ent);
		}

	}

	// add gravity and check for any vertical collisions
	this.ent.vel.y += globals.currScene.gravity;
	this.ent.translate(0, Math.round(this.ent.vel.y * globals.delta));

	for (var i = 0; i < colliders.length; i++) {

		if (this.ent.intersects(colliders[i])) {
			colliders[i].onVerticalCollision(this.ent);
		}

	}

}