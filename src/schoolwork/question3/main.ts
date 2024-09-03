import { WeightedGraph } from "./WeightedGraph";

function executeWeightedGraphAlgorithms(): void {
    const readlineSync = require("readline-sync");
    const graph = new WeightedGraph();
  
    const numberOfEdges = readlineSync.questionInt("Digite o número de arestas do grafo: ");
    for (let i = 0; i < numberOfEdges; i++) {
      const startNode = readlineSync.question(`Digite o nó de origem da aresta ${i + 1}: `);
      const endNode = readlineSync.question(`Digite o nó de destino da aresta ${i + 1}: `);
      const weight = readlineSync.questionInt(`Digite o peso da aresta ${i + 1}: `);
      graph.addEdge(startNode, endNode, weight);
    }
  
    const startNode = readlineSync.question("Digite o nó de partida: ");
    const endNode = readlineSync.question("Digite o nó de destino: ");
  
    console.log("\nEscolha o algoritmo a ser executado:");
    console.log("1. Algoritmo de Dijkstra");
    console.log("2. Algoritmo de A*");
    const choice = readlineSync.questionInt("Digite sua escolha (1 ou 2): ");
  
    if (choice === 1) {
      console.log("\n--- Algoritmo de Dijkstra ---");
      graph.dijkstra(startNode, endNode);
    } else if (choice === 2) {
      const heuristic: { [key: string]: number } = {};
      console.log("\nDigite as heurísticas (distância euclidiana até o nó de destino):");

      for (let node of Array.from(graph["graph"].keys())) {
        heuristic[node] = readlineSync.questionInt(`Heurística para o nó ${node}: `);
      }
  
      console.log("\n--- Algoritmo de A* ---");
      graph.aStar(startNode, endNode, heuristic);
    } else {
      console.log("Escolha inválida.");
    }
}
  

executeWeightedGraphAlgorithms();