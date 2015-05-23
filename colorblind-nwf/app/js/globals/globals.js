var globals = globals || {};

(function() {

	globals.isWiiU = window.nwf && nwf.system && nwf.system.isWiiU();
	window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;

	globals.debugMode = false;

	globals.debug = {
		backgrounds: false,
		fpsCounter: true,
		hitboxes: false,
		startScene: "mainMenu"
	};

	globals.delta = 0;

	globals.scenes = {};
	globals.currScene = "splashScreen";

	if (globals.isWiiU) {
		var displayManager = nwf.display.DisplayManager.getInstance();

		globals.gpDisplay = displayManager.getGamePadDisplay();
		globals.gpHeight = globals.gpDisplay.height;
		globals.gpWidth = Math.ceil((globals.gpHeight/9)*16);
		globals.gpCanvas = globals.gpDisplay.window.document.getElementById('gpCanvas');
		globals.gpCanvas.height = globals.gpHeight;
		globals.gpCanvas.width = globals.gpWidth;
		globals.gpCtx = globals.gpCanvas.getContext('2d');

		globals.tvDisplay = displayManager.getTVDisplay();
		globals.tvHeight = globals.tvDisplay.height;
		globals.tvWidth = globals.tvDisplay.width;

		// if tv is 4:3 aspect ratio we shift everything to the left
		if (globals.tvDisplay.height === 480) {
			globals.tvOffset = -107;
		}
		else {
			globals.tvOffset = 0;
		}

		globals.tvCanvas = globals.tvDisplay.window.document.getElementById('tvCanvas');
		globals.tvCanvas.height = globals.tvHeight;
		globals.tvCanvas.width = globals.tvWidth;
		globals.tvCtx = globals.tvCanvas.getContext('2d');
	}
	else {
		globals.gpHeight = 480;
		globals.gpWidth = 854;
		globals.gpCanvas = window.document.getElementById('gpCanvas');
		globals.gpCanvas.width = globals.gpWidth;
		globals.gpCanvas.height = globals.gpHeight;
		globals.gpCtx = globals.gpCanvas.getContext('2d');
	}

	globals.bufferHeight = 720;
	globals.bufferWidth = (globals.bufferHeight/9)*16;
	globals.buffer = document.createElement("canvas");
	globals.bufferCtx = globals.buffer.getContext("2d");
	globals.buffer.width = globals.bufferWidth;
	globals.buffer.height = globals.bufferHeight;

	globals.font = "sovietBoxBold";

	globals.internalHeight = 760;
	globals.tileSize = 20;
	globals.numTilesHori = 66;
	globals.numTilesVert = 38;

	globals.playerWidth = 80;
	globals.playerHeight = 140;

})();