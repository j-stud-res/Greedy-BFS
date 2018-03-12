import Grid from "../grid/Cell";

let initGrid;

function setup() {
    createCanvas(600,600);
    background(66, 134, 244);
    initGrid = new Grid(60);
}

export { setup, initGrid };