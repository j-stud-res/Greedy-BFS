export default class Rectangular {

    /**
     * 
     * @param {Point} point - The top left point of the rect
     * @param {number} width - The width of the rect in px
     * @param {number} height - The height of the rect in px
     */
    constructor(point, width, height) {
        this.point = point
        this.width = width;
        this.height = height;
    }
    /**
     * Check if a point is in the rect
     * @param {Point} p
     * @returns {boolean}
     */
    isInBoundries(p) {
        return (this.point.x < p.x && this.point.x + this.width > p.x)
            && (this.point.y < p.y && this.point.y + this.width > p.y)
    }
}