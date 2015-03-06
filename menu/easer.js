function Easer() {

	this.isEasing = false;
	this.b;	//start
	this.end;
	this.d; //duration (total)
	this.t;	//elapsed
	this.percent;

	this.ease = function(start, end, total) {

		this.isEasing = true;
		this.b = start;
		this.end = end;
		this.d = total;
		this.t = 0;
		this.percent = 0;

	}

	this.value = function() {

		this.t += globals.delta;
		this.percent = this.t / this.d;
		var c = this.end - this.b;

		if (this.t >= this.d) {
			this.percent = 1;
			this.isEasing = false;
		}
		
		var t = this.t;
		var d = this.d;
		var b = this.b;

		//return c * t/d + b;	//linear
		var s = 5;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;

	}

}