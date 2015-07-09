function Scaler(ent) {

	this.ent = ent;
	this.active = false;

	this.type;
	this.initial;
	this.target;
	this.duration;
	this.elapsed;
	this.difference;

}

Scaler.prototype.update = function() {

	if (this.active) {

		this.elapsed += globals.delta;

		if (this.elapsed >= this.duration) {
			this.elapsed = this.duration;
			this.active = false;
		}

		// the whole easing function is "difference(c) * func + b" but we'll get func first
		var t = this.elapsed;
		var d = this.duration;
		var b = this.initial;
		var s = 1.5;

		if (this.type === "easeOutBack") {
			var func = (t=t/d-1)*t*((s+1)*t + s) + 1;
		}
		else if (this.type === "easeInBack") {
			var func = (t/=d)*t*((s+1)*t - s);
		}
		else if (this.type === "pulse") {
			var func = t/d - Math.floor(t/d);
		}

		var transform = this.difference*func + b;
		// divide transform by height to get a proportion that can then be used
		// on any entities attached to this one
		transform /= this.ent.height;
		this.ent.resize(transform);

	}

}

Scaler.prototype.start = function(type, target, duration) {

	this.active = true;
	this.type = type;
	this.initial = this.ent.height;
	this.target = target;
	this.duration = duration;
	this.difference = this.target - this.initial;
	this.elapsed = 0;

}