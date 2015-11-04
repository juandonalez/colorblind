var sceneData = sceneData || {};

(function() {

	sceneData = {

		splashScreen: {

			isStage: false

		},

		mainMenu: {

			isStage: false,
			startSpeed: 100,
			maxSpeed: 100,

			scrollers: [
				{
					y: 40,
					speed: 1,
					random: false
				}
			],

			menus: [
				{
					name: "main",
					active: true,
					overlays: [
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
						/*{
							activePos: new Point(20, 7.5),
							inactivePos: new Point(20, 7.5),
							height: 15,
							width: 15,
							inactiveScale: 0.5,
							activeAlpha: 1,
							inactiveAlpha: 0.1,
							color: "blue",
							menuItems: []
						},*/
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
									name: "selectMode1",
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
									image: "menus/duplicate",
									selectable: true,
									selected: true,
									links: ["split", false, "split", false],
									menuText: {
										name: "duplicateText",
										center: new Point(50, 75),
										text: "Everything is visible on both screens.",
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
									image: "menus/split",
									selectable: true,
									selected: false,
									links: ["duplicate", false, "duplicate", false],
									menuText: {
										name: "splitText",
										center: new Point(50, 75),
										text: "Some obstacles and enemies will only be visible on one screen.",
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
				},
				{
					name: "twoPlayerModes",
					active: false,
					overlays: [
						/*{
							activePos: new Point(20, 7.5),
							inactivePos: new Point(20, 7.5),
							height: 15,
							width: 15,
							inactiveScale: 0.5,
							activeAlpha: 1,
							inactiveAlpha: 0.1,
							color: "blue",
							menuItems: []
						},*/
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
									name: "selectMode2",
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
									name: "coop",
									center: new Point(30, 25),
									image: "menus/coop",
									selectable: true,
									selected: true,
									links: ["versus", false, "versus", false],
									menuText: {
										name: "coopText",
										center: new Point(50, 75),
										text: "Some enemies and obstacles are only visible to the other player.",
										fontSize: 40,
										lineWidth: 4,
										strokeStyle: "#000000",
										fillStyle: "#ffffff",
										selectable: false
									}
								},
								{
									name: "versus",
									center: new Point(70, 25),
									image: "menus/versus",
									selectable: true,
									selected: false,
									links: ["coop", false, "coop", false],
									menuText: {
										name: "versusText",
										center: new Point(50, 75),
										text: "Play the same level at the same time against the other player.",
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
				},
				{
					name: "stages",
					active: false,
					overlays: [
						/*{
							activePos: new Point(20, 7.5),
							inactivePos: new Point(20, 7.5),
							height: 15,
							width: 15,
							inactiveScale: 0.5,
							activeAlpha: 1,
							inactiveAlpha: 0.1,
							color: "blue",
							menuItems: []
						},*/
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
									name: "selectStage",
									center: new Point(50, 50),
									text: "Select Stage",
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
									name: "stage1",
									center: new Point(17, 25),
									image: "menus/stage1",
									selectable: true,
									selected: true,
									links: ["stage2", false, "stage2", false],
									menuText: {
										name: "coopText",
										center: new Point(50, 75),
										text: "Easy",
										fontSize: 40,
										lineWidth: 4,
										strokeStyle: "#000000",
										fillStyle: "#ffffff",
										selectable: false
									}
								},
								{
									name: "stage2",
									center: new Point(50, 25),
									image: "menus/stage2",
									selectable: true,
									selected: false,
									links: ["stage1", false, "stage1", false],
									menuText: {
										name: "versusText",
										center: new Point(50, 75),
										text: "Medium",
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

			background: "stage1",
			numLevels: 9,
			numAllModes: 9,
			isStage: true,
			startPos: new Point(500, 200),
			startSpeed: 10000,
			maxSpeed: 10000,

			scrollers: [
				{
					y: 270,
					speed: 500,
					random: true
				}
			],

		},

		stage2: {

			background: "stage2",
			numLevels: 4,
			numAllModes: 4,
			isStage: true,
			startPos: new Point(500, 200),
			startSpeed: 10000,
			maxSpeed: 10000

		}

	};

})();