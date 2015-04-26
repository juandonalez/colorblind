var fm = fm || {};

(function() {

	/* 
	info file for all of the data that will be loaded
	*/
	fm.data = {
		"tilesetSize": 53,
		"scenes": [
			{
				"numLevels": 4
			},
			{
				"numLevels": 4
			},
			{
				"numLevels": 4
			},
			{
				"numLevels": 4
			}
		]
	};

	/* 
	storage arrays for all of the data
	*/
	fm.tilesets = new Array(4);
	fm.levels = new Array(4);

	// create empty arrays for each scene
	for (var i = 0; i < 4; i++) {
		fm.tilesets[i] = new Array(fm.data.tilesetSize);
		fm.levels[i] = new Array(fm.data.scenes[i].numLevels);
	}

	/* 
	functions for loading files of different types, and to check if loading is finished
	*/
	fm.isComplete = function(array) {

		for (var i = 0; i < array.length; i++) {
			if (array[i] == null) {
				return false;
			}
		}

		return true;

	}

	fm.isLoaded = function() {

		return fm.isComplete(fm.tilesets[0]) &&
			fm.isComplete(fm.tilesets[1]) &&
			fm.isComplete(fm.tilesets[2]) &&
			fm.isComplete(fm.tilesets[3]) &&
			fm.isComplete(fm.levels[0]) &&
			fm.isComplete(fm.levels[1]) &&
			fm.isComplete(fm.levels[2]) &&
			fm.isComplete(fm.levels[3]);

	}

	fm.loadImages = function(urls, target) {

		for (var i = 0; i < urls.length; i++) {
			target[i] = new Image();
			target[i].src = urls[i];
		}

	}

	fm.loadJSON = function(urls, target) {

		for (var i = 0; i < urls.length; i++) {
			var url = urls[i];
			var request = new XMLHttpRequest();
			request.overrideMimeType("application/json");
			request.open("GET", url, false);
			request.onreadystatechange = function() {
				if (request.readyState == 4) {
					target[i] = JSON.parse(request.response);
				}
			}
			request.send();
		}

	}

	fm.loadTileset = function(scene) {

		var tilesetSize = fm.data.tilesetSize;
		var urls = new Array(tilesetSize);
		fm.tilesets[scene] = new Array(tilesetSize);

		for (var i = 0; i < tilesetSize; i++) {
			var url = "images/tilesets/" + scene + "/" + i + ".png";
			urls[i] = url;
		}

		fm.loadImages(urls, fm.tilesets[scene]);

	}

	fm.loadLevels = function(scene) {

		var numLevels = fm.data.scenes[scene].numLevels;
		var urls = new Array(numLevels);
		fm.levels[scene] = new Array(numLevels);

		for (var i = 0; i < numLevels; i++) {
			var url = "levels/" + scene + "/" + i + ".json";
			urls[i] = url;
		}

		fm.loadJSON(urls, fm.levels[scene]);

	}

	/*
	actual loading is done here
	*/

	// load tilesets for 3 stages
	fm.loadTileset(1);
	fm.loadTileset(2);
	fm.loadTileset(3);

	// main menu just uses the 1st stage tileset
	fm.tilesets[0] = fm.tilesets[1];

	// load levels for main menu and stages
	fm.loadLevels(0);
	fm.loadLevels(1);
	fm.loadLevels(2);
	fm.loadLevels(3);

})();