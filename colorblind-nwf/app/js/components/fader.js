Fader.prototype = new Component();
Fader.prototype.constructor = Fader;

function Fader(go) {

	this.go = go;
	this.running = false;

	this.initial;
	this.target;
	this.duration;
	this.elapsed;
	this.difference;

}

Fader.prototype.update = function() {

	if (this.running) {

		this.elapsed += globals.delta;

		if (this.elapsed >= this.duration) {
			this.elapsed = this.duration;
			this.running = false;
		}

		var transform = this.difference*(this.elapsed/this.duration) + this.initial;
		this.go.setAlpha(transform);

	}

}

Fader.prototype.start = function(target, duration) {

	if (target !== null && duration !== null) {
		this.running = true;
		this.initial = this.go.alpha;
		this.target = target;
		this.duration = duration;
		this.difference = this.target - this.initial;
		this.elapsed = 0;
	}

}