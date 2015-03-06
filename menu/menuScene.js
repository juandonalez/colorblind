function MenuScene() {

	var img = new Image();
	img.src = "blue.png";
	this.test = new MenuImage(new Point(300, 300), img);
	this.test.scaleTarget = 0.5;

	this.update = function() {

		this.test.update();

	}

	this.draw = function() {

		this.test.draw();

	}

}