//function MenuText(center, text, height, lineWidth, strokeStyle, fillStyle, type, target, links) {
function MenuText(o) {

	/*this.center = center;
	this.text = text;
	this.height = height;
	this.lineWidth = lineWidth;
	this.strokeStyle = strokeStyle;
	this.fillStyle = fillStyle;
	this.width = this.calculateWidth();
	this.origin = this.calculateOrigin();
	this.alpha = 1;*/

	this.type = o.type;
	this.center = o.center;
	this.text = o.text;
	this.target = o.target;
	this.links = o.links;
	this.alpha = 1;
	this.width = this.calculateWidth();
	this.origin = this.calculateOrigin();

}

MenuText.prototype.draw = function() {

	var style = globals.currentStyle[this.type];
	var ctx = globals.bufferCtx;

	ctx.globalAlpha = this.alpha;
	ctx.textBaseline = "top";
	ctx.textAlign = "start";
	ctx.font = style.fontSize + "px " + globals.font;
	ctx.lineWidth = style.lineWidth;
	ctx.strokeStyle = style.strokeStyle;
	ctx.strokeText(this.text, this.origin.x, this.origin.y);
	ctx.fillStyle = style.fillStyle;
	ctx.fillText(this.text, this.origin.x, this.origin.y);

}

MenuText.prototype.calculateOrigin = function() {

	var style = globals.currentStyle[this.type];
	return new Point(this.center.x - (this.width/2), this.center.y - (style.fontSize/2));

}

MenuText.prototype.calculateWidth = function() {

	var style = globals.currentStyle[this.type];
	var ctx = globals.bufferCtx;

	ctx.font = style.fontSize + "px " + globals.font;
	ctx.lineWidth = style.lineWidth + "px";
	return ctx.measureText(this.text).width;

}

MenuText.prototype.moveCenter = Entity.prototype.moveCenter;

MenuText.prototype.resize = function(scale) {

	/*this.height *= scale;
	this.lineWidth *= scale;
	this.width = this.calculateWidth();
	this.origin = this.calculateOrigin();*/

}

MenuText.prototype.setCenter = Entity.prototype.setCenter;