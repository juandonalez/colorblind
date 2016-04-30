Bounds.prototype = new Component();
Bounds.prototype.constructor = Bounds;

function Bounds(go, x, y, width, height) {

	this.go = go;
	this.x = x;
	this.y = y;
	this.center = new Point(0, 0);
	this.max = new Point(0, 0);
	this.width = width;
	this.height = height;
	this.updateBounds();

}