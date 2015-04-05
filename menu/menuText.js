function MenuText(center, text, height, lineWidth, strokeStyle, fillStyle, type, target, links) {

	this.center = center;
	this.scale = 1;
	this.text = text;
	this.height = height;
	this.lineWidth = lineWidth;
	this.strokeStyle = strokeStyle;
	this.fillStyle = fillStyle;
	this.width = this.calculateWidth();
	this.origin = this.calculateOrigin();

}

MenuText.prototype.calculateOrigin = GameObject.prototype.calculateOrigin;
MenuText.prototype.moveCenter = GameObject.prototype.moveCenter;
MenuText.prototype.setCenter = GameObject.prototype.setCenter;

MenuText.prototype.draw = function() {

	if (this.text) {
		globals.bufferCtx.textBaseline = "top";
		globals.bufferCtx.textAlign = "start";
		globals.bufferCtx.font = (this.height * this.scale) + "px " + globals.font;
		globals.bufferCtx.lineWidth = this.lineWidth;
		globals.bufferCtx.strokeStyle = this.strokeStyle;
		globals.bufferCtx.strokeText(this.text, this.origin.x, this.origin.y);
		globals.bufferCtx.fillStyle = this.fillStyle;
		globals.bufferCtx.fillText(this.text, this.origin.x, this.origin.y);
	}

}

MenuText.prototype.calculateWidth = function() {

	globals.bufferCtx.font = (this.height * this.scale) + "px " + globals.font;
	globals.bufferCtx.lineWidth = this.lineWidth + "px";
	return globals.bufferCtx.measureText(this.text).width;

}