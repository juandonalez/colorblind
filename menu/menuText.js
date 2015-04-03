function MenuText(center, text, fontSize, lineWidth, strokeStyle, fillStyle, type, target, links) {

	this.center = center;
	this.scale = 1;
	this.text = text;
	this.fontSize = fontSize;
	this.lineWidth = lineWidth;
	this.strokeStyle = strokeStyle;
	this.fillStyle = fillStyle;
	this.width = calculateWidth(this);
	this.origin = center.subtract(new Point(this.width/2, this.fontSize/2));
	this.boundingBox = new BoundingBox(center, this.width, fontSize);

	this.draw = function() {

		if (this.text) {
			globals.bufferCtx.textBaseline = "top";
			globals.bufferCtx.textAlign = "start";
			globals.bufferCtx.font = (this.fontSize * this.scale) + "px " + globals.font;
			globals.bufferCtx.lineWidth = this.lineWidth;
			globals.bufferCtx.strokeStyle = this.strokeStyle;
			globals.bufferCtx.strokeText(this.text, this.boundingBox.origin.x, this.boundingBox.origin.y);
			globals.bufferCtx.fillStyle = this.fillStyle;
			globals.bufferCtx.fillText(this.text, this.boundingBox.origin.x, this.boundingBox.origin.y);
		}

	}

	function calculateWidth(t) {

		globals.bufferCtx.font = (t.fontSize * t.scale) + "px " + globals.font;
		globals.bufferCtx.lineWidth = t.lineWidth + "px";
		var w = globals.bufferCtx.measureText(t.text).width;
		return w;

	}

}