function Line(x0, y0, x1, y1) {

	this.p0 = new Point(x0, y0);
	this.p1 = new Point(x1, y1);

}

Line.prototype.draw = function() {

	globals.ctx.strokeStyle = "blue";
	globals.ctx.globalAlpha = 1;
	globals.ctx.lineWidth = 3;
	globals.ctx.beginPath();
	globals.ctx.moveTo(this.p0.x, this.p0.y);
	globals.ctx.lineTo(this.p1.x, this.p1.y);
	globals.ctx.stroke();

}

Line.prototype.translate = function(x, y) {

	this.p0.x += x;
	this.p0.y += y;
	this.p1.x += x;
	this.p1.y += y;

}