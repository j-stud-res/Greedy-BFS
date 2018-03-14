/// <reference path="../node_modules/p5/lib/p5.d.ts"/>
let p5lib = require("p5");
import { ScreenControl } from "./screen-control/ScreenControl";
import { defaultGridConfig } from "./config";
import { controlButtonsConfig } from "./config";

let s = ( sketch: p5 ) => {
  let backgroundColor = "#f48686";
  let screenControl: ScreenControl;
  
  sketch.setup = () => {
    screenControl = new ScreenControl(defaultGridConfig, sketch);
    screenControl.addButtons(controlButtonsConfig(sketch));
    let cnvs = sketch.createCanvas(screenControl.canvasWidth, screenControl.canvasHeight);
  };
  sketch.mouseClicked = () => {
    if(sketch.mouseX < screenControl.canvasWidth && sketch.mouseY < screenControl.canvasHeight) {
      screenControl.mouseClicked();
    }
  };

  sketch.draw = () => {
    sketch.background(backgroundColor);
    screenControl.draw();
  };
};
  
let mySketch = new p5lib(s);