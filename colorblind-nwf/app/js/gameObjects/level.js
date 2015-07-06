function Level(data) {

	this.width = data.width;
	this.height = globals.gameHeight;
	this.origin = new Point(0, 0);
	this.top = this.height - data.height;

	this.layer1 = data.layer1;
	this.layer2 = data.layer2;
	this.layer3 = data.layer3;
	this.colliders = [data.colliders.length];

	for (var i = 0; i < data.colliders.length; i++) {
		var col = data.colliders[i];
		// collider y pos is relative to level top left corner
		col.y += this.top;	
		this.colliders[i] = new PlatformCollider(this, col.x, col.y, col.width, col.height);
	}

	for (var i = 0; i < data.entities.length; i++) {
		var ent = data.entities[i];
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
		for (var j = 0; j < this.width; j += tileSize) {
			if (layer[tile] !== 0 && layer[tile] !== null) {
				var img = tileset[layer[tile]];
				ctx.drawImage(img, j, i, tileSize, tileSize);
			}
			tile++;
		}
	}

	if (globals.debugMode && globals.debug.hitboxes) {
		for (var i = 0; i < this.colliders.length; i++) {
			this.colliders[i].draw();
		}
	}

}

Level.prototype.calculateCenter = GameObject.prototype.calculateCenter;

Level.prototype.calculateOrigin = GameObject.prototype.calculateOrigin;

Level.prototype.intersects = GameObject.prototype.intersects;

Level.prototype.setCenter = GameObject.prototype.setCenter;

Level.prototype.setOrigin = GameObject.prototype.setOrigin;

Level.prototype.translate = GameObject.prototype.translate;