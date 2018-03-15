import { Grid } from "../../grid/Grid";
import { GridConfig } from "../../config";
import { Cell, CellState, CellPosition } from "../../grid/Cell"
import { Point } from "../button-control/Point";
import { algorithm }  from "../../algorithm";

export enum GridMode {
    Play,
    Edit,
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

    private grid: Grid;
    private config: GridConfig;
    private sketch: p5;
    private colors: CellColors;
    private cellPropery: RectCellProp;

    constructor(config: GridConfig, sketch: p5,colors: CellColors = defaultCellColors, gridMode: GridMode = GridMode.Edit) {
        this.gridMode = gridMode;
        this.config = config;
        this.grid = new Grid(config.cellsHeightCount, config.cellsWidthCount);
        this.colors = colors;
        this.sketch = sketch;
        this.cellPropery = this.calcCellProperty(config);
    }

    mouseClicked() {
        switch(this.gridMode) {
            case GridMode.Play:

                break;
            case GridMode.Edit:

                break;
            case GridMode.Start:
            case GridMode.End:
            case GridMode.Obstacle:
            case GridMode.Empty:
                let cellPos = this.mousePosToCellRowCol(this.sketch.mouseX, this.sketch.mouseY);
                this.grid.editState(cellPos, this.gridModeToCellState(this.gridMode));
                break;
        }
    }

    changeMode(mode: GridMode) {
        if(mode == GridMode.Play) {
            if(!this.grid.isReady()) {
                alert("Grid should contain a start cell and an end cell!");
                return;
            }
            algorithm(this.grid, this.grid.startCell, this.grid.endCell, this.config.moveSpeed);
        } else {
            this.gridMode = mode;
        }
    }

    gridDraw() {
        for(let r = 0; r < this.config.cellsHeightCount; r++) {
            for(let c = 0; c < this.config.cellsWidthCount; c++) {
                let cell = this.grid.getCell({row: r, col: c});
                this.cellDraw(cell);
            }
        }
    }

    private gridModeToCellState(mode: GridMode): CellState {
        switch(mode) {
            case GridMode.Start:
                return CellState.start;
            case GridMode.End:
                return CellState.end;
            case GridMode.Obstacle:
                return CellState.obstacle;
            case GridMode.Empty:
                return CellState.empty;
        }
        return CellState.empty;
    }

    private mousePosToCellRowCol(x: number, y: number): CellPosition {
        let c = Math.floor(x / this.cellPropery.width);
        let r = Math.floor(y / this.cellPropery.height);
        return { row: r, col: c };
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