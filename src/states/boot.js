import Phaser from 'phaser';
import 'phaser-i18next';
import LngDetector from 'i18next-browser-languagedetector';

import Enums from '../enums';

export class BootState extends Phaser.State {
	constructor() {
		super();
	}

	preload() {
		this.game.load.image("loading","assets/images/loading.png"); 
	}

	create() {
		// Set scale mode to cover the entire screen
		this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
		this.scale.pageAlignVertically = true;
		this.scale.pageAlignHorizontally = true;

		// Scale the game
		let curHeight = this.game.height;
		let curWidth = this.game.width;
		let baseHeight = this.game.config.get("game.baseHeight");
		let baseWidth = this.game.config.get("game.baseWidth");
		let vScale = curHeight / baseHeight;
		let widthDiff = Math.ceil((curWidth - baseWidth * vScale) / vScale);

		this.scale.setGameSize(Math.min(baseWidth + widthDiff, this.game.config.get("game.maxWidth")), baseHeight);
		this.scale.setUserScale(vScale, vScale, 0, 0, false, false);

		// Set a black color for the background of the stage
		this.game.stage.backgroundColor = "#000000";

		// Keep game running if it loses the focus
		this.game.stage.disableVisibilityChange = true;

		// Load locales Plug-In
		this.game.plugins.add(PhaserI18n.Plugin, {
			fallbackLng: 'de',
			backend: {
				loadPath: 'assets/locales/{{lng}}.json'
			},
			load: 'languageOnly',
			debug: false,
            detection: {
                order: ['navigator']
            }
		}, LngDetector);

		// Start loading stage
		this.game.state.start(Enums.States.LOADING);
	}
}