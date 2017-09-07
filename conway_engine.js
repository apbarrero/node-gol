#!/usr/bin/env node

function Cell(){
    this.alive = false;
};

Cell.prototype.live = function(){ this.alive = true; };
Cell.prototype.die = function(){ this.alive = false; };
Cell.prototype.to_c = function(){ return this.alive ? '*' : '·'; };
Cell.prototype.tick = function(neighbours){
    if (!this.alive)
        return neighbours == 3;
    return neighbours == 2 || neighbours == 3;
};

function init_grid(cells, width, height){
    for (var y = 0; y < height; y++)
    {
        let row = new Array(width);
        for (let i = 0; i < width; i++)
            row[i] = new Cell();
        cells.push(row);
    }
};

function Grid(width, height){
    this.width = width;
    this.height = height;
    this.cells = [];
    init_grid(this.cells, width, height);
};

Grid.prototype.set = function(x, y){
    if (x<this.width && y<this.height)
        this.cells[y][x].live();
};

Grid.prototype.unset = function(x, y){
    if (x<this.width && y<this.height)
        this.cells[y][x].die();
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
                    n.push(this.cells[j][i]);
            }
        }
    }
    return n;
};

Grid.prototype.live_neighbours_count = function(x, y){
    return this.neighbours(x, y).reduce((t, c)=>c.alive ? t+1 : t, 0); };

Grid.prototype.tick = function(){
    let new_cells = [];
    init_grid(new_cells, this.width, this.height);
    for (var y = 0; y < this.height; y++)
    {
        let row = this.cells[y], new_row = new_cells[y];
        for (let x = 0; x < this.width; x++)
            row[x].tick(this.live_neighbours_count(x, y)) ?
                new_row[x].live() : new_row[x].die();
    }
    this.cells = new_cells;
};

module.exports = {Grid};

