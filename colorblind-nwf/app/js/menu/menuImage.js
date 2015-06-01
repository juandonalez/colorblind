function MenuImage(d, overlay, menu) {

	this.name = d.name;
	this.overlay = overlay;
	this.menu = menu;
	this.components = [];

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

	this.origin = this.calculateOrigin();

	this.scaler = new Scaler(this);
	this.components.push(this.scaler);

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

MenuImage.prototype.calculateCenter = GameObject.prototype.calculateCenter;

MenuImage.prototype.calculateOrigin = GameObject.prototype.calculateOrigin;

MenuImage.prototype.confirm = MenuItem.prototype.confirm;

MenuImage.prototype.deselect = MenuItem.prototype.deselect;

MenuImage.prototype.intersects = GameObject.prototype.intersects;

MenuImage.prototype.pctToPoint = GameObject.prototype.pctToPoint;

MenuImage.prototype.resize = GameObject.prototype.resize;

MenuImage.prototype.select = MenuItem.prototype.select;

MenuImage.prototype.setAlpha = GameObject.prototype.setAlpha;

MenuImage.prototype.setCenter = GameObject.prototype.setCenter;

MenuImage.prototype.translate = function(p) {

	this.center = this.center.add(p);
	this.origin = this.calculateOrigin();

	if (this.menuText) {
		this.menuText.translate(p);
	}

}