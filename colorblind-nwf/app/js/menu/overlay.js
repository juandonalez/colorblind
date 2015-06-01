function Overlay(menu, d) {

	this.menu = menu;
	this.components = [];
	this.menuItems = {};

	this.activePos = camera.pctToPoint(d.activePos);
	this.activePos = this.activePos.subtract(camera.origin);
	this.inactivePos = camera.pctToPoint(d.inactivePos);
	this.inactivePos = this.inactivePos.subtract(camera.origin);
	this.activeHeight = camera.pctToHeight(d.height);
	this.inactiveHeight = this.activeHeight*d.inactiveScale;
	this.width = camera.pctToWidth(d.width);
	this.activeAlpha = d.activeAlpha;
	this.inactiveAlpha = d.inactiveAlpha;

	if (d.color) {
		this.color = d.color;
	}

	if (this.menu.active) {
		this.center = this.activePos.copy();
		this.height = this.activeHeight;
		this.alpha = this.activeAlpha;
	}
	else {
		this.center = this.inactivePos.copy();
		this.height = this.inactiveHeight;
		this.width *= d.inactiveScale;
		this.alpha = this.inactiveAlpha;
	}

	this.origin = this.calculateOrigin();
	this.menuItems = [];

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
	this.components.push(this.easer);
	this.fader = new Fader(this);
	this.components.push(this.fader);
	this.scaler = new Scaler(this);
	this.components.push(this.scaler);

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
		globals.bufferCtx.fillRect(this.origin.x, this.origin.y, this.width, this.height);
	}

	for (var m in this.menuItems) {
		this.menuItems[m].draw();
	}

}

Overlay.prototype.activate = function () {

	this.easer.start("easeOutBack", this.activePos, 1);
	this.fader.start(this.activeAlpha, 1);
	this.scaler.start("easeOutBack", this.activeHeight, 1);

}

Overlay.prototype.calculateOrigin = GameObject.prototype.calculateOrigin;

Overlay.prototype.deactivate = function () {

	this.easer.start("easeInBack", this.inactivePos, 1);
	this.fader.start(this.inactiveAlpha, 1);
	this.scaler.start("easeInBack", this.inactiveHeight, 1);

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