MenuScene.prototype = new Scene();
MenuScene.constructor = MenuScene;

function MenuScene(name) {

	this.name = name;

	var data = sceneData[this.name];

	if (data.menus) {
		this.menus = {};
		for (var i = 0; i < data.menus.length; i++) {
			this.menus[data.menus[i].name] = new Menu(data.menus[i]);
		}
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

	globals.gpCtx.drawImage(globals.buffer, 0, 0, globals.screenWidth, globals.screenHeight, 
		0, 0, globals.gpWidth, globals.gpHeight);
	globals.tvCtx.drawImage(globals.buffer, 0, 0, globals.screenWidth, globals.screenHeight,
		0, 0, globals.tvWidth, globals.tvHeight);

}