function Overlay(activePos, inactivePos, width, height, active) {

	if (active) {
		//this.origin = activePos;
		this.boundingBox = new BoundingBox(activePos, width, height);
	}
	else {
		//this.origin = inactivePos;
		this.boundingBox = new BoundingBox(inactivePos, width, height);
	}

	this.activePos = activePos;
	this.inactivePos = inactivePos;

	this.images;
	this.texts;

	this.active = active;

	this.easer = new Easer(this);

	this.update = function() {

		if (this.easer.isEasing) {
			this.easer.update();
		}

//console.log("bounding box: " + this.boundingBox.origin.x + ", " + this.boundingBox.origin.y + " overlay: " + this.origin.x + ", " + this.origin.y);
//console.log("bounding box: " + this.boundingBox.center.x + ", " + this.boundingBox.center.y + " overlay: " + this.origin.x + ", " + this.origin.y);
//console.log(this.boundingBox.width/2 + ", " + this.boundingBox.height/2);

	}

	this.draw = function() {

		globals.bufferCtx.strokeStyle = "black";
		globals.bufferCtx.strokeRect(this.boundingBox.origin.x, this.boundingBox.origin.y, this.boundingBox.width, this.boundingBox.height);
		globals.bufferCtx.fillStyle = "blue";
		globals.bufferCtx.fillRect(this.boundingBox.origin.x, this.boundingBox.origin.y, this.boundingBox.width, this.boundingBox.height);

		if (this.images) {
			for (var i = 0; i < this.images.length; i++) {
				this.images[i].draw();
			}
		}

		if (this.texts) {
			for (var i = 0; i < this.texts.length; i++) {
				this.texts[i].draw();
			}
		}

	}

	this.activate = function () {

		this.easer.ease("easeOutBack", this.activePos, 1);

	}

	this.deactivate = function () {

		this.easer.ease("easeInBack", this.inactivePos, 1);

	}

}