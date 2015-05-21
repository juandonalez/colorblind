function MenuScene(name) {

	this.name = name;
	this.menus = {};

	var data = sceneData[this.name].menus;

	for (var i = 0; i < data.length; i++) {
		this.menus[data[i].name] = new Menu(data[i]);
	}

	data = null;

}

MenuScene.prototype.update = function() {

	for (var m in this.menus) {
		this.menus[m].update();
	}

}

MenuScene.prototype.draw = function() {

	for (var m in this.menus) {
		this.menus[m].draw();
	}

}