function PlatformCollider(entity, x, y, width, height) {

	this.tag = 'PlatformCollider';
	this.entity = entity;
	this.friction = 200;

	this.origin = new Point(x, y);
	this.width = width;
	this.height = height;
	this.center = this.calculateCenter();

}

PlatformCollider.prototype.draw = function() {

	globals.bufferCtx.globalAlpha = 1;
	globals.bufferCtx.strokeStyle = "blue";
	globals.bufferCtx.strokeRect(this.origin.x, this.origin.y, this.width, this.height);

}

PlatformCollider.prototype.calculateCenter = GameObject.prototype.calculateCenter;

PlatformCollider.prototype.calculateOrigin = GameObject.prototype.calculateOrigin;

PlatformCollider.prototype.intersects = GameObject.prototype.intersects;

PlatformCollider.prototype.translate = GameObject.prototype.translate;

PlatformCollider.prototype.onHorizontalCollision = function(go) {

	if (go.vel.x > 0) {
		go.setOrigin(new Point(this.origin.x - go.width - 1, go.origin.y));
	}
	else if (go.vel.x < 0) {
		go.setOrigin(new Point(this.origin.x + this.width + 1, go.origin.y));
	}

	go.vel.x = 0;

}

PlatformCollider.prototype.onVerticalCollision = function(go) {

	if (go.vel.y > 0) {

		if (go.applyFriction) {
			go.applyFriction(this.friction);
		}

		go.setOrigin(new Point(go.origin.x, this.origin.y - go.height - 1));

		if (go.isGrounded !== null) {
			go.isGrounded = true;
		}

	}
	else if (go.vel.y < 0) {
		go.setOrigin(new Point(go.origin.x, this.origin.y + this.height + 1));
	}

	go.vel.y = 0;

}