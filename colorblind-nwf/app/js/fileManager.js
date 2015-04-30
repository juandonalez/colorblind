var fileManager = fileManager || {};

(function() {

	fileManager.loadCounter = 0;
	fileManager.loadEvent = new Event("loaded");

	/* 
	storage arrays for all of the data
	*/

	fileManager.currTileset;
	fileManager.currLevels;
	fileManager.currImages;

	/* 
	functions for loading files of different types, and to check if loading is finished
	*/

	fileManager.fileLoaded = function() {

		fileManager.loadCounter--;

		if (fileManager.loadCounter <= 0) {
			fileManager.loadCounter = 0;
			window.dispatchEvent(fileManager.loadEvent);
		}

	}

	fileManager.loadImages = function(urls, target) {

		fileManager.loadCounter += urls.length;

		for (var i = 0; i < urls.length; i++) {
			target[i] = new Image();
			target[i].onload = fileManager.fileLoaded;
			target[i].src = urls[i];
		}

	}

	fileManager.loadJSON = function(urls, target) {

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

	fileManager.loadScene = function(scene) {

		var numLevels = sceneData[scene].numLevels;

		if (numLevels !== 0) {
			var urls = new Array(numLevels);
			fileManager.currLevels = null;
			fileManager.currLevels = new Array(numLevels);

			for (var i = 0; i < numLevels; i++) {
				var url = "levels/" + scene + "/" + i + ".json";
				urls[i] = url;
			}

			fileManager.loadJSON(urls, fileManager.currLevels);
		}

		var tilesetSize = sceneData[scene].tilesetSize;

		if (tilesetSize !== 0) {
			urls = new Array(tilesetSize);
			fileManager.currTileset = null;
			fileManager.currTileset = new Array(tilesetSize);

			for (var i = 0; i < tilesetSize; i++) {
				var url = "images/" + scene + "/tilesets/" + i + ".png";
				urls[i] = url;
			}

			fileManager.loadImages(urls, fileManager.currTileset);
		}

		var images = sceneData[scene].images;

		if (sceneData[scene].images) {
			var images = sceneData[scene].images;
			var numImages = images.length;
		}

		if (numImages !== 0) {
			urls = new Array(numImages);
			fileManager.currImages = null;
			fileManager.currImages = new Array(numImages);

			for (var i = 0; i < numImages; i++) {
				var url = "images/" + scene + "/" + images[i] + ".png";
				urls[i] = url;
			}

			fileManager.loadImages(urls, fileManager.currImages);
		}

		// if there are no images to load, finish loading
		if (tilesetSize === 0 && numImages === 0) {
			fileManager.fileLoaded();
		}

	}

})();