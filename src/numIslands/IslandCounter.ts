export class IslandCounter {
    private grid: number[][];
    private visited: boolean[][];
    private rows: number;
    private cols: number;

    constructor(grid: number[][]) {
        this.grid = grid;
        this.rows = grid.length;
        this.cols = this.rows > 0 ? grid[0].length : 0;
        this.visited = Array.from({ length: this.rows }, () => Array(this.cols).fill(false));
    }

    private depthFirstSearch(i: number, j: number): void {
        const isOutOfBounds = i < 0 || i >= this.rows || j < 0 || j >= this.cols;
        if (isOutOfBounds) return;

        const isVisited = this.grid[i][j] === 0 || this.visited[i][j];
        if (isVisited) return;

        this.visited[i][j] = true;

        this.depthFirstSearch(i + 1, j); // below
        this.depthFirstSearch(i - 1, j); // on top
        this.depthFirstSearch(i, j + 1); // on right
        this.depthFirstSearch(i, j - 1); // on left
    }

    public countIslands(): number {
        let islandCount = 0;

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (this.grid[i][j] === 1 && !this.visited[i][j]) {
                    islandCount++;
                    this.depthFirstSearch(i, j);
                }
            }
        }

        return islandCount;
    }
}