function Player(x, y) {

	this.x = x;
	this.y = y;
	this.width = 80;
	this.height = 140;

	this.gravity = 30;

	this.update = function(colliders) {
	
	

		var newY = this.y + this.gravity;

		for (var i = 0; i < colliders.length; i++) {

			var col = colliders[i];
			var vertical = this.checkVertical(col.y, col.height, newY);
			if (vertical) {
				newY = this.y;
			}

		}

		this.y = newY;

	}

	this.checkVertical = function(objectY, objectHeight, playerY) {

		if (playerY > objectY && playerY <= (objectY+objectHeight)) {
			return true;
		}
		else if ((playerY+this.height) > objectY && (playerY+this.height) < (objectY+objectHeight)) {
			return true;
		}
		else if (objectY > playerY && objectY < playerY+this.height) {
			return true;
		}
		else {
			return false;
		}

	}

	this.draw = function(ctx) {

		ctx.fillStyle = "black";
		ctx.fillRect(this.x, this.y, this.width, this.height);

	}

}