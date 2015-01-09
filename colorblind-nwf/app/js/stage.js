function Stage(id) {

	this.id = id;
	this.offset = 0;
	this.farScroller;
	this.midScroller;
	this.levels;

	this.init = function() {

		this.farScroller = new Scroller(0, fileManager.bgsFar, 10);
		this.midScroller = new Scroller(200, fileManager.bgsMid, 12);
		this.farScroller.init();
		this.midScroller.init();

		this.levels = new Array(fileManager.levels.length);
		var level;
		for (var i = 0; i < fileManager.levels.length; i++) {
			level = new Level();
			level.init(fileManager.levels[i]);
			this.levels[i] = level;
		}

	}

	this.update = function() {

		this.farScroller.update();
		this.midScroller.update();

	}

	this.draw = function(layer, ctx) {

		this.farScroller.draw(ctx);
		this.midScroller.draw(ctx);

		for (var i = 0; i < this.levels.length; i++) {
			this.levels[i].draw(ctx);
		}

	}

}