function Overlay(menu, d) {

	this.menu = menu;
	this.menuItems = {};

	this.active = d.active;
	this.activePos = camera.pctToPoint(d.activePos);
	this.activePos = this.activePos.subtract(camera.origin);
	this.inactivePos = camera.pctToPoint(d.inactivePos);
	this.inactivePos = this.inactivePos.subtract(camera.origin);
	this.activeHeight = camera.pctToHeight(d.activeHeight);
	this.inactiveHeight = camera.pctToHeight(d.inactiveHeight);
	this.activeAlpha = d.activeAlpha;
	this.inactiveAlpha = d.inactiveAlpha;

	if (this.active) {
		this.center = this.activePos.copy();
		this.height = this.activeHeight;
		this.alpha = this.activeAlpha;
	}
	else {
		this.center = this.inactivePos.copy();
		this.height = this.inactiveHeight;
		this.alpha = this.inactiveAlpha;
	}

	this.width = camera.pctToWidth(d.width);
	this.origin = this.calculateOrigin();
	this.menuItems = [];

	for (var i = 0; i < d.menuItems.length; i++) {
		// use pctToPoint to get the pos of menu item relative to this overlay
		var itemData = d.menuItems[i];
		itemData.center = this.pctToPoint(itemData.center);
		var m;
		if (itemData.text) {
			m = new MenuText(itemData);
		}
		else {
			m = new MenuImage(itemData);
		}
		// push to this overlay so they will be part of it's update/draw loop
		this.menuItems[m.name] = m;
		// push to the menu so menu item can reference items on other overlays
		this.menu.menuItems[m.name] = m;
	}

	this.easer = new Easer(this);
	this.scaler = new Scaler(this);
	this.fader = new Fader(this);

}

Overlay.prototype.update = function() {

	this.easer.update();
	this.scaler.update();
	this.fader.update();

	for (var m in this.menuItems) {
		this.menuItems[m].update();
	}

}

Overlay.prototype.draw = function() {

	globals.bufferCtx.globalAlpha = this.alpha;
	globals.bufferCtx.fillStyle = "blue";
	globals.bufferCtx.fillRect(this.origin.x, this.origin.y, this.width, this.height);

	for (var m in this.menuItems) {
		this.menuItems[m].draw();
	}

}

Overlay.prototype.activate = function () {

	this.easer.start("easeOutBack", this.activePos, 1);

}

Overlay.prototype.calculateOrigin = GameObject.prototype.calculateOrigin;

Overlay.prototype.deactivate = function () {

	//this.easer.start("easeInBack", this.inactivePos, 1);
	//this.fader.start(0.1, 1);
	//this.scaler.start("easeInBack", 0.5, 1);
	camera.fadeOut();

}

Overlay.prototype.pctToPoint = GameObject.prototype.pctToPoint;

Overlay.prototype.resize = function(scale) {

	this.width *= scale;
	this.height *= scale;
	this.origin = this.calculateOrigin();

	for (var m in this.menuItems) {
		this.menuItems[m].resize(scale);
	}

}

Overlay.prototype.setAlpha = function(a) {

	if (this.alpha) {
		this.alpha = a;
	}

	for (var m in this.menuItems) {
		if (this.menuItems[m].alpha) {
			this.menuItems[m].alpha = a;
		}
	}

}

Overlay.prototype.setCenter = GameObject.prototype.setCenter;

Overlay.prototype.translate = function(p) {

	this.center = this.center.add(p);
	this.origin = this.calculateOrigin();

	for (var m in this.menuItems) {
		this.menuItems[m].translate(p);
	}

}