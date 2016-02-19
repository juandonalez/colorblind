function RigidBody(ent) {

	this.ent = ent;

}

RigidBody.prototype.update = function() {

	// check for horizontal collisions first
	this.ent.translate(this.ent.vel.x, 0);

	var entities;

	for (var i = 0; i < 3; i++) {

		// get the entities for each of the 3 levels
		entities = globals.currScene.getEntities(i, this.ent);

		if (entities) {
			for (var j = 0; j < entities.length; j++) {
				if (this.ent.intersects(entities[j]) && entities[j].onHorizontalCollision) {
					entities[j].onHorizontalCollision(this.ent);
				}
			}
		}

	}

	// check collision with any entity owned by the scene (eg destroyers)
	if (globals.currScene.destroyers) {
		entities = globals.currScene.destroyers;
		for (var j = 0; j < entities.length; j++) {
			if (this.ent.intersects(entities[j]) && entities[j].onHorizontalCollision) {
				entities[j].onHorizontalCollision(this.ent);
			}
		}
	}

	// add gravity and check for any vertical collisions
	this.ent.vel.y += globals.currScene.gravity;
	this.ent.translate(0, this.ent.vel.y);

	for (var i = 0; i < 3; i++) {

		// get the entities for each of the 3 levels
		entities = globals.currScene.getEntities(i, this.ent);

		if (entities) {
			for (var j = 0; j < entities.length; j++) {
				if (this.ent.intersects(entities[j]) && entities[j].onVerticalCollision) {
					entities[j].onVerticalCollision(this.ent);
				}
			}
		}

	}

	// check collision with any entity owned by the scene (eg destroyers)
	if (globals.currScene.destroyers) {
		entities = globals.currScene.destroyers;
		for (var j = 0; j < entities.length; j++) {
			if (this.ent.intersects(entities[j]) && entities[j].onVerticalCollision) {
				entities[j].onVerticalCollision(this.ent);
			}
		}
	}

}