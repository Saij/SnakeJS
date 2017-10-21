import Phaser from 'phaser';

import Enums from '../enums';

// Menus
import MainMenu from '../menus/main';

export class MenuState extends Phaser.State {
	constructor() {
		super();
		this.menus = [];
	}

	create() {
		let centerX = this.game.world.centerX;
		let config 	= this.game.config;

		// Draw title
		this.title = this.game.add.translatedBitmapText(centerX, 96, "fnt_snake", "title", config.get("fontSize.title"));
		this.title.anchor.setTo(0.5);

		// Draw Highscore
		this.highscore = this.game.add.translatedBitmapText(centerX, 150, "fnt_snake", "highscore", config.get("fontSize.menu"), 'left', {score: this.game.save.get("highscore")});
		this.highscore.anchor.setTo(0.5);

		this.menus[Enums.Menus.MAIN] = new MainMenu(this.game, this);
		this.menus[Enums.Menus.MAIN].draw();
		this.game.add.existing(this.menus[Enums.Menus.MAIN]);

		this.changeMenu(Enums.Menus.MAIN);
	}

	update() {
		// Handle input for menus
		this.menus[this.curMenu].handle();
	}

	changeMenu(id) {
		// Check if valid menu id
		if (id >= this.menus.length || id < 0) {
			return;
		}

		for (let i = 0; i < this.menus.length; i++) {
			this.menus[i].visible = false;
		}

		this.menus[id].visible = true;
		this.curMenu = id;
	}
}