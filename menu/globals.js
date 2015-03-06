var globals = globals || {};

(function() {

	globals.delta = 0;

	globals.buffer = document.createElement("canvas");
	globals.bufferCtx = globals.buffer.getContext("2d");
	globals.buffer.width = 1280;
	globals.buffer.height = 720;

	globals.tv;
	globals.tvCtx;
	globals.tvAspectRatio;

	globals.font = "Sans-serif";

})();