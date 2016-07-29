var utilities = utilities || {};

(function() {

	utilities.idTracker = 0;

	utilities.createObject = function(go) {

		if (go.name === "movingPlatform") {
			return new MovingPlatform(go.x, go.y, parseInt(go.properties.velX), parseInt(go.properties.velY));
		}

		if (go.name === "oneWayPlatform") {
			return new OneWayPlatform(go.x, go.y, go.width, go.height);
		}

		if (go.name === "platform") {
			return new Platform(go.x, go.y, go.width, go.height);
		}

		if (go.name === "waypoint") {
			return new Waypoint(go.x, go.y, go.width, go.height);
		}

	}

	utilities.getNewID = function() {

		utilities.idTracker++;
		return utilities.idTracker;

	}

})();