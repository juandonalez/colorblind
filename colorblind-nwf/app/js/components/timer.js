function Timer(ent) {

	this.ent = ent;
	this.score = 0;
	this.accum = 0;

}

Timer.prototype.update = function() {

	this.accum += globals.delta;

	if (this.accum >= 0.1) {

		this.accum -= 0.1;
		this.score++;

	}

}