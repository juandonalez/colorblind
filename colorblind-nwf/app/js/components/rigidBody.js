function RigidBody(gameObject) {

	this.gameObject = gameObject;

}

RigidBody.prototype.update = function() {

	var go = this.gameObject;
	var colliders = globals.currScene.getColliders(go);

	if (go.moveHori) {
		go.moveHori();
	}

	for (var i = 0; i < colliders.length; i++) {

		if (go.intersects(colliders[i])) {
			colliders[i].onHorizontalCollision(go);
		}

	}

	go.vel.y += globals.currScene.gravity;
	if (go.moveVert) {
		go.moveVert();
	}

	for (var i = 0; i < colliders.length; i++) {

		if (go.intersects(colliders[i])) {
			colliders[i].onVerticalCollision(go);
		}

	}

}