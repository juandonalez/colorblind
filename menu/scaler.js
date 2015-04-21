function Scaler(entity) {

	this.entity = entity;

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

		var t = this.elapsed;
		var d = this.duration;
		var b = this.initial;
		var s = 1.5;

		if (this.type === "easeOutBack") {
			var func = (t=t/d-1)*t*((s+1)*t + s) + 1;
		}
		else {
			var func = (t/=d)*t*((s+1)*t - s);
		}

		var transform = this.difference*func + b;
		transform /=this.entity.height;
		this.entity.resize(transform);

	}

}

Scaler.prototype.start = function(type, target, duration) {

	this.active = true;
	this.type = type;
	this.initial = this.entity.height;
	this.target = target;
	this.duration = duration;
	this.difference = this.target - this.initial;
	this.elapsed = 0;

}