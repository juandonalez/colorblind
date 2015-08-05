var camera = camera || {};

(function() {

	camera.origin = new Point(20, 20);
	camera.width = 1280;
	camera.height = 720;
	camera.center = new Point(camera.width/2, camera.height/2);
	camera.center = camera.center.add(camera.origin);
	camera.alpha = 1;

	camera.isShaking = false;
	camera.shakeTime = 0;

	camera.gpWidth = camera.width;
	camera.gpHeight = camera.height;

	if (globals.isWide) {
		camera.tvWidth = camera.width;
		camera.tvHeight = camera.height;
	}
	else {
		camera.tvHeight = camera.height;
		camera.tvWidth = (camera.tvHeight/3) * 4;
	}

	camera.fader = new Fader(camera);

	camera.update = function() {

		camera.fader.update();

		if (camera.isShaking) {
			camera.shake();
		}

	}

	camera.draw = function() {

		if (camera.alpha !== 0) {
			globals.bufferCtx.globalAlpha = camera.alpha;
			globals.bufferCtx.fillStyle = "black";
			globals.bufferCtx.fillRect(0, 0, globals.gameWidth, globals.gameHeight);
			globals.gpCtx.drawImage(globals.buffer, 0, 0, globals.gpWidth, globals.gpHeight);
			globals.tvCtx.drawImage(globals.buffer, 0, 0, globals.tvWidth, globals.tvHeight);
		}

	}

	camera.fadeIn = function() {

		camera.fader.activate(0, 1);

	}

	camera.fadeOut = function() {

		camera.fader.activate(1, 1);

	}

	camera.pctToHeight = function(h) {

		return Math.round((camera.height/100) * h);

	}

	camera.pctToPoint = function(p) {

		return new Point(Math.round((this.width/100) * p.x), Math.round((this.height/100) * p.y));

	}

	camera.pctToWidth = function(w) {

		return Math.round((camera.width/100) * w);

	}

	camera.shake = function() {

		if (!camera.isShaking) {
			camera.isShaking = true;
			camera.shakeTime = 0;
		}

		camera.shakeTime += globals.delta;

		if (camera.shakeTime >= 0.5) {
			camera.isShaking = false;
			camera.origin.y = 20;
		}
		else {
			camera.origin.y = 20 + (Math.floor(Math.random() * 40) - 20);
		}

	}

	camera.activate = Entity.prototype.activate;

	camera.calculateCenter = Entity.prototype.calculateCenter;

	camera.calculateOrigin = Entity.prototype.calculateOrigin;

	camera.deactivate = Entity.prototype.deactivate;

	camera.intersects = Entity.prototype.intersects;

	camera.resize = Entity.prototype.resize;

	camera.setAlpha = Entity.prototype.setAlpha;

	camera.setCenter = Entity.prototype.setCenter;

	camera.setOrigin = Entity.prototype.setOrigin;

	camera.translate = Entity.prototype.translate;

})();