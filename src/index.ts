/// <reference path="../node_modules/p5/lib/p5.d.ts"/>

let p5lib = require("p5");

let s = ( sketch: p5 ) => {

    sketch.setup = () => {
      sketch.createCanvas(200, 200);
      sketch.background(120);
    };
  
    sketch.draw = () => {

    };
  };
  
let mySketch = new p5lib(s);