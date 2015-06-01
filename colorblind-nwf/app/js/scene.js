function Scene(name) {

	this.name = name;
	this.menus = {};

	var data = sceneData[this.name];

	if (data.background) {
		this.background = fileManager.images[data.background];
	}

	if (data.scrollers) {
		this.scrollers = [];
		for (var i = 0; i < data.scrollers.length; i++) {
			this.scrollers.push(new BackgroundScroller(this.name, data.scrollers[i]));
		}
	}

	if (data.menus) {
		for (var i = 0; i < data.menus.length; i++) {
			this.menus[data.menus[i].name] = new Menu(data.menus[i]);
		}
	}

	data = null;

}

Scene.prototype.update = function() {

	if (this.scrollers) {
		for (var i = 0; i < this.scrollers.length; i++) {
			this.scrollers[i].update();
		}
	}

	for (var m in this.menus) {
		this.menus[m].update();
	}

}

Scene.prototype.draw = function() {

	if (this.background) {
		globals.bufferCtx.globalAlpha = 1;
		globals.bufferCtx.drawImage(this.background, -20, -20);
	}

	if (this.scrollers) {
		for (var i = 0; i < this.scrollers.length; i++) {
			this.scrollers[i].draw();
		}
	}

	for (var m in this.menus) {
		this.menus[m].draw();
	}

}

Scene.prototype.changeMenu = function(curr, next) {

	this.menus[curr].deactivate();
	this.menus[next].activate();

}