"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeightedGraph = void 0;
var WeightedGraph = /** @class */ (function () {
    function WeightedGraph() {
        this.graph = new Map();
    }
    WeightedGraph.prototype.addNode = function (node) {
        if (!this.graph.has(node)) {
            this.graph.set(node, []);
        }
    };
    WeightedGraph.prototype.addEdge = function (start, end, weight) {
        this.addNode(start);
        this.addNode(end);
        this.graph.get(start).push({ node: end, weight: weight });
        this.graph.get(end).push({ node: start, weight: weight });
    };
    WeightedGraph.prototype.dijkstra = function (start, end) {
        var distances = {};
        var prev = {};
        var visited = new Set();
        var pq = [];
        for (var _i = 0, _a = Array.from(this.graph.keys()); _i < _a.length; _i++) {
            var node = _a[_i];
            distances[node] = Infinity;
            prev[node] = null;
        }
        distances[start] = 0;
        pq.push({ node: start, priority: 0 });
        var printControlTable = function () {
            console.log("Tabela de Controle:");
            console.log("Nó | Distância | Anterior");
            for (var node in distances) {
                console.log("".concat(node, " | ").concat(distances[node], " | ").concat(prev[node]));
            }
            console.log("--------------------------");
        };
        while (pq.length > 0) {
            pq.sort(function (a, b) { return a.priority - b.priority; });
            var current = pq.shift().node;
            if (current === end) {
                break;
            }
            if (visited.has(current))
                continue;
            visited.add(current);
            for (var _b = 0, _c = this.graph.get(current); _b < _c.length; _b++) {
                var neighbor = _c[_b];
                var alt = distances[current] + neighbor.weight;
                if (alt < distances[neighbor.node]) {
                    distances[neighbor.node] = alt;
                    prev[neighbor.node] = current;
                    pq.push({ node: neighbor.node, priority: alt });
                }
            }
            printControlTable();
        }
        var path = [];
        var u = end;
        while (prev[u]) {
            path.unshift(u);
            u = prev[u];
        }
        path.unshift(start);
        console.log("Caminho mínimo:", path.join(" -> "));
    };
    WeightedGraph.prototype.aStar = function (start, end, heuristic) {
        var openList = [{ node: start, fScore: heuristic[start] }];
        var closedList = new Set();
        var gScore = {};
        var fScore = {};
        var prev = {};
        for (var _i = 0, _a = Array.from(this.graph.keys()); _i < _a.length; _i++) {
            var node = _a[_i];
            gScore[node] = Infinity;
            fScore[node] = Infinity;
        }
        gScore[start] = 0;
        fScore[start] = heuristic[start];
        var printLists = function () {
            console.log("Lista aberta:", openList.map(function (item) { return item.node; }));
            console.log("Lista fechada:", Array.from(closedList));
            console.log("Tabela de Controle:");
            console.log("Nó | gScore | fScore | Anterior");
            for (var node in gScore) {
                console.log("".concat(node, " | ").concat(gScore[node], " | ").concat(fScore[node], " | ").concat(prev[node]));
            }
            console.log("--------------------------");
        };
        while (openList.length > 0) {
            openList.sort(function (a, b) { return a.fScore - b.fScore; });
            var current = openList.shift().node;
            if (current === end) {
                break;
            }
            closedList.add(current);
            var _loop_1 = function (neighbor) {
                if (closedList.has(neighbor.node))
                    return "continue";
                var tentativeGScore = gScore[current] + neighbor.weight;
                if (tentativeGScore < gScore[neighbor.node]) {
                    gScore[neighbor.node] = tentativeGScore;
                    fScore[neighbor.node] = gScore[neighbor.node] + heuristic[neighbor.node];
                    prev[neighbor.node] = current;
                    if (!openList.find(function (item) { return item.node === neighbor.node; })) {
                        openList.push({ node: neighbor.node, fScore: fScore[neighbor.node] });
                    }
                }
            };
            for (var _b = 0, _c = this.graph.get(current); _b < _c.length; _b++) {
                var neighbor = _c[_b];
                _loop_1(neighbor);
            }
            printLists();
        }
        var path = [];
        var u = end;
        while (prev[u]) {
            path.unshift(u);
            u = prev[u];
        }
        path.unshift(start);
        console.log("Caminho mínimo:", path.join(" -> "));
    };
    return WeightedGraph;
}());
exports.WeightedGraph = WeightedGraph;
