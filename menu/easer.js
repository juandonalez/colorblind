function Easer(entity) {

	this.entity = entity;

	this.isEasing = false;
	this.type;

	this.b;	//start
	this.end;
	this.d; //duration (total)
	this.t;	//elapsed

}

Easer.prototype.update = function() {

	if (this.isEasing) {

		this.t += globals.delta;

		var target = this.end.subtract(this.b);

		if (this.t >= this.d) {
			this.t = this.d;
			this.isEasing = false;
		}

		var t = this.t;
		var d = this.d;
		var b = this.b;
		var s = 1.5;

		if (this.type === "easeOutBack") {
			var func = (t=t/d-1)*t*((s+1)*t + s) + 1
		}
		else {
			var func = (t/=d)*t*((s+1)*t - s);
		}

		target.x = Math.round(target.x*func + b.x);
		target.y = Math.round(target.y*func + b.y);

		var transform = target.subtract(this.entity.center);

		this.entity.moveCenter(transform);

		if (this.entity.entities) {
			var entities = this.entity.entities;
			for (var i = 0; i < entities.length; i++) {
				entities[i].moveCenter(transform);
			}
		}

	}

}

Easer.prototype.startEasing = function(type, end, total) {

	this.isEasing = true;
	this.type = type;
	this.b = this.entity.center;
	this.end = end;
	this.d = total;
	this.t = 0;

}