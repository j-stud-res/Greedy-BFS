import { GridConfig } from '../config';
import ControlButton from "./ControlButton";
import Point from "./Point";

/** @type ControlButtonConfig */
let controlButtonConfig = {
    point: new Point(GridConfig.gridWidth + 1, 0),
    width: 199,
    height: 100,
    displayText: "Play",
    color: color(66, 134, 244),
    active: false,
    onMouseClick: () => {console.log("cliked")},
    onMouseHover: () => {console.log("mouse hover")}
}

/**
 * Class representing the canvas, containing the grid and the grid controls
 */
export default class ScreenControl {
    
    /**
     * @param {GridConfig} gridConfig 
     */
    constructor(gridConfig) {
        this.canvasWidth = gridConfig.gridWidth + 200;
        this.canvasHeight = gridConfig.gridHeight;
        this.button = new ControlButton(controlButtonConfig);
    }
    
    draw() {
        this.button.drawButton();
    }
}
