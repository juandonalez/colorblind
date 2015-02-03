function Level() {

	this.width = 0;
	this.height = 0;
	this.x = 0;
	this.y = 0;
	this.main = [];
	this.color1 = [];
	this.color2 = [];
	this.colliders = [];

	this.init = function(data) {

		this.width = data.width * globals.tileSize;
		this.height = data.height * globals.tileSize;
		this.y = globals.internalHeight - this.height;

		var layers = data.layers;
		for (var i = 0; i < layers.length; i++) {
			var layer = layers[i];
			if (layer.name === "main") {
				this.main = layer.data;
			}
			else if (layer.name === "color1") {
				this.color1 = layer.data;
			}
			else if (layer.name === "color2") {
				this.color2 = layer.data;
			}
			else if (layer.name === "colliders") {
				this.colliders = layer.objects;
				for (var j = 0; j < this.colliders.length; j++) {
					var col = this.colliders[j];
					col.y = globals.internalHeight - col.height;
				}
			}
		}

	}

	this.update = function() {

		

	}

	this.draw = function(ctx) {

		var tileset = fileManager.tileset;
		var tile = 0;

		for (var i = this.y; i < globals.numTilesVert; i++) {
			var tileSize = globals.tileSize;
			for (var j = 0; j < this.width/tileSize; j++) {
				if (this.main[tile] !== 0 && this.main[tile] !== null) {
					var img = tileset[this.main[tile]];
					ctx.drawImage(img, j*tileSize, i*tileSize, tileSize, tileSize);
				}
				tile++;
			}
		}

		ctx.fillStyle = "black";
		for (var i = 0; i < this.colliders.length; i++) {
			var col = this.colliders[i];
			ctx.fillRect(col.x, col.y, col.width, col.height);
		}

	}

}