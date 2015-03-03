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

		this.farScroller = new BackgroundScroller(0, fileManager.bgsFar, 200);
		this.midScroller = new BackgroundScroller(200, fileManager.bgsMid, 220);
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

	/*this.draw = function(ctx) {

		this.farScroller.draw(ctx);
		this.midScroller.draw(ctx);
		this.levelScroller.draw(ctx);
		this.player.draw(ctx);

	}*/

	this.draw = function(numScreens, numPlayers, isSplit, ctx, buffer) {

		if (isSplit) {
			this.farScroller.draw(ctx);
			this.midScroller.draw(ctx);
			this.levelScroller.draw(ctx, 1);
			this.player.draw(ctx);
			nwft.gpContext.drawImage(buffer, 0, 0, nwft.GP_WIDTH, nwft.GP_HEIGHT);
			nwft.tvContext.drawImage(buffer, 0, 0, nwft.TV_WIDTH, nwft.TV_HEIGHT);
			ctx.clearRect(0, 0, 1280, 720);
			this.levelScroller.draw(ctx, 2);
			nwft.gpContext.drawImage(buffer, 0, 0, nwft.GP_WIDTH, nwft.GP_HEIGHT);
			ctx.clearRect(0, 0, 1280, 720);
			this.levelScroller.draw(ctx, 3);
			nwft.tvContext.drawImage(buffer, 0, 0, nwft.TV_WIDTH, nwft.TV_HEIGHT);
		}

	}

}