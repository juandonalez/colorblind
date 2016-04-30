var globals = globals || {};

(function() {

	globals.isWiiU = window.nwf && nwf.system && nwf.system.isWiiU();
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

	if (globals.isWiiU) {
		var displayManager = nwf.display.DisplayManager.getInstance();
		globals.gpDisplay = displayManager.getGamePadDisplay();

		globals.gpHeight = globals.gpDisplay.height;
		globals.gpWidth = globals.gpDisplay.width;

		globals.gpCanvas = globals.gpDisplay.window.document.getElementById('gpCanvas');
		globals.gpBackground0 = globals.gpDisplay.window.document.getElementById('gpBackground0');
		globals.gpBackground1 = globals.gpDisplay.window.document.getElementById('gpBackground1');
		globals.gpBackground2 = globals.gpDisplay.window.document.getElementById('gpBackground2');

		globals.tvDisplay = displayManager.getTVDisplay();

		globals.tvHeight = globals.tvDisplay.height;
		globals.tvWidth = globals.tvDisplay.width;

		globals.tvCanvas = globals.tvDisplay.window.document.getElementById('tvCanvas');
		globals.tvBackground0 = globals.tvDisplay.window.document.getElementById('tvBackground0');
		globals.tvBackground1 = globals.tvDisplay.window.document.getElementById('tvBackground1');
		globals.tvBackground2 = globals.tvDisplay.window.document.getElementById('tvBackground2');
	}
	else {
		globals.gpHeight = 480;
		globals.gpWidth = 854;

		globals.gpCanvas = window.document.getElementById('gpCanvas');
		globals.gpBackground0 = window.document.getElementById('gpBackground0');
		globals.gpBackground1 = window.document.getElementById('gpBackground1');
		globals.gpBackground2 = window.document.getElementById('gpBackground2');

		globals.tvHeight = 1080;
		globals.tvWidth = 1920;

		globals.tvCanvas = document.createElement("canvas");
		globals.tvBackground0 = document.createElement("canvas");
		globals.tvBackground1 = document.createElement("canvas");
		globals.tvBackground2 = document.createElement("canvas");
	}

	// gamepad contexts
	globals.gpCtx = globals.gpCanvas.getContext('2d');
	globals.gpCanvas.height = globals.gpHeight;
	globals.gpCanvas.width = globals.gpWidth;

	globals.gpBackground0Ctx = globals.gpBackground0.getContext("2d");
	globals.gpBackground0.width = globals.gpWidth;
	globals.gpBackground0.height = globals.gpHeight;

	globals.gpBackground1Ctx = globals.gpBackground1.getContext("2d");
	globals.gpBackground1.width = globals.gpWidth;
	globals.gpBackground1.height = globals.gpHeight;

	globals.gpBackground2Ctx = globals.gpBackground2.getContext("2d");
	globals.gpBackground2.width = globals.gpWidth;
	globals.gpBackground2.height = globals.gpHeight;

	// tv contexts
	globals.tvCtx = globals.tvCanvas.getContext('2d');
	globals.tvCanvas.height = globals.tvHeight;
	globals.tvCanvas.width = globals.tvWidth;

	globals.tvBackground0Ctx = globals.tvBackground0.getContext("2d");
	globals.tvBackground0.width = globals.tvWidth;
	globals.tvBackground0.height = globals.tvHeight;

	globals.tvBackground1Ctx = globals.tvBackground1.getContext("2d");
	globals.tvBackground1.width = globals.tvWidth;
	globals.tvBackground1.height = globals.tvHeight;

	globals.tvBackground2Ctx = globals.tvBackground2.getContext("2d");
	globals.tvBackground2.width = globals.tvWidth;
	globals.tvBackground2.height = globals.tvHeight;

	// buffers for backgrounds
	globals.background1Buffer = document.createElement("canvas");
	globals.background1BufferCtx = globals.background1Buffer.getContext("2d");
	globals.background1Buffer.width = globals.screenWidth;
	globals.background1Buffer.height = globals.screenHeight;

	globals.background2Buffer = document.createElement("canvas");
	globals.background2BufferCtx = globals.background2Buffer.getContext("2d");
	globals.background2Buffer.width = globals.screenWidth;
	globals.background2Buffer.height = globals.screenHeight;

	globals.buffer = document.createElement("canvas");
	globals.bufferCtx = globals.buffer.getContext("2d");
	globals.buffer.width = globals.screenWidth;
	globals.buffer.height = globals.screenHeight;

	// if tv is 4:3, then shift tv contexts to the left
	if (globals.tvHeight === 480) {
		globals.tvCtx.translate(globals.tileSize*-4, 0);
		globals.tvBackground0Ctx.translate(globals.tileSize*-4, 0);
		globals.tvBackground1Ctx.translate(globals.tileSize*-4, 0);
		globals.tvBackground2Ctx.translate(globals.tileSize*-4, 0);
	}

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