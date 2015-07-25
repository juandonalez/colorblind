function MenuImage(d, overlay, menu) {

	this.name = d.name;
	this.overlay = overlay;
	this.menu = menu;
	this.components = [];

	this.origin = new Point(0, 0);
	this.center = d.center;
	this.image = fileManager.images[d.image];
	this.width = this.image.width;
	this.defaultHeight = this.image.height;
	this.alpha = 1;

	if (d.selectable) {
		this.selected = d.selected;
		this.left = d.links[0];
		this.up = d.links[1];
		this.right = d.links[2];
		this.down = d.links[3];
		this.selectHeight = this.defaultHeight*1.1;
	}

	if (this.selected) {
		this.height = this.selectHeight;
		this.width *= 1.1;
	}
	else {
		this.height = this.defaultHeight;
	}

	if (d.menuText) {
		var text = d.menuText;
		text.center = this.overlay.pctToPoint(text.center);
		this.menuText = new MenuText(text);
	}

	this.calculateOrigin();

	this.scaler = new Scaler(this);

	this.components = new Array(1);
	this.components[0] = this.scaler;

	d = null;

}

MenuImage.prototype.update = MenuItem.prototype.update;

MenuImage.prototype.draw = function() {

	if (this.image) {
		globals.bufferCtx.globalAlpha = this.alpha;
		globals.bufferCtx.drawImage(this.image, this.origin.x, this.origin.y, this.width, this.height);
	}

	if (this.selected && this.menuText) {
		this.menuText.draw();
	}

}

MenuImage.prototype.translate = function(x, y) {

	this.center.x += x;
	this.center.y += y;
	this.calculateOrigin();

	if (this.menuText) {
		this.menuText.translate(x, y);
	}

}

MenuImage.prototype.cancel = MenuItem.prototype.cancel;

MenuImage.prototype.confirm = MenuItem.prototype.confirm;

MenuImage.prototype.deselect = MenuItem.prototype.deselect;

MenuImage.prototype.select = MenuItem.prototype.select;

MenuImage.prototype.activate = Entity.prototype.activate;

MenuImage.prototype.calculateCenter = Entity.prototype.calculateCenter;

MenuImage.prototype.calculateOrigin = Entity.prototype.calculateOrigin;

MenuImage.prototype.deactivate = Entity.prototype.deactivate;

MenuImage.prototype.intersects = Entity.prototype.intersects;

MenuImage.prototype.pctToPoint = Entity.prototype.pctToPoint;

MenuImage.prototype.resize = Entity.prototype.resize;

MenuImage.prototype.setAlpha = Entity.prototype.setAlpha;

MenuImage.prototype.setCenter = Entity.prototype.setCenter;

MenuImage.prototype.setOrigin = Entity.prototype.setOrigin;