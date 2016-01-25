var fileManager = fileManager || {};

(function() {

	fileManager.levels = {};
	fileManager.images = {};
	var totalNumImages = 91;

	var folders = [
		["backgrounds/mainMenu/0/", 2],
		["backgrounds/stage1/0/", 2],
		["backgrounds/stage1/1/", 2],
		["misc/sides/l/", 1],
		["misc/sides/r/", 1],
		["players/0/idle/", 1],
		["players/0/jumping/", 1],
		["players/0/running/", 4],
		["players/1/idle/", 1],
		["players/1/jumping/", 1],
		["players/1/running/", 4],
		["players/2/idle/", 1],
		["players/2/jumping/", 1],
		["players/2/running/", 4],
		["tilesets/stage1/", 23],
		["tilesets/stage2/", 34]
	];

	var imageURLs = [
		"backgrounds/stage1",
		"backgrounds/stage2",
		"menus/coop",
		"menus/duplicate",
		"menus/split",
		"menus/stage1",
		"menus/stage2",
		"menus/versus"
	];

	fileManager.loadFiles = function() {

		loadLevels("stage1");
		loadLevels("stage2");

		var baseURL;
		var numImages;

		for (var i = 0; i < folders.length; i++) {
			baseURL = folders[i][0];
			numImages = folders[i][1];
			fileManager.images[baseURL] = new Array(numImages);
			for (var j = 0; j < numImages; j++) {
				fileManager.images[baseURL][j] = new Image();
				fileManager.images[baseURL][j].onload = imageLoaded;
				fileManager.images[baseURL][j].src = "images/" + baseURL + j + ".png";
			}
		}

		for (var i = 0; i < imageURLs.length; i++) {
			fileManager.images[imageURLs[i]] = new Image();
			fileManager.images[imageURLs[i]].onload = imageLoaded;
			fileManager.images[imageURLs[i]].src = "images/" + imageURLs[i] + ".png";
		}

	}

	function imageLoaded() {

		totalNumImages--;

		if (totalNumImages <= 0) {
			window.dispatchEvent(new Event("loaded"));
		}

	}

	function loadLevels(scene) {

		var numLevels = sceneData[scene].numLevels;
		var numAllModes = sceneData[scene].numAllModes;
		fileManager.levels[scene] = new Array(numLevels);
		var levelData = new Array(numLevels);

		if (numLevels !== 0) {

			if (globals.debugMode && globals.debug.levelTest) {
				var urls = ["levels/test.json"];
			}
			else {
			
				var urls = new Array(numLevels);

				for (var i = 0; i < numAllModes; i++) {
					var url = "levels/" + scene + "/" + i + ".json";
					urls[i] = url;
				}

				for (var i = 0; i < (numLevels - numAllModes); i++) {
					var url = "levels/" + scene + "/s" + i + ".json";
					urls[i + numAllModes] = url;
				}

			}

			

			for (var i = 0; i < urls.length; i++) {
				var url = urls[i];
				var request = new XMLHttpRequest();
				request.overrideMimeType("application/json");
				request.open("GET", url, false);
				request.onreadystatechange = function() {
					if (request.readyState == 4) {
						var response = JSON.parse(request.response);
						levelData[i] = response;
					}
				}
				request.send();
			}

			// if testing a test level, just add it to the scene levels
			if (globals.debugMode && globals.debug.levelTest) {

				for (var i = 0; i < levelData.length; i++) {
					fileManager.levels[scene][i] = new Level(levelData[0]);
				}

			}
			else {

				for (var i = 0; i < levelData.length; i++) {
					fileManager.levels[scene][i] = new Level(levelData[i]);
				}

			}

			levelData = null;

		}

	}

})();