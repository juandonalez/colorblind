function Level(d) {

	this.active = false;

	this.width = d.width * globals.tileSize;
	this.height = globals.gameHeight;
	this.origin = new Point(0, 0);
	this.center = new Point(0, 0);

	// the level covers the whole screen
	// top is where the tiles first appear
	this.top = this.height - (d.height * globals.tileSize);

	this.layer0 = d.layers[0].data;
	this.layer1 = d.layers[1].data;
	this.layer2 = d.layers[2].data;

	// swap the red and green layers when drawing
	this.swap = false;

	var colliders = d.layers[3].objects;
	this.colliders = new Array(colliders.length);

	var col;
	for (var i = 0; i < colliders.length; i++) {
		col = colliders[i];
		// collider y pos is relative to level top left corner
		this.colliders[i] = new Platform(this, col.x, col.y + this.top, col.width, col.height);
	}

	var entities = d.layers[4].objects;
	this.entities = new Array(entities.length);

	var ent;
	for (var i = 0; i < entities.length; i++) {
		ent = entities[i];	
		//this.entities[i] = new Platform(this, col.x, col.y, col.width, col.height);
	}

	this.calculateCenter();

	col = null;
	colliders = null;
	ent = null;
	entities = null;
	d = null;

}

Level.prototype.update = function() {

	if (this.active) {
		for (var i = 0; i < this.entities.length; i++) {
			this.entities.update();
		}
	}

}

Level.prototype.draw = function(layerNum, color) {

	var ctx = globals.bufferCtx;
	var tileset = fileManager.tilesets[globals.currScene.name];
	var tileSize = globals.tileSize;
	var tile = 0;
	var tileOffset = 0;
	var layer;

	if (color === 0) {
		tileOffset = 33;
	}
	else if (color === 1) {
		tileOffset = 48;
	}
	else {
		tileOffset = 63;
	}

	if (layerNum === 1) {
		if (this.swap) {
			layer = this.layer2;
		}
		else {
			layer = this.layer1;
		}
	}
	else if (layerNum === 2) {
		if (this.swap) {
			layer = this.layer1;
		}
		else {
			layer = this.layer2;
		}
	}
	else {
		layer = this.layer0;
		tileOffset = 0;
	}

	// offset of 30 brings us to red tiles, 43 to green tiles
	for (var i = this.top; i < this.height; i += tileSize) {
		for (var j = this.origin.x; j < this.origin.x + this.width; j += tileSize) {
			if (layer[tile] !== 0 && layer[tile] !== null) {
				var img = tileset[layer[tile] + tileOffset];
				ctx.drawImage(img, j, i);
			}
			tile++;
		}
	}

}

Level.prototype.init = function(x) {

	if (x) {

		// when a new level is added to the end, move its colliders
		for (var i = 0; i < this.colliders.length; i++) {
			this.colliders[i].translate(x, 0);
		}

		this.setOrigin(x, 0);

	}

	// randomly assign color to each layer
	this.swap = Math.floor(Math.random() * 2) === 0;

}

Level.prototype.activate = function() {

	this.active = true;

	if (this.entities) {
		for (var i = 0; i < this.entities.length; i++) {
			this.entities[i].activate();
		}
	}

}

Level.prototype.deactivate = function() {

	this.active = false;

	for (var i = 0; i < this.colliders.length; i++) {
		this.colliders[i].translate(this.origin.x * -1, 0);
	}

	this.setOrigin(0, 0);

	if (this.entities) {
		for (var i = 0; i < this.entities.length; i++) {
			this.entities[i].deactivate();
		}
	}

}

Level.prototype.pause = function() {

	this.active = false;

	for (var i = 0; i < this.entities.length; i++) {
		this.entities.pause();
	}

}

Level.prototype.resume = function() {

	this.active = true;

	for (var i = 0; i < this.entities.length; i++) {
		this.entities.resume();
	}

}

Level.prototype.calculateCenter = Entity.prototype.calculateCenter;

Level.prototype.calculateOrigin = Entity.prototype.calculateOrigin;

Level.prototype.intersects = Entity.prototype.intersects;

Level.prototype.pctToPoint = Entity.prototype.pctToPoint;

Level.prototype.resize = Entity.prototype.resize;

Level.prototype.setAlpha = Entity.prototype.setAlpha;

Level.prototype.setCenter = Entity.prototype.setCenter;

Level.prototype.setOrigin = Entity.prototype.setOrigin;

Level.prototype.translate = Entity.prototype.translate;