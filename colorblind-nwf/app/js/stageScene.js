function StageScene(id) {

	this.id = id;
	this.offset = 0;
	this.farScroller;
	this.midScroller;
	this.levelScroller;
	//this.levels;
	this.currentColliders;

	this.gravity = 30;

	this.player = new Player(this, 20, 20);

	this.init = function() {

		this.farScroller = new BackgroundScroller(0, fileManager.bgsFar, 10);
		this.midScroller = new BackgroundScroller(200, fileManager.bgsMid, 12);
		this.levelScroller = new LevelScroller(this);
		this.farScroller.init();
		this.midScroller.init();
		this.levelScroller.init();
		this.player.init();

		/*this.levels = new Array(fileManager.levels.length);
		var level;
		for (var i = 0; i < fileManager.levels.length; i++) {
			level = new Level();
			level.init(fileManager.levels[i]);
			this.levels[i] = level;
		}*/

	}

	this.update = function() {

		this.farScroller.update();
		this.midScroller.update();
		this.levelScroller.update();
		this.player.update();

	}

	this.draw = function(ctx) {

		this.farScroller.draw(ctx);
		this.midScroller.draw(ctx);
		this.levelScroller.draw(ctx);
//this.levels[3].draw(ctx);
		/*for (var i = 0; i < this.levels.length; i++) {
			this.levels[i].draw(ctx);
		}*/
		this.player.draw(ctx);

	}

}