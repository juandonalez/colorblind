function Scene(name) {

	this.name = name;
	this.gravity = 60;

	var data = sceneData[this.name];

	this.numLevels = data.numLevels;
	this.numAllModes = data.numAllModes;

	this.speed = 0;

	if (data.startSpeed) {
		this.startSpeed = data.startSpeed;
		this.maxSpeed = data.maxSpeed;
	}

	this.hasPlayer = data.hasPlayer;

	if (data.startPos) {
		this.startPos = data.startPos;
	}

	if (data.background) {
		this.background = fileManager.images[data.background];
	}

	if (data.scrollers) {
		this.scrollers = new Array(data.scrollers.length);
		for (var i = 0; i < data.scrollers.length; i++) {
			this.scrollers[i] = new Scroller(this, data.scrollers[i]);
		}
	}

	if (data.hasTimer) {
		this.timer = new Timer(this);
	}

	if (data.menus) {
		this.menus = {};
		for (var i = 0; i < data.menus.length; i++) {
			this.menus[data.menus[i].name] = new Menu(data.menus[i]);
		}
	}

	if (this.numLevels > 0) {
		this.pool = fileManager.levels[this.name];
		this.indexes = [0, 0, 0];
		this.levels = [this.pool[0], this.pool[0], this.pool[0]];
	}

	data = null;

}

Scene.prototype.update = function() {

	if (!camera.intersects(this.levels[0])) {
		this.levels[0].deactivate();
		this.indexes[0] = this.indexes[1];
		this.indexes[1] = this.indexes[2];
		this.indexes[2] = this.getNewIndex();
		this.levels[0] = this.pool[this.indexes[0]];
		this.levels[1] = this.pool[this.indexes[1]];
		this.levels[2] = this.pool[this.indexes[2]];
		this.levels[2].activate(this.levels[1].origin.x + this.levels[1].width);
	}

	if (this.speed > this.maxSpeed) {
		this.speed = this.maxSpeed;
	}

	camera.translate(Math.round(this.speed * globals.delta), 0);

	if (this.scrollers) {
		for (var i = 0; i < this.scrollers.length; i++) {
			this.scrollers[i].update();
		}
	}

	for (var m in this.menus) {
		this.menus[m].update();
	}

	if (this.hasPlayer) {
		globals.player1.update();
		if (globals.numPlayers === 2) {
			globals.player2.draw();
		}
	}

	if (this.timer) {
		this.timer.update();
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

	if (globals.mode === "duplicate" || globals.mode === "versus") {

		if (this.levels) {
			for (var i = 0; i < 3; i++) {
				if (camera.intersects(this.levels[i])) {
					this.levels[i].draw(0);
					this.levels[i].draw(1);
					this.levels[i].draw(2);
				}
			}
		}

		if (this.hasPlayer) {
			globals.player1.draw();
			if (globals.numPlayers === 2) {
				globals.player2.draw();
			}
		}

		globals.gpCtx.drawImage(globals.buffer, 0, 0, camera.gpWidth, camera.gpHeight, 
			0, 0, globals.gpWidth, globals.gpHeight);
		globals.tvCtx.drawImage(globals.buffer, 0, 0, camera.tvWidth, camera.tvHeight, 
			0, 0, globals.tvWidth, globals.tvHeight);

	}
	else {

		if (this.levels) {

			// draw layer that is visible to both players
			for (var i = 0; i < 3; i++) {
				if (camera.intersects(this.levels[i])) {
					this.levels[i].draw(0);
				}
			}

			if (this.hasPlayer) {
				globals.player1.draw();
				if (globals.numPlayers === 2) {
					globals.player2.draw();
				}
			}

			globals.gpCtx.drawImage(globals.buffer, 0, 0, camera.gpWidth, camera.gpHeight, 
				0, 0, globals.gpWidth, globals.gpHeight);
			globals.tvCtx.drawImage(globals.buffer, 0, 0, camera.tvWidth, camera.tvHeight, 
				0, 0, globals.tvWidth, globals.tvHeight);

			// clear buffer and draw layer visible to gamepad screen
			globals.bufferCtx.clearRect(camera.origin.x, camera.origin.y, globals.gameWidth, globals.gameHeight);

			for (var i = 0; i < 3; i++) {
				if (camera.intersects(this.levels[i])) {
					this.levels[i].draw(1);
				}
			}

			globals.gpCtx.drawImage(globals.buffer, 0, 0, camera.gpWidth, camera.gpHeight, 
				0, 0, globals.gpWidth, globals.gpHeight);

			// clear buffer and draw layer visible to tv screen
			globals.bufferCtx.clearRect(camera.origin.x, camera.origin.y, globals.gameWidth, globals.gameHeight);

			for (var i = 0; i < 3; i++) {
				if (camera.intersects(this.levels[i])) {
					this.levels[i].draw(2);
				}
			}

			globals.tvCtx.drawImage(globals.buffer, 0, 0, camera.tvWidth, camera.tvHeight, 
				0, 0, globals.tvWidth, globals.tvHeight);

		}

	}

	// resets camera pos
	globals.bufferCtx.restore();
	globals.bufferCtx.clearRect(0, 0, globals.gameWidth, globals.gameHeight);

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

Scene.prototype.start = function() {

	globals.gpBackgroundCtx.clearRect(0, 0, globals.gpWidth, globals.gpHeight);
	globals.tvBackgroundCtx.clearRect(0, 0, globals.tvWidth, globals.tvHeight);

	if (this.background) {
		globals.gpBackgroundCtx.drawImage(this.background, 0, 0, globals.gpWidth, globals.gpHeight);
		globals.tvBackgroundCtx.drawImage(this.background, 0, 0, globals.tvWidth, globals.tvHeight);
	}

	if (this.hasPlayer) {
		globals.player1.setCenter(this.startPos.x, this.startPos.y);
	}

	if (this.timer) {
		this.timer.reset();
	}

	if (this.startSpeed) {
		this.speed = this.startSpeed;
	}

	if (this.levels) {
		this.levels[0] = this.pool[0];
		this.indexes[1] = this.getNewIndex();
		this.levels[1] = this.pool[this.indexes[1]];
		this.indexes[2] = this.getNewIndex();
		this.levels[2] = this.pool[this.indexes[2]];
		this.levels[0].activate(0);
		this.levels[1].activate(this.levels[0].width);
		this.levels[2].activate(this.levels[1].origin.x + this.levels[1].width);
	}

}