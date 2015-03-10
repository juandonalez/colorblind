function Easer(parent) {

	this.parent = parent;

	this.isEasing = false;
	this.b;	//start
	this.end;
	this.d; //duration (total)
	this.t;	//elapsed
	this.percent;

	this.ease = function(end, total) {

		this.isEasing = true;
		this.b = this.parent.boundingBox.center;
		this.end = end;
		this.d = total;
		this.t = 0;
		this.percent = 0;

	}

	this.update = function() {

		this.t += globals.delta;
		this.percent = this.t / this.d;
		var x = this.end.x - this.b.x;
		var y = this.end.y - this.b.y;

		if (this.t >= this.d) {
			this.percent = 1;
			this.isEasing = false;
		}
		
		var t = this.t;
		var d = this.d;
		var b = this.b;

		//return c * t/d + b;	//linear
		var s = 5;
		var stuff = ((t=t/d-1)*t*((s+1)*t + s) + 1);
		x = x*stuff + b.x;
		y = y*stuff + b.y;
		console.log(x + ", " + y);
		this.parent.boundingBox.setCenter(new Point(x, y));

	}

}