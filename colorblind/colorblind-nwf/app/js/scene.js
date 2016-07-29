function Scene(name) {

	this.name = name;

}

Scene.prototype.activate = function() {}

Scene.prototype.changeMenu = function(curr, next) {

	this.menus[curr].deactivate();
	this.menus[next].activate();

}

Scene.prototype.deactivate = function() {}

Scene.prototype.draw = function() {}

Scene.prototype.pause = function() {}

Scene.prototype.resume = function() {}

Scene.prototype.start = function() {}

Scene.prototype.update = function() {}