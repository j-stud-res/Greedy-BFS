import { Cell, CellState, CellPosition } from "./Cell";

export class Grid {

    private grid: Cell[][];
    private startCell: Cell | undefined;
    private endCell: Cell | undefined;

    constructor(cellRows: number, cellColls: number) {
        this.grid = this.buildGrid(cellRows, cellColls);
    }

    buildGrid(rows: number, cols: number): Cell[][] {
        let grid: Cell[][] = [];
        for(let r = 0; r < rows; r++) {
            let row: Cell[] = [];
            for(let c = 0; c < cols; c++) {
                row.push(new Cell({row: r, col: c}));
            }
            grid.push(row);
        }
        return grid;
    }

    setStart(row: number, col: number) {
        if(this.startCell) {
            this.startCell.editState(CellState.empty);
        }
        this.startCell = this.grid[row][col];
        this.startCell.editState(CellState.start);
    }

    setEnd(row: number, col: number) {
        if(this.endCell) {
            this.endCell.editState(CellState.empty);
        }
        this.endCell = this.grid[row][col];
        this.endCell.editState(CellState.end);
    }

    getCell(pos: CellPosition): Cell {
        return this.grid[pos.row][pos.col];
    }

    move(cell: Cell): boolean {
        cell.visit();
        return cell.isEnd();
    }

    scanUpCell(pos: CellPosition): Cell | undefined {
        if(pos.row - 1 < 0) {
            return undefined;
        }
        let cell = this.grid[pos.row - 1][pos.col];
        if(!cell.isScanable()) {
            return undefined;
        }
        cell.scan();
        return cell;
    }

    scanDownCell(pos: CellPosition): Cell | undefined {
        if(pos.row + 1 >= this.grid.length) {
            return undefined;
        }
        let cell = this.grid[pos.row + 1][pos.col];
        if(!cell.isScanable()) {
            return undefined;
        }
        cell.scan();
        return cell;
    }

    scanLeftCell(pos: CellPosition): Cell | undefined {
        if(pos.col - 1 < 0) {
            return undefined;
        }
        let cell = this.grid[pos.row][pos.col - 1];
        if(!cell.isScanable()) {
            return undefined;
        }
        cell.scan();
        return cell;
    }

    scanRightCell(pos: CellPosition) {
        if(pos.col + 1 >= this.grid[0].length) {
            return undefined;
        }
        let cell = this.grid[pos.row][pos.col + 1];
        if(!cell.isScanable()) {
            return undefined;
        }
        cell.scan();
        return cell;
    }

}