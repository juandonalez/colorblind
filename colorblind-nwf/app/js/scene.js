function Scene(name) {

	this.name = name;
	this.gravity = 60;

	var data = sceneData[this.name];

	this.numLevels = data.numLevels;
	this.numAllModes = data.numAllModes;
	this.hasPlayer = data.hasPlayer;
	this.speed = 0;
	this.accum = 0;

	if (data.background) {
		this.background = fileManager.images[data.background];
	}

	if (data.scrollers) {
		this.scrollers = new Array(data.scrollers.length);
		for (var i = 0; i < data.scrollers.length; i++) {
			this.scrollers[i] = new Scroller(this, data.scrollers[i]);
		}
	}

	if (data.startPos) {
		this.startPos = data.startPos;
	}

	if (data.startSpeed) {
		this.startSpeed = data.startSpeed;
		this.maxSpeed = data.maxSpeed;
	}

	if (this.numLevels > 0) {
		this.pool = fileManager.levels[this.name];
		this.indexes = [0, 0, 0];
		this.levels = [this.pool[0], this.pool[0], this.pool[0]];
	}

	if (data.menus) {
		this.menus = {};
		for (var i = 0; i < data.menus.length; i++) {
			this.menus[data.menus[i].name] = new Menu(data.menus[i]);
		}
	}

	// get number of entities and create entity array
	var numEntities = 0;

	if (this.hasPlayer) {
		numEntities += 2;
	}

	if (numEntities > 0) {
		this.entities = new Array(numEntities);
	}

	if (this.hasPlayer) {
		this.entities[numEntities - 1] = new Destroyer(camera.origin.x, camera.origin.y, 10, camera.height);
		numEntities--;
		this.entities[numEntities - 1] = new Destroyer(camera.origin.x, camera.origin.y + camera.height + 140, camera.width, 10);
		numEntities--;
	}

	// get number of components and create components array
	var numComponents = 0;

	if (data.hasTimer) {
		numComponents++;
	}

	if (numComponents > 0) {
		this.components = new Array(numComponents);
	}

	if (data.hasTimer) {
		this.timer = new Timer(this);
		this.components[numComponents - 1] = this.timer;
		numComponents--;
	}

	data = null;

}

Scene.prototype.update = function() {

	this.accum += globals.delta;
	if (this.accum >= this.speed) {
		camera.translate(1, 0);
		this.accum = 0;
	}

	if (camera.intersects(this.levels[2])) {
		if (!this.levels[2].active) {
			this.levels[2].activate();
		}
	}

	if (camera.intersects(this.levels[1])) {
		if (!this.levels[1].active) {
			this.levels[1].activate();
		}
	}

	if (camera.intersects(this.levels[0])) {
		if (!this.levels[0].active) {
			this.levels[0].activate();
		}
	}
	else {
		this.levels[0].deactivate();
		this.indexes[0] = this.indexes[1];
		this.indexes[1] = this.indexes[2];
		this.indexes[2] = this.getNewIndex();
		this.levels[0] = this.pool[this.indexes[0]];
		this.levels[1] = this.pool[this.indexes[1]];
		this.levels[2] = this.pool[this.indexes[2]];
		this.levels[2].init(this.levels[1].origin.x + this.levels[1].width);
	}

	if (this.scrollers) {
		for (var i = 0; i < this.scrollers.length; i++) {
			this.scrollers[i].update();
		}
	}

	if (this.entities) {
		for (var i = 0; i < this.entities.length; i++) {
			this.entities[i].update();
		}
	}

	if (this.components) {
		for (var i = 0; i < this.components.length; i++) {
			this.components[i].update();
		}
	}

	for (var m in this.menus) {
		this.menus[m].update();
	}

	if (this.hasPlayer) {
		globals.player1.update();
		if (globals.numPlayers === 2) {
			globals.player2.update();
		}
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

	if (this.background) {
		globals.gpBackgroundCtx.drawImage(this.background, 0, 0, globals.gpWidth, globals.gpHeight);
		globals.tvBackgroundCtx.drawImage(this.background, 0, 0, globals.tvWidth, globals.tvHeight);
	}	

	if (this.entities) {
		for (var i = 0; i < this.entities.length; i++) {
			this.entities[i].activate();
		}
	}

	if (this.components) {
		for (var i = 0; i < this.components.length; i++) {
			this.components[i].activate();
		}
	}

	if (this.hasPlayer) {
		globals.player1.activate(this.startPos.x, this.startPos.y);
	}

	if (this.startSpeed) {
		this.speed = 1/this.startSpeed;
		this.accum = 0;
	}

	if (this.levels) {
		this.levels[0] = this.pool[0];
		this.indexes[1] = this.getNewIndex();
		this.levels[1] = this.pool[this.indexes[1]];
		this.indexes[2] = this.getNewIndex();
		this.levels[2] = this.pool[this.indexes[2]];
		this.levels[0].init(0);
		this.levels[1].init(this.levels[0].width);
		this.levels[2].init(this.levels[1].origin.x + this.levels[1].width);
	}

}