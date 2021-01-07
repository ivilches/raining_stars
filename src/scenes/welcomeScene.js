import 'phaser';
import welcome from '../assets/welcome.png';

export class WelcomeScene extends Phaser.Scene {
  constructor() {
    super('WelcomeScene');
  }

  preload() {
    this.load.image('welcome', welcome);
}

  create() {
    this.add.image(400, 300, 'welcome');

    const titleText = 'Starfall';
    this.title = this.add.text(200, 200, titleText,
      { font: '128px Arial Bold', fill: '#FBFBAC' });
      const hintText = 'Click to start';
    this.hint = this.add.text(320, 350, hintText,
      { font: '24px Arial Bold', fill: '#FBFBAC' });
    this.input.on('pointerdown', () => this.scene.start('GameScene'), this);
  }
};