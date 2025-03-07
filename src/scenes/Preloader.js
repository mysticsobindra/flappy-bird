import { Math, Scene } from 'phaser';

export class Preload extends Scene {
    constructor() {
        super('Preload');
        this.position;
    }

    preload() {
        this.load.image('sky', '/assets/sky.png')
        this.load.image('pipe', '/assets/pipe.png')
        this.load.image('pause', '/assets/pause.png')
        this.load.spritesheet('bird', '/assets/birdSprite.png',
            {
                frameWidth: 16,
                frameHeight: 16
            }
        )
    }

    create() {
        this.CreateBG();
        this.BaseText();
        this.SceneChanger();

    }

    CreateBG() {
        this.add.image(500, 400, 'sky').setScale(2)
    }
    BaseText() {
        this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, 'Press Space To Start the Game ', {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5);

    }
    SceneChanger() {
        this.input.keyboard.on("keydown-SPACE", () => {
            this.scene.start('Game')
        })
    }
}
