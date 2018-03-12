import { Cell } from "./Cell";
import { rect, push, pop, strokeWeight, fill } from "p5";

export default class Grid {

    constructor(size) {
        this.grid = this.buildGrid(size);
    }

    buildGrid(size) {
        let grid = [];
        for(let row = 0; row < size; row++) {
            let row = [];
            for(let cow = 0; cow < size; cow++) {
                row.push(new Cell(row, col));
            }
            grid.push(row);
        }
    }

    drawGrid() {
        for(let r = 0; r < this.size; r++) {
            for(let c = 0; c < this.size; c++)
            {
                push();
                let color = this.grid[r][c].getCellColor();
                strokeWeight(1);
                fill(color);
                rect(r * 10, c * 10, 9, 9);
            }
        }
    }

    setStart(row, col) {
        this.grid[row][col].isStart = true;
    }

    setEnd(row, col) {
        this.grid[row][col].isEnd = true;
    }

    scanUpCell(currentCell) {
        if(currentCell.row - 1 < 0) {
            return undefined;
        }
        let cell = this.grid[currentCell.row - 1][currentCell.col];
        if(!cell.isScanable()) {
            return undefined;
        }
        cell.scan();
        return cell;
    }

    move(cell) {
        cell.visisted = true;
        return cell.isEnd;
    }

    scanDownCell(currentCell) {
        if(currentCell.row + 1 >= this.size) {
            return undefined;
        }
        let cell = this.grid[currentCell.row + 1][currentCell.col];
        if(!cell.isScanable()) {
            return undefined;
        }
        cell.scan();
        return cell;
    }

    scanLeftCell(currentCell) {
        if(currentCell.col - 1 < 0) {
            return undefined;
        }
        let cell = this.grid[currentCell.row][currentCell.col - 1];
        if(!cell.isScanable()) {
            return undefined;
        }
        cell.scan();
        return cell;
    }

    scanRightCell(currentCell) {
        if(currentCell.col + 1 >= this.size) {
            return undefined;
        }
        let cell = this.grid[currentCell.row][currentCell.col + 1];
        if(!cell.isScanable()) {
            return undefined;
        }
        cell.scan();
        return cell;
    }

}