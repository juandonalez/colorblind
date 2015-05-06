function StageScene(name) {

	this.name = name;
	this.topScroller = new BackgroundScroller(0, fileManager.topBgs[this.name], 100);
	this.middleScroller = new BackgroundScroller(380, fileManager.middleBgs[this.name], 200);
	this.bottomScroller = new BackgroundScroller(380, fileManager.bottomBgs[this.name], 300);
	//this.levelScroller;
	//this.levels;
	this.currentColliders;

	this.gravity = 30;

	//this.player = new Player(this, 20, 20);

}

StageScene.prototype.update = function() {

	this.topScroller.update();
	this.middleScroller.update();
	this.bottomScroller.update();
	//this.levelScroller.update();
	//this.player.update();

}

StageScene.prototype.draw = function(numScreens, numPlayers, isSplit) {

	var gp = globals.gpCtx;
	//var tv = globals.tvCtx;
	var buffer = globals.buffer;
	var ctx = globals.bufferCtx;

	if (isSplit) {
		this.topScroller.draw();
		this.middleScroller.draw();
		this.bottomScroller.draw();
		//this.levelScroller.draw(1);
		//this.player.draw();
		gp.drawImage(buffer, 0, 0, globals.gpWidth, globals.gpHeight);
		//tv.drawImage(buffer, 0, 0, globals.tvWidth, globals.tvHeight);
		//ctx.clearRect(0, 0, 1280, 720);
		//this.levelScroller.draw(2);
		//gp.drawImage(buffer, 0, 0, globals.gpWidth, globals.gpHeight);
		//ctx.clearRect(0, 0, 1280, 720);
		//this.levelScroller.draw(3);
		//tv.drawImage(buffer, 0, 0, globals.tvWidth, globals.tvHeight);
	}

}