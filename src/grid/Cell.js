import { color } from "p5";
/**
 * 
 */
export default class Cell
{
    /**
     * @type 
     * @param {number} r - the row of the cell
     * @param {number} c - the col of the cell
     */
    constructor(r, c)
    {
        this.r = r;
        this.c = c;
        this.isStart = false;
        this.isEnd = false;
        this.distToEnd = undefined;
        this.visited = false;
        this.scaned = false;
        this.obstacle = false;
        this.colors = {
            start: color(102, 255, 51),
            end: color(51, 153, 255),
            scanned: color(255, 204, 204),
            visited: color(255, 102, 102),
            obstacle: color(102, 102, 153),
            empty: color(255, 255, 204)
        }
    }
    /**
     * 
     * @param {Cell} endCell 
     */
    setDist(endCell) {
        // calculate dist to path
    }

    getCellColor() {
        if(this.start) {
            return this.colors.start;
        }
        if(this.end) {
            return this.colors.end;
        }
        if(this.obstacle) {
            return this.colors.obstacle;
        }
        if(this.visited) {
            return this.colors.visited;
        }
        if(this.scaned) {
            return this.colors.scanned;
        }
        return this.colors.empty;
    }

    /**
     * Mark the cell as obstacle
     * @return { void }
     */
    setAsObstacle() {
        this.obstacle = true;
    }

    isVisitable() {
        if(!this.visited && !this.obstacle) {
            return true;
        }
        return false;
    }

    visit()
    {
        this.visited = true;
    }

    isScanned() {
        return this.scaned;
    }

    isScanable() {
        return !this.isScanned() && this.isVisitable();
    }

    scan() {
        this.scaned = true;
    }

    compareTo(otherCell)
    {
        return this.dist - otherCell.dist;
    }
}