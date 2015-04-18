function MenuScene() {

	/*var img = new Image();
	img.src = "blue.png";
	this.test = new MenuImage(new Point(300, 100), img);
	this.test.easer.ease(this.test.center.y, 500, 1);*/

	this.menus = [new Menu()];
	this.currentMenu = 0;

	globals.currentStyle = sceneData.mainMenu.style;

	var overlays = sceneData.mainMenu.overlays;
	for (var i = 0; i < overlays.length; i++) {
		this.menus[0].overlays.push(new Overlay(overlays[i]));
	}

}

MenuScene.prototype.update = function() {

	for (var i = 0; i < this.menus.length; i++) {
		this.menus[i].update();
	}

}

MenuScene.prototype.draw = function() {

	for (var i = 0; i < this.menus.length; i++) {
		this.menus[i].draw();
	}

}