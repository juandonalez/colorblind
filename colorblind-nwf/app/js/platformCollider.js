function PlatformCollider(gameObject, x, y, width, height) {

	this.tag = "collider";
	this.gameObject = gameObject;

	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	this.init = function() {

		

	}

	this.update = function() {

		

	}

	this.draw = function(ctx) {

		

	}

	this.onCollide = function(obj) {

		// stop object's vertical velocity if above or below
		// stop object's horizontal velocity if to left or right
		// set object to idle if landing on top
		if (obj.state) {
			obj.state = 'idle';
		}

	}

}