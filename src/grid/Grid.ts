import { Cell, CellState, CellPosition } from "./Cell";

export class Grid {

    private _grid: Cell[][];
    private _startCell: Cell | undefined;
    private _endCell: Cell | undefined;
    get startCell() {
        return this._startCell as Cell;
    }
    get endCell() {
        return this._endCell as Cell;
    }
    constructor(cellRows: number, cellColls: number) {
        this._grid = this.buildGrid(cellRows, cellColls);
    }

    isReady(): boolean {
        return (this._startCell !== undefined && this._endCell !== undefined)? true : false;
    }

    editState(cellPos: CellPosition, state: CellState) {
        switch(state) {
            case CellState.start:
                this.setStart(cellPos);
                break;
            case CellState.end:
                this.setEnd(cellPos);
                break;
            default:
                this.getCell(cellPos).editState(state);
                break;
        }
    }

    getCell(pos: CellPosition): Cell {
        return this._grid[pos.row][pos.col];
    }

    move(cell: Cell): boolean {
        cell.visit();
        return cell.isEnd();
    }

    scanUpCell(pos: CellPosition): Cell | undefined {
        if(pos.row - 1 < 0) {
            return undefined;
        }
        let cell = this._grid[pos.row - 1][pos.col];
        if(!cell.isScanable()) {
            return undefined;
        }
        cell.scan();
        return cell;
    }

    scanDownCell(pos: CellPosition): Cell | undefined {
        if(pos.row + 1 >= this._grid.length) {
            return undefined;
        }
        let cell = this._grid[pos.row + 1][pos.col];
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
        let cell = this._grid[pos.row][pos.col - 1];
        if(!cell.isScanable()) {
            return undefined;
        }
        cell.scan();
        return cell;
    }

    scanRightCell(pos: CellPosition) {
        if(pos.col + 1 >= this._grid[0].length) {
            return undefined;
        }
        let cell = this._grid[pos.row][pos.col + 1];
        if(!cell.isScanable()) {
            return undefined;
        }
        cell.scan();
        return cell;
    }

    private setStart(pos: CellPosition) {
        if(this._startCell) {
            this._startCell.editState(CellState.empty);
        }
        this._startCell = this._grid[pos.row][pos.col];
        this._startCell.editState(CellState.start);
    }

    private setEnd(pos: CellPosition) {
        if(this._endCell) {
            this._endCell.editState(CellState.empty);
        }
        this._endCell = this._grid[pos.row][pos.col];
        this._endCell.editState(CellState.end);
    }

    private buildGrid(rows: number, cols: number): Cell[][] {
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

}