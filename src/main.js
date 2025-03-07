import BaseScene from './scenes/BaseScene';
import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Preload } from './scenes/Preloader';

const SHARED_CONFIG = {
    width: 1024,
    height: 768,
}

const Scenes = [
    Preload,
    BaseScene,
    Game,
    MainMenu,
    GameOver,

];

const createScene = Scene => new Scene(SHARED_CONFIG)
const initScenes = () => Scenes.map(createScene)

const config = {
    type: Phaser.AUTO,
    ...SHARED_CONFIG,
    parent: 'game-container',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
        }
    },
    scene: initScenes()
};

export default new Phaser.Game(config);
