Overlay.prototype = new GameObject();
Overlay.constructor = Overlay;

function Overlay(menu, d) {

	this.menu = menu;

	var camera = cameraManager.foreground;

	this.activePos = camera.pctToPoint(d.activePos);
	this.inactivePos = camera.pctToPoint(d.inactivePos);
	this.activeHeight = camera.pctToHeight(d.height);
	this.inactiveHeight = this.activeHeight*d.inactiveScale;
	this.width = camera.pctToWidth(d.width);
	this.activeAlpha = d.activeAlpha;
	this.inactiveAlpha = d.inactiveAlpha;

	this.x = 0;
	this.y = 0;
	this.center = new Point(0, 0);
	this.max = new Point(0, 0);

	if (d.color) {
		this.color = d.color;
	}

	if (this.menu.active) {
		this.center.x = this.activePos.x;
		this.center.y = this.activePos.y;
		this.height = this.activeHeight;
		this.alpha = this.activeAlpha;
	}
	else {
		this.center.x = this.inactivePos.x;
		this.center.y = this.inactivePos.y;
		this.height = this.inactiveHeight;
		this.width *= d.inactiveScale;
		this.alpha = this.inactiveAlpha;
	}

	this.updateBounds();

	this.menuItems = {};

	for (var i = 0; i < d.menuItems.length; i++) {
		// use pctToPoint to get the pos of menu item relative to this overlay
		var itemData = d.menuItems[i];
		itemData.center = this.pctToPoint(itemData.center);
		var m;
		if (itemData.text) {
			m = new MenuText(itemData, menu);
		}
		else {
			m = new MenuImage(itemData, this, menu);
		}

		// push to this overlay so they will be part of it's update/draw loop
		this.menuItems[m.name] = m;
		// push to the menu so menu item can reference items on other overlays
		this.menu.menuItems[m.name] = m;
	}

	this.easer = new Easer(this);
	this.fader = new Fader(this);
	this.scaler = new Scaler(this);

	this.components = new Array(3);
	this.components[0] = this.easer;
	this.components[1] = this.fader;
	this.components[2] = this.scaler;

	d = null;

}

Overlay.prototype.update = function() {

	for (var i = 0; i < this.components.length; i++) {
		this.components[i].update();
	}

	for (var m in this.menuItems) {
		this.menuItems[m].update();
	}

}

Overlay.prototype.draw = function() {

	if (this.color) {
		globals.bufferCtx.globalAlpha = this.alpha;
		globals.bufferCtx.fillStyle = this.color;
		globals.bufferCtx.fillRect(this.x, this.y, this.width, this.height);
	}

	for (var m in this.menuItems) {
		this.menuItems[m].draw();
	}

}

Overlay.prototype.activate = function () {

	this.easer.start("easeOutBack", this.activePos.x, this.activePos.y, 1);
	this.fader.start(this.activeAlpha, 1);
	this.scaler.start("easeOutBack", this.activeHeight, 1);

}

Overlay.prototype.deactivate = function () {

	this.easer.start("easeInBack", this.inactivePos.x, this.inactivePos.y, 1);
	this.fader.start(this.inactiveAlpha, 1);
	this.scaler.start("easeInBack", this.inactiveHeight, 1);

}

Overlay.prototype.resize = function(s) {

	this.width = Math.round(this.width*s);
	this.height = Math.round(this.height*s);
	this.updateBounds();

	for (var m in this.menuItems) {
		this.menuItems[m].resize(s);
	}

}

Overlay.prototype.setAlpha = function(a) {

	if (this.alpha) {
		this.alpha = a;
	}

	for (var m in this.menuItems) {
		if (this.menuItems[m].alpha) {
			this.menuItems[m].setAlpha(a);
		}
	}

}

Overlay.prototype.translate = function(x, y) {

	this.center.x += x;
	this.center.y += y;
	this.updateBounds();

	for (var m in this.menuItems) {
		this.menuItems[m].translate(x, y);
	}

}

Overlay.prototype.updateBounds = function() {

	this.x = this.center.x - (this.width/2);
	this.y = this.center.y - (this.height/2);
	this.max.x = this.x + this.width;
	this.max.y = this.y + this.height;

}