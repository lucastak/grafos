"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Graph = void 0;
var Graph = /** @class */ (function () {
    function Graph(isDirectional, isWeighted) {
        this.adjacencyList = {};
        this.isDirectional = isDirectional;
        this.isWeighted = isWeighted;
    }
    Graph.prototype.addNode = function (node) {
        if (!this.adjacencyList[node]) {
            this.adjacencyList[node] = [];
        }
    };
    Graph.prototype.addEdge = function (start, end, weight) {
        if (!this.adjacencyList[start]) {
            this.addNode(start);
        }
        if (!this.adjacencyList[end]) {
            this.addNode(end);
        }
        if (this.isWeighted) {
            this.adjacencyList[start].push({ node: end, weight: weight });
            if (!this.isDirectional) {
                this.adjacencyList[end].push({ node: start, weight: weight });
            }
        }
        else {
            this.adjacencyList[start].push({ node: end });
            if (!this.isDirectional) {
                this.adjacencyList[end].push({ node: start });
            }
        }
    };
    Graph.prototype.printGraph = function () {
        var _this = this;
        for (var node in this.adjacencyList) {
            var edges = this.adjacencyList[node]
                .map(function (edge) {
                if (_this.isWeighted) {
                    return "".concat(edge.node, ": ").concat(edge.weight);
                }
                else {
                    return "-> ".concat(edge.node);
                }
            })
                .join(" ");
            console.log("".concat(node, " ").concat(edges));
        }
    };
    return Graph;
}());
exports.Graph = Graph;
