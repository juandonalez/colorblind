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

	// tiles for drawing
	this.tileSrc = new Array(4);
	this.tileDest = new Array(4);

	var layer;
	var count;
	for (var i = 0; i < 4; i++) {
		layer = d.layers[i].data;
		count = 0;
		for (var j = 0; j < layer.length; j++) {
			if (layer[j] != 0) {
				count++;
			}
		}

		this.tileSrc[i] = new Float32Array(4*count);
		this.tileDest[i] = new Float32Array(4*count);
	}

	var x;
	var y;
	for (var i = 0; i < 4; i++) {
		x = 0;
		y = 0;
		layer = d.layers[i].data;
		count = 0;
		for (var j = 0; j < layer.length; j++) {

			if (layer[j] != 0) {
				this.tileSrc[i][count*4 + 0] = (layer[j]-1)*globals.tileSize;
				this.tileSrc[i][count*4 + 1] = 0;
				this.tileSrc[i][count*4 + 2] = globals.tileSize;
				this.tileSrc[i][count*4 + 3] = globals.tileSize;

				this.tileDest[i][count*4 + 0] = x*globals.tileSize;
				this.tileDest[i][count*4 + 1] = y*globals.tileSize;
				this.tileDest[i][count*4 + 2] = globals.tileSize;
				this.tileDest[i][count*4 + 3] = globals.tileSize;

				count++;
			}

			x++
			if (x == d.layers[i].width) {
				x = 0;
				y++;
			}

		}
	}

	// game objects
	this.gameObjectLayers = [[], [], []];

	var objectData = d.layers[3].objects;
	this.gameObjects = new Array(objectData.length);

	for (var i = 0; i < objectData.length; i++) {
		this.gameObjects[i] = utilities.createObject(objectData[i]);
		this.gameObjectLayers[objectData[i].type].push(this.gameObjects[i]);
	}

	// swap the red and green layers when drawing
	this.swap = false;

	objectData = null;
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

Level.prototype.draw = function(layerNum) {

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

	if (layerNum === 1) {
		ctx.save();
		ctx.setImageColor(0.5, 0, 0);
	}
	else if (layerNum === 2) {
		ctx.save();
		ctx.setImageColor(0, 0.5, 0);
	}

	if (this.tileSrc[layerNum].length > 0) {
		ctx.drawImageInstanced((this.tileSrc[layerNum].length/4), image, this.tileSrc[layerNum], this.tileDest[layerNum]);
	}

	ctx.restore();

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