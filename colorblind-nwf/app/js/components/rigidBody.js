RigidBody.prototype = new Component();
RigidBody.prototype.constructor = RigidBody;

function RigidBody(go, hasGravity) {

	this.go = go;
	this.hasGravity = hasGravity;

}

RigidBody.prototype.update = function() {

	// check for horizontal collisions first
	this.go.translate(this.go.vel.x * 1, 0);

	var gameObjects;

	for (var i = 0; i < 3; i++) {

		// get the gameObjects for each of the 3 levels
		gameObjects = globals.currScene.getGameObjects(i, this.go);

		if (gameObjects) {
			for (var j = 0; j < gameObjects.length; j++) {
				if (this.go.intersects(gameObjects[j])) {
					if (gameObjects[j].id !== this.go.id) {
						gameObjects[j].onHorizontalCollision(this.go);
					}
				}
			}
		}

	}

	// add gravity and check for any vertical collisions
	if  (this.hasGravity) {
		this.go.vel.y += globals.currScene.gravity;
	}

	this.go.translate(0, this.go.vel.y * 1);

	for (var i = 0; i < 3; i++) {

		// get the gameObjects for each of the 3 levels
		gameObjects = globals.currScene.getGameObjects(i, this.go);

		if (gameObjects) {
			for (var j = 0; j < gameObjects.length; j++) {
				if (this.go.intersects(gameObjects[j])) {
					if (gameObjects[j].id !== this.go.id) {
						gameObjects[j].onVerticalCollision(this.go);
					}
				}
			}
		}

	}

}