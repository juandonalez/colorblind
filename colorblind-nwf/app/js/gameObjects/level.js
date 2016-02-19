Level.prototype = new GameObject();
Level.prototype.constructor = Level;

function Level(d) {

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
	this.entityLayers = [[], [], []];

	var entities = d.layers[3].objects;
	this.entities = new Array(entities.length);

	var ent;
	for (var i = 0; i < entities.length; i++) {
		ent = entities[i];

		if (ent.name === "platform") {
			// entity y pos is relative to level top left corner
			this.entities[i] = new Platform(ent.x, ent.y + this.top, ent.width, ent.height);
		}

		this.entityLayers[ent.type].push(this.entities[i]);
	}

	// swap the red and green layers when drawing
	this.swap = false;

	ent = null;
	entities = null;
	d = null;

}

Level.prototype.update = function() {

	if (this.active) {
		// if an entity comes into view it is activated
		for (var i = 0; i < this.entities.length; i++) {
			if (!this.entities[i].active) {
				if (this.camera.intersects(this.entities[i])) {
					this.entities[i].activate();
				}
			}
			this.entities[i].update();
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

	layer = this.entityLayers[layerNum];

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

Level.prototype.deactivate = function() {

	this.active = false;
	this.x = 0;
	this.y = 0;
	this.updateBounds();

	for (var i = 0; i < this.entities.length; i++) {
		this.entities[i].deactivate();
	}

}

Level.prototype.pause = function() {

	this.active = false;

	for (var i = 0; i < this.entities.length; i++) {
		this.entities[i].pause();
	}

}

Level.prototype.resume = function() {

	this.active = true;

	for (var i = 0; i < this.entities.length; i++) {
		this.entities[i].resume();
	}

}

Level.prototype.translate = function(x, y) {

	this.x += x;
	this.y += y;
	this.updateBounds();

	for (var i = 0; i < this.entities.length; i++) {
		this.entities[i].translate(x, y);
	}

}