import { Scene } from 'phaser';

export class GameOver extends Scene {
    constructor() {
        super('GameOver');
    }

    create() {
        this.Gameover();
        this.EventListener();
    }

    Gameover() {
        this.add.image(500, 400, 'sky').setScale(2)
        this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, " Game Over , Press Space to try again ",
            {
                fontSize: '32px',
                fill: '#ffffff'
            }
        ).setOrigin(0.5);
    }

    EventListener() {
        this.input.keyboard.on("keydown-SPACE", () => {
            this.scene.start("Game");
        })
    }
}
