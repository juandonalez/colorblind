var sceneData = sceneData || {};

(function() {

	sceneData.mainMenu = {

		"startingItem":	0,

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

			false,
			[
				{
					"center": new Point(50, 50),
					"text": "Color Blind",
					"fontSize": 100,
					"lineWidth": 1,
					"strokeStyle": "#000000",
					"fillStyle": "#ffffff"
				}
			],
			[
				{
					"center": new Point(50, 10),
					"text": "One Player",
					"fontSize": 50,
					"lineWidth": 1,
					"strokeStyle": "#000000",
					"fillStyle": "#ffffff",
					"type": "menu",
					"selectable": true,
					"target": 1,
					"links": [3, false, 1, false]
				},
				{
					"center": new Point(50, 30),
					"text": "Two Players",
					"fontSize": 50,
					"lineWidth": 1,
					"strokeStyle": "#000000",
					"fillStyle": "#ffffff",
					"type": "menu",
					"selectable": true,
					"target": 1,
					"links": [0, false, 2, false]
				},
				{
					"center": new Point(50, 50),
					"text": "Leaderboards",
					"fontSize": 50,
					"lineWidth": 1,
					"strokeStyle": "#000000",
					"fillStyle": "#ffffff",
					"type": "menu",
					"selectable": true,
					"target": 1,
					"links": [1, false, 3, false]
				},
				{
					"center": new Point(50, 70),
					"text": "Quit",
					"fontSize": 50,
					"lineWidth": 1,
					"strokeStyle": "#000000",
					"fillStyle": "#ffffff",
					"type": "menu",
					"target": 1,
					"links": [2, false, 0, false]
				}
			]

		]

	};

})();