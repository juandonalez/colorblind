var sceneData = sceneData || {};

(function() {

	sceneData.mainMenu = {

		"startingItem":	0,

		"style": {
			"title": {
				"fontSize": 100,
				"lineWidth": 2,
				"strokeStyle": "#ffffff",
				"fillStyle": "#000000"
			},
			"option": {
				"fontSize": 50,
				"lineWidth": 1,
				"strokeStyle": "#000000",
				"fillStyle": "#ffffff"
			}
		},

		"overlays": [
			{
				"activePos": new Point(30, 50),
				"inactivePos": new Point(-30, 50),
				"width": 40,
				"height": 100,
				"active": true,
				"menuItems": [
					{
						"type": "title",
						"center": new Point(50, 50),
						"text": "Color Blind",
						"selectable": false
					}
				]
			},
			{
				"activePos": new Point(65, 15),
				"inactivePos": new Point(65, -25),
				"width": 50,
				"height": 30,
				"active": true,
				"menuItems": [
					{
						"type": "title",
						"center": new Point(50, 50),
						"text": "Color Blind",
						"selectable": false
					}
				]
			},
			{
				"activePos": new Point(65, 65),
				"inactivePos": new Point(135, 65),
				"width": 50,
				"height": 70,
				"active": true,
				"menuItems": [
					{
						"type": "option",
						"center": new Point(50, 10),
						"text": "One Player",
						"selectable": true,
						"target": 1,
						"links": [false, 3, false, 1]
					},
					{
						"type": "option",
						"center": new Point(50, 30),
						"text": "Two Players",
						"selectable": true,
						"target": 1,
						"links": [false, 0, false, 2]
					},
					{
						"type": "option",
						"center": new Point(50, 50),
						"text": "Leaderboards",
						"selectable": true,
						"target": 1,
						"links": [false, 1, false, 3]
					},
					{
						"type": "option",
						"center": new Point(50, 70),
						"text": "Quit",
						"selectable": true,
						"target": 1,
						"links": [false, 2, false, 0]
					}
				]
			}
		]

	};

})();