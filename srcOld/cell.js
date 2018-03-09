class Cell
{
    constructor(r, c, eR, eC)
    {
        this.r = r;
        this.c = c;
        this.dist = Math.abs(r - eR) + Math.abs(c - eC);
    }

    CompareTo(otherCell)
    {
        return this.dist - otherCell.dist;
    }
}