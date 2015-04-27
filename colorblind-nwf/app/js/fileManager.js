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
	fm.currentTileset;
	fm.currentLevels;

	fm.images = new Array(1);

	fm.images["splashScreen"] = new Image();
	fm.images["splashScreen"].src = "images/splashScreen.png";

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

		return fm.isComplete(fm.currentTileset) &&
			fm.isComplete(fm.currentLevels);

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
			request.open("GET", url, true);
			request.onreadystatechange = function() {
				if (request.readyState == 4) {
					//target[i] = JSON.parse(request.response);
				}
			}
			request.send();
		}

	}

	fm.loadScene = function(scene) {

		var tilesetSize = fm.data.tilesetSize;
		var urls = new Array(tilesetSize);
		fm.currentTileset = new Array(tilesetSize);

		for (var i = 0; i < tilesetSize; i++) {
			var url = "images/tilesets/" + scene + "/" + i + ".png";
			urls[i] = url;
		}

		fm.loadImages(urls, fm.currentTileset);

		var numLevels = fm.data.scenes[scene].numLevels;
		urls = new Array(numLevels);
		fm.currentLevels = new Array(numLevels);

		for (var i = 0; i < numLevels; i++) {
			var url = "levels/" + scene + "/" + i + ".json";
			urls[i] = url;
		}

		fm.loadJSON(urls, fm.currentLevels);

	}

})();