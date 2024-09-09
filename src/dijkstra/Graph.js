"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Graph = void 0;
var Graph = /** @class */ (function () {
    function Graph() {
        this.adjacencyList = new Map();
    }
    Graph.prototype.addVertex = function (vertex) {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, []);
        }
    };
    Graph.prototype.addEdge = function (vertex1, vertex2, weight) {
        var _a, _b;
        if (this.adjacencyList.has(vertex1) && this.adjacencyList.has(vertex2)) {
            (_a = this.adjacencyList.get(vertex1)) === null || _a === void 0 ? void 0 : _a.push({ node: vertex2, weight: weight });
            (_b = this.adjacencyList.get(vertex2)) === null || _b === void 0 ? void 0 : _b.push({ node: vertex1, weight: weight });
        }
    };
    Graph.prototype.dijkstra = function (start, end) {
        var distances = {};
        var previous = {};
        var priorityQueue = [];
        for (var _i = 0, _a = Array.from(this.adjacencyList.keys()); _i < _a.length; _i++) {
            var vertex = _a[_i];
            if (vertex === start) {
                distances[vertex] = 0;
                priorityQueue.push([vertex, 0]);
            }
            else {
                distances[vertex] = Infinity;
                priorityQueue.push([vertex, Infinity]);
            }
            previous[vertex] = null;
        }
        while (priorityQueue.length) {
            priorityQueue.sort(function (a, b) { return a[1] - b[1]; });
            var currentVertex = priorityQueue.shift()[0];
            if (currentVertex === end) {
                var path = [];
                var current = end;
                while (previous[current]) {
                    path.push(current);
                    current = previous[current];
                }
                path.push(start);
                return path.reverse();
            }
            if (currentVertex || distances[currentVertex] !== Infinity) {
                for (var _b = 0, _c = this.adjacencyList.get(currentVertex) || []; _b < _c.length; _b++) {
                    var neighbor = _c[_b];
                    var candidate = distances[currentVertex] + neighbor.weight;
                    if (candidate < distances[neighbor.node]) {
                        distances[neighbor.node] = candidate;
                        previous[neighbor.node] = currentVertex;
                        priorityQueue.push([neighbor.node, candidate]);
                    }
                }
            }
        }
        return null;
    };
    return Graph;
}());
exports.Graph = Graph;
