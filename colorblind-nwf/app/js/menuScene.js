function MenuScene(name) {

	this.name = name;
	this.menus = [new Menu()];
	this.currMenu = 0;

	var overlays = sceneData[this.name].overlays;

	for (var i = 0; i < overlays.length; i++) {
		this.menus[0].overlays.push(new Overlay(overlays[i]));
	}

	//this.currentItems = this.menus[this.currMenu].menuItems;

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