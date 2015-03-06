function MenuScene() {

	var img = new Image();
	img.src = "blue.png";
	this.test = new MenuImage(new Point(100, 300), img);
	this.test.easer.ease(this.test.center.x, 500, 1);

	this.update = function() {

		this.test.update();

	}

	this.draw = function() {

		this.test.draw();

	}

}