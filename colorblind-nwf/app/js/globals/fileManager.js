var fileManager = fileManager || {};

(function() {

	var sceneNames = ["splashScreen", "mainMenu", "stage1", "stage2", "stage3"];

	fileManager.levels = {};
	fileManager.tilesets = {};
	fileManager.topBgs = {};
	fileManager.middleBgs = {};
	fileManager.bottomBgs = {};
	fileManager.images = {};
	fileManager.players = [{}, {}, {}];

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

	function loadBackgrounds(scene) {

		var numTop = sceneData[scene].numTop;
		var numMiddle = sceneData[scene].numMiddle;
		var numBottom = sceneData[scene].numBottom;

		if (numTop !== 0) {
			fileManager.topBgs[scene] = new Array(numTop);
			var topBgs = fileManager.topBgs[scene];

			for (var i = 0; i < numTop; i++) {
				topBgs[i] = new Image();
				topBgs[i].onload = fileLoaded;
				topBgs[i].src = "images/" + scene + "/backgrounds/top/" + i + ".png";
			}
		}

		if (numMiddle !== 0) {
			fileManager.middleBgs[scene] = new Array(numMiddle);
			var middleBgs = fileManager.middleBgs[scene];

			for (var i = 0; i < numMiddle; i++) {
				middleBgs[i] = new Image();
				middleBgs[i].onload = fileLoaded;
				middleBgs[i].src = "images/" + scene + "/backgrounds/middle/" + i + ".png";
			}
		}

		if (numBottom !== 0) {
			fileManager.bottomBgs[scene] = new Array(numBottom);
			var bottomBgs = fileManager.bottomBgs[scene];

			for (var i = 0; i < numBottom; i++) {
				bottomBgs[i] = new Image();
				bottomBgs[i].onload = fileLoaded;
				bottomBgs[i].src = "images/" + scene + "/backgrounds/bottom/" + i + ".png";
			}
		}

	}

	function loadImages() {

		for (var i = 0; i < sceneData.imageNames.length; i++) {
			var name = sceneData.imageNames[i];
			fileManager.images[name] = new Image();
			fileManager.images[name].onload = fileLoaded;
			fileManager.images[name].src = "images/" + name + ".png";
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

	function loadPlayers() {

		for (var p = 0; p < 3; p++) {

			var player = fileManager.players[p];

			var state = "idle";
			var frames = 1;
			player[state] = new Array(frames);

			for (var i = 0; i < frames; i++) {

				player[state][i] = new Image();
				player[state][i].onload = fileLoaded;
				player[state][i].src = "images/players/" + p + "/" + state + "/" + i + ".png";

			}

			state = "running";
			frames = 4;
			player[state] = new Array(frames);

			for (var i = 0; i < frames; i++) {

				player[state][i] = new Image();
				player[state][i].onload = fileLoaded;
				player[state][i].src = "images/players/" + p + "/" + state + "/" + i + ".png";

			}

			state = "jumping";
			frames = 1;
			player[state] = new Array(frames);

			for (var i = 0; i < frames; i++) {

				player[state][i] = new Image();
				player[state][i].onload = fileLoaded;
				player[state][i].src = "images/players/" + p + "/" + state + "/" + i + ".png";

			}

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
				tileset[i].src = "images/" + scene + "/tileset/" + i + ".png";
			}
		}

	}

	/* 
		function that starts all the loading
	*/

	fileManager.loadFiles = function() {

		loadImages();

		for (var i = 0; i < sceneNames.length; i++) {

			var name = sceneNames[i];
			loadLevels(name);
			loadTileset(name);
			loadBackgrounds(name);

		}

		loadPlayers();

	}

})();