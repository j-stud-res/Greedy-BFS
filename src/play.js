
let colors;
let grid;
let queue;
let currPos;
let endPos;
let moveInterval;
function setup()
{
    queue = new PriorityQueue((cell1, cell2) => {
        let compare = cell1.CompareTo(cell2);
        return -compare;
    });
    let cnvs = createCanvas(600, 600);
    colors = 
    {
        empty: color(0, 255, 0),
        start: color(204, 0, 255),
        end: color(0, 0, 255),
        step: color(255, 153, 255),
        x: color(102, 0, 51)
    }
    grid = [];
    for(let r = 0; r < 50; r++)
    {
        let row = [];
        for(let c = 0; c < 50; c++)
        {
            if(r === 3 && c === 3)
            {
                row.push("end");
            } else if(r === 48 && c === 48)
            {
                row.push("start");
            } else if((r === 30 && c > 30 && c < 50) || (c == 31 && r > 30 && r < 40))
            {
                    row.push("x");
            } else {
                row.push("empty");
            }
        }
        grid.push(row);
    }
    currPos = new Cell(48, 48, 3, 3);
    endPos = new Cell(3, 3, 3, 3);
    moveInterval = setInterval(makeAmove, 100);
    //cnvs.mouseClicked(changeColor)

}

function draw()
{
    background(125);
    for(let r = 0; r < 50; r++)
    {
        for(let c = 0; c < 50; c++)
        {
            drawRect(c * 10, r * 10, grid[r][c]);
        }
    }
}

function drawRect(x, y, char)
{
    push();
    strokeWeight(1);
    let color;
    switch(char)
    {
        case "empty":
            color = colors.empty;
            break;
        case "start":
            color = colors.start;
            break;
        case "end":
            color = colors.end;
            break;
        case "x":
            color = colors.x;
            break;
        default:
            color = colors.step;
            break;
    }
    fill(color);
    rect(x, y, 10, 10);
    pop();
}

function changeColor(r, c)
{
    grid[r][c] = "step";
}

function makeAmove()
{
    lookUp();
    lookDown();
    lookLeft();
    lookRight();
    let nextCell = queue.Pop();
    if(nextCell.r == endPos.r && nextCell.c == endPos.c) {
        clearInterval(moveInterval)
    } else {
        changeColor(nextCell.r, nextCell.c);
        currPos = nextCell;
    }

}

function lookUp()
{
    if(grid[currPos.r - 1] && grid[currPos.r - 1][currPos.c])
    {
        let cellValue = grid[currPos.r -1][currPos.c];
        if(cellValue !== "x" && cellValue !== "step")
        {
            let cell = new Cell(currPos.r - 1, currPos.c, endPos.r, endPos.c )
            queue.Push(cell);
        }
    }
}

function lookDown()
{
    if(grid[currPos.r + 1] && grid[currPos.r + 1][currPos.c])
    {
        let cellValue = grid[currPos.r + 1][currPos.c];
        if(cellValue !== "x" && cellValue !== "step")
        {
            let cell = new Cell(currPos.r + 1, currPos.c, endPos.r, endPos.c );
            queue.Push(cell);
        }
    }
}

function lookLeft()
{
    if(grid[currPos.r][currPos.c -  1])
    {
        let cellValue = grid[currPos.r][currPos.c - 1];
        if(cellValue !== "x" && cellValue !== "step")
        {
            let cell = new Cell(currPos.r, currPos.c - 1, endPos.r, endPos.c );
            queue.Push(cell);
        }
    }
}

function lookRight()
{
    if(grid[currPos.r][currPos.c +  1])
    {
        let cellValue = grid[currPos.r][currPos.c + 1];
        if(cellValue !== "x" && cellValue !== "step")
        {
            let cell = new Cell(currPos.r, currPos.c + 1, endPos.r, endPos.c )
            queue.Push(cell);
        }
    }
}



// function changeColor()
// {
//     let x = mouseX;
//     let y = mouseY;
//     let col = Math.trunc(x / 10);
//     let row = Math.trunc(y / 10);
//     grid[row][col] = "st";
// }
