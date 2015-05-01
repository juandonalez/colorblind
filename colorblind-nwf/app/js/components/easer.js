function Easer(entity) {

	this.entity = entity;

	this.active = false;
	this.type;

	this.beginPos;
	this.target;
	this.duration;
	this.elapsed;
	this.difference;

}

Easer.prototype.update = function() {

	if (this.active) {

		this.elapsed += globals.delta;

		if (this.elapsed >= this.duration) {
			this.elapsed = this.duration;
			this.active = false;
		}

		// the whole easing function is "difference(c) * func + b" but we'll get func first

		var t = this.elapsed;
		var d = this.duration;
		var b = this.beginPos;
		var s = 1.5;

		if (this.type === "easeOutBack") {
			var func = (t=t/d-1)*t*((s+1)*t + s) + 1;
		}
		else {
			var func = (t/=d)*t*((s+1)*t - s);
		}

		var transform = this.difference.multiplyByNum(func);
		transform = transform.add(b);

		/* get the difference between the new pos the current pos.
		we could just set the entity to the new pos, but by getting
		the difference we can then apply the same tranform to other entities */
		transform = transform.subtract(this.entity.center);
		this.entity.moveCenter(transform);

	}

}

Easer.prototype.start = function(type, target, duration) {

	this.active = true;
	this.type = type;
	this.beginPos = this.entity.center;
	this.target = target;
	this.duration = duration;
	this.difference = this.target.subtract(this.beginPos);
	this.elapsed = 0;

}