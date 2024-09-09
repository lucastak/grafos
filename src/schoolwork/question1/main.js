"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Graph_1 = require("./Graph");
function createGraph() {
    var readlineSync = require("readline-sync");
    var graphType = readlineSync.question("Escolha o tipo de grafo: (1) Direcional não ponderado, (2) Não direcional ponderado: ");
    var isDirectional = graphType === "1";
    var isWeighted = graphType === "2";
    var graph = new Graph_1.Graph(isDirectional, isWeighted);
    var numberOfNodes = readlineSync.questionInt("Digite o número de nós do grafo: ");
    for (var i = 0; i < numberOfNodes; i++) {
        var nodeName = readlineSync.question("Digite o nome do n\u00F3 ".concat(i + 1, ": "));
        graph.addNode(nodeName);
    }
    while (true) {
        var startNode = readlineSync.question("Digite o nó de origem (ou 0 para sair): ");
        if (startNode === "0")
            break;
        var endNode = readlineSync.question("Digite o nó de destino: ");
        var weight = void 0;
        if (isWeighted) {
            weight = readlineSync.questionInt("Digite o peso da aresta: ");
        }
        graph.addEdge(startNode, endNode, weight);
    }
    graph.printGraph();
}
// Executa a função para criar o grafo
createGraph();
