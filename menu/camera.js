var camera = camera || {};

(function() {

	camera.x = 20;
	camera.y = 20;
	camera.width = 1280;
	camera.height = 720;
	camera.center = new Point(camera.width/2, camera.height/2);

	camera.pctToWidth = function(w) {

		return (camera.width/100) * w;

	}

	camera.pctToHeight = function(h) {

		return (camera.height/100) * h;

	}

	camera.pctToPoint = function(p) {

		var x = (camera.width/100) * p.x;
		var y = (camera.height/100) * p.y;
		return new Point(x, y);

	}

})();