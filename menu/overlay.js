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
	this.texts = [];

	this.active = active;

	this.easer = new Easer(this);

	this.update = function() {

		if (this.easer.isEasing) {
			var prevPos = this.boundingBox.center.copy();
			this.easer.update();
			if (!prevPos.equals(this.boundingBox.center)) {
				var diff = this.boundingBox.center.subtract(prevPos);
				if (this.images) {
					for (var i = 0; i < this.images.length; i++) {
						// maybe should use move center instead so that origin is also updated
						this.images[i].boundingBox.center.add(diff);
					}
				}
				if (this.texts) {
					for (var i = 0; i < this.texts.length; i++) {
						this.texts[i].boundingBox.moveCenter(diff);
					}
				}
			}
		}

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

	this.addText = function(t) {

		var relative = this.boundingBox.pctToPoint(t.center);
		t.boundingBox.setCenter(relative);
		this.texts.push(t);

	}

}