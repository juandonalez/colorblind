function MenuText(d, menu) {

	this.name = d.name;
	this.menu = menu;
	this.components = [];

	this.center = d.center;
	this.text = d.text;
	this.height = d.fontSize;
	this.defaultHeight = d.fontSize;
	this.lineWidth = d.lineWidth;
	this.defaultLineWidth = d.lineWidth;
	this.strokeStyle = d.strokeStyle;
	this.fillStyle = d.fillStyle;
	this.alpha = 1;

	if (d.selectable) {
		this.selected = d.selected;
		this.left = d.links[0];
		this.up = d.links[1];
		this.right = d.links[2];
		this.down = d.links[3];
		this.selectStroke = d.selectStroke;
		this.selectFill = d.selectFill;
		this.selectHeight = this.height*1.25;

		if (this.selected) {
			this.height = this.selectHeight;
			this.lineWidth *= 1.25;
		}
	}

	this.width = this.calculateWidth();
	this.origin = this.calculateOrigin();

	this.scaler = new Scaler(this);
	this.components.push(this.scaler);

	d = null;

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

MenuText.prototype.confirm = MenuItem.prototype.confirm;

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