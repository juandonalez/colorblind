function MenuText(o) {

	this.center = o.center;

	this.text = o.text;
	this.height = o.fontSize;
	this.defaultHeight = o.fontSize;
	this.lineWidth = o.lineWidth;
	this.defaultLineWidth = o.lineWidth;
	this.strokeStyle = o.strokeStyle;
	this.fillStyle = o.fillStyle;
	this.alpha = 1;

	if (o.selectable) {
		this.selected = o.selected;
		this.target = o.target;
		this.left = o.links[0];
		this.up = o.links[1];
		this.right = o.links[2];
		this.down = o.links[3];
		this.selectStroke = o.selectStroke;
		this.selectFill = o.selectFill;
		this.selectHeight = this.height*1.25;
	}

	this.width = this.calculateWidth();
	this.origin = this.calculateOrigin();

	this.scaler = new Scaler(this);

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

MenuText.prototype.calculateCenter = GameObject.prototype.calculateCenter;

MenuText.prototype.calculateOrigin = GameObject.prototype.calculateOrigin;

MenuText.prototype.calculateWidth = function() {

	var ctx = globals.bufferCtx;

	ctx.font = this.height + "px " + globals.font;
	ctx.lineWidth = this.lineWidth + "px";
	return ctx.measureText(this.text).width;

}

MenuText.prototype.deselect = MenuItem.prototype.deselect;

MenuText.prototype.intersects = GameObject.prototype.intersects;

MenuText.prototype.pctToPoint = GameObject.prototype.pctToPoint;

MenuText.prototype.resize = function(scale) {

	this.height = Math.round(this.height*scale);
	this.lineWidth *= scale;
	this.width = this.calculateWidth();
	this.origin = this.calculateOrigin();

}

MenuText.prototype.select = MenuItem.prototype.select;

MenuText.prototype.setAlpha = GameObject.prototype.setAlpha;

MenuText.prototype.setCenter = GameObject.prototype.setCenter;

MenuText.prototype.translate = GameObject.prototype.translate;