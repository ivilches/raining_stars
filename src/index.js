import 'phaser';
import { WelcomeScene, GameScene, ScoreScene } from './scenes';

const config = {
  title: 'Raining stars',
  type: Phaser.AUTO,
  parent: 'game',
  width: 800,
  height: 600,
  scene: [WelcomeScene, GameScene, ScoreScene],
  physics: {
      default: 'arcade',
      arcade: {
          debug: false
      }
  }
};

const game = new Phaser.Game(config);
