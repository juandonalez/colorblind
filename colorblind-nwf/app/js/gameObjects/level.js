Level.prototype = new GameObject();
Level.prototype.constructor = Level;

function Level(d) {

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

	this.layers = [d.layers[0].data, d.layers[1].data, d.layers[2].data];

	// swap the red and green layers when drawing
	this.swap = false;

	var colliders = d.layers[3].objects;
	this.colliders = new Array(colliders.length);

	var col;
	for (var i = 0; i < colliders.length; i++) {
		col = colliders[i];
		// collider y pos is relative to level top left corner
		this.colliders[i] = new Platform(col.x, col.y + this.top, col.width, col.height);
	}

	var entities = d.layers[4].objects;
	this.entities = new Array(entities.length);

	var ent;
	for (var i = 0; i < entities.length; i++) {
		ent = entities[i];
		if (ent.name === "spike") {
			//this.entities[i] = new Spike(ent.x, this.top + ent.y, ent.type);
		}
	}

	col = null;
	colliders = null;
	ent = null;
	entities = null;
	d = null;

}

Level.prototype.update = function() {

	if (this.active) {
		// if an entity comes into view it is activated
		for (var i = 0; i < this.entities.length; i++) {
			if (!this.entities[i].active) {
				if (camera.intersects(this.entities[i])) {
					this.entities[i].activate();
				}
			}
			this.entities[i].update();
		}
	}

}

Level.prototype.draw = function(layerNum, color) {

	var ctx = globals.bufferCtx;
	var tileset = globals.currScene.tileset[color];
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

	if (globals.isWiiU && (layerNum === 1)) {
		tileset = globals.currScene.tileset[0];
		ctx.save();
		ctx.setImageColor(1, 0, 0);
	}

	var layer = this.layers[layerNum];

	for (var i = this.top; i < this.height; i += tileSize) {
		for (var j = this.x; j < this.x + this.width; j += tileSize) {
			if (layer[tileNum] !== 0 && layer[tileNum] !== null) {
				var img = tileset[layer[tileNum]];
				ctx.drawImage(img, j, i);
			}
			tileNum++;
		}
	}

	for (var i = 0; i < this.entities.length; i++) {
		this.entities[i].draw(layerNum, color);
	}

	if (globals.isWiiU && (layerNum === 1)) {
		ctx.restore();
	}

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

	for (var i = 0; i < this.colliders.length; i++) {
		this.colliders[i].deactivate();
	}

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

	for (var i = 0; i < this.colliders.length; i++) {
		this.colliders[i].translate(x, y);
	}

	for (var i = 0; i < this.entities.length; i++) {
		this.entities[i].translate(x, y);
	}

}