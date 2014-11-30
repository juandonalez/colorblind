!function() {

var displayManager = nwf.display.DisplayManager.getInstance();
var gpDisplay = displayManager.getGamePadDisplay();
var tvDisplay = displayManager.getTVDisplay();
var gpCtx = gpDisplay.getContext2D();
var tvCtx = tvDisplay.getContext2D();

function init() {}

init();

function update() {



}

function drawGP() {

	gpCtx.clearRect(0, 0, gpDisplay.width, gpDisplay.height);

	gpDisplay.paintContext2D();

}

function drawTV() {

	tvCtx.clearRect(0, 0, tvDisplay.width, tvDisplay.height);

	tvDisplay.paintContext2D();

}

function loop() {

	update();
	drawGP();
	drawTV();
	window.webkitRequestAnimationFrame(loop);

}

loop();

}();