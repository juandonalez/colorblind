function PlatformCollider(entity, x, y, width, height) {

	this.tag = 'PlatformCollider';
	this.entity = entity;

	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	this.onHorizontalCollision = function(obj) {

		

	}

	this.onVerticalCollision = function(obj) {

		if (obj.y < this.y) {
			if (obj.state) {
				if (obj.state === 'jumping') {
					obj.state = 'grounded';
				}
			}
			obj.y = this.y - obj.height;
		}
		else {
			
		}

	}

}