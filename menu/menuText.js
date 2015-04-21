function MenuText(o) {

	this.center = o.center;
	this.text = o.text;
	this.target = o.target;

	/*this.left = o.links[0];
	this.up = o.links[1];
	this.right = o.links[2];
	this.down = o.links[3];*/

	this.height = o.fontSize;
	this.defaultHeight = o.fontSize;
	this.lineWidth = o.lineWidth;
	this.defaultLineWidth = o.lineWidth;
	this.strokeStyle = o.strokeStyle;
	this.fillStyle = o.fillStyle;
	this.alpha = 1;

	if (o.selectable) {
		this.selected = o.selected;
		this.selectStroke = o.selectStroke;
		this.selectFill = o.selectFill;
		this.selectHeight = this.height*1.25;
	}

	this.width = this.calculateWidth();
	this.origin = this.calculateOrigin();

}

MenuText.prototype.update = MenuItem.prototype.update;

MenuText.prototype.draw = function() {

	var ctx = globals.bufferCtx;

	if (this.selected) {
		ctx.strokeStyle = this.selectStroke;
		ctx.fillStyle = this.selectFill;
	}
	else {
		ctx.strokeStyle = this.strokeStyle;
		ctx.fillStyle = this.fillStyle;
	}

	ctx.globalAlpha = this.alpha;
	ctx.textBaseline = "top";
	ctx.textAlign = "start";
	ctx.font = this.height + "px " + globals.font;
	ctx.lineWidth = this.lineWidth;
	ctx.strokeText(this.text, this.origin.x, this.origin.y);
	ctx.fillText(this.text, this.origin.x, this.origin.y);

}

MenuText.prototype.calculateOrigin = Entity.prototype.calculateOrigin;

MenuText.prototype.calculateWidth = function() {

	var ctx = globals.bufferCtx;

	ctx.font = this.height + "px " + globals.font;
	ctx.lineWidth = this.lineWidth + "px";
	return ctx.measureText(this.text).width;

}

MenuText.prototype.moveCenter = Entity.prototype.moveCenter;

MenuText.prototype.resize = function(scale) {

	this.height *= scale;
	this.lineWidth *= scale;
	this.width = this.calculateWidth();
	this.origin = this.calculateOrigin();

}

MenuText.prototype.setCenter = Entity.prototype.setCenter;