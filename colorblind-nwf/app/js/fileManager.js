var fm = fm || {};

(function() {

	/* 
	info file for all of the data that will be loaded
	*/
	fm.data = {
		"scenes": [
			{
				"numLevels": 4,
				"tilesetSize": 53
			},
			{
				"numLevels": 4,
				"tilesetSize": 53
			},
			{
				"numLevels": 4,
				"tilesetSize": 53
			},
			{
				"numLevels": 4,
				"tilesetSize": 53
			},
			{
				"numLevels": 0,
				"tilesetSize": 0
			}
		]
	};

	fm.loadCounter = 0;
	fm.loadEvent = new Event("loaded");

	/* 
	storage arrays for all of the data
	*/
	fm.currTileset;
	fm.currLevels;

	/* 
	functions for loading files of different types, and to check if loading is finished
	*/
	fm.fileLoaded = function() {

		fm.loadCounter--;

		if (fm.loadCounter <= 0) {
			fm.loadCounter = 0;
			window.dispatchEvent(fm.loadEvent);
		}

	}

	fm.loadImages = function(urls, target) {

		fm.loadCounter += urls.length;

		for (var i = 0; i < urls.length; i++) {
			target[i] = new Image();
			target[i].onload = fm.fileLoaded;
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
					var response = JSON.parse(request.response);
					target[response.index] = response;
				}
			}
			request.send();
		}

	}

	fm.loadScene = function(scene) {

		var numLevels = fm.data.scenes[scene].numLevels;

		if (numLevels !== 0) {
			var urls = new Array(numLevels);
			fm.currLevels = null;
			fm.currLevels = new Array(numLevels);

			for (var i = 0; i < numLevels; i++) {
				var url = "levels/" + scene + "/" + i + ".json";
				urls[i] = url;
			}

			fm.loadJSON(urls, fm.currLevels);
		}

		var tilesetSize = fm.data.scenes[scene].tilesetSize;

		if (tilesetSize !== 0) {
			urls = new Array(tilesetSize);
			fm.currTileset = null;
			fm.currTileset = new Array(tilesetSize);

			for (var i = 0; i < tilesetSize; i++) {
				var url = "images/tilesets/" + scene + "/" + i + ".png";
				urls[i] = url;
			}

			fm.loadImages(urls, fm.currTileset);
		}
		else {
			window.dispatchEvent(fm.loadEvent);
		}

	}

})();