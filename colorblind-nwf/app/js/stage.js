Stage.prototype = new Scene();
Stage.constructor = Stage;

function Stage(name) {

	this.name = name;
	this.camera = cameraManager.foreground;
	this.gravity = 1;

	this.backgroundTimer = 0;

	var data = sceneData[this.name];

	if (data.background) {
		this.background = fileManager.images["backgrounds/" + data.background];
	}

	if (data.scrollers) {
		this.background1 = new BackgroundScroller(this, data.scrollers[0], 0, cameraManager.background1, globals.background1BufferCtx);
		this.background2 = new BackgroundScroller(this, data.scrollers[1], 1, cameraManager.background2, globals.background2BufferCtx);
	}

	/*if (data.menus) {
		this.menus = {};
		for (var i = 0; i < data.menus.length; i++) {
			this.menus[data.menus[i].name] = new Menu(data.menus[i]);
		}
	}*/

	this.startSpeed = data.startSpeed;
	this.maxSpeed = data.maxSpeed;
	this.startPos = data.startPos;

	this.numLevels = data.numLevels;
	this.numAllModes = data.numAllModes;
	this.tileset = fileManager.images["tilesets/" + this.name + "/"];
	this.pool = fileManager.levels[this.name];
	this.indexes = [0, 0, 0];
	this.levels = [this.pool[0], this.pool[0], this.pool[0]];

	/*this.destroyers = [
		new Destroyer(globals.tileSize, -500, globals.sideWidth, globals.gameHeight + 500, "misc/sides/l/", 0, 0),
		new Destroyer(globals.tileSize + globals.sideWidth + globals.viewWidth, -500, globals.sideWidth, globals.gameHeight + 500,
			"misc/sides/r/", globals.screenWidth - globals.sideWidth - (globals.tileSize/2), 0),
		new Destroyer(0, 1140, 2040, 240, false, false, false)
	];*/

	data = null;

}

Stage.prototype.update = function() {

	if (!this.camera.intersects(this.levels[0])) {
		this.getNewLevel();
	}

	cameraManager.setSpeed(3);

	this.background1.update();
	this.background2.update();
	this.levels[0].update();
	this.levels[1].update();
	this.levels[2].update();

	if (globals.mode === "duplicate" || globals.mode === "split") {
		globals.players[0].update();
	}
	else {
		globals.players[1].update();
		globals.players[2].update();
	}

	if (this.destroyers) {
		for (var i = 0; i < this.destroyers.length; i++) {
			this.destroyers[i].update();
		}
	}

	/*for (var m in this.menus) {
		this.menus[m].update();
	}*/

}

