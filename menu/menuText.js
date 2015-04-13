function MenuText(center, text, height, lineWidth, strokeStyle, fillStyle, type, target, links) {

	this.center = center;
	this.text = text;
	this.height = height;
	this.lineWidth = lineWidth;
	this.strokeStyle = strokeStyle;
	this.fillStyle = fillStyle;
	this.width = this.calculateWidth();
	this.origin = this.calculateOrigin();
	this.alpha = 1;

}

MenuText.prototype.draw = function() {

	if (this.text) {
		globals.bufferCtx.globalAlpha = this.alpha;
		globals.bufferCtx.textBaseline = "top";
		globals.bufferCtx.textAlign = "start";
		globals.bufferCtx.font = this.height + "px " + globals.font;
		globals.bufferCtx.lineWidth = this.lineWidth;
		globals.bufferCtx.strokeStyle = this.strokeStyle;
		globals.bufferCtx.strokeText(this.text, this.origin.x, this.origin.y);
		globals.bufferCtx.fillStyle = this.fillStyle;
		globals.bufferCtx.fillText(this.text, this.origin.x, this.origin.y);
	}

}

MenuText.prototype.calculateOrigin = Entity.prototype.calculateOrigin;

MenuText.prototype.calculateWidth = function() {

	globals.bufferCtx.font = this.height + "px " + globals.font;
	globals.bufferCtx.lineWidth = this.lineWidth + "px";
	return globals.bufferCtx.measureText(this.text).width;

}

MenuText.prototype.moveCenter = Entity.prototype.moveCenter;

MenuText.prototype.resize = function(scale) {

	this.height *= scale;
	this.lineWidth *= scale;
	this.width = this.calculateWidth();
	this.origin = this.calculateOrigin();

}

MenuText.prototype.setCenter = Entity.prototype.setCenter;