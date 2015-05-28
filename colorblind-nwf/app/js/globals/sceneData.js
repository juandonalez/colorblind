var sceneData = sceneData || {};

(function() {

	sceneData = {

		totalNumImages: 264,

		imageNames: [
			"splashScreen",
			"/menus/coop",
			"/menus/duplicate",
			"/menus/split",
			"/menus/stage1",
			"/menus/stage2",
			"/menus/stage3",
			"/menus/versus"
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
					active: true,
					overlays: [
						{
							activePos: new Point(50, 50),
							inactivePos: new Point(50, 50),
							activeHeight: 100,
							inactiveHeight: 100,
							activeAlpha: 1,
							inactiveAlpha: 1,
							width: 100,
							color: false,
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
					active: true,
					overlays: [
						{
							activePos: new Point(50, 50),
							inactivePos: new Point(50, 50),
							activeHeight: 100,
							inactiveHeight: 100,
							activeAlpha: 0.5,
							inactiveAlpha: 0.5,
							width: 100,
							color: "#999999",
							menuItems: false
						},
						{
							activePos: new Point(50, 20),
							inactivePos: new Point(50, -25),
							activeHeight: 40,
							inactiveHeight: 40,
							activeAlpha: 1,
							inactiveAlpha: 1,
							width: 75,
							color: false,
							menuItems: [
								{
									name: "title",
									center: new Point(50, 50),
									text: "Color Blind",
									fontSize: 120,
									lineWidth: 20,
									strokeStyle: "#000000",
									fillStyle: "yellow",
									selectable: false
								}
							]
						},
						{
							activePos: new Point(50, 70),
							inactivePos: new Point(140, 70),
							activeHeight: 60,
							inactiveHeight: 60,
							activeAlpha: 1,
							inactiveAlpha: 1,
							width: 75,
							color: false,
							menuItems: [
								{
									name: "onePlayer",
									center: new Point(50, 10),
									text: "One Player",
									fontSize: 40,
									lineWidth: 4,
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
									fontSize: 40,
									lineWidth: 4,
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
									fontSize: 40,
									lineWidth: 4,
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
									fontSize: 40,
									lineWidth: 4,
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
				},
				{
					name: "onePlayerModes",
					active: false,
					overlays: [
						{
							activePos: new Point(50, 47),
							inactivePos: new Point(50, 135),
							activeHeight: 35,
							inactiveHeight: 35,
							activeAlpha: 1,
							inactiveAlpha: 1,
							width: 75,
							color: false,
							menuItems: [
								{
									name: "duplicate",
									center: new Point(30, 50),
									image: "/menus/duplicate",
									selectable: true,
									selected: true,
									links: ["split", false, "split", false],
									menuText: {
										name: "duplicateText",
										center: new Point(10, 10),
										text: "Color Blind",
										fontSize: 120,
										lineWidth: 20,
										strokeStyle: "#000000",
										fillStyle: "yellow",
										selectable: false
									}
								},
								{
									name: "split",
									center: new Point(70, 50),
									image: "/menus/split",
									selectable: true,
									selected: false,
									links: ["duplicate", false, "duplicate", false]
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