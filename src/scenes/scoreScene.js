import 'phaser';

export class ScoreScene extends Phaser.Scene {
  constructor() {
    super('ScoreScene');
  }
  init(params) {
    this.score = params.starsCaught;
  }
  create() {
    const resultText = `Your score is ${this.score}!`;
    this.result = this.add.text(220, 250, resultText,
      { font: '48px Arial Bold', fill: '#FBFBAC' });
    const hintText = 'Click to restart';
    this.hint = this.add.text(300, 350, hintText,
      { font: '24px Arial Bold', fill: '#FBFBAC' });
    this.input.on('pointerdown', () => this.scene.start('WelcomeScene'), this);
  }
};