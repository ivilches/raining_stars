import Phaser from 'phaser';
import sky from '../assets/sky.png';
import star from '../assets/star.png';
import ground from '../assets/ground.jpg';

export class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.delta = 0;
        this.lastStarTime = 0;
        this.starsCaught = 0;
        this.starsFallen = 0;

        this.ground = Phaser.Physics.Arcade.StaticGroup;
        this.info = Phaser.GameObjects.Text;
    }

    init() {
        this.delta = 1000;
        this.lastStarTime = 0;
        this.starsCaught = 0;
        this.starsFallen = 0;
    }

    preload() {
        this.load.image('sky', sky);
        this.load.image('star', star);
        this.load.image('ground', ground);
    }

    setBackground() {
        this.add.image(400, 300, 'sky');
    }

    create() {
        this.setBackground();

        this.ground = this.physics.add.staticGroup({
            key: 'ground',
            frameQuantity: 20,
        });
        Phaser.Actions.PlaceOnLine(this.ground.getChildren(), new Phaser.Geom.Line(20, 580, 820, 580));
        this.ground.refresh();

        this.info = this.add.text(10, 10, 'Hola',
            { font: '24px Arial Bold', fill: '#FBFBAC' });
    }

    update(time) {
        var diff = time - this.lastStarTime;
        if (diff > this.delta) {
            this.lastStarTime = time;
            if (this.delta > 500) {
                this.delta -= 20;
            }
            this.emitStar();
        }
        this.info.text =
            this.starsCaught + ' caught - ' +
            this.starsFallen + ' fallen (max 3)';
    }


    emitStar() {
        const x = Phaser.Math.Between(25, 775);
        const y = 26;
        const star = this.physics.add.image(x, y, 'star');
        star.setDisplaySize(50, 50);
        star.setVelocity(0, 100);
        star.setInteractive();
        star.on('pointerdown', this.onClick(star), this);
        this.physics.add.collider(star, this.ground,
            this.onFall(star), null, this);
    }

    onClick(star) {
        return () => {
            star.setTint(0x00ff00);
            console.log(star.tintBottomLeft);
            star.setVelocity(0, 0);
            this.starsCaught += 1;
            this.time.delayedCall(100, function (star) {
                star.destroy();
            }, [star], this);
        }
    }

    onFall(star) {
        return () => {
            star.setTint(0xff0000);
            console.log('fallen', star.tintBottomLeft);
            this.starsFallen += 1;
            this.time.delayedCall(100, function (star) {
                star.destroy();
                if (this.starsFallen > 2) {
                    this.scene.start('ScoreScene',
                        { starsCaught: this.starsCaught });
                }
            }, [star], this);
        }
    }

}
