var globals = globals || {};

(function() {

	globals.isWiiU = window.nwf && nwf.system && nwf.system.isWiiU();
	window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;

	globals.numPlayers = 1;
	globals.mode = "duplicate";

	globals.tileSize = 40;
	globals.numTilesHori = 34;
	globals.numTilesVert = 20;

	globals.gameWidth = globals.tileSize * globals.numTilesHori;
	globals.gameHeight = globals.tileSize * globals.numTilesVert;

	globals.playerWidth = 80;
	globals.playerHeight = 140;
	globals.playerStates = ["idle"];
	globals.player1;

	globals.font = "Soviet";

	globals.delta = 0.017;

	globals.scenes = {};
	globals.currScene;

	globals.isWide = true;

	if (globals.isWiiU) {
		var displayManager = nwf.display.DisplayManager.getInstance();

		globals.gpDisplay = displayManager.getGamePadDisplay();
		globals.gpHeight = globals.gpDisplay.height;
		globals.gpWidth = globals.gpDisplay.width;
		globals.gpCanvas = globals.gpDisplay.window.document.getElementById('gpCanvas');
		globals.gpCanvas.height = globals.gpHeight;
		globals.gpCanvas.width = globals.gpWidth;
		globals.gpCtx = globals.gpCanvas.getContext('2d');
		globals.gpBackground = globals.gpDisplay.window.document.getElementById('gpBackground');

		globals.tvDisplay = displayManager.getTVDisplay();
		globals.tvHeight = globals.tvDisplay.height;
		globals.tvWidth = globals.tvDisplay.width;

		if (globals.tvHeight === 480) {
			globals.isWide = false;
		}

		globals.tvCanvas = globals.tvDisplay.window.document.getElementById('tvCanvas');
		globals.tvCanvas.height = globals.tvHeight;
		globals.tvCanvas.width = globals.tvWidth;
		globals.tvCtx = globals.tvCanvas.getContext('2d');

		globals.tvBackground = globals.tvDisplay.window.document.getElementById('tvBackground');
		globals.tvBackgroundCtx = globals.tvBackground.getContext("2d");
		globals.tvBackground.width = globals.tvWidth;
		globals.tvBackground.height = globals.tvHeight;
	}
	else {
		globals.gpHeight = 480;
		globals.gpWidth = 854;
		globals.gpCanvas = window.document.getElementById('gpCanvas');
		globals.gpCanvas.width = globals.gpWidth;
		globals.gpCanvas.height = globals.gpHeight;
		globals.gpCtx = globals.gpCanvas.getContext('2d');
		globals.gpBackground = window.document.getElementById('gpBackground');

		globals.tvCanvas = document.createElement("canvas");
		globals.tvCtx = globals.tvCanvas.getContext("2d");
		globals.tvBackground = document.createElement("canvas");
		globals.tvBackgroundCtx = globals.tvBackground.getContext("2d");
	}

	// canvas for background that only gets redrawn when scene changes
	globals.gpBackgroundCtx = globals.gpBackground.getContext("2d");
	globals.gpBackground.width = globals.gpWidth;
	globals.gpBackground.height = globals.gpHeight;

	// buffer canvas for drawing everything to first
	// is 20x20 bigger than camera view to allow for screen shake
	globals.buffer = document.createElement("canvas");
	globals.bufferCtx = globals.buffer.getContext("2d");
	globals.buffer.width = globals.gameWidth;
	globals.buffer.height = globals.gameHeight;

	globals.debugMode = true;

	globals.debug = {
		backgrounds: false,
		fpsCounter: false,
		hitboxes: false,
		startScene: "stage1",
		levelTest: true
	};

})();