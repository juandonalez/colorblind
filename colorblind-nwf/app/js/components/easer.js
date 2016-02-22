Easer.prototype = new Component();
Easer.prototype.constructor = Easer;

function Easer(go) {

	this.go = go;
	this.running = false;
	
	this.type;
	this.beginPos;
	this.target;
	this.duration;
	this.elapsed;
	this.difference;

}

Easer.prototype.update = function() {

	if (this.running) {

		this.elapsed += globals.delta;

		if (this.elapsed >= this.duration) {
			this.elapsed = this.duration;
			this.running = false;
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

		// get the difference between the new pos the currgo pos.
		// we could just set the game object to the new pos, but by getting
		// the difference we can then apply the same tranform to other goities
		transform = transform.subtract(this.go.center);
		this.go.translate(Math.round(transform.x), Math.round(transform.y));

	}

}

Easer.prototype.reset = function() {

	this.running = false;

}

Easer.prototype.start = function(type, target, duration) {

	if (type !== null && target !== null && duration !== null) {
		this.running = true;
		this.type = type;
		this.beginPos = this.go.center.copy();
		this.target = target;
		this.duration = duration;
		this.difference = this.target.subtract(this.beginPos);
		this.elapsed = 0;
	}

}