Stage.prototype.draw = function() {

	this.backgroundTimer++;

	if (this.backgroundTimer === 2) {
		this.background1.draw();
		this.background2.draw();
		globals.gpBackground1Ctx.drawImage(globals.background1Buffer, 0, 0, globals.gpWidth, globals.gpHeight);
		globals.tvBackground1Ctx.drawImage(globals.background1Buffer, 0, 0, globals.tvWidth, globals.tvHeight);
		globals.gpBackground2Ctx.drawImage(globals.background2Buffer, 0, 0, globals.gpWidth, globals.gpHeight);
		globals.tvBackground2Ctx.drawImage(globals.background2Buffer, 0, 0, globals.tvWidth, globals.tvHeight);
		this.backgroundTimer = 0;
	}

	globals.bufferCtx.translate(cameraManager.foreground.x * -1, cameraManager.foreground.y * -1);

	if (this.levels) {
		for (var i = 0; i < 3; i++) {
			if (this.camera.intersects(this.levels[i])) {
				this.levels[i].draw(0, 0);
				this.levels[i].draw(1, 1);
				this.levels[i].draw(2, 1);
			}
		}

		globals.players[0].draw();
	}

	globals.gpCtx.drawImage(globals.buffer, 0, 0, globals.screenWidth, globals.screenHeight, 
		0, 0, globals.gpWidth, globals.gpHeight);
	globals.tvCtx.drawImage(globals.buffer, 0, 0, globals.screenWidth, globals.screenHeight,
		0, 0, globals.tvWidth, globals.tvHeight);

	globals.bufferCtx.translate(cameraManager.foreground.x, cameraManager.foreground.y);

/*
	// default canvas position is saved so it be reverted back to later
	// context is translated to reflect camera pos
	globals.bufferCtx.save();
	globals.bufferCtx.translate(camera.x * -1, camera.y * -1);
	globals.bufferCtx.globalAlpha = 1;

	if (this.scrollers) {
		for (var i = 0; i < this.scrollers.length; i++) {
			this.scrollers[i].draw();
		}
	}

	// in duplicate mode simply draw everything to both screens
	if (globals.mode === "duplicate") {

		if (this.levels) {
			for (var i = 0; i < 3; i++) {
				if (camera.intersects(this.levels[i])) {
					this.levels[i].draw(0, 0);
					this.levels[i].draw(1, 1);
					this.levels[i].draw(2, 1);
				}
			}

			globals.player0.draw();
		}

		globals.gpCtx.drawImage(globals.buffer, 0, 0, camera.gpWidth, camera.gpHeight, 
			0, 0, globals.gpWidth, globals.gpHeight);
		globals.tvCtx.drawImage(globals.buffer, 0, 0, camera.tvWidth, camera.tvHeight, 
			0, 0, globals.tvWidth, globals.tvHeight);

	}
	// in split mode the layers are split across 2 screens but are the same color
	else if (globals.mode === "split") {

		if (this.levels) {

			// draw layer that is visible to both players
			for (var i = 0; i < 3; i++) {
				if (camera.intersects(this.levels[i])) {
					this.levels[i].draw(0, 0);
				}
			}

			// draw player
			globals.player0.draw();

			globals.gpCtx.drawImage(globals.buffer, 0, 0, camera.gpWidth, camera.gpHeight, 
				0, 0, globals.gpWidth, globals.gpHeight);
			globals.tvCtx.drawImage(globals.buffer, 0, 0, camera.tvWidth, camera.tvHeight, 
				0, 0, globals.tvWidth, globals.tvHeight);

			// clear buffer and draw layer visible to gamepad screen
			globals.bufferCtx.clearRect(camera.origin.x, camera.origin.y, globals.gameWidth, globals.gameHeight);

			for (var i = 0; i < 3; i++) {
				if (camera.intersects(this.levels[i])) {
					this.levels[i].draw(1, 1);
				}
			}

			globals.gpCtx.drawImage(globals.buffer, 0, 0, camera.gpWidth, camera.gpHeight, 
				0, 0, globals.gpWidth, globals.gpHeight);

			// clear buffer and draw layer visible to tv screen
			globals.bufferCtx.clearRect(camera.origin.x, camera.origin.y, globals.gameWidth, globals.gameHeight);

			for (var i = 0; i < 3; i++) {
				if (camera.intersects(this.levels[i])) {
					this.levels[i].draw(2, 1);
				}
			}

			globals.tvCtx.drawImage(globals.buffer, 0, 0, camera.tvWidth, camera.tvHeight, 
				0, 0, globals.tvWidth, globals.tvHeight);

		}
		else {
			globals.gpCtx.drawImage(globals.buffer, 0, 0, camera.gpWidth, camera.gpHeight, 
			0, 0, globals.gpWidth, globals.gpHeight);
			globals.tvCtx.drawImage(globals.buffer, 0, 0, camera.tvWidth, camera.tvHeight, 
			0, 0, globals.tvWidth, globals.tvHeight);
		}

	}
	// in coop mode the layers are split across 2 screens and are different colors
	// 2 players are visible on both screens
	else if (globals.mode === "coop") {

		if (this.levels) {

			// draw layer that is visible to both players
			for (var i = 0; i < 3; i++) {
				if (camera.intersects(this.levels[i])) {
					this.levels[i].draw(0, 0);
				}
			}

			// draw players
			globals.player1.draw();
			globals.player2.draw();

			globals.gpCtx.drawImage(globals.buffer, 0, 0, camera.gpWidth, camera.gpHeight, 
				0, 0, globals.gpWidth, globals.gpHeight);
			globals.tvCtx.drawImage(globals.buffer, 0, 0, camera.tvWidth, camera.tvHeight, 
				0, 0, globals.tvWidth, globals.tvHeight);

			// clear buffer and draw layer visible to gamepad screen
			globals.bufferCtx.clearRect(camera.origin.x, camera.origin.y, globals.gameWidth, globals.gameHeight);

			for (var i = 0; i < 3; i++) {
				if (camera.intersects(this.levels[i])) {
					this.levels[i].draw(1, 2);
				}
			}

			globals.gpCtx.drawImage(globals.buffer, 0, 0, camera.gpWidth, camera.gpHeight, 
				0, 0, globals.gpWidth, globals.gpHeight);

			// clear buffer and draw layer visible to tv screen
			globals.bufferCtx.clearRect(camera.origin.x, camera.origin.y, globals.gameWidth, globals.gameHeight);

			for (var i = 0; i < 3; i++) {
				if (camera.intersects(this.levels[i])) {
					this.levels[i].draw(2, 3);
				}
			}

			globals.tvCtx.drawImage(globals.buffer, 0, 0, camera.tvWidth, camera.tvHeight, 
				0, 0, globals.tvWidth, globals.tvHeight);

		}
		else {
			globals.gpCtx.drawImage(globals.buffer, 0, 0, camera.gpWidth, camera.gpHeight, 
			0, 0, globals.gpWidth, globals.gpHeight);
			globals.tvCtx.drawImage(globals.buffer, 0, 0, camera.tvWidth, camera.tvHeight, 
			0, 0, globals.tvWidth, globals.tvHeight);
		}

	}
	// in versus mode all layers are visible to both screens, but are different colors
	// each player is only visible on their respective screen
	else if (globals.mode === "versus") {

		if (this.levels) {

			// draw layer that is visible to both players
			for (var i = 0; i < 3; i++) {
				if (camera.intersects(this.levels[i])) {
					this.levels[i].draw(0, 0);
				}
			}

			globals.gpCtx.drawImage(globals.buffer, 0, 0, camera.gpWidth, camera.gpHeight, 
				0, 0, globals.gpWidth, globals.gpHeight);
			globals.tvCtx.drawImage(globals.buffer, 0, 0, camera.tvWidth, camera.tvHeight, 
				0, 0, globals.tvWidth, globals.tvHeight);

			// clear buffer and draw layers to gamepad screen
			globals.bufferCtx.clearRect(camera.origin.x, camera.origin.y, globals.gameWidth, globals.gameHeight);

			// draw player 1
			globals.player1.draw();

			for (var i = 0; i < 3; i++) {
				if (camera.intersects(this.levels[i])) {
					this.levels[i].draw(1, 2);
					this.levels[i].draw(2, 2);
				}
			}

			globals.gpCtx.drawImage(globals.buffer, 0, 0, camera.gpWidth, camera.gpHeight, 
				0, 0, globals.gpWidth, globals.gpHeight);

			// clear buffer and draw layers to tv screen
			globals.bufferCtx.clearRect(camera.origin.x, camera.origin.y, globals.gameWidth, globals.gameHeight);

			// draw player 2
			globals.player2.draw();

			for (var i = 0; i < 3; i++) {
				if (camera.intersects(this.levels[i])) {
					this.levels[i].draw(1, 3);
					this.levels[i].draw(2, 3);
				}
			}

			globals.tvCtx.drawImage(globals.buffer, 0, 0, camera.tvWidth, camera.tvHeight, 
				0, 0, globals.tvWidth, globals.tvHeight);

		}
		else {
			globals.gpCtx.drawImage(globals.buffer, 0, 0, camera.gpWidth, camera.gpHeight, 
			0, 0, globals.gpWidth, globals.gpHeight);
			globals.tvCtx.drawImage(globals.buffer, 0, 0, camera.tvWidth, camera.tvHeight, 
			0, 0, globals.tvWidth, globals.tvHeight);
		}

	}

	// resets camera pos
	globals.bufferCtx.restore();
	globals.bufferCtx.clearRect(0, 0, globals.gameWidth, globals.gameHeight);

	if (this.destroyers) {
		for (var i = 0; i < this.destroyers.length; i++) {
			this.destroyers[i].draw();
		}
	}

	for (var m in this.menus) {
		this.menus[m].draw();
	}

	globals.gpCtx.drawImage(globals.buffer, 0, 0, camera.width, camera.height, 
				0, 0, globals.gpWidth, globals.gpHeight);

	globals.tvCtx.drawImage(globals.buffer, 0, 0, camera.width, camera.height, 
				0, 0, globals.tvWidth, globals.tvHeight);

	globals.bufferCtx.restore();
	globals.bufferCtx.clearRect(0, 0, globals.gameWidth, globals.gameHeight);
*/
}

Stage.prototype.getGameObjects = function(index, go) {

	if (this.levels[index].intersects(go) && this.levels[index].gameObjects) {
		return this.levels[index].gameObjects;
	}
	else {
		return false;
	}

}

Stage.prototype.getNewIndex = function() {

	var upper;

	if (globals.mode === "duplicate" || globals.mode === "versus") {
		upper = this.numAllModes - 1;
	}
	else {
		upper = this.numLevels - 1;
	}

	var rand = Math.floor(Math.random() * upper) + 1;
	var inArray = this.indexes[0] === rand || this.indexes[1] === rand || this.indexes[2] === rand;

	while (inArray) {
		if (rand === 1) {
			rand = upper;
		}
		else {
			rand--;
		}
		inArray = this.indexes[0] === rand || this.indexes[1] === rand || this.indexes[2] === rand;
	}

	return rand;

}

Stage.prototype.getNewLevel = function() {

	this.indexes[0] = this.indexes[1];
	this.indexes[1] = this.indexes[2];
	this.indexes[2] = this.getNewIndex();
	this.levels[0].deactivate();
	this.levels[0].reset();
	this.levels[0] = this.pool[this.indexes[0]];
	this.levels[1] = this.pool[this.indexes[1]];
	this.levels[2] = this.pool[this.indexes[2]];
	this.levels[2].activate();
	this.levels[2].translate(this.levels[1].x + this.levels[1].width, 0);

}

Stage.prototype.activate = function() {

	if (this.background) {
		globals.gpBackground0Ctx.drawImage(this.background, 0, 0, globals.gpWidth, globals.gpHeight);
		globals.tvBackground0Ctx.drawImage(this.background, 0, 0, globals.tvWidth, globals.tvHeight);
	}

	this.levels[0] = this.pool[0];
	this.indexes[1] = this.getNewIndex();
	this.levels[1] = this.pool[this.indexes[1]];
	this.indexes[2] = this.getNewIndex();
	this.levels[2] = this.pool[this.indexes[2]];
	this.levels[0].activate();
	this.levels[1].activate();
	this.levels[1].translate(this.levels[0].width, 0);
	this.levels[2].activate();
	this.levels[2].translate(this.levels[1].x + this.levels[1].width, 0);

	setTimeout(function() {globals.currScene.start();}, 2000);

}

Stage.prototype.reset = function() {

	globals.gpBackground0Ctx.clearRect(0, 0, globals.gpWidth, globals.gpHeight);
	globals.tvBackground0Ctx.clearRect(0, 0, globals.tvWidth, globals.tvHeight);
	globals.gpBackground1Ctx.clearRect(0, 0, globals.gpWidth, globals.gpHeight);
	globals.tvBackground1Ctx.clearRect(0, 0, globals.tvWidth, globals.tvHeight);
	globals.gpBackground2Ctx.clearRect(0, 0, globals.gpWidth, globals.gpHeight);
	globals.tvBackground2Ctx.clearRect(0, 0, globals.tvWidth, globals.tvHeight);

	globals.players[0].reset();
	globals.players[1].reset();
	globals.players[2].reset();

	if (this.levels) {
		this.levels[0].reset();
		this.levels[1].reset();
		this.levels[2].reset();
	}

}

Stage.prototype.start = function() {

	if (this.startSpeed) {
		this.speed = 1/this.startSpeed;
	}

}

Stage.prototype.deactivate = function() {

	this.reset();

}