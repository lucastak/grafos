"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WeightedGraph_1 = require("./WeightedGraph");
function executeWeightedGraphAlgorithms() {
    var readlineSync = require("readline-sync");
    var graph = new WeightedGraph_1.WeightedGraph();
    var numberOfEdges = readlineSync.questionInt("Digite o número de arestas do grafo: ");
    for (var i = 0; i < numberOfEdges; i++) {
        var startNode_1 = readlineSync.question("Digite o n\u00F3 de origem da aresta ".concat(i + 1, ": "));
        var endNode_1 = readlineSync.question("Digite o n\u00F3 de destino da aresta ".concat(i + 1, ": "));
        var weight = readlineSync.questionInt("Digite o peso da aresta ".concat(i + 1, ": "));
        graph.addEdge(startNode_1, endNode_1, weight);
    }
    var startNode = readlineSync.question("Digite o nó de partida: ");
    var endNode = readlineSync.question("Digite o nó de destino: ");
    console.log("\nEscolha o algoritmo a ser executado:");
    console.log("1. Algoritmo de Dijkstra");
    console.log("2. Algoritmo de A*");
    var choice = readlineSync.questionInt("Digite sua escolha (1 ou 2): ");
    if (choice === 1) {
        console.log("\n--- Algoritmo de Dijkstra ---");
        graph.dijkstra(startNode, endNode);
    }
    else if (choice === 2) {
        var heuristic = {};
        console.log("\nDigite as heurísticas (distância euclidiana até o nó de destino):");
        for (var _i = 0, _a = Array.from(graph["graph"].keys()); _i < _a.length; _i++) {
            var node = _a[_i];
            heuristic[node] = readlineSync.questionInt("Heur\u00EDstica para o n\u00F3 ".concat(node, ": "));
        }
        console.log("\n--- Algoritmo de A* ---");
        graph.aStar(startNode, endNode, heuristic);
    }
    else {
        console.log("Escolha inválida.");
    }
}
executeWeightedGraphAlgorithms();
