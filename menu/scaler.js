function Scaler(entity) {

	this.entity = entity;

	this.active = false;
	this.type;

	this.b;	//start
	this.end;
	this.d; //duration (total)
	this.t;	//elapsed

}

Scaler.prototype.update = function() {

	if (this.active) {

		this.t += globals.delta;

		var res = this.end - this.b;

		if (this.t >= this.d) {
			this.t = this.d;
			this.active = false;
		}

		var t = this.t;
		var d = this.d;
		var b = this.b;
		var s = 1.5;

		if (this.type === "easeOutBack") {
			var func = (t=t/d-1)*t*((s+1)*t + s) + 1;
		}
		else {
			var func = (t/=d)*t*((s+1)*t - s);
		}

		res = Math.round(res*func + b);

		var transform = res/this.entity.width;

		this.entity.resize(transform);

		if (this.entity.entities) {
			var entities = this.entity.entities;
			for (var i = 0; i < entities.length; i++) {
				entities[i].resize(transform);
			}
		}

	}

}

Scaler.prototype.start = function(type, scale, total) {

	this.active = true;
	this.type = type;
	this.b = this.entity.width;
	this.end = this.entity.width * scale;
	this.d = total;
	this.t = 0;

}