function MenuImage(o) {

	MenuItem.call(this, o);

	this.image = fileManager.images[o.image];
	this.width = this.image.width;
	this.height = this.image.height;
	//this.origin = this.calculateOrigin();

	if (o.selectable) {
		this.selectHeight = this.height*1.25;
	}

}

MenuImage.prototype.draw = function() {

	if (this.image) {
		globals.bufferCtx.drawImage(this.image, 0, 0, this.width, this.height);
	}

}