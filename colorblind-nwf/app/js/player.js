function Player(x, y) {

	this.x = x;
	this.y = y;
	this.width = 80;
	this.height = 140;

	this.gravity = 30;

	this.update = function(colliders) {
	
	

		var newY = this.y + this.gravity;

		/*for (var i = 0; i < colliders.length; i++) {

			var col = colliders[i];
			var vertical = this.checkVertical(col.y, col.height, newY);

		}*/

		//this.y = newY;

	}

	this.draw = function(ctx) {

		ctx.fillStyle = "black";
		ctx.fillRect(this.x, this.y, this.width, this.height);

	}

}