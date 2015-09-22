function SplashScreen(name) {

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

SplashScreen.prototype.update = function() {

	for (var m in this.menus) {
		this.menus[m].update();
	}

}

SplashScreen.prototype.draw = function() {

	globals.bufferCtx.clearRect(0, 0, globals.gameWidth, globals.gameHeight);

	for (var m in this.menus) {
		this.menus[m].draw();
	}

	globals.gpCtx.drawImage(globals.buffer, 0, 0, camera.width, camera.height, 
				0, 0, globals.gpWidth, globals.gpHeight);

	globals.tvCtx.drawImage(globals.buffer, 0, 0, camera.width, camera.height, 
				0, 0, globals.tvWidth, globals.tvHeight);

}

SplashScreen.prototype.changeMenu = function(curr, next) {

	this.menus[curr].deactivate();
	this.menus[next].activate();

}

SplashScreen.prototype.activate = function() {

	

}