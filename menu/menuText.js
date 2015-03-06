function MenuText() {

	this.origin;
	this.center;
	this.scale = 1;

	this.text;
	this.fontSize;
	this.lineWidth;
	this.strokeStyle;
	this.fillStyle;

	this.draw = function() {

		if (this.text) {
			/*globals.bufferCtx.font = (this.fontSize * this.scale) + "px " + globals.font;
			globals.bufferCtx.lineWidth = this.lineWidth;
			globals.bufferCtx.strokeStyle = this.strokeStyle;
			globals.bufferCtx.strokeText(this.text, this.origin.x, this.origin.y);
			globals.bufferCtx.fillStyle = this.fillStyle;
			globals.bufferCtx.fillText(this.text, this.origin.x, this.origin.y);*/
		}

	}

}