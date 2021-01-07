import Phaser from 'phaser';
import sky from './assets/sky.png';
import star from './assets/star.png';

class MyGame extends Phaser.Scene {
    constructor() {
        super();
    }

    preload() {
        this.load.image('sky', sky);
        this.load.image('star', star);
    }

    setBackground() {
        this.add.image(400, 300, 'sky');
    }

    create() {
        this.setBackground();
    }

    update() { }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: MyGame,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    }
};

const game = new Phaser.Game(config);
