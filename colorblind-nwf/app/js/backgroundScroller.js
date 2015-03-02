function BackgroundScroller(y, pool, speed) {

	this.y = y;
	this.speed = speed;

	this.pool = pool;
	this.bgs = [];

	this.init = function() {

		for (var i = 0; i < 3; i++) {
			var rand = Math.floor(Math.random()*this.pool.length);
			var bg = this.pool.splice(rand, 1).pop();
			bg.x = i*bg.width;
			this.bgs.push(bg);
		}

	}

	this.update = function() {

		for (var i = 0; i < 3; i++) {
			var bg = this.bgs[i];
			bg.x = bg.x - this.speed;
		}

		var first = this.bgs[0];

		if (first.x + first.width < 0) {
			this.pool.push(this.bgs.shift());
			var rand = Math.floor(Math.random()*this.pool.length);
			var bg = this.pool.splice(rand, 1).pop();
			bg.x = this.bgs[1].x + bg.width;
			this.bgs.push(bg);
		}

	}

	this.draw = function(ctx) {

		for (var i = 0; i < this.bgs.length; i++) {
			var bg = this.bgs[i];
			ctx.drawImage(bg, Math.round(bg.x), this.y);
		}

	}

}