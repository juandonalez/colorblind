var fileManager = fileManager || {};

(function() {

	fileManager.scene = 0;
	fileManager.data = [];
	fileManager.loadingLevels = false;

	fileManager.levels = [];
	fileManager.tileset = [];
	fileManager.bgsFar = [];
	fileManager.bgsMid = [];

	fileManager.loadScene = function(scene) {

		fileManager.scene = scene;
		fileManager.data = fileManager.sceneData[scene];
		loadLevels();
		loadTileset();
		loadBackgrounds();

	}

	function loadLevels() {

		fileManager.loadingLevels = true;
		fileManager.levels = [];
		var url;
		
		for (var i = 0; i < fileManager.data.levelNumber; i++) {
			url = "levels/" + i + ".json";
			var request = new XMLHttpRequest();
			request.overrideMimeType("application/json");
			request.open("GET", url, false);
			request.onreadystatechange = function() {
				if (request.readyState == 4) {
					parseLevel(request.response);
				}
			}
			request.send();
		}

		fileManager.loadingLevels = false;

	}
	
	function parseLevel(data) {

		var level = new Level();
		level.init(JSON.parse(data));
		fileManager.levels.push(level);
		//fileManager.levels.push(JSON.parse(data));

	}

	function loadTileset() {

		fileManager.tileset = new Array(fileManager.data.tilesetNumber);
		var img;

		for (var i = 0; i < fileManager.data.tilesetNumber; i++) {
			var img  = new Image();
			img.src  = 'images/tilesets/' + fileManager.scene + '/' + i + '.png';
			fileManager.tileset[i] = img;
		}

	}

	function loadBackgrounds() {

		fileManager.bgsFar = new Array(fileManager.data.bgFarNumber);
		fileManager.bgsMid = new Array(fileManager.data.bgMidNumber);
		var img;

		for (var i = 0; i < fileManager.data.bgFarNumber; i++) {
			var img  = new Image();
			img.src  = 'images/backgrounds/' + fileManager.scene + '/f' + i + '.png';
			fileManager.bgsFar[i] = img;
		}

		for (var i = 0; i < fileManager.data.bgMidNumber; i++) {
			var img  = new Image();
			img.src  = 'images/backgrounds/' + fileManager.scene + '/m' + i + '.png';
			fileManager.bgsMid[i] = img;
		}

	}

	fileManager.isLoading = function() {

		for (var i = 0; i < fileManager.tileset.length; i++) {
			if (!fileManager.tileset[i].complete) {
				return true;
			}
		}

		for (var i = 0; i < fileManager.bgsFar.length; i++) {
			if (!fileManager.bgsFar[i].complete) {
				return true;
			}
		}

		for (var i = 0; i < fileManager.bgsMid.length; i++) {
			if (!fileManager.bgsMid[i].complete) {
				return true;
			}
		}

		return fileManager.loadingLevels;

	}

	fileManager.sceneData = [
			{
				"levelNumber": 0,
				"tilesetNumber": 0,
				"bgNumber": 0,
				"images": []
			},
			{
				"levelNumber": 4,
				"tilesetNumber": 53,
				"bgFarNumber": 4,
				"bgMidNumber": 4,
				"images": []
			},
			{
				"levelNumber": 4,
				"tilesetNumber": 53,
				"bgFarNumber": 4,
				"bgMidNumber": 4,
				"images": []
			},
			{
				"levelNumber": 4,
				"tilesetNumber": 53,
				"bgFarNumber": 4,
				"bgMidNumber": 4,
				"images": []
			}
	]

})();