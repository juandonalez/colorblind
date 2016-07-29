OneWayPlatform.prototype = new GameObject();
OneWayPlatform.prototype.constructor = OneWayPlatform;

function OneWayPlatform(x, y, width, height) {

	this.name = "oneWayPlatform";
	this.id = utilities.getNewID();

	this.startX = x;
	this.startY = y;

	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.center = new Point(0, 0);
	this.max = new Point(0, 0);
	this.updateBounds();

	this.friction = 3;

}

OneWayPlatform.prototype.onVerticalCollision = function(go) {

	// if velocity is greater than 0 then game object is moving down
	// less than 0 it is moving up

	if (go.vel.y > 0 && go.max.y <= this.max.y) {

		if (go.applyFriction) {
			go.applyFriction(this.friction);
		}

		go.setPosition(go.x, this.y - go.height - 1);

		if (go.isGrounded !== null) {
			go.isGrounded = true;
		}

		go.vel.y = 0;

	}

}

OneWayPlatform.prototype.reset = function() {

	this.x = this.startX;
	this.y = this.startY;
	this.updateBounds();

}