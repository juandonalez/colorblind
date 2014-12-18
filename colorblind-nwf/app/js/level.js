function Level() {

	this.width = 0;
	this.height = 0;
	this.main = [];
	this.color1 = [];
	this.color2 = [];
	this.colliders = [];

	this.init = function(url) {

		var level = this;
		var request = new XMLHttpRequest();
		request.overrideMimeType("application/json");
		request.open("GET", url, false);
		request.onreadystatechange = function() {
			if (request.readyState == 4) {
				level.readData(request.response);
			}
		}
		request.send();

	}

	this.readData = function(data) {

		data = JSON.parse(data);
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

	this.draw = function(ctx) {

		var y = 37 - this.height;
		var tile = 0;
		ctx.fillStyle = 'black';
		for (var i = y; i < 37; i++) {
			for (var j = 0; j < this.width; j++) {
				if (this.main[tile] != '0' && this.main[tile] != null) {
					ctx.fillRect(j*30, i*30, 30, 30);
				}
				tile++;
			}
		}

	}

}