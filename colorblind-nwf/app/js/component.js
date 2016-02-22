function Component() {}

Component.prototype.activate = function() {

	if (this.active !== null) {
		this.active = true;
	}

}

Component.prototype.deactivate = function() {

	if (this.active !== null) {
		this.active = false;
	}

}

Component.prototype.draw = function() {}

Component.prototype.reset = function() {}

Component.prototype.update = function() {}