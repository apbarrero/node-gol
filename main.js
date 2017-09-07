#!/usr/bin/env node
const e = require('./conway_engine.js');

const rand_bool = ()=>Math.random() < 0.5;
const W = 60, H = 30;
let g = new e.Grid(W, H);
for (var i = 0; i < W; i++)
    for (var j = 0; j < H; j++)
        if (rand_bool()) g.set(i, j);
const clear_scr = ()=>process.stdout.write('\033[2J');

clear_scr();
g.print();
setInterval(()=>{
    clear_scr();
    g.tick();
    g.print();
}, 1000);
