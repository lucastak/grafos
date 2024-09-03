type Edge = {
    node: string;
    weight: number;
  };
  
export class Graph {
    private adjacencyList: Map<string, Edge[]>;
  
    constructor() {
      this.adjacencyList = new Map<string, Edge[]>();
    }
  
    addVertex(vertex: string) {
      if (!this.adjacencyList.has(vertex)) {
        this.adjacencyList.set(vertex, []);
      }
    }
  
    addEdge(vertex1: string, vertex2: string, weight: number) {
      if (this.adjacencyList.has(vertex1) && this.adjacencyList.has(vertex2)) {
        this.adjacencyList.get(vertex1)?.push({ node: vertex2, weight });
        this.adjacencyList.get(vertex2)?.push({ node: vertex1, weight });
      }
    }
  
    dijkstra(start: string, end: string): string[] | null {
      const distances: Record<string, number> = {};
      const previous: Record<string, string | null> = {};
      const priorityQueue: [string, number][] = [];
  
      for (let vertex of Array.from(this.adjacencyList.keys())) {
        if (vertex === start) {
          distances[vertex] = 0;
          priorityQueue.push([vertex, 0]);
        } else {
          distances[vertex] = Infinity;
          priorityQueue.push([vertex, Infinity]);
        }
        previous[vertex] = null;
      }
  
      while (priorityQueue.length) {
        priorityQueue.sort((a, b) => a[1] - b[1]);
        const [currentVertex] = priorityQueue.shift()!;
  
        if (currentVertex === end) {
          const path: string[] = [];
          let current = end;
          while (previous[current]) {
            path.push(current);
            current = previous[current]!;
          }
          path.push(start);
          return path.reverse();
        }
  
        if (currentVertex || distances[currentVertex] !== Infinity) {
          for (let neighbor of this.adjacencyList.get(currentVertex) || []) {
            let candidate = distances[currentVertex] + neighbor.weight;
            if (candidate < distances[neighbor.node]) {
              distances[neighbor.node] = candidate;
              previous[neighbor.node] = currentVertex;
              priorityQueue.push([neighbor.node, candidate]);
            }
          }
        }
      }
  
      return null;
    }
}
  