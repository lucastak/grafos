"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IslandCounter_1 = require("./IslandCounter");
var grid = [
    [1, 1, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1],
];
var islandCounter = new IslandCounter_1.IslandCounter(grid);
console.log(islandCounter.countIslands()); //output: 3
