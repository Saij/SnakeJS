import Phaser from 'phaser';

import Enums from '../enums';

// Objects

export class PlayState extends Phaser.State {
	constructor() {
		super();
	}

	create() {
		let centerX = this.game.world.centerX;
		let centerY = this.game.world.centerY;
		let config	= this.game.config;
	}
}