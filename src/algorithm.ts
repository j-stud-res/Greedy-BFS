import { Grid } from "./grid/Grid";
import { PriorityQueue, IComperable } from "./PriorityQueue";
import { Cell } from "./grid/Cell";

class CellData implements IComperable<CellData> {
    
    public cell: Cell;
    private _dist: number;
    get dist() {
        return this._dist;
    }

    constructor(currentCell: Cell, endCell: Cell) {
        this.cell = currentCell;
        this._dist = this.calculateDist(currentCell, endCell);
    }

    compareTo(cell: CellData) {
        return cell.dist - this.dist;
    }

    private calculateDist(curCell: Cell, endCell: Cell) {
        let d1 = Math.abs(curCell.position.row - endCell.position.row);
        let d2 = Math.abs(curCell.position.col - endCell.position.col);
        return d1 + d2;
    }
}

export function algorithm(grid: Grid, startCell: Cell, endCell: Cell, speed: number) {
    let queue = new PriorityQueue<CellData>();
    function cellDataFactory(cell: Cell): CellData {
        return new CellData(cell, endCell);
    }
    queue.push(cellDataFactory(startCell));
    let interval = setInterval(() => {
        if(queue.count() > 0) {
            let c = queue.pop();
            let m = grid.move(c.cell);
            if(m === true) {
                alert("Done");
                clearInterval(interval);
            }
            let newCell: Cell | undefined;
            newCell = grid.scanUpCell(c.cell.position);
            if(newCell) {
                queue.push(cellDataFactory(newCell));
            }
            newCell = grid.scanDownCell(c.cell.position);
            if(newCell) {
                queue.push(cellDataFactory(newCell));
            }
            newCell = grid.scanLeftCell(c.cell.position);
            if(newCell) {
                queue.push(cellDataFactory(newCell));
            }
            newCell = grid.scanRightCell(c.cell.position);
            if(newCell) {
                queue.push(cellDataFactory(newCell));
            }
        } else {
            alert("No path found");
        }
    }, speed);
}