function Easer(parent) {

	this.parent = parent;

	this.isEasing = false;
	this.b;	//start
	this.end;
	this.d; //duration (total)
	this.t;	//elapsed

	this.ease = function(end, total) {

		this.isEasing = true;
		this.b = this.parent.boundingBox.center;
		this.end = end;
		this.d = total;
		this.t = 0;

	}

	this.update = function() {

		this.t += globals.delta;

		var target = this.end.subtract(this.b);

		if (this.t >= this.d) {
			this.isEasing = false;
		}
		
		var t = this.t;
		var d = this.d;
		var b = this.b;

		//return c * t/d + b;	//linear
		var s = 2;
		var eq = ((t=t/d-1)*t*((s+1)*t + s) + 1);
		target.x = Math.round(target.x*eq + b.x);
		target.y = Math.round(target.y*eq + b.y);

		this.parent.boundingBox.setCenter(target);

	}

}