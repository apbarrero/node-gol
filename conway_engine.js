#!/usr/bin/env node

function Cell(){
    this.alive = false;
};

Cell.prototype.live = function(){ this.alive = true; };
Cell.prototype.die = function(){ this.alive = false; };
Cell.prototype.to_c = function(){ return this.alive ? '*' : '·'; };

function Grid(width, height){
    this.width = width;
    this.height = height;
    this.cells = [];
    for (var y = 0; y < height; y++)
    {
        let row = new Array(width);
        for (let i = 0; i < width; i++)
            row[i] = new Cell();
        this.cells.push(row);
    }
};

Grid.prototype.set = function(x, y){
    if (x<this.width && y<this.height)
        this.cells[x][y].live();
};

Grid.prototype.unset = function(x, y){
    if (x<this.width && y<this.height)
        this.cells[x][y].die();
};

Grid.prototype.print = function(){
    for (let row of this.cells)
        console.log(row.map(c=>c.to_c()).join(''));
};

Grid.prototype.neighbours = function(x, y){
    let n = [];
    for (let i = x-1; i <= x+1; i++)
    {
        if (i>=0 && i<this.width)
        {
            for (let j = y-1; j <= y+1; j++)
            {
                if (j>=0 && j<this.height && !(i==x && j==y))
                    n.push(this.cells[i][j]);
            }
        }
    }
    return n;
};

Grid.prototype.live_neighbours_count = function(x, y){
    return this.neighbours(x, y).reduce((t, c)=>c.alive ? t+1 : t, 0); };

module.exports = {Grid};

