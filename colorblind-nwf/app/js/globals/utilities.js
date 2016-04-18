var utilities = utilities || {};

(function() {

	utilities.idTracker = 0;

	utilities.getNewID = function() {

		utilities.idTracker++;
		return utilities.idTracker;

	}

})();