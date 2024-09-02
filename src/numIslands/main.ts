import { IslandCounter } from "./IslandCounter";

const grid = [
    [1, 1, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 1, 1],
];

const islandCounter = new IslandCounter(grid);
console.log(islandCounter.countIslands()); //output: 3