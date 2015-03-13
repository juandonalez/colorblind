var sceneData = sceneData || {};

(function() {

	sceneData.mainMenu = {

		"overlays": [
			{
				"activePos": new Point(30, 50),
				"inactivePos": new Point(-30, 50),
				"width": 40,
				"height": 100,
				"active": true
			},
			{
				"activePos": new Point(65, 15),
				"inactivePos": new Point(65, -25),
				"width": 50,
				"height": 30,
				"active": true
			},
			{
				"activePos": new Point(65, 65),
				"inactivePos": new Point(135, 65),
				"width": 50,
				"height": 70,
				"active": true
			}
		],

		"images": [

			

		],

		"texts": [

			[
				{
					"center": new Point(50, 50),
					"text": "test",
					"fontSize": 100,
					"lineWidth": 1,
					"strokeStyle": "#000000",
					"fillStyle": "#ffffff"
				}
			],
			false,
			false

		]

	};

})();