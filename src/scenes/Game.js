
import Phaser from "phaser";
import BaseScene from "./BaseScene";



export class Game extends BaseScene {
    constructor() {
        super('Game');
        this.totaldelta = null;
        this.platform = null;
        this.PipesToRender = 4;
        this.Score = 0;
        this.scoreText = null;
        this.HighestScore = 0;
        this.IntialTime = 3;
        this.countdownText = null;
    }

    preload() {
        this.HighScoreGetter();
    }

    create() {
        super.CreateBG();
        this.CreatePillar();
        this.CreatePlayer();
        this.PauseButton();
        this.PlayerPillarCollider();
        this.EventListener();
        this.score();
        this.animation();
        this.ListenToEvents();

    }

    update() {
        this.HighScoreGetter();
        this.HighScoreChecker();
        this.RegeneratePipe();
        this.playerPositionChecker();
    }

    text() {

    }

    ListenToEvents() {
        this.events.on('resume', () => {
            if (this.isCountingDown) return; 
            this.isCountingDown = true;
            this.countdownText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, `Fly in : 3`, {
                fontSize: "32px",
                fill: "#ffff"
            })

            this.timeEvent = this.time.addEvent({
                delay: 1000,
                callback: () => this.CountDown(),
                callbackScope: this,
                loop: true
            })
        })
    }


    CountDown() {
            this.IntialTime--;
            this.countdownText.setText(`Fly in : ${this.IntialTime}`)
            if (this.IntialTime <= 0) {
                this.countdownText.destroy();
                this.physics.resume();
                this.timeEvent.remove();
                this.IntialTime = 3;
                this.isCountingDown = false;
            }
    }

    CreateBG() {
        this.add.image(500, 400, 'sky').setScale(2);
    }

    CreatePillar() {
        this.platform = this.physics.add.group({
            allowGravity: false
        });
        for (let i = 0; i < this.PipesToRender; i++) {
            const upperPipe = this.platform.create(0, 0, "pipe").setOrigin(0, 1);
            const lowerPipe = this.platform.create(0, 0, "pipe").setOrigin(0, 0);
            this.placePipe(upperPipe, lowerPipe, this.cameras.main.height);
        }
        this.platform.setVelocityX(-200);
    }

    HighScoreGetter() {
        if (localStorage.getItem('highScore')) {
            this.HighestScore = localStorage.getItem('highScore');
        }
    }

    CreatePlayer() {
        this.player = this.physics.add.sprite(150, 150, 'bird').setScale(3).setFlipX(true);
        this.player.body.setGravityY(800);
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);
        this.player.setBodySize(this.player.height, this.player.width - 10)
    }

    PlayerPillarCollider() {
        this.physics.add.collider(this.platform, this.player, this.gameOver, null, this);
    }

    EventListener() {
        this.input.keyboard.on('keydown-SPACE', () => {
            this.player.setVelocityY(-900);
        });
        this.input.keyboard.on('keyup-SPACE', () => {
            this.player.setVelocityY(0);
        });
    }

    placePipe(Uppipe, Lowpipe, totalHeight) {
        const rightMostX = this.getRightMostPipe() + 400;
        var Distance = Phaser.Math.Between(160, 260);
        var position = Phaser.Math.Between(100, totalHeight - 100 - Distance);

        Uppipe.x = rightMostX;
        Uppipe.y = position;
        Lowpipe.x = rightMostX;
        Lowpipe.y = position + Distance;

        Uppipe.setImmovable(true);
        Lowpipe.setImmovable(true);
    }

    RegeneratePipe() {
        const GenPipes = [];
        this.platform.getChildren().forEach(pipe => {
            if (pipe.getBounds().right <= 0) {
                GenPipes.push(pipe);
                this.scoreIncrease();
            }
        });

        if (GenPipes.length >= 2) {
            this.placePipe(GenPipes[0], GenPipes[1], this.cameras.main.height);

        }
    }

    getRightMostPipe() {
        let rightMostX = 0;

        this.platform.getChildren().forEach(pipe => {
            rightMostX = Math.max(pipe.x, rightMostX);
        });

        return rightMostX;
    }

    playerPositionChecker() {
        if (this.player.y >= this.cameras.main.height - 15 || this.player.y <= 15) {
            this.gameOver();
        }
    }

    HighScoreChecker() {
        if (this.Score > this.HighestScore) {
            this.HighestScore = this.Score
            localStorage.setItem('highScore', this.Score)
        }
    }

    gameOver() {
        this.physics.pause();
        this.player.setTint(0xdb3327)
        this.Score = 0;
        setTimeout(() => {
            this.scene.start('GameOver')
        }, 2000)

    }

    scoreIncrease() {
        this.Score++;
        this.scoreText.setText(`Points:${this.Score}\nHighest Points : ${this.HighestScore}`)
    }

    score() {
        this.scoreText = this.add.text(18, 18, `Points: ${this.Score} \nHighest Points : ${this.HighestScore}`, {
            fontSize: "32px",
            fill: '#ffffff'
        })
    }

    PauseButton() {
        const pauseButton = this.add.image(this.cameras.main.width - 30, this.cameras.main.height - 30, 'pause').setOrigin(1, 1).setInteractive().setScale(4);
        pauseButton.on('pointerdown', () => {
            this.scene.pause();
            this.physics.pause();
            this.scene.launch('MainMenu');
        });
    }

    animation() {
        this.anims.create({   
            key: 'flying',
            frames: this.anims.generateFrameNumbers('bird', { start: 8, end: 15 }),
            frameRate: 20,
            repeat: -1
        })
        this.player.anims.play('flying', true)
    }
}
