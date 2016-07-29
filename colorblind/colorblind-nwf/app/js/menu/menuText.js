MenuText.prototype = new GameObject();
MenuText.constructor = MenuText;
MenuText.prototype.update = MenuItem.prototype.update;
MenuText.prototype.cancel = MenuItem.prototype.cancel;
MenuText.prototype.confirm = MenuItem.prototype.confirm;
MenuText.prototype.deselect = MenuItem.prototype.deselect;
MenuText.prototype.select = MenuItem.prototype.select;

function MenuText(d, menu) {

	this.name = d.name;
	this.menu = menu;
	
	this.text = d.text;

	this.width = 0;
	this.height = d.fontSize;

	this.x = 0;
	this.y = 0;
	this.center = new Point(0, 0);
	this.center.x = d.center.x;
	this.center.y = d.center.y;
	this.max = new Point(0, 0);

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

	this.updateWidth();
	this.updateBounds();

	this.scaler = new Scaler(this);
	this.components = new Array(1);
	this.components[0] = this.scaler;

	d = null;

}

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
	ctx.strokeText(this.text, this.x, this.y);
	ctx.fillText(this.text, this.x, this.y);

}

MenuText.prototype.resize = function(scale) {

	this.height = Math.round(this.height*scale);
	this.lineWidth *= scale;
	this.updateWidth();
	this.updateBounds();

}

MenuText.prototype.translate = function(x, y) {

	this.center.x += x;
	this.center.y += y;
	this.updateBounds();

}

MenuText.prototype.updateWidth = function() {

	var ctx = globals.bufferCtx;

	ctx.font = this.height + "px " + globals.font;
	ctx.lineWidth = this.lineWidth + "px";
	this.width = Math.round(ctx.measureText(this.text).width);

}

MenuText.prototype.updateBounds = function() {

	this.x = this.center.x - (this.width/2);
	this.y = this.center.y - (this.height/2);
	this.max.x = this.x + this.width;
	this.max.y = this.y + this.height;

}