import ScreenControl from "../screen-control/ScreenControl";
import { GridConfig } from "../config";

let screenControl;

function setup() {
    screenControl = new ScreenControl(GridConfig);
    console.log(screenControl);
    createCanvas(screenControl.canvasWidth, screenControl.canvasHeight);
    background(123);
}

export { setup, screenControl };