function FileManager() {

	this.scene = 0;
	this.data = [];
	this.loadingLevels = false;

	this.levels = [];
	this.tileset = [];
	this.bgsFar = [];
	this.bgsMid = [];

	this.loadScene = function(scene) {

		this.scene = scene;
		this.data = this.sceneData[scene];
		this.loadLevels();
		this.loadTileset();
		this.loadBackgrounds();

	}

	this.loadLevels = function() {

		this.loadingLevels = true;
		this.levels = [];
		var fm = this;
		var url;
		
		for (var i = 0; i < this.data.levelNumber; i++) {
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

		this.loadingLevels = false;

	}
	
	this.parseLevel = function(data) {

		this.levels.push(JSON.parse(data));

	}

	this.loadTileset = function() {

		this.tileset = new Array(this.data.tilesetNumber);
		var img;

		for (var i = 0; i < this.data.tilesetNumber; i++) {
			var img  = new Image();
			img.src  = 'images/tilesets/' + this.scene + '/' + i + '.png';
			this.tileset[i] = img;
		}

	}

	this.loadBackgrounds = function() {

		this.bgsFar = new Array(this.data.bgFarNumber);
		this.bgsMid = new Array(this.data.bgMidNumber);
		var img;

		for (var i = 0; i < this.data.bgFarNumber; i++) {
			var img  = new Image();
			img.src  = 'images/backgrounds/' + this.scene + '/f' + i + '.png';
			this.bgsFar[i] = img;
		}

		for (var i = 0; i < this.data.bgMidNumber; i++) {
			var img  = new Image();
			img.src  = 'images/backgrounds/' + this.scene + '/m' + i + '.png';
			this.bgsMid[i] = img;
		}

	}

	this.isLoading = function() {

		for (var i = 0; i < this.tileset.length; i++) {
			if (!this.tileset[i].complete) {
				return true;
			}
		}

		for (var i = 0; i < this.bgsFar.length; i++) {
			if (!this.bgsFar[i].complete) {
				return true;
			}
		}

		for (var i = 0; i < this.bgsMid.length; i++) {
			if (!this.bgsMid[i].complete) {
				return true;
			}
		}

		return this.loadingLevels;

	}

	this.sceneData = [
			{
				"levelNumber": 0,
				"tilesetNumber": 0,
				"bgNumber": 0,
				"images": []
			},
			{
				"levelNumber": 4,
				"tilesetNumber": 13,
				"bgFarNumber": 4,
				"bgMidNumber": 4,
				"images": []
			},
			{
				"levelNumber": 4,
				"tilesetNumber": 13,
				"bgFarNumber": 4,
				"bgMidNumber": 4,
				"images": []
			},
			{
				"levelNumber": 4,
				"tilesetNumber": 13,
				"bgFarNumber": 4,
				"bgMidNumber": 4,
				"images": []
			}
	]

}