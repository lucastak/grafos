"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Graph = void 0;
var Graph = /** @class */ (function () {
    function Graph() {
        this.adjacencyList = {};
        this.time = 0;
        this.nodeInfo = {};
    }
    Graph.prototype.addNode = function (node) {
        if (!this.adjacencyList[node]) {
            this.adjacencyList[node] = [];
        }
    };
    Graph.prototype.addEdge = function (start, end) {
        if (!this.adjacencyList[start]) {
            this.addNode(start);
        }
        if (!this.adjacencyList[end]) {
            this.addNode(end);
        }
        this.adjacencyList[start].push(end);
    };
    Graph.prototype.depthFirstSearch = function (node, visited, stack) {
        visited.add(node);
        this.time++;
        this.nodeInfo[node] = { discovered: this.time, finished: 0 };
        for (var _i = 0, _a = this.adjacencyList[node]; _i < _a.length; _i++) {
            var neighbor = _a[_i];
            if (!visited.has(neighbor)) {
                this.depthFirstSearch(neighbor, visited, stack);
            }
        }
        this.time++;
        this.nodeInfo[node].finished = this.time;
        stack.push(node);
    };
    Graph.prototype.topologicalSort = function () {
        var visited = new Set();
        var stack = [];
        // Executar DFS em todos os nós
        for (var node in this.adjacencyList) {
            if (!visited.has(node)) {
                this.depthFirstSearch(node, visited, stack);
            }
        }
        // O stack possui os nós na ordem inversa ao esperado, por isso usamos reverse()
        console.log("Ordenação topológica:");
        while (stack.length > 0) {
            var currentNode = stack.pop();
            console.log("".concat(currentNode, " (").concat(this.nodeInfo[currentNode].discovered, "/").concat(this.nodeInfo[currentNode].finished, ")"));
        }
    };
    Graph.prototype.transposeGraph = function () {
        var transposed = {};
        for (var node in this.adjacencyList) {
            for (var _i = 0, _a = this.adjacencyList[node]; _i < _a.length; _i++) {
                var neighbor = _a[_i];
                if (!transposed[neighbor]) {
                    transposed[neighbor] = [];
                }
                transposed[neighbor].push(node);
            }
        }
        return transposed;
    };
    Graph.prototype.stronglyConnectedComponents = function () {
        var visited = new Set();
        var stack = [];
        for (var node in this.adjacencyList) {
            if (!visited.has(node)) {
                this.depthFirstSearch(node, visited, stack);
            }
        }
        var transposed = this.transposeGraph();
        visited.clear();
        var stronglyConnectedComponents = [];
        while (stack.length > 0) {
            var node = stack.pop();
            if (!visited.has(node)) {
                var componentStack = [];
                this.depthFirstSearchComponent(node, visited, transposed, componentStack);
                stronglyConnectedComponents.push(componentStack);
            }
        }
        console.log("Componentes fortemente conectados:");
        for (var _i = 0, stronglyConnectedComponents_1 = stronglyConnectedComponents; _i < stronglyConnectedComponents_1.length; _i++) {
            var component = stronglyConnectedComponents_1[_i];
            console.log("{".concat(component.join(", "), "}"));
        }
    };
    Graph.prototype.depthFirstSearchComponent = function (node, visited, graph, componentStack) {
        visited.add(node);
        componentStack.push(node);
        if (graph[node]) {
            for (var _i = 0, _a = graph[node]; _i < _a.length; _i++) {
                var neighbor = _a[_i];
                if (!visited.has(neighbor)) {
                    this.depthFirstSearchComponent(neighbor, visited, graph, componentStack);
                }
            }
        }
    };
    Graph.prototype.printDiscoveryAndFinishTimes = function () {
        var _this = this;
        console.log("Ordem de descoberta e finalização:");
        // Ordenar os nós pelo tempo de finalização (decrescente)
        var nodesSortedByFinishTime = Object.keys(this.nodeInfo).sort(function (a, b) { return _this.nodeInfo[b].finished - _this.nodeInfo[a].finished; });
        for (var _i = 0, nodesSortedByFinishTime_1 = nodesSortedByFinishTime; _i < nodesSortedByFinishTime_1.length; _i++) {
            var node = nodesSortedByFinishTime_1[_i];
            var _a = this.nodeInfo[node], discovered = _a.discovered, finished = _a.finished;
            console.log("".concat(node, " (").concat(discovered, "/").concat(finished, ")"));
        }
    };
    return Graph;
}());
exports.Graph = Graph;
