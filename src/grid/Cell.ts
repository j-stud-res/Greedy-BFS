import { IComperable } from "../PriorityQueue";

export enum CellState {
    empty,
    start,
    end,
    obstacle,
    visited,
    scanned,
}

export interface CellPosition {
    row: number,
    col: number
}

export class Cell {

    private start: boolean;
    private end: boolean;
    private visited: boolean;
    private scaned: boolean;
    private obstacle: boolean;
    public position: CellPosition;

    constructor(pos: CellPosition) {
        this.start = false;
        this.end = false;
        this.visited = false;
        this.scaned = false;
        this.obstacle = false;
        this.position = pos;
    }

    editState(state: CellState) {
        switch(state) {
            case CellState.start:
                this.end = false;
                this.obstacle = false;
                this.start = true;
                break;
            case CellState.end:
                this.start = false;
                this.obstacle = false;
                this.end = true;
                break;
            case CellState.obstacle:
                this.start = false;
                this.end = false;
                this.obstacle = true;
                break;
            case CellState.empty:
                this.obstacle = false;
                this.start = false;
                this.end = false;
                break;
            default:
                throw new Error("Invalid InitCellState");
        }
    }

    changeState(state: CellState) {
        switch(state) {
            case CellState.scanned:
                this.scaned = true;
                break;
            case CellState.visited:
                this.visited = true;
                break;
            default:
                throw new Error("Invalid IngameCellState");
        }
    }

    getState(): CellState {
        if(this.obstacle) {
            return CellState.obstacle;
        }
        if(this.start) {
            return CellState.start;
        }
        if(this.end) {
            return CellState.end;
        }
        if(this.visited) {
            return CellState.visited;
        }
        if(this.scaned) {
            return CellState.scanned;
        }
        return CellState.empty;
    }

    isVisitable(): boolean {
        if(!this.visited && !this.obstacle) {
            return true;
        }
        return false;
    }

    visit() {
        this.visited = true;
    }

    isScanable(): boolean {
        return !this.scaned && this.isVisitable();
    }

    scan() {
        this.scaned = true;
    }

    isEnd(): boolean {
        return this.end
    }
}