var cameraManager = cameraManager || {};

(function() {

	cameraManager.cameras = [new Camera(0, 0), new Camera(0, 0), new Camera(0, 0), new Camera(globals.tileSize, globals.tileSize)];

	cameraManager.background0 = cameraManager.cameras[0];
	cameraManager.background1 = cameraManager.cameras[1];
	cameraManager.background2 = cameraManager.cameras[2];
	cameraManager.foreground = cameraManager.cameras[3];

	cameraManager.speedIncrement = 1;

	cameraManager.update = function() {

		for (var i = 0; i < cameraManager.cameras.length; i++) {
			cameraManager.cameras[i].update();
		}

	}

	cameraManager.draw = function() {

		cameraManager.foreground.draw();

	}

	cameraManager.decreaseSpeed = function() {

		cameraManager.background1.vel.x -= cameraManager.speedIncrement/4;
		cameraManager.background2.vel.x -= cameraManager.speedIncrement/2;
		cameraManager.foreground.vel.x -= cameraManager.speedIncrement;

	}

	cameraManager.increaseSpeed = function() {

		cameraManager.background1.vel.x += cameraManager.speedIncrement/4;
		cameraManager.background2.vel.x += cameraManager.speedIncrement/2;
		cameraManager.foreground.vel.x += cameraManager.speedIncrement;

	}

	cameraManager.setSpeed = function(s) {

		cameraManager.background0.vel.x = 0;
		cameraManager.background1.vel.x = s/4;
		cameraManager.background2.vel.x = s/2;
		cameraManager.foreground.vel.x = s;

	}

})();