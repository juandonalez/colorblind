Level.prototype = new GameObject();
Level.prototype.constructor = Level;

function Level(d) {

	this.name = "level";
	this.id = utilities.getNewID();

	this.camera = cameraManager.foreground;

	this.active = false;

	this.x = 0;
	this.y = 0;
	this.width = d.width * globals.tileSize;
	this.height = globals.gameHeight;
	this.center = new Point(0, 0);
	this.max = new Point(0, 0);
	this.updateBounds();

	// the level covers the whole screen
	// top is where the tiles first appear
	this.top = this.height - (d.height * globals.tileSize);

	this.tileLayers = [d.layers[0].data, d.layers[1].data, d.layers[2].data];
	this.gameObjectLayers = [[], [], []];

	var gameObjects = d.layers[3].objects;
	this.gameObjects = new Array(gameObjects.length);

	var go;
	for (var i = 0; i < gameObjects.length; i++) {
		go = gameObjects[i];

		// gameObject y pos is relative to level top left corner

		if (go.name === "movingPlatform") {
			this.gameObjects[i] = new MovingPlatform(go.x, go.y + this.top, parseInt(go.properties.velX), parseInt(go.properties.velY));
		}

		if (go.name === "oneWayPlatform") {
			this.gameObjects[i] = new OneWayPlatform(go.x, go.y + this.top, go.width, go.height);
		}

		if (go.name === "platform") {
			this.gameObjects[i] = new Platform(go.x, go.y + this.top, go.width, go.height);
		}

		if (go.name === "waypoint") {
			this.gameObjects[i] = new Waypoint(go.x, go.y + this.top, go.width, go.height);
		}

		this.gameObjectLayers[go.type].push(this.gameObjects[i]);
	}

	// swap the red and green layers when drawing
	this.swap = false;

	go = null;
	gameObjects = null;
	d = null;

}

Level.prototype.update = function() {

	if (this.active) {
		// if an game object comes into view it is activated
		for (var i = 0; i < this.gameObjects.length; i++) {
			if (!this.gameObjects[i].active) {
				if (this.camera.intersects(this.gameObjects[i])) {
					this.gameObjects[i].activate();
				}
			}
			this.gameObjects[i].update();
		}
	}

}

Level.prototype.draw = function(layerNum, color) {

	var ctx = globals.bufferCtx;
	ctx.globalAlpha = 1;
	var tileset = globals.currScene.tileset;
	var tileSize = globals.tileSize;
	var tileNum = 0;

	if (layerNum === 1) {
		if (this.swap) {
			layerNum = 2;
		}
	}
	else if (layerNum === 2) {
		if (this.swap) {
			layerNum = 1;
		}
	}

	if (globals.isWiiU) {
		if (layerNum === 1) {
			ctx.save();
			ctx.setImageColor(0.5, 0, 0);
		}
		else if (layerNum === 2) {
			ctx.save();
			ctx.setImageColor(0, 0.5, 0);
		}
	}

	var layer = this.tileLayers[layerNum];

	for (var i = this.top; i < this.height; i += tileSize) {
		for (var j = this.x; j < this.x + this.width; j += tileSize) {
			if (layer[tileNum] !== 0 && layer[tileNum] !== null) {
				var img = tileset[layer[tileNum]];
				ctx.drawImage(img, j, i);
			}
			tileNum++;
		}
	}

	layer = this.gameObjectLayers[layerNum];

	for (var i = 0; i < layer.length; i++) {
		layer[i].draw();
	}

	ctx.restore();

}

Level.prototype.activate = function(x) {

	this.active = true;

	// randomly assign color to each layer
	this.swap = Math.floor(Math.random() * 2) === 0;

}

Level.prototype.reset = function() {

	this.active = false;
	this.x = 0;
	this.y = 0;
	this.updateBounds();

	for (var i = 0; i < this.gameObjects.length; i++) {
		this.gameObjects[i].reset();
	}

}

Level.prototype.pause = function() {

	this.active = false;

	for (var i = 0; i < this.gameObjects.length; i++) {
		this.gameObjects[i].pause();
	}

}

Level.prototype.resume = function() {

	this.active = true;

	for (var i = 0; i < this.gameObjects.length; i++) {
		this.gameObjects[i].resume();
	}

}

Level.prototype.translate = function(x, y) {

	this.x += x;
	this.y += y;
	this.updateBounds();

	for (var i = 0; i < this.gameObjects.length; i++) {
		this.gameObjects[i].translate(x, y);
	}

}