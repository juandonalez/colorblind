Easer.prototype = new Component();
Easer.prototype.constructor = Easer;

function Easer(go) {

	this.go = go;
	this.running = false;
	
	this.type;
	this.duration;
	this.elapsed;
	this.beginPos = new Point(0, 0);
	this.target = new Point(0, 0);
	this.difference = new Point(0, 0);

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

		var transformX = (this.difference.x*func) + b.x;
		var transformY = this.difference.y*func + b.y;

		// get the difference between the new pos the curr go pos.
		// we could just set the game object to the new pos, but by getting
		// the difference we can then apply the same tranform to other game objects
		transformX -= this.go.center.x;
		transformY -= this.go.center.y;

		this.go.translate(Math.round(transformX), Math.round(transformY));

	}

}

Easer.prototype.reset = function() {

	this.running = false;

}

Easer.prototype.start = function(type, targetX, targetY, duration) {

	if (type !== null && targetX !== null && targetY !== null && duration !== null) {
		this.running = true;
		this.type = type;
		this.duration = duration;
		this.elapsed = 0;
		this.beginPos.x = this.go.center.x;
		this.beginPos.y = this.go.center.y;
		this.target.x = targetX;
		this.target.y = targetY;
		this.difference.x = this.target.x - this.beginPos.x;
		this.difference.y = this.target.y - this.beginPos.y;
	}

}