var fileManager = fileManager || {};

(function() {

	var sceneNames = ["splashScreen", "mainMenu", "stage1", "stage2", "stage3"];

	fileManager.levels = {};
	fileManager.tilesets = {};
	fileManager.images = {};

	fileManager.loadCounter = sceneData.totalNumImages;
	fileManager.loadEvent = new Event("loaded");

	/* 
	functions for loading files of different types, and to check if loading is finished
	*/

	fileManager.fileLoaded = function() {

		fileManager.loadCounter--;

		if (fileManager.loadCounter <= 0) {
			window.dispatchEvent(fileManager.loadEvent);
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

	fileManager.loadImages = function() {

		var names = sceneData.imageNames;

		for (var i = 0; i < names.length; i++) {
			var name = names[i];
			fileManager.images[name] = new Image();
			fileManager.images[name].onload = fileManager.fileLoaded;
			fileManager.images[name].src = "images/" + name + ".png";
		}

	}

	fileManager.loadLevels = function(scene) {

		var numLevels = sceneData[scene].numLevels;
		fileManager.levels[scene] = new Array(numLevels);

		if (numLevels !== 0) {
			var urls = new Array(numLevels);
			fileManager.currLevels = null;
			fileManager.currLevels = new Array(numLevels);

			for (var i = 0; i < numLevels; i++) {
				var url = "levels/" + scene + "/" + i + ".json";
				urls[i] = url;
			}

			fileManager.loadJSON(urls, fileManager.levels[scene]);
		}

	}

	fileManager.loadTileset = function(scene) {

		var tilesetSize = sceneData[scene].tilesetSize;

		if (tilesetSize !== 0) {
			fileManager.tilesets[scene] = new Array(tilesetSize);
			var tileset = fileManager.tilesets[scene];

			for (var i = 0; i < tilesetSize; i++) {
				tileset[i] = new Image();
				tileset[i].onload = fileManager.fileLoaded;
				tileset[i].src = "images/" + scene + "/tilesets/" + i + ".png";
			}
		}

	}

	fileManager.loadFiles = function() {

		fileManager.loadImages();

		for (var i = 0; i < sceneNames.length; i++) {

			fileManager.loadLevels(sceneNames[i]);
			fileManager.loadTileset(sceneNames[i]);

		}

	}

})();