function Fader(entity) {

	this.entity = entity;

	this.active = false;

	this.b;	//start
	this.end;
	this.d; //duration (total)
	this.t;	//elapsed

}

Fader.prototype.update = function() {

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

		var func = t/d;

		res = res*func + b;

		if (this.entity.entities) {
			var entities = this.entity.entities;
			for (var i = 0; i < entities.length; i++) {
				entities[i].alpha = res;
			}
		}

	}

}

Fader.prototype.start = function(target, time) {

	this.active = true;
	this.b = this.entity.alpha;
	this.end = target;
	this.d = time;
	this.t = 0;

}