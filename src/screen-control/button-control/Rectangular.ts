import { Point } from "./Point";

export class Rectangular {

    point: Point;
    width: number;
    height: number;

    constructor(point: Point, width: number, height: number) {
        this.point = point
        this.width = width;
        this.height = height;
    }

    isInBoundries(p: Point) {
        return (this.point.x < p.x && p.x < this.point.x + this.width)
            && (this.point.y < p.y &&  p.y < this.point.y + this.height)
    }
}