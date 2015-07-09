function Level(d) {

	this.width = d.width;
	this.height = globals.gameHeight;
	this.origin = new Point(0, 0);

	// the level covers the whole screen
	// top is where the tiles first appear
	this.top = this.height - d.height;

	this.layer1 = d.layer1;
	this.layer2 = d.layer2;
	this.layer3 = d.layer3;

	this.colliders = [d.colliders.length];

	for (var i = 0; i < d.colliders.length; i++) {
		var col = d.colliders[i];
		// collider y pos is relative to level top left corner
		col.y += this.top;	
		this.colliders[i] = new Platform(this, col.x, col.y, col.width, col.height);
	}

	for (var i = 0; i < d.entities.length; i++) {
		var ent = d.entities[i];
		// check class of entity and push new object to this.entities
	}

	this.center = this.calculateCenter();

	d = null;

}

Level.prototype.update = function() {}

Level.prototype.draw = function(layer) {

	var ctx = globals.bufferCtx;
	var tileset = fileManager.tilesets[globals.currScene.name];
	var tileSize = globals.tileSize;
	var tile = 0;
	var layer;

	if (layer === 1) {
		layer = this.layer1;
	}
	else if (layer === 2) {
		layer = this.layer2;
	}
	else {
		layer = this.layer3;
	}

	for (var i = this.top; i < this.height; i += tileSize) {
		for (var j = this.origin.x; j < this.origin.x + this.width; j += tileSize) {
			if (layer[tile] !== 0 && layer[tile] !== null) {
				var img = tileset[layer[tile]];
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