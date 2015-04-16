var camera = camera || {};

(function() {

	camera.origin = new Point(20, 20);
	camera.width = 1280;
	camera.height = 720;
	camera.center = new Point(camera.width/2, camera.height/2);
	camera.center = camera.center.add(camera.origin);

	camera.pctToHeight = function(h) {

		return (camera.height/100) * h;

	}

	camera.pctToPoint = Entity.prototype.pctToPoint;

	camera.pctToWidth = function(w) {

		return (camera.width/100) * w;

	}

})();