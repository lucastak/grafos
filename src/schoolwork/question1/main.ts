import { Graph } from "./Graph";

function createGraph(): void {
    const readlineSync = require("readline-sync");
  
    const graphType = readlineSync.question(
      "Escolha o tipo de grafo: (1) Direcional não ponderado, (2) Não direcional ponderado: "
    );
  
    let isDirectional = graphType === "1";
    let isWeighted = graphType === "2";
  
    const graph = new Graph(isDirectional, isWeighted);
  
    const numberOfNodes = readlineSync.questionInt("Digite o número de nós do grafo: ");
  
    for (let i = 0; i < numberOfNodes; i++) {
      const nodeName = readlineSync.question(`Digite o nome do nó ${i + 1}: `);
      graph.addNode(nodeName);
    }
  
    while (true) {
      const startNode = readlineSync.question("Digite o nó de origem (ou 0 para sair): ");
      if (startNode === "0") break;
  
      const endNode = readlineSync.question("Digite o nó de destino: ");
      let weight;
      if (isWeighted) {
        weight = readlineSync.questionInt("Digite o peso da aresta: ");
      }
  
      graph.addEdge(startNode, endNode, weight);
    }
  
    graph.printGraph();
}
  
createGraph();