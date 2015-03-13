function MenuScene() {

	/*var img = new Image();
	img.src = "blue.png";
	this.test = new MenuImage(new Point(300, 100), img);
	this.test.easer.ease(this.test.center.y, 500, 1);*/

	this.menus = [new Menu()];
	this.currentMenu = 0;

	var overlays = sceneData.mainMenu.overlays;
	var images = sceneData.mainMenu.images;
	var texts = sceneData.mainMenu.texts;

	for (var i = 0; i < overlays.length; i++) {

		var oData = overlays[i];
		var iData = images[i];
		var tData = texts[i];

		var activePos = camera.pctToPoint(oData.activePos);
		var inactivePos = camera.pctToPoint(oData.inactivePos);
		var width = camera.pctToWidth(oData.width);
		var height = camera.pctToHeight(oData.height);

		var o = new Overlay(activePos, inactivePos, width, height, oData.active)

		for (var j = 0; j < tData.length; j++) {
			var t = tData[j];
			if (t) {
				o.addText(new MenuText(t.center, t.text, t.fontSize, t.lineWidth, t.strokeStyle, t.fillStyle));
			}
		}

		this.menus[0].overlays.push(o);

	}

	this.update = function() {

		for (var i = 0; i < this.menus.length; i++) {
			this.menus[i].update();
		}

	}

	this.draw = function() {

		for (var i = 0; i < this.menus.length; i++) {
			this.menus[i].draw();
		}

	}

}