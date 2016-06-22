Slope.prototype = new GameObject();
Slope.prototype.constructor = Slope;

function Slope(x, y, points) {

	this.name = "Slope";
	this.id = utilities.getNewID();

	this.point0 = new Point(x, y);
	this.point1 = new Point(x + points[1].x, y + points[1].y);
	this.point2 = new Point(x + points[2].x, y + points[2].y);

	this.hitbox = new Polygon(new Vector(x, y), [new Vector(), new Vector(points[1].x, points[1].y), new Vector(points[2].x, points[2].y)]);

	var minX = x;
	if (this.point1.x < minX) {minX = this.point1.x;}
	if (this.point2.x < minX) {minX = this.point2.x;}

	var minY = y;
	if (this.point1.y < minY) {minY = this.point1.y;}
	if (this.point2.y < minY) {minY = this.point2.y;}

	var maxX = x;
	if (this.point1.x > maxX) {maxX = points[1].x;}
	if (this.point2.x > maxX) {maxX = this.point2.x;}

	var maxY = y;
	if (this.point1.y > maxY) {maxY = this.point1.y;}
	if (this.point2.y > maxY) {maxY = this.point2.y;}

	this.startX = minX;
	this.startY = minY;

	this.x = minX;
	this.y = minY;
	this.width = maxX - minX;
	this.height = maxY - minY;
	this.center = new Point(0, 0);
	this.max = new Point(0, 0);
	this.updateBounds();

	this.point0.x -= this.x;
	this.point0.y -= this.y;
	this.point1.x -= this.x;
	this.point1.y -= this.y;
	this.point2.x -= this.x;
	this.point2.y -= this.y;

	this.friction = 3;

}

Slope.prototype.intersects = function(go) {

	if (
		this.x <= go.max.x &&
		go.x <= this.max.x &&
		this.y <= go.max.y &&
		go.y <= this.max.y &&
		go.hitbox
	) {
		return SAT.testPolygonPolygon(this.hitbox, go.hitbox);
	}
	else {
		return false;
	}


}

Slope.prototype.onHorizontalCollision = function(go) {

	/*if (go.vel.x > 0) {
		go.setPosition(this.x - go.width - 1, go.y);
	}
	else if (go.vel.x < 0) {
		go.setPosition(this.max.x + 1, go.y);
	}

	go.vel.x = 0;*/

}

Slope.prototype.onVerticalCollision = function(go) {

	// if velocity is greater than 0 then game object is moving down
	// less than 0 it is moving up

	if (go.vel.y > 0) {

		if (go.applyFriction) {
			go.applyFriction(this.friction);
		}

		//go.setPosition(go.x, this.hitbox.pos.y + (go.x - this.hitbox.pos.x));
		console.log(this.hitbox.pos);

		if (go.isGrounded !== null) {
			go.isGrounded = true;
		}

	}
	else if (go.vel.y < 0) {
		//go.setPosition(go.x, this.max.y + 1);
	}

	go.vel.y = 0;

}

Slope.prototype.reset = function() {

	this.x = this.startX;
	this.y = this.startY;
	this.updateBounds();
	this.hitbox.pos.x = this.startX + this.point0.x;
	this.hitbox.pos.y = this.startY + this.point0.y;

}