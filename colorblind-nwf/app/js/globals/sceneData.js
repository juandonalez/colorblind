var sceneData = sceneData || {};

(function() {

	sceneData = {

		totalNumImages: 288,

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

			background: "splashScreen",
			numLevels: 0,
			numAllModes: 0,
			tilesetSize: 0,
			numTop: 0,
			numMiddle: 0,
			numBottom: 0,
			startPos: new Point(-500, -500)

		},

		mainMenu: {

			numLevels: 4,
			numAllModes: 4,
			tilesetSize: 53,
			numTop: 4,
			numMiddle: 4,
			numBottom: 0,
			startPos: new Point(-500, -500),

			scrollers: [
				{
					name: "top",
					y: 0,
					speed: 100
				},
				{
					name: "mid",
					y: 360,
					speed: 200
				}
			],

			menus: [
				{
					name: "main",
					active: true,
					overlays: [
						{
							activePos: new Point(50, 50),
							inactivePos: new Point(50, 50),
							height: 100,
							width: 100,
							inactiveScale: 1,
							activeAlpha: 0.5,
							inactiveAlpha: 0.5,
							color: "#999999",
							menuItems: false
						},
						{
							activePos: new Point(50, 20),
							inactivePos: new Point(50, -25),
							height: 40,
							width: 75,
							inactiveScale: 1,
							activeAlpha: 1,
							inactiveAlpha: 1,
							color: false,
							menuItems: [
								{
									name: "title",
									center: new Point(50, 50),
									text: "Color Blind",
									fontSize: 120,
									lineWidth: 10,
									strokeStyle: "#000000",
									fillStyle: "yellow",
									selectable: false
								}
							]
						},
						{
							activePos: new Point(50, 70),
							inactivePos: new Point(140, 70),
							height: 60,
							width: 60,
							inactiveScale: 1,
							activeAlpha: 1,
							inactiveAlpha: 1,
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
									selectFill: "#000000",
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
									selectFill: "#000000",
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
									selectFill: "#000000",
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
									selectFill: "#000000",
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
							activePos: new Point(20, 7.5),
							inactivePos: new Point(20, 7.5),
							height: 15,
							width: 15,
							inactiveScale: 0.5,
							activeAlpha: 1,
							inactiveAlpha: 0.1,
							color: "blue",
							menuItems: []
						},
						{
							activePos: new Point(50, 15),
							inactivePos: new Point(50, 115),
							height: 30,
							width: 75,
							inactiveScale: 1,
							activeAlpha: 1,
							inactiveAlpha: 1,
							color: false,
							menuItems: [
								{
									name: "selectMode",
									center: new Point(50, 50),
									text: "Select Mode",
									fontSize: 60,
									lineWidth: 6,
									strokeStyle: "#000000",
									fillStyle: "yellow",
									selectable: false
								}
							]
						},
						{
							activePos: new Point(50, 65),
							inactivePos: new Point(50, 135),
							height: 70,
							width: 75,
							inactiveScale: 1,
							activeAlpha: 1,
							inactiveAlpha: 1,
							color: false,
							menuItems: [
								{
									name: "duplicate",
									center: new Point(30, 25),
									image: "/menus/duplicate",
									selectable: true,
									selected: true,
									links: ["split", false, "split", false],
									menuText: {
										name: "duplicateText",
										center: new Point(50, 75),
										text: "duplicate",
										fontSize: 40,
										lineWidth: 4,
										strokeStyle: "#000000",
										fillStyle: "#ffffff",
										selectable: false
									}
								},
								{
									name: "split",
									center: new Point(70, 25),
									image: "/menus/split",
									selectable: true,
									selected: false,
									links: ["duplicate", false, "duplicate", false],
									menuText: {
										name: "splitText",
										center: new Point(50, 75),
										text: "split",
										fontSize: 40,
										lineWidth: 4,
										strokeStyle: "#000000",
										fillStyle: "#ffffff",
										selectable: false
									}
								}
							]
						}
					]
				}
			]
		},

		stage1: {

			numLevels: 4,
			numAllModes: 4,
			tilesetSize: 53,
			numTop: 4,
			numMiddle: 4,
			numBottom: 4,
			startPos: new Point(200, 200)

		},

		stage2: {

			numLevels: 4,
			numAllModes: 4,
			tilesetSize: 53,
			numTop: 4,
			numMiddle: 4,
			numBottom: 4,
			startPos: new Point(200, 200)

		},

		stage3: {

			numLevels: 4,
			numAllModes: 4,
			tilesetSize: 53,
			numTop: 4,
			numMiddle: 4,
			numBottom: 4,
			startPos: new Point(200, 200)

		}

	};

})();