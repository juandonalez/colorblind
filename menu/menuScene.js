function MenuScene() {

	/*var img = new Image();
	img.src = "blue.png";
	this.test = new MenuImage(new Point(300, 100), img);
	this.test.easer.ease(this.test.center.y, 500, 1);*/

	this.menus = [new Menu()];
	this.currentMenu = 0;

	//this.menus[0].overlays.push(new Overlay(new Point(300, -300), new Point(400, 200), 200, 200, null, null, true));

	for (var i = 0; i < sceneData.mainMenu.overlays.length; i++) {
		var o = sceneData.mainMenu.overlays[i];
		this.menus[0].overlays.push(new Overlay(o.activePos, o.inactivePos, o.width, o.height, o.active));
	}

	this.update = function() {

		for (var i = 0; i < this.menus.length; i++) {
			this.menus[i].update();
		}

	}

	this.draw = function() {

		for (var i = 0; i < this.menus.length; i++) {
			this.menus[i].draw();
		}

	}

}