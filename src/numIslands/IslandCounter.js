"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IslandCounter = void 0;
var IslandCounter = /** @class */ (function () {
    function IslandCounter(grid) {
        var _this = this;
        this.grid = grid;
        this.rows = grid.length;
        this.cols = this.rows > 0 ? grid[0].length : 0;
        this.visited = Array.from({ length: this.rows }, function () { return Array(_this.cols).fill(false); });
    }
    IslandCounter.prototype.depthFirstSearch = function (i, j) {
        var isOutOfBounds = i < 0 || i >= this.rows || j < 0 || j >= this.cols;
        if (isOutOfBounds)
            return;
        var isVisited = this.grid[i][j] === 0 || this.visited[i][j];
        if (isVisited)
            return;
        this.visited[i][j] = true;
        this.depthFirstSearch(i + 1, j); // below
        this.depthFirstSearch(i - 1, j); // on top
        this.depthFirstSearch(i, j + 1); // on right
        this.depthFirstSearch(i, j - 1); // on left
    };
    IslandCounter.prototype.countIslands = function () {
        var islandCount = 0;
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                if (this.grid[i][j] === 1 && !this.visited[i][j]) {
                    islandCount++;
                    this.depthFirstSearch(i, j);
                }
            }
        }
        return islandCount;
    };
    return IslandCounter;
}());
exports.IslandCounter = IslandCounter;
