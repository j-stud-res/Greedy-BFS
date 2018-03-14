import { ControlButtonConfig } from "./screen-control/ControlButton";
import { Point } from "./screen-control/Point";

export interface GridConfig {
    gridWidth: number;
    gridHeight: number;
    cellsWidthCount: number;
    cellsHeightCount: number;
}

export const defaultGridConfig = {
    gridWidth: 500,
    gridHeight: 500,
    cellsWidthCount: 50,
    cellsHeightCount: 50
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
            active: true
        },
        {
            point: new Point(defaultGridConfig.gridWidth + 11, 40),
            width: 79,
            height: 20,
            displayText: "Edit",
            colorActive: "#4286f4",
            colorInactive: "#43c6f2",          
            active: false,
            subControlButtons: [
                {
                    point: new Point(defaultGridConfig.gridWidth + 31, 70),
                    width: 59,
                    height: 20,
                    displayText: "start",
                    colorActive: "#4286f4",
                    colorInactive: "#43c6f2",            
                    active: false
                },
                {
                    point: new Point(defaultGridConfig.gridWidth + 31, 100),
                    width: 59,
                    height: 20,
                    displayText: "end",
                    colorActive: "#4286f4",
                    colorInactive: "#43c6f2",           
                    active: false
                },
                {
                    point: new Point(defaultGridConfig.gridWidth + 31, 130),
                    width: 59,
                    height: 20,
                    displayText: "obstacle",
                    colorActive: "#4286f4",
                    colorInactive: "#43c6f2",           
                    active: false
                },
                {
                    point: new Point(defaultGridConfig.gridWidth + 31, 160),
                    width: 59,
                    height: 20,
                    displayText: "empty",
                    colorActive: "#4286f4",
                    colorInactive: "#43c6f2",            
                    active: false
                }
            ]
        }
    ];
}