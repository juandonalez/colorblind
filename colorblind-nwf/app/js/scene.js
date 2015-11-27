function Scene(name) {

	this.name = name;
	this.gravity = 1;

	var data = sceneData[this.name];

	this.speed = 0;
	this.accum = 0;

	this.isStage = data.isStage;

	if (data.background) {
		this.background = fileManager.images["backgrounds/" + data.background];
	}

	if (data.scrollers) {
		this.scrollers = new Array(data.scrollers.length);
		for (var i = 0; i < data.scrollers.length; i++) {
			this.scrollers[i] = new Scroller(this, data.scrollers[i], i);
		}
	}

	if (data.menus) {
		this.menus = {};
		for (var i = 0; i < data.menus.length; i++) {
			this.menus[data.menus[i].name] = new Menu(data.menus[i]);
		}
	}

	if (this.isStage) {

		this.startSpeed = data.startSpeed;
		this.maxSpeed = data.maxSpeed;
		this.startPos = data.startPos;
		this.numLevels = data.numLevels;
		this.numAllModes = data.numAllModes;
		this.tileset = new Array(4);
		this.tileset[0] = fileManager.images["tilesets/" + this.name + "/0/"];
		this.tileset[1] = fileManager.images["tilesets/" + this.name + "/1/"];
		this.tileset[2] = fileManager.images["tilesets/" + this.name + "/2/"];
		this.tileset[3] = fileManager.images["tilesets/" + this.name + "/3/"];
		this.pool = fileManager.levels[this.name];
		this.indexes = [0, 0, 0];
		this.levels = [this.pool[0], this.pool[0], this.pool[0]];

		this.timer = new Timer(this);

		/*this.entities = new Array(3);
		this.entities[0] = new Destroyer(20, -500, 160, 2000, "misc/wave/l/", -40, -40);
		this.entities[1] = new Destroyer(1180, -500, 160, 2000, "misc/wave/r/", 1100, -40);
		this.entities[2] = new Destroyer(camera.origin.x, camera.origin.y + camera.height + 140, camera.width, 10, false, false, false);*/

	}

	data = null;

}

Scene.prototype.update = function() {

	//if (this.speed !== 0) {
		//this.accum += globals.delta;
		//if (this.accum >= this.speed) {
			//camera.translate(4, 0);
			if (this.isStage) {
				if (this.entities) {
					for (var i = 0; i < this.entities.length; i++) {
						this.entities[i].translate(4, 0);
					}
				}
			}
			//this.accum = 0;
		//}
	//}

	if (this.levels) {

		this.levels[0].update();
		this.levels[1].update();
		this.levels[2].update();

		if (!camera.intersects(this.levels[0])) {
			this.levels[0].deactivate();
			this.indexes[0] = this.indexes[1];
			this.indexes[1] = this.indexes[2];
			this.indexes[2] = this.getNewIndex();
			this.levels[0] = this.pool[this.indexes[0]];
			this.levels[1] = this.pool[this.indexes[1]];
			this.levels[2] = this.pool[this.indexes[2]];
			// add new level to end
			this.levels[2].activate();
			this.levels[2].translate(this.levels[1].origin.x + this.levels[1].width, 0);
		}

	}

	if (this.scrollers) {
		for (var i = 0; i < this.scrollers.length; i++) {
			this.scrollers[i].update();
		}
	}

	if (this.isStage) {

		if (globals.mode === "duplicate" || globals.mode === "split") {
			globals.player0.update();
		}
		else {
			globals.player1.update();
			globals.player2.update();
		}

		if (this.entities) {
			for (var i = 0; i < this.entities.length; i++) {
				this.entities[i].update();
			}
		}

	}

	for (var m in this.menus) {
		this.menus[m].update();
	}

}

Scene.prototype.draw = function() {

	// default canvas position is saved so it be reverted back to later
	// context is translated to reflect camera pos
	globals.bufferCtx.save();
	globals.bufferCtx.translate(camera.origin.x * -1, camera.origin.y * -1);
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

	if (this.entities) {
		for (var i = 0; i < this.entities.length; i++) {
			this.entities[i].draw();
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

}

Scene.prototype.changeMenu = function(curr, next) {

	this.menus[curr].deactivate();
	this.menus[next].activate();

}

Scene.prototype.getColliders = function(index, go) {

	if (this.levels[index].intersects(go)) {
		return this.levels[index].colliders;
	}
	else {
		return false;
	}

}

Scene.prototype.getEntities = function(index, go) {

	if (this.levels[index].intersects(go) && this.levels[index].entities) {
		return this.levels[index].entities;
	}
	else {
		return false;
	}

}

Scene.prototype.getNewIndex = function() {

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

Scene.prototype.activate = function() {

	globals.gpBackgroundCtx.clearRect(0, 0, globals.gpWidth, globals.gpHeight);
	globals.tvBackgroundCtx.clearRect(0, 0, globals.tvWidth, globals.tvHeight);

	this.speed = 0;
	this.accum = 0;

	if (this.background) {
		globals.gpBackgroundCtx.drawImage(this.background, 0, 0, globals.gpWidth, globals.gpHeight);
		globals.tvBackgroundCtx.drawImage(this.background, 0, 0, globals.tvWidth, globals.tvHeight);
	}

	if (this.scroller) {
		this.scroller.activate();
	}

	camera.setOrigin(globals.tileSize, globals.tileSize);

	if (this.isStage) {

		this.levels[0] = this.pool[0];
		this.indexes[1] = this.getNewIndex();
		this.levels[1] = this.pool[this.indexes[1]];
		this.indexes[2] = this.getNewIndex();
		this.levels[2] = this.pool[this.indexes[2]];
		this.levels[0].activate();
		this.levels[1].activate();
		this.levels[1].translate(this.levels[0].width, 0);
		this.levels[2].activate();
		this.levels[2].translate(this.levels[1].origin.x + this.levels[1].width, 0);

		if (this.entities) {
			for (var i = 0; i < this.entities.length; i++) {
				this.entities[i].activate();
			}
		}

		if (globals.mode === "duplicate" || globals.mode === "split") {
			globals.player0.activate(this.startPos.x, this.startPos.y);
		}
		else if (globals.mode === "versus") {
			globals.player1.activate(this.startPos.x, this.startPos.y);
			globals.player2.activate(this.startPos.x, this.startPos.y);
		}
		else {
			globals.player1.activate(this.startPos.x, this.startPos.y);
			globals.player2.activate(this.startPos.x + 150, this.startPos.y);
		}

		setTimeout(function() {globals.currScene.start();}, 2000);

	}
	else {
		this.start();
	}

}

Scene.prototype.start = function() {

	if (this.startSpeed) {
		this.speed = 1/this.startSpeed;
	}

}

Scene.prototype.deactivate = function() {

	if (this.levels) {
		this.levels[0].deactivate();
		this.levels[1].deactivate();
		this.levels[2].deactivate();
	}

}