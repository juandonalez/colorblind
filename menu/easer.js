function Easer(entity) {

	this.entity = entity;

	this.active = false;
	this.type;

	this.b;	//start
	this.end;
	this.d; //duration (total)
	this.t;	//elapsed

}

Easer.prototype.update = function() {

	if (this.active) {

		this.t += globals.delta;

		var res = this.end.subtract(this.b);

		if (this.t >= this.d) {
			this.t = this.d;
			this.active = false;
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

		res.x = Math.round(res.x*func + b.x);
		res.y = Math.round(res.y*func + b.y);

		var transform = res.subtract(this.entity.center);

		this.entity.moveCenter(transform);

		if (this.entity.entities) {
			var entities = this.entity.entities;
			for (var i = 0; i < entities.length; i++) {
				entities[i].moveCenter(transform);
			}
		}

	}

}

Easer.prototype.start = function(type, end, total) {

	this.active = true;
	this.type = type;
	this.b = this.entity.center;
	this.end = end;
	this.d = total;
	this.t = 0;

}