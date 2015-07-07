function RigidBody(gameObject) {

	this.gameObject = gameObject;

}

RigidBody.prototype.update = function() {

	var go = this.gameObject;
	var colliders = globals.currScene.getColliders(go);

	go.translate(new Point(Math.round(go.vel.x * globals.delta), 0));

	for (var i = 0; i < colliders.length; i++) {

		if (go.intersects(colliders[i])) {
			colliders[i].onHorizontalCollision(go);
		}

	}

	go.vel.y += globals.currScene.gravity;
	go.translate(new Point(0, Math.round(go.vel.y * globals.delta)));

	for (var i = 0; i < colliders.length; i++) {

		if (go.intersects(colliders[i])) {
			colliders[i].onVerticalCollision(go);
		}

	}

}