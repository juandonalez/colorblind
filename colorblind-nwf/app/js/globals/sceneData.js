var sceneData = sceneData || {};

(function() {

	sceneData = {

		totalNumImages: 257,

		imageNames: [
			"splashScreen"
		],

		splashScreen: {

			numLevels: 0,
			tilesetSize: 0,
			numTop: 0,
			numMiddle: 0,
			numBottom: 0,

			menus: [
				{
					name: "splashScreen",
					overlays: [
						{
							activePos: new Point(50, 50),
							inactivePos: new Point(50, 50),
							activeHeight: 100,
							inactiveHeight: 100,
							activeAlpha: 1,
							inactiveAlpha: 1,
							width: 100,
							active: true,
							menuItems: [
								{
									name: "splashScreen",
									center: new Point(50, 50),
									image: "splashScreen",
									selectable: false
								}
							]
						}
					]
				}
			]

		},

		mainMenu: {

			numLevels: 4,
			tilesetSize: 53,
			numTop: 4,
			numMiddle: 4,
			numBottom: 0,

			menus: [
				{
					name: "main",
					overlays: [
						{
							activePos: new Point(30, 50),
							inactivePos: new Point(-30, 50),
							activeHeight: 100,
							inactiveHeight: 100,
							activeAlpha: 1,
							inactiveAlpha: 1,
							width: 40,
							active: true,
							menuItems: [
								{
									name: "placeholderTitle",
									center: new Point(50, 50),
									text: "Color Blind",
									fontSize: 100,
									lineWidth: 2,
									strokeStyle: "#ffffff",
									fillStyle: "#000000",
									selectable: false
								}
							]
						},
						{
							activePos: new Point(65, 15),
							inactivePos: new Point(65, -25),
							activeHeight: 30,
							inactiveHeight: 30,
							activeAlpha: 1,
							inactiveAlpha: 1,
							width: 50,
							active: true,
							menuItems: [
								{
									name: "title",
									center: new Point(50, 50),
									text: "Color Blind",
									fontSize: 100,
									lineWidth: 2,
									strokeStyle: "#ffffff",
									fillStyle: "#000000",
									selectable: false
								}
							]
						},
						{
							activePos: new Point(65, 65),
							inactivePos: new Point(135, 65),
							activeHeight: 70,
							inactiveHeight: 70,
							activeAlpha: 1,
							inactiveAlpha: 1,
							width: 50,
							active: true,
							menuItems: [
								{
									name: "onePlayer",
									center: new Point(50, 10),
									text: "One Player",
									fontSize: 50,
									lineWidth: 1,
									strokeStyle: "#000000",
									fillStyle: "#ffffff",
									selectable: true,
									selected: true,
									selectStroke: "#ffffff",
									selectFill: "#00ff00",
									links: [false, "quit", false, "twoPlayers"]
								},
								{
									name: "twoPlayers",
									center: new Point(50, 30),
									text: "Two Players",
									fontSize: 50,
									lineWidth: 1,
									strokeStyle: "#000000",
									fillStyle: "#ffffff",
									selectable: true,
									selected: false,
									selectStroke: "#ffffff",
									selectFill: "#00ff00",
									links: [false, "onePlayer", false, "leaderboards"]
								},
								{
									name: "leaderboards",
									center: new Point(50, 50),
									text: "Leaderboards",
									fontSize: 50,
									lineWidth: 1,
									strokeStyle: "#000000",
									fillStyle: "#ffffff",
									selectable: true,
									selected: false,
									selectStroke: "#ffffff",
									selectFill: "#00ff00",
									links: [false, "twoPlayers", false, "quit"]
								},
								{
									name: "quit",
									center: new Point(50, 70),
									text: "Quit",
									fontSize: 50,
									lineWidth: 1,
									strokeStyle: "#000000",
									fillStyle: "#ffffff",
									selectable: true,
									selected: false,
									selectStroke: "#ffffff",
									selectFill: "#00ff00",
									links: [false, "leaderboards", false, "onePlayer"]
								}
							]
						}
					]
				}
			]
		},

		stage1: {

			numLevels: 4,
			tilesetSize: 53,
			numTop: 4,
			numMiddle: 4,
			numBottom: 4

		},

		stage2: {

			numLevels: 4,
			tilesetSize: 53,
			numTop: 4,
			numMiddle: 4,
			numBottom: 4

		},

		stage3: {

			numLevels: 4,
			tilesetSize: 53,
			numTop: 4,
			numMiddle: 4,
			numBottom: 4

		}

	};

})();