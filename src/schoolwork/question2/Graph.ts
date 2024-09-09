type NodeInfo = {
  discovered: number;
  finished: number;
};

export class Graph {
  private adjacencyList: { [key: string]: string[] } = {};
  private time: number = 0;
  private nodeInfo: { [key: string]: NodeInfo } = {};

  addNode(node: string): void {
    if (!this.adjacencyList[node]) {
      this.adjacencyList[node] = [];
    }
  }

  addEdge(start: string, end: string): void {
    if (!this.adjacencyList[start]) {
      this.addNode(start);
    }
    if (!this.adjacencyList[end]) {
      this.addNode(end);
    }
    this.adjacencyList[start].push(end);
  }

  private depthFirstSearch(node: string, visited: Set<string>, stack: string[]): void {
    visited.add(node);
    this.time++;
    this.nodeInfo[node] = { discovered: this.time, finished: 0 };

    for (let neighbor of this.adjacencyList[node]) {
      if (!visited.has(neighbor)) {
        this.depthFirstSearch(neighbor, visited, stack);
      }
    }

    this.time++;
    this.nodeInfo[node].finished = this.time;
    stack.push(node);
  }

  topologicalSort(): void {
    let visited = new Set<string>();
    let stack: string[] = [];

    for (let node in this.adjacencyList) {
      if (!visited.has(node)) {
        this.depthFirstSearch(node, visited, stack);
      }
    }

    console.log("Ordenação topológica:");
    while (stack.length > 0) {
      const currentNode = stack.pop()!;
      console.log(`${currentNode} (${this.nodeInfo[currentNode].discovered}/${this.nodeInfo[currentNode].finished})`);
    }
  }


  private transposeGraph(): { [key: string]: string[] } {
    let transposed: { [key: string]: string[] } = {};

    for (let node in this.adjacencyList) {
      for (let neighbor of this.adjacencyList[node]) {
        if (!transposed[neighbor]) {
          transposed[neighbor] = [];
        }
        transposed[neighbor].push(node);
      }
    }

    return transposed;
  }

  stronglyConnectedComponents(): void {
    let visited = new Set<string>();
    let stack: string[] = [];

    for (let node in this.adjacencyList) {
      if (!visited.has(node)) {
        this.depthFirstSearch(node, visited, stack);
      }
    }

    const transposed = this.transposeGraph();

    visited.clear();
    let stronglyConnectedComponents: string[][] = [];
    while (stack.length > 0) {
      const node = stack.pop()!;
      if (!visited.has(node)) {
        let componentStack: string[] = [];
        this.depthFirstSearchComponent(node, visited, transposed, componentStack);
        stronglyConnectedComponents.push(componentStack);
      }
    }

    console.log("Componentes fortemente conectados:");
    for (let component of stronglyConnectedComponents) {
      console.log(`{${component.join(", ")}}`);
    }
  }

  private depthFirstSearchComponent(
    node: string,
    visited: Set<string>,
    graph: { [key: string]: string[] },
    componentStack: string[]
  ): void {
    visited.add(node);
    componentStack.push(node);

    if (graph[node]) {
      for (let neighbor of graph[node]) {
        if (!visited.has(neighbor)) {
          this.depthFirstSearchComponent(neighbor, visited, graph, componentStack);
        }
      }
    }
  }

  printDiscoveryAndFinishTimes(): void {
    console.log("Ordem de descoberta e finalização:");
    
    const nodesSortedByFinishTime = Object.keys(this.nodeInfo).sort(
      (a, b) => this.nodeInfo[b].finished - this.nodeInfo[a].finished
    );

    for (let node of nodesSortedByFinishTime) {
      const { discovered, finished } = this.nodeInfo[node];
      console.log(`${node} (${discovered}/${finished})`);
    }
  }
}
