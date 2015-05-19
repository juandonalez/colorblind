var camera = camera || {};

(function() {

	camera.origin = new Point(20, 20);
	camera.width = 1280;
	camera.height = 720;
	camera.center = new Point(camera.width/2, camera.height/2);
	camera.center = camera.center.add(camera.origin);
	camera.alpha = 1;

	camera.fader = new Fader(camera);

	camera.update = function() {

		camera.fader.update();

	}

	camera.draw = function() {

		if (camera.alpha !== 0) {
			globals.bufferCtx.globalAlpha = camera.alpha;
			globals.bufferCtx.fillStyle = "black";
			globals.bufferCtx.fillRect(0, 0, camera.width, camera.height);
		}

	}

	camera.fadeIn = function() {

		camera.fader.start(0, 1);

	}

	camera.fadeOut = function() {

		camera.fader.start(1, 1);

	}

	camera.pctToHeight = function(h) {

		return (camera.height/100) * h;

	}

	camera.pctToPoint = GameObject.prototype.pctToPoint;

	camera.pctToWidth = function(w) {

		return (camera.width/100) * w;

	}

	camera.setAlpha = GameObject.prototype.setAlpha;

	camera.translate = GameObject.prototype.translate;

})();