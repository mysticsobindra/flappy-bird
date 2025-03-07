import BaseScene from './BaseScene';
import Phaser from 'phaser';

export class MainMenu extends BaseScene {
    constructor() {
        super('MainMenu');
        this.menu = [
            { scene: 'Game', text: 'Resume' },
            { scene: 'Game', text: 'Restart' },
        ]
    }

    create() {
        super.create()
        this.createMainMenu(this.menu, this.setUpMenuEvents.bind(this), this.cameras.main.width / 2, this.cameras.main.height / 2)
    }


    setUpMenuEvents(menuItem) {
        const textGO = menuItem.TextGO;
        textGO.setInteractive();
        textGO.on('pointerover', () => {
            textGO.setStyle({ fill: '#67ff4f' });
        })
        textGO.on('pointerout', () => {
            textGO.setStyle({ fill: '#fff' });
        })

        textGO.on('pointerup', () => {
            if (menuItem.scene && menuItem.text === 'Resume') {
                this.scene.stop();
               this.scene.resume('Game');
            }
            else if (menuItem.scene && menuItem.text === 'Restart') {
            this.scene.start('Game')
            }
        })
    }
}
