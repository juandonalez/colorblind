function Level() {

	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;
	this.layer1 = [];
	this.layer2 = [];
	this.layer3 = [];
	this.colliders = [];
	this.entities = [];

}

Level.prototype.init = function(data) {

	this.width = data.width;
	this.height = data.height;
	this.y = globals.internalHeight - this.height;
	this.layer1 = data.layer1;
	this.layer2 = data.layer2;
	this.layer3 = data.layer3;

	for (var i = 0; i < data.colliders.length; i++) {
		var col = data.colliders[i];
		col.y += this.y;	// collider y pos is relative to level top left corner
		this.colliders.push(new PlatformCollider(this, col.x, col.y, col.width, col.height));
	}

	for (var i = 0; i < data.entities.length; i++) {
		var ent = data.entities[i];
		// check class of entity and push new object to this.entities
	}

}

Level.prototype.update = function() {}

Level.prototype.draw = function(layer) {

	var ctx = globals.bufferCtx;
	var tileset = fileManager.tileset;
	var tileSize = globals.tileSize;
	var tile = 0;

	for (var i = this.y/tileSize; i < globals.numTilesVert; i++) {
		for (var j = 0; j < this.width/tileSize; j++) {
			if (layer === 1) {
			if (this.layer1[tile] !== 0 && this.layer1[tile] !== null) {
				var img = tileset[this.layer1[tile]];
				ctx.drawImage(img, j*tileSize - camera.origin.x, i*tileSize - camera.origin.y, tileSize, tileSize);
			}
		}
		else if (layer === 2) {
			if (this.layer2[tile] !== 0 && this.layer2[tile] !== null) {
				var img = tileset[this.layer2[tile]];
				ctx.drawImage(img, j*tileSize - camera.origin.x, i*tileSize - camera.origin.y, tileSize, tileSize);
			}
		}
		else {
			if (this.layer3[tile] !== 0 && this.layer3[tile] !== null) {
				var img = tileset[this.layer3[tile]];
				ctx.drawImage(img, j*tileSize - camera.origin.x, i*tileSize - camera.origin.y, tileSize, tileSize);
			}
		}
			tile++;
		}
	}

}