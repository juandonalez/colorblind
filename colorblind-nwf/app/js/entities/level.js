function Level(d) {

	this.width = d.width * globals.tileSize;
	this.height = globals.gameHeight;
	this.origin = new Point(0, 0);

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
		col.y += this.top;	
		this.colliders[i] = new Platform(this, col.x, col.y, col.width, col.height);
	}

	/*for (var i = 0; i < d.entities.length; i++) {
		var ent = d.entities[i];
		// check class of entity and push new object to this.entities
	}*/

	this.center = this.calculateCenter();

	col = null;
	colliders = null;
	d = null;

}

Level.prototype.update = function() {}

Level.prototype.draw = function(layerNum) {

	var ctx = globals.bufferCtx;
	var tileset = fileManager.tilesets[globals.currScene.name];
	var tileSize = globals.tileSize;
	var tile = 0;
	var layer;

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
	}

	var color = 0;

	for (var i = this.top; i < this.height; i += tileSize) {
		for (var j = this.origin.x; j < this.origin.x + this.width; j += tileSize) {
			if (layer[tile] !== 0 && layer[tile] !== null) {
				color = 13*layerNum;
				var img = tileset[layer[tile] + color];
				ctx.drawImage(img, j, i, tileSize, tileSize);
			}
			tile++;
		}
	}

}

Level.prototype.activate = function(x) {

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

Level.prototype.deactivate = function() {

	for (var i = 0; i < this.colliders.length; i++) {
		this.colliders[i].translate(this.origin.x * -1, 0);
	}

	this.setOrigin(0, 0);

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