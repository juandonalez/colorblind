function LevelScroller(scene) {

	this.scene = scene;

	this.pool;
	this.levels = [];

	this.init = function() {
	
		this.pool = fileManager.levels;
		var prevWidth = 0;

		for (var i = 0; i < 3; i++) {
			var rand = Math.floor(Math.random()*this.pool.length);
			var level = this.pool.splice(rand, 1).pop();
			level.x = prevWidth;
			prevWidth += level.width;
			this.levels.push(level);
		}

		this.scene.colliders = this.getCurrentColliders();

	}

	this.update = function() {

		/*for (var i = 0; i < 3; i++) {
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
		}*/

		this.scene.colliders = this.getCurrentColliders();

	}

	this.draw = function(ctx) {

		for (var i = 0; i < this.levels.length; i++) {
			this.levels[i].draw(ctx);
		}

	}

	this.getCurrentColliders = function() {

		var colliders = [];

		for (var i = 0; i < this.levels.length; i++) {
			var level = this.levels[i];
			for (var j = 0; j < level.colliders.length; j++) {
				colliders.push(level.colliders[j]);
			}
		}

		return colliders;

	}

}