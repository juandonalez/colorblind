function FileManager() {

	this.loading = false;
	this.levels = [];
	this.tileset = [];

	this.loadLevels = function(scene, counter) {

		this.loading = true;
		this.levels = [];
		var fm = this;
		var url;
		
		for (var i = 0; i < counter; i++) {
			url = "levels/" + i + ".json";
			var request = new XMLHttpRequest();
			request.overrideMimeType("application/json");
			request.open("GET", url, false);
			request.onreadystatechange = function() {
				if (request.readyState == 4) {
					fm.parseLevel(request.response);
				}
			}
			request.send();
		}

		this.loading = false;

	}
	
	this.parseLevel = function(data) {

		this.levels.push(JSON.parse(data));

	}

	this.loadTileset = function(scene, counter) {

		this.tileset = new Array(counter);
		var img;

		for (var i = 0; i < counter; i++) {
			var img  = new Image();
			img.src  = 'images/tilesets/' + scene + '/' + i + '.png';
			this.tileset[i] = img;
		}

	}

	this.isLoading = function() {

		for (var i = 0; i < this.tileset.length; i++) {
			if (!this.tileset[i].complete) {
				return true;
			}
		}

		return this.loading;

	}

}