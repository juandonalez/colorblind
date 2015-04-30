var globals = globals || {};

(function() {

	globals.gpHeight = 480;
	globals.gpWidth = 854;
	globals.tvHeight = 720;
	globals.tvWidth = (globals.tvHeight/9)*16;
	globals.bufferHeight = 720;
	globals.bufferWidth = (globals.bufferHeight/9)*16;

	/*var displayManager = nwf.display.DisplayManager.getInstance();
	globals.gpDisplay = displayManager.getGamePadDisplay();
	globals.tvDisplay = displayManager.getTVDisplay();*/

	globals.gpCanvas = window.document.getElementById('gpCanvas');
	globals.gpCanvas.width = globals.gpWidth;
	globals.gpCanvas.height = globals.gpHeight;
	globals.gpCtx = globals.gpCanvas.getContext('2d');

	/*globals.tvCanvas = globals.tvDisplay.window.document.getElementById('tvCanvas');
	globals.tvCanvas.width = globals.tvWidth;
	globals.tvCanvas.height = globals.tvHeight;
	globals.tvCtx = globals.tvCanvas.getContext('2d');*/

	globals.buffer = document.createElement("canvas");
	globals.bufferCtx = globals.buffer.getContext("2d");
	globals.buffer.width = globals.bufferWidth;
	globals.buffer.height = globals.bufferHeight;

	globals.internalHeight = 760;
	globals.tileSize = 20;
	globals.numTilesHori = 66;
	globals.numTilesVert = 38;

	globals.delta = 0;

	globals.playerWidth = 80;
	globals.playerHeight = 140;

})();