"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Graph_1 = require("./Graph");
function executeGraphAlgorithms() {
    var readlineSync = require("readline-sync");
    var graph = new Graph_1.Graph();
    var numberOfEdges = readlineSync.questionInt("Digite o número de arestas do grafo: ");
    for (var i = 0; i < numberOfEdges; i++) {
        var startNode = readlineSync.question("Digite o n\u00F3 de origem da aresta ".concat(i + 1, ": "));
        var endNode = readlineSync.question("Digite o n\u00F3 de destino da aresta ".concat(i + 1, ": "));
        graph.addEdge(startNode, endNode);
    }
    console.log("\nEscolha o algoritmo a ser executado:");
    console.log("1. Ordenação Topológica");
    console.log("2. Componentes Fortemente Conectados");
    var choice = readlineSync.questionInt("Digite sua escolha (1 ou 2): ");
    if (choice === 1) {
        console.log("\n--- Ordenação Topológica ---");
        graph.topologicalSort();
        graph.printDiscoveryAndFinishTimes();
    }
    else if (choice === 2) {
        console.log("\n--- Componentes Fortemente Conectados ---");
        graph.stronglyConnectedComponents();
        graph.printDiscoveryAndFinishTimes();
    }
    else {
        console.log("Escolha inválida.");
    }
}
executeGraphAlgorithms();
