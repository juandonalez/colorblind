Waypoint.prototype = new GameObject();
Waypoint.prototype.constructor = Waypoint;

function Waypoint(x, y, width, height) {

	this.name = "waypoint";
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

}

Waypoint.prototype.onVerticalCollision = function(ent) {

	if (ent.name === "movingPlatform") {
		ent.vel.x *= -1;
		ent.vel.y *= -1;
	}

}

Waypoint.prototype.reset = function() {

	this.x = this.startX;
	this.y = this.startY;
	this.updateBounds();

}