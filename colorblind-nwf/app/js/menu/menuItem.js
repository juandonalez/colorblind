function MenuItem() {}

MenuItem.prototype.update = function() {

	if (this.selected && inputManager.active) {

		if (inputManager.left1) {
			if (this.left) {
				this.menu.changeItem(this.left);
				this.deselect();
			}
		}
		else if (inputManager.up1) {
			if (this.up) {
				this.menu.changeItem(this.up);
				this.deselect();
			}
		}
		else if (inputManager.right1) {
			if (this.right) {
				this.menu.changeItem(this.right);
				this.deselect();
			}
		}
		else if (inputManager.down1) {
			if (this.down) {
				this.menu.changeItem(this.down);
				this.deselect();
			}
		}
		else if (inputManager.confirm1) {
			this.confirm();
		}

	}

	for (var i = 0; i < this.components.length; i++) {
		this.components[i].update();
	}

}

MenuItem.prototype.cancel = function() {

	switch (this.menu.name) {
		case "quit":
			console.log(this.name);
			break;
		case "onePlayer":
			globals.currScene.changeMenu("");
			break;
		case "twoPlayers":
			console.log(this.name);
			break;
		case "duplicate":
			console.log(this.name);
			break;
		case "split":
			console.log(this.name);
			break;
		case "coop":
			console.log(this.name);
			break;
		case "versus":
			console.log(this.name);
			break;
		case "stage1":
			console.log(this.name);
			break;
		case "stage2":
			console.log(this.name);
			break;
		case "stage3":
			console.log(this.name);
			break;
		case "leaderboards":
			console.log(this.name);
			break;
	}

	inputManager.active = false;
	setTimeout(function() {inputManager.active = true;}, 100);

}

MenuItem.prototype.confirm = function() {

	switch (this.name) {
		case "quit":
			console.log(this.name);
			break;
		case "onePlayer":
			globals.currScene.changeMenu(this.menu.name, "onePlayerModes");
			break;
		case "twoPlayers":
			globals.currScene.changeMenu(this.menu.name, "twoPlayerModes");
			break;
		case "duplicate":
			globals.mode = "duplicate";
			globals.currScene.changeMenu(this.menu.name, "stages");
			break;
		case "split":
			globals.mode = "split";
			globals.currScene.changeMenu(this.menu.name, "stages");
			break;
		case "coop":
			globals.mode = "coop";
			globals.currScene.changeMenu(this.menu.name, "stages");
			break;
		case "versus":
			globals.mode = "versus";
			globals.currScene.changeMenu(this.menu.name, "stages");
			break;
		case "stage1":
			main.changeScene("stage1");
			break;
		case "stage2":
			main.changeScene("stage2");
			break;
		case "stage3":
			main.changeScene("stage3");
			break;
		case "leaderboards":
			console.log(this.name);
			break;
	}

	inputManager.active = false;
	setTimeout(function() {inputManager.active = true;}, 100);

}

MenuItem.prototype.deselect = function() {

	this.selected = false;
	this.scaler.activate("easeInBack", this.defaultHeight, 0.25);

}

MenuItem.prototype.select = function() {

	this.selected = true;
	this.scaler.activate("easeInBack", this.selectHeight, 0.25);

	inputManager.active = false;
	setTimeout(function() {inputManager.active = true;}, 150);

}