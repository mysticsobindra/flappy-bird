import { Scene } from 'phaser';

class BaseScene extends Scene {
    constructor(key) {
        super(key);
        this.fontOptions = { fontSize: `${32}px`, fill: '#fff' };
    }


    create() {
        this.CreateBG();
    }


    CreateBG() {
        this.add.image(500, 400, 'sky').setScale(2)
    }

    createMainMenu(menu, setupMenuEvents, x, y) {
        let LastMenuPosition = 0; 
        menu.map(menuItem => {
            const menuPosition = [x, y + LastMenuPosition];
            menuItem.TextGO = this.add.text(...menuPosition, menuItem.text, this.fontOptions).setOrigin(0.5, 1);     
            LastMenuPosition += 42;
            setupMenuEvents(menuItem);  
           
        });
        
    }
    


}


export default BaseScene