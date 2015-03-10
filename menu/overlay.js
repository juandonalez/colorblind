function Overlay(activePos, inactivePos, width, height, images, texts, active) {

	if (active) {
		this.origin = activePos;
		this.boundingBox = new BoundingBox(this.origin, width, height);
	}
	else {
		this.origin = inactivePos;
		this.boundingBox = new BoundingBox(this.origin, width, height);
	}

	this.activePos = activePos;
	this.inactivePos = inactivePos;
	this.vel = new Point(0, 0);

	this.images = images;
	this.texts = texts;

	this.active = active;

	this.easer = new Easer(this);

	this.update = function() {

		if (this.easer.isEasing) {
			this.easer.update();
			//this.boundingBox.setCenter(this.easer.value());
		}

	}

	this.draw = function() {

		globals.bufferCtx.fillStyle = "blue";
		globals.bufferCtx.fillRect(this.origin.x, this.origin.y, this.boundingBox.width, this.boundingBox.height);

	}

	this.activate = function () {

		

	}

	this.deactivate = function () {

		this.easer.ease(this.inactivePos, 1);

	}

}