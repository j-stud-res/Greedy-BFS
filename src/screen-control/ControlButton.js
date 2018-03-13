

/**
 * @callback onMouseClick
 */

 /**
  * @callback onMouseHover
  */

import Rectangular from "./Rectangular";

  /**
 * @typedef ControlButtonConfig
 * @type {Object}
 * @property {Point} point
 * @property {number} width
 * @property {number} height
 * @property {string} displayText
 * @property {p5.color} color
 * @property {boolean} active
 * @property {onMouseClick} onMouseClick
 * @property {onMouseHover} onMouseHover
 */

export default class ControlButton extends Rectangular {
    /**
     * 
     * @param {ControlButtonConfig} config 
     */
    constructor(config) {
        super(config.point, config.width, config.height);
        this.displayText = config.displayText;
        this.color = config.color;
        this.active = config.active;
        this.onMouseClick = config.onMouseClick;
        this.onMouseHover = this.onMouseHover;
    }

    drawButton() {
        push();
        strokeWeight(1);
        fill(this.color);
        rect(this.point.x, this.point.y, this.width, this.height);
        fill(50);
        text(this.displayText, this.point.x, this.point.y, this.width, this.height);
        pop();
    }
}