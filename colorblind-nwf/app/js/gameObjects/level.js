function Level(d) {

	this.width = d.width;
	this.height = d.height;
	this.x = 0;
	this.y = globals.gameHeight - this.height;
	this.layer1 = d.layer1;
	this.layer2 = d.layer2;
	this.layer3 = d.layer3;
	this.colliders = [];

	for (var i = 0; i < d.colliders.length; i++) {
		var col = d.colliders[i];
		col.y += this.y;	// collider y pos is relative to level top left corner
		this.colliders.push(new PlatformCollider(this, col.x, col.y, col.width, col.height));
	}

	for (var i = 0; i < d.entities.length; i++) {
		var ent = d.entities[i];
		// check class of entity and push new object to this.entities
	}

	d = null;

}

Level.prototype.update = function() {}

Level.prototype.draw = function(layer) {

	var ctx = globals.bufferCtx;
	var tileset = fileManager.tilesets[globals.currScene.name];
	var tileSize = globals.tileSize;
	var tile = 0;

	for (var i = this.y/tileSize; i < globals.numTilesVert; i++) {
		for (var j = 0; j < this.width/tileSize; j++) {
			if (layer === 1) {
				if (this.layer1[tile] !== 0 && this.layer1[tile] !== null) {
					var img = tileset[this.layer1[tile]];
					ctx.drawImage(img, j*tileSize, i*tileSize, tileSize, tileSize);
				}
			}
			else if (layer === 2) {
				if (this.layer2[tile] !== 0 && this.layer2[tile] !== null) {
					var img = tileset[this.layer2[tile]];
					ctx.drawImage(img, j*tileSize, i*tileSize, tileSize, tileSize);
				}
			}
			else {
				if (this.layer3[tile] !== 0 && this.layer3[tile] !== null) {
					var img = tileset[this.layer3[tile]];
					ctx.drawImage(img, j*tileSize, i*tileSize, tileSize, tileSize);
				}
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