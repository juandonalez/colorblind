function Stage(id) {

	this.id = id;
	this.offset = 0;
	this.farScroller = new Scroller(0, id, 'f', 0.25);
	this.midScroller = new Scroller(200, id, 'm', 0.25);
	this.level = new Level();

	this.init = function() {

		this.farScroller.init();
		this.midScroller.init();
		this.level.init("levels/2.json");

	}

	this.begin = function() {}

	this.end = function() {}

	this.update = function() {

		this.farScroller.update();
		this.midScroller.update();

	}

	this.draw = function(layer, ctx) {

		this.farScroller.draw(ctx);
		this.midScroller.draw(ctx);

	}

}