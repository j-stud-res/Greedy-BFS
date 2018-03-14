import { GridConfig } from '../config';
import { ControlButton, ControlButtonConfig } from "./ControlButton";
import { Point } from './Point';

export class ScreenControl {
    
    canvasWidth: number;
    canvasHeight: number;
    gridRightBorder: number;

    private sketch: p5;
    private buttons: ControlButton[];

    constructor(config: GridConfig, p5Sketch: p5) {
        this.gridRightBorder = config.gridWidth;
        this.canvasWidth = config.gridWidth + 100;
        this.canvasHeight = config.gridHeight;
        this.sketch = p5Sketch;
        this.buttons = [];
    }
    
    addButtons(buttons: ControlButtonConfig[]) {
        for(let button of buttons) {
            this.addButton(button);
        }
    }

    draw() {
        for(let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].drawButton();
        }
    }

    mouseClicked() {
        if(this.sketch.mouseX > this.gridRightBorder) {
            this.changeButtonsState(this.buttons);
        } else {
            // this.grid.mouseClicked();
        }
    }

    private changeButtonsState(buttons: ControlButton[]) {
        for(let button of buttons) {
            let mousePoint = new Point(this.sketch.mouseX, this.sketch.mouseY);
            if(button.isInBoundries(mousePoint)) {
                button.changeActiveState();
                this.setAllButtonsInactive(buttons, button);
                break;
            }
            if(button.subButtons) {
                this.changeButtonsState(button.subButtons);
            }
        }
    }

    private setAllButtonsInactive(buttons: ControlButton[], keepActiveButton: ControlButton) {
        debugger;
        for(let button of buttons) {
            if(keepActiveButton !== button) {
                button.active = false;
                if(button.subButtons) {
                    this.setAllButtonsInactive(button.subButtons, keepActiveButton);
                }
            }
        }
    }

    private addButton(b: ControlButtonConfig) {
        this.buttons.push(new ControlButton(b, this.sketch));
    }
}
