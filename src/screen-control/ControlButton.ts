import  { Rectangular } from "./Rectangular";
import { Point } from "./Point";

export interface ControlButtonConfig {
    point: Point;
    width: number;
    height: number;
    displayText: string;
    colorActive: string;
    colorInactive: string;
    active: boolean;
    subControlButtons?: ControlButtonConfig[];
}

export class ControlButton extends Rectangular {
    
    displayText: string;
    colorActive: string;
    colorInactive: string;
    active: boolean;
    subButtons: ControlButton[] | undefined;

    private sketch: p5;
    private hover: boolean = false;
    
    constructor(config: ControlButtonConfig, p5sketch: p5) {
        super(config.point, config.width, config.height);
        this.displayText = config.displayText;
        this.colorActive = config.colorActive;
        this.colorInactive = config.colorInactive;
        this.active = config.active;
        this.sketch = p5sketch;
        if(config.subControlButtons) {
            this.subButtons = [];
            for(let subButton of config.subControlButtons) {
                this.subButtons.push(new ControlButton(subButton, p5sketch));
            }
        }
    }

    changeActiveState() {
        this.active = !this.active;
    }

    drawButton() {
        if(this.isInBoundries(new Point(this.sketch.mouseX, this.sketch.mouseY))) {
            this.hover = true;
        }
        if(this.active && this.subButtons) {
            for(let subButton of this.subButtons) {
                subButton.drawButton();
            }
        }
        this.sketch.push();
        this.sketch.strokeWeight(1);
        this.sketch.fill((this.active || this.hover) ? this.colorActive : this.colorInactive);
        this.sketch.rect(this.point.x, this.point.y, this.width, this.height);
        this.sketch.fill(50, 50, 50);
        this.sketch.textAlign(this.sketch.CENTER, this.sketch.CENTER);
        this.sketch.text(this.displayText, this.point.x, this.point.y, this.width, this.height);
        this.sketch.pop();
        this.hover = false;
    }
}