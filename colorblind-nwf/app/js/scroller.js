function Scroller(y, stage, type, speed) {

	this.y = 0;
	this.stage = stage;
	this.type = type;
	this.speed = speed;

	this.pool = [];
	this.bgs = [];

	this.init = function() {

		for (var i = 0; i < 4; i++) {
			var img  = new Image();
			img.src  = 'images/backgrounds/' + this.stage + '/' + this.type + i + '.png';
			//img.src  = 'images/backgrounds/1/m0.png';
			var bg = new Background(img);
			this.pool.push(bg);
		}

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
			ctx.drawImage(bg.image, Math.round(bg.x) - 30, y - 30);
		}

	}

}