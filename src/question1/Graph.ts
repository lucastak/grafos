type Edge = {
    node: string;
    weight?: number;
  };
  
export class Graph {
    private adjacencyList: { [key: string]: Edge[] } = {};
    private isDirectional: boolean;
    private isWeighted: boolean;
  
    constructor(isDirectional: boolean, isWeighted: boolean) {
      this.isDirectional = isDirectional;
      this.isWeighted = isWeighted;
    }
  
    addNode(node: string): void {
      if (!this.adjacencyList[node]) {
        this.adjacencyList[node] = [];
      }
    }
  
    addEdge(start: string, end: string, weight?: number): void {
      if (!this.adjacencyList[start]) {
        this.addNode(start);
      }
      if (!this.adjacencyList[end]) {
        this.addNode(end);
      }
  
      if (this.isWeighted) {
        this.adjacencyList[start].push({ node: end, weight });
        if (!this.isDirectional) {
          this.adjacencyList[end].push({ node: start, weight });
        }
      } else {
        this.adjacencyList[start].push({ node: end });
        if (!this.isDirectional) {
          this.adjacencyList[end].push({ node: start });
        }
      }
    }
  
    printGraph(): void {
      for (let node in this.adjacencyList) {
        const edges = this.adjacencyList[node]
          .map((edge) => {
            if (this.isWeighted) {
              return `${edge.node}: ${edge.weight}`;
            } else {
              return `-> ${edge.node}`;
            }
          })
          .join(" ");
        console.log(`${node} ${edges}`);
      }
    }
}