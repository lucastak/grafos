import { Graph } from "./Graph";

function executeGraphAlgorithms(): void {
    const readlineSync = require("readline-sync");
    const graph = new Graph();
  
    const numberOfEdges = readlineSync.questionInt("Digite o número de arestas do grafo: ");
  
    for (let i = 0; i < numberOfEdges; i++) {
      const startNode = readlineSync.question(`Digite o nó de origem da aresta ${i + 1}: `);
      const endNode = readlineSync.question(`Digite o nó de destino da aresta ${i + 1}: `);
      graph.addEdge(startNode, endNode);
    }
  
    console.log("\nEscolha o algoritmo a ser executado:");
    console.log("1. Ordenação Topológica");
    console.log("2. Componentes Fortemente Conectados");
    const choice = readlineSync.questionInt("Digite sua escolha (1 ou 2): ");
  
    if (choice === 1) {
      console.log("\n--- Ordenação Topológica ---");
      graph.topologicalSort();
      graph.printDiscoveryAndFinishTimes();
    } else if (choice === 2) {
      console.log("\n--- Componentes Fortemente Conectados ---");
      graph.stronglyConnectedComponents();
      graph.printDiscoveryAndFinishTimes();
    } else {
      console.log("Escolha inválida.");
    }
}
  
executeGraphAlgorithms();
  