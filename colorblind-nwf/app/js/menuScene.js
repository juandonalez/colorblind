function MenuScene() {

	this.offset = 0;
	this.farScroller;
	this.midScroller;
	this.levelScroller;
	//this.levels;
	this.currentColliders;

	this.gravity = 30;

	this.player = new Player(this, 20, 20);

}

MenuScene.prototype.init = function() {

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

MenuScene.prototype.update = function() {

	this.farScroller.update();
	this.midScroller.update();
	this.levelScroller.update();
	this.player.update();

}

MenuScene.prototype.draw = function(numScreens, numPlayers, isSplit) {

	var gp = globals.gpCtx;
	var tv = globals.tvCtx;
	var buffer = globals.buffer;
	var ctx = globals.bufferCtx;

	if (isSplit) {
		this.farScroller.draw();
		this.midScroller.draw();
		this.levelScroller.draw(1);
		this.player.draw();
		gp.drawImage(buffer, 0, 0, globals.gpWidth, globals.gpHeight);
		tv.drawImage(buffer, 0, 0, globals.tvWidth, globals.tvHeight);
		ctx.clearRect(0, 0, 1280, 720);
		this.levelScroller.draw(2);
		gp.drawImage(buffer, 0, 0, globals.gpWidth, globals.gpHeight);
		ctx.clearRect(0, 0, 1280, 720);
		this.levelScroller.draw(3);
		tv.drawImage(buffer, 0, 0, globals.tvWidth, globals.tvHeight);
	}

}