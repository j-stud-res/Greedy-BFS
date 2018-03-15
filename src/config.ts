import { ControlButtonConfig, Point } from "./screen-control/button-control/index";
import { GridMode } from "./screen-control/grid-control/GridControl";

export interface GridConfig {
    gridWidth: number;
    gridHeight: number;
    cellsWidthCount: number;
    cellsHeightCount: number;
    moveSpeed: number;
}

export const defaultGridConfig = {
    gridWidth: 500,
    gridHeight: 500,
    cellsWidthCount: 25,
    cellsHeightCount: 25,
    moveSpeed: 100
}

export function controlButtonsConfig(sketch: p5): ControlButtonConfig[] {
    return [
        {
            point: new Point(defaultGridConfig.gridWidth + 11, 10),
            width: 79,
            height: 20,
            displayText: "Play",
            colorActive: "#4286f4",
            colorInactive: "#43c6f2",
            active: false,
            mode: GridMode.Play
        },
        {
            point: new Point(defaultGridConfig.gridWidth + 11, 40),
            width: 79,
            height: 20,
            displayText: "Edit",
            colorActive: "#4286f4",
            colorInactive: "#43c6f2",          
            active: true,
            mode: GridMode.Edit,
            subControlButtons: [
                {
                    point: new Point(defaultGridConfig.gridWidth + 31, 70),
                    width: 59,
                    height: 20,
                    displayText: "start",
                    colorActive: "#4286f4",
                    colorInactive: "#43c6f2",            
                    active: false,
                    mode: GridMode.Start
                },
                {
                    point: new Point(defaultGridConfig.gridWidth + 31, 100),
                    width: 59,
                    height: 20,
                    displayText: "end",
                    colorActive: "#4286f4",
                    colorInactive: "#43c6f2",           
                    active: false,
                    mode: GridMode.End
                },
                {
                    point: new Point(defaultGridConfig.gridWidth + 31, 130),
                    width: 59,
                    height: 20,
                    displayText: "obstacle",
                    colorActive: "#4286f4",
                    colorInactive: "#43c6f2",           
                    active: false,
                    mode: GridMode.Obstacle
                },
                {
                    point: new Point(defaultGridConfig.gridWidth + 31, 160),
                    width: 59,
                    height: 20,
                    displayText: "empty",
                    colorActive: "#4286f4",
                    colorInactive: "#43c6f2",            
                    active: false,
                    mode: GridMode.Empty
                }
            ]
        }
    ];
}