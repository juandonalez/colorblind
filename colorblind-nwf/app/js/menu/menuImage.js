function MenuImage(d, menu) {

	this.name = d.name;
	this.menu = menu;

	this.center = d.center;
	this.image = fileManager.images[d.image];
	this.width = this.image.width;
	this.height = this.image.height;
	this.origin = this.calculateOrigin();

	if (d.selectable) {
		this.selected = d.selected;
		this.target = d.target;
		this.left = d.links[0];
		this.up = d.links[1];
		this.right = d.links[2];
		this.down = d.links[3];
		this.selectHeight = this.height*1.25;
	}

	this.scaler = new Scaler(this);

}

MenuImage.prototype.update = MenuItem.prototype.update;

MenuImage.prototype.draw = function() {

	if (this.image) {
		globals.bufferCtx.drawImage(this.image, this.origin.x, this.origin.y, this.width, this.height);
	}

}

MenuImage.prototype.calculateCenter = GameObject.prototype.calculateCenter;

MenuImage.prototype.calculateOrigin = GameObject.prototype.calculateOrigin;

MenuImage.prototype.deselect = MenuItem.prototype.deselect;

MenuImage.prototype.intersects = GameObject.prototype.intersects;

MenuImage.prototype.pctToPoint = GameObject.prototype.pctToPoint;

MenuImage.prototype.resize = GameObject.prototype.resize;

MenuImage.prototype.select = MenuItem.prototype.select;

MenuImage.prototype.setAlpha = GameObject.prototype.setAlpha;

MenuImage.prototype.setCenter = GameObject.prototype.setCenter;

MenuImage.prototype.translate = GameObject.prototype.translate;