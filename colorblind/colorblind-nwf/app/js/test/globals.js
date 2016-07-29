var globals = globals || {};

(function() {

	window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;

	globals.fps = 30;
	globals.delta = 0;

	globals.numPlayers = 1;
	globals.mode = "duplicate";

	globals.tileSize = 40;
	globals.numTilesHori = 34;
	globals.numTilesVert = 20;

	globals.gameWidth = globals.tileSize * globals.numTilesHori;
	globals.gameHeight = globals.tileSize * globals.numTilesVert;
	globals.screenWidth = globals.gameWidth - (2*globals.tileSize);
	globals.screenHeight = globals.gameHeight - (2*globals.tileSize);
	globals.viewWidth = globals.screenHeight * (4/3);
	globals.viewHeight = globals.screenHeight;
	globals.sideWidth = (globals.screenWidth - globals.viewWidth)/2;

	globals.playerStartX = 200;
	globals.playerStartY = 200;
	globals.playerWidth = 80;
	globals.playerHeight = 118;
	globals.playerStates = ["idle"];

	globals.players = new Array(3);

	globals.font = "Soviet";

	globals.scenes = {};
	globals.currScene;

	globals.canvas = document.getElementById("canvas");
	globals.canvas.width = 640;
	globals.canvas.height = 360;
	globals.canvasCtx = canvas.getContext("2d");

	globals.buffer = document.createElement("canvas");
	globals.buffer.width = globals.screenWidth;
	globals.buffer.height = globals.screenHeight;
	globals.ctx = buffer.getContext("2d");

	globals.debugMode = true;

	globals.debug = {
		backgrounds: false,
		fpsCounter: false,
		hitboxes: true,
		startScene: "stage1",
		mode: "duplicate",
		levelTest: true
	};

	if (globals.debugMode) {
		globals.mode = globals.debug.mode;
	}

})();