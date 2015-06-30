function Scene(name) {

	this.name = name;
	this.menus = {};

	var data = sceneData[this.name];

	this.startPos = data.startPos;

	if (data.background) {
		this.background = fileManager.images[data.background];
	}

	if (data.scrollers) {
		this.scrollers = [];
		for (var i = 0; i < data.scrollers.length; i++) {
			this.scrollers.push(new BackgroundScroller(this.name, data.scrollers[i]));
		}
	}

	if (data.menus) {
		for (var i = 0; i < data.menus.length; i++) {
			this.menus[data.menus[i].name] = new Menu(data.menus[i]);
		}
	}

	data = null;

}

Scene.prototype.update = function() {

	if (this.scrollers) {
		for (var i = 0; i < this.scrollers.length; i++) {
			this.scrollers[i].update();
		}
	}

	for (var m in this.menus) {
		this.menus[m].update();
	}

	globals.player1.update();

}

Scene.prototype.draw = function() {

	// default canvas position is saved so it be reverted back to later
	// context is translated to reflect camera pos
	globals.bufferCtx.save();
	globals.bufferCtx.translate(camera.offset.x, camera.offset.y);
	globals.bufferCtx.globalAlpha = 1;

	if (this.scrollers) {
		for (var i = 0; i < this.scrollers.length; i++) {
			this.scrollers[i].draw();
		}
	}

	if (globals.mode === "duplicate" || globals.mode === "versus") {

		if (this.levelScroller) {
			this.levelScroller.draw(1);
			this.levelScroller.draw(2);
			this.levelScroller.draw(3);
		}

		globals.player1.draw();
		if (globals.numPlayers === 2) {
			globals.player2.draw();
		}

		globals.gpCtx.drawImage(globals.buffer, camera.origin.x, camera.origin.y, camera.gpWidth, camera.gpHeight, 
			0, 0, globals.gpWidth, globals.gpHeight);
		globals.tvCtx.drawImage(globals.buffer, camera.origin.x, camera.origin.y, camera.tvWidth, camera.tvHeight, 
			0, 0, globals.tvWidth, globals.tvHeight);

	}
	else {

		if (this.levelScroller) {

			// draw layer that is visible to both players
			this.levelScroller.draw(1);

			globals.player1.draw();
			if (globals.numPlayers === 2) {
				globals.player2.draw();
			}

			globals.gpCtx.drawImage(globals.buffer, camera.origin.x, camera.origin.y, camera.gpWidth, camera.gpHeight, 
				0, 0, globals.gpWidth, globals.gpHeight);
			globals.tvCtx.drawImage(globals.buffer, camera.origin.x, camera.origin.y, camera.tvWidth, camera.tvHeight, 
				0, 0, globals.tvWidth, globals.tvHeight);

			// clear buffer and draw layer visible to gamepad screen
			globals.bufferCtx.clearRect(0, 0, globals.gameWidth, globals.gameHeight);
			this.levelScroller.draw(2);
			globals.gpCtx.drawImage(globals.buffer, camera.origin.x, camera.origin.y, camera.gpWidth, camera.gpHeight, 
				0, 0, globals.gpWidth, globals.gpHeight);

			// clear buffer and draw layer visible to tv screen
			globals.bufferCtx.clearRect(0, 0, globals.gameWidth, globals.gameHeight);
			this.levelScroller.draw(3);
			globals.tvCtx.drawImage(globals.buffer, camera.origin.x, camera.origin.y, camera.tvWidth, camera.tvHeight, 
				0, 0, globals.tvWidth, globals.tvHeight);

		}

	}

	// resets camera pos
	globals.bufferCtx.restore();
	globals.bufferCtx.clearRect(0, 0, globals.gameWidth, globals.gameHeight);

	for (var m in this.menus) {
		this.menus[m].draw();
	}

	globals.gpCtx.drawImage(globals.buffer, camera.origin.x, camera.origin.y, camera.width, camera.height, 
				0, 0, globals.gpWidth, globals.gpHeight);

	if (globals.isWide) {
		globals.tvCtx.drawImage(globals.buffer, camera.origin.x, camera.origin.y, camera.width, camera.height, 
				0, 0, globals.tvWidth, globals.tvHeight);
	}
	else {
		globals.bufferCtx.save();
		globals.bufferCtx.translate(160, 0);
		globals.tvCtx.drawImage(globals.buffer, camera.origin.x, camera.origin.y, camera.tvWidth, camera.tvHeight, 
				0, 0, globals.tvWidth, globals.tvHeight);
	}

	globals.bufferCtx.restore();
	globals.bufferCtx.clearRect(0, 0, globals.gameWidth, globals.gameHeight);

}

Scene.prototype.changeMenu = function(curr, next) {

	this.menus[curr].deactivate();
	this.menus[next].activate();

}

Scene.prototype.start = function() {

	globals.player1.setCenter(this.startPos);

}