import { Grid } from "../../grid/Grid";
import { GridConfig } from "../../config";
import { Cell, CellState } from "../../grid/Cell"
import { Point } from "../button-control/Point";

export enum GridMode {
    Play,
    Edit
}

export enum EditSubMode {
    Start,
    End,
    Obstacle,
    Empty
}

export interface CellColors {
    start: string;
    end: string;
    scanned: string;
    visited: string;
    obstacle: string;
    empty: string;
}

let defaultCellColors: CellColors = {
    start: "#66ff33",
    end: "#3399ff",
    scanned: "#ffcccc",
    visited: "#ff6666",
    obstacle: "#666699",
    empty: "#ffffcc"
}

interface RectCellProp {
    width: number;
    height: number;
}

export class GridControl {

    public gridMode: GridMode;
    public editSubMode: EditSubMode;

    private grid: Grid;
    private config: GridConfig;
    private sketch: p5;
    private colors: CellColors;
    private cellPropery: RectCellProp;

    constructor(config: GridConfig, sketch: p5,colors: CellColors = defaultCellColors, gridMode: GridMode = GridMode.Edit, editSubMode: EditSubMode = EditSubMode.Start) {
        this.gridMode = gridMode;
        this.editSubMode = editSubMode;
        this.config = config;
        this.grid = new Grid(config.cellsHeightCount, config.cellsWidthCount);
        this.colors = colors;
        this.sketch = sketch;
        this.cellPropery = this.calcCellProperty(config);
    }

    gridDraw() {
        for(let r = 0; r < this.config.cellsHeightCount; r++) {
            for(let c = 0; c < this.config.cellsWidthCount; c++) {
                let cell = this.grid.getCell({row: r, col: c});
                this.cellDraw(cell);
            }
        }
    }

    private calcCellProperty(config: GridConfig): RectCellProp {
        let width = config.gridWidth / config.cellsWidthCount;
        let height = config.gridHeight / config.cellsHeightCount;
        return {width: width, height: height};
    }

    private cellDraw(cell: Cell) {
        this.sketch.push();
        let color = this.determineCellColor(cell);
        this.sketch.strokeWeight(1);
        let point = this.calcRectPropsForCell(cell);
        this.sketch.fill(color);
        this.sketch.rect(point.x, point.y, this.cellPropery.width, this.cellPropery.height);
    }

    private determineCellColor(cell: Cell): string {
        let state = cell.getState();
        let color: string;
        switch(state) {
            case CellState.obstacle:
                color = this.colors.obstacle;
                break;
            case CellState.start:
                color = this.colors.start;
                break;
            case CellState.end:
                color = this.colors.end;
                break;
            case CellState.visited:
                color = this.colors.visited;
                break;
            case CellState.scanned:
                color = this.colors.scanned;
                break;
            default:
                color = this.colors.empty;
                break;
        }
        return color;
    }

    private calcRectPropsForCell(cell: Cell): Point {
        let x = cell.position.col * this.cellPropery.width;
        let y = cell.position.row * this.cellPropery.height;
        return new Point(x, y);
    }
}