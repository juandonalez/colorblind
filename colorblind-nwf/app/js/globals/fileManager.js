var fileManager = fileManager || {};

(function() {

	var sceneNames = ["splashScreen", "mainMenu", "stage1", "stage2", "stage3"];

	fileManager.levels = {};
	fileManager.tilesets = {};
	fileManager.images = {};

	/* 
		gets called each time an image is loaded, and dispatches an event to say when loading is done
	*/

	var loadCounter = sceneData.totalNumImages;

	function fileLoaded() {

		loadCounter--;

		if (loadCounter <= 0) {
			window.dispatchEvent(new Event("loaded"));
		}

	}

	/* 
		functions for loading files of different types
	*/

	function loadImages() {

		for (name of sceneData.imageNames) {
			fileManager.images[name] = new Image();
			fileManager.images[name].onload = fileLoaded;
			fileManager.images[name].src = "images/" + name + ".png";
		}

	}

	function loadJSON(urls, target) {

		for (url of urls) {
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

	function loadLevels(scene) {

		var numLevels = sceneData[scene].numLevels;
		fileManager.levels[scene] = new Array(numLevels);

		if (numLevels !== 0) {
			var urls = new Array(numLevels);

			for (var i = 0; i < numLevels; i++) {
				var url = "levels/" + scene + "/" + i + ".json";
				urls[i] = url;
			}

			loadJSON(urls, fileManager.levels[scene]);
		}

	}

	function loadTileset(scene) {

		var tilesetSize = sceneData[scene].tilesetSize;

		if (tilesetSize !== 0) {
			fileManager.tilesets[scene] = new Array(tilesetSize);
			var tileset = fileManager.tilesets[scene];

			for (var i = 0; i < tilesetSize; i++) {
				tileset[i] = new Image();
				tileset[i].onload = fileLoaded;
				tileset[i].src = "images/" + scene + "/tilesets/" + i + ".png";
			}
		}

	}

	/* 
		function that starts all the loading
	*/

	fileManager.loadFiles = function() {

		loadImages();

		for (name of sceneNames) {

			loadLevels(name);
			loadTileset(name);

		}

	}

})();