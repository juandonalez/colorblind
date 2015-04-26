function Fader(entity) {

	this.entity = entity;

	this.active = false;

	this.initial;
	this.target;
	this.duration;
	this.elapsed;
	this.difference;

}

Fader.prototype.update = function() {

	if (this.active) {

		this.elapsed += globals.delta;

		if (this.elapsed >= this.duration) {
			this.elapsed = this.duration;
			this.active = false;
		}

		var transform = this.difference*(this.elapsed/this.duration) + this.initial;
		this.entity.setAlpha(transform);

	}

}

Fader.prototype.start = function(target, duration) {

	this.active = true;
	this.initial = this.entity.alpha;
	this.target = target;
	this.duration = duration;
	this.difference = this.target - this.initial;
	this.elapsed = 0;

}