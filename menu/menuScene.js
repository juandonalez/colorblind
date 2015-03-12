function MenuScene() {

	/*var img = new Image();
	img.src = "blue.png";
	this.test = new MenuImage(new Point(300, 100), img);
	this.test.easer.ease(this.test.center.y, 500, 1);*/

	this.menus = [new Menu()];
	this.currentMenu = 0;

	for (var i = 0; i < sceneData.mainMenu.overlays.length; i++) {
		var o = sceneData.mainMenu.overlays[i];
		var activePos = camera.pctToPoint(o.activePos);
		var inactivePos = camera.pctToPoint(o.inactivePos);
		var width = camera.pctToWidth(o.width);
		var height = camera.pctToHeight(o.height);
		this.menus[0].overlays.push(new Overlay(activePos, inactivePos, width, height, o.active));
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