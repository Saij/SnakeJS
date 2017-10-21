import Phaser from 'phaser';

import Enums from '../enums';

export class LoadingState extends Phaser.State {
	constructor() {
		super();
	}

	preload() {
	    let loadingBar = this.add.sprite(this.world.centerX, this.world.centerY, "loading");
	    loadingBar.anchor.setTo(0.5,0.5);
	    this.load.setPreloadSprite(loadingBar);
	    
		this.game.load.spritesheet("img_snake", "assets/images/img_snake.png", 32, 32, 14);

		this.load.bitmapFont("fnt_snake", 'assets/fonts/fnt_snake.png', 'assets/fonts/fnt_snake.fnt');

		this.load.locale(['de'], ['translation']);
	}

	create() {
		// set a blue color for the background of the stage
		this.game.stage.backgroundColor = this.game.config.get("game.backgroundColor");

		this.game.state.start(Enums.States.MENU);
	}
}