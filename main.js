#!/usr/bin/env node
const e = require('./conway_engine.js');

let g = new e.Grid(20, 20);
g.set(0, 1);
g.set(0, 19);
g.set(18, 19);
g.print();
console.log(g.neighbours(3, 3), g.live_neighbours_count(3, 3));
console.log(g.neighbours(1, 1), g.live_neighbours_count(1, 1));
console.log(g.neighbours(0, 2), g.live_neighbours_count(0, 2));
console.log(g.neighbours(0, 2), g.live_neighbours_count(0, 2));
console.log(g.neighbours(0, 0), g.live_neighbours_count(0, 0));
