function Level() {

	this.width = 0;
	this.height = 0;
	this.main = [];
	this.color1 = [];
	this.color2 = [];
	this.colliders = [];

	this.init = function(url) {

		var level;
		$.getJSON("levels/2.json", this.readData);

	}

	this.readData = function(data) {

		this.width = data.width;
		this.height = data.height;
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
			}
		}

	}

}