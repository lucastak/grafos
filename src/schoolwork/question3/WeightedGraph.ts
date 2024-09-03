type Node = string;
type Edge = { node: Node; weight: number };
type GraphMap = Map<Node, Edge[]>;

export class WeightedGraph {
  private graph: GraphMap = new Map();

  addNode(node: Node): void {
    if (!this.graph.has(node)) {
      this.graph.set(node, []);
    }
  }

  addEdge(start: Node, end: Node, weight: number): void {
    this.addNode(start);
    this.addNode(end);
    this.graph.get(start)!.push({ node: end, weight });
    this.graph.get(end)!.push({ node: start, weight });
  }

  dijkstra(start: Node, end: Node): void {
    const distances: { [key: string]: number } = {};
    const prev: { [key: string]: Node | null } = {};
    const visited = new Set<Node>();
    const pq: { node: Node; priority: number }[] = [];

    for (let node of Array.from(this.graph.keys())) {
      distances[node] = Infinity;
      prev[node] = null;
    }
    distances[start] = 0;
    pq.push({ node: start, priority: 0 });

    const printControlTable = () => {
      console.log("Tabela de Controle:");
      console.log("Nó | Distância | Anterior");
      for (let node in distances) {
        console.log(`${node} | ${distances[node]} | ${prev[node]}`);
      }
      console.log("--------------------------");
    };

    while (pq.length > 0) {
      pq.sort((a, b) => a.priority - b.priority);
      const current = pq.shift()!.node;

      if (current === end) {
        break;
      }

      if (visited.has(current)) continue;
      visited.add(current);

      for (let neighbor of this.graph.get(current)!) {
        const alt = distances[current] + neighbor.weight;

        if (alt < distances[neighbor.node]) {
          distances[neighbor.node] = alt;
          prev[neighbor.node] = current;
          pq.push({ node: neighbor.node, priority: alt });
        }
      }
      
      printControlTable();
    }

    const path = [];
    let u = end;
    while (prev[u]) {
      path.unshift(u);
      u = prev[u]!;
    }
    path.unshift(start);

    console.log("Caminho mínimo:", path.join(" -> "));
  }

  aStar(start: Node, end: Node, heuristic: { [key: string]: number }): void {
    const openList: { node: Node; fScore: number }[] = [{ node: start, fScore: heuristic[start] }];
    const closedList = new Set<Node>();
    const gScore: { [key: string]: number } = {};
    const fScore: { [key: string]: number } = {};
    const prev: { [key: string]: Node | null } = {};

    for (let node of Array.from(this.graph.keys())) {
      gScore[node] = Infinity;
      fScore[node] = Infinity;
    }
    gScore[start] = 0;
    fScore[start] = heuristic[start];

    const printLists = () => {
      console.log("Lista aberta:", openList.map(item => item.node));
      console.log("Lista fechada:", Array.from(closedList));
      console.log("Tabela de Controle:");
      console.log("Nó | gScore | fScore | Anterior");
      for (let node in gScore) {
        console.log(`${node} | ${gScore[node]} | ${fScore[node]} | ${prev[node]}`);
      }
      console.log("--------------------------");
    };

    while (openList.length > 0) {
      openList.sort((a, b) => a.fScore - b.fScore);
      const current = openList.shift()!.node;

      if (current === end) {
        break;
      }

      closedList.add(current);

      for (let neighbor of this.graph.get(current)!) {
        if (closedList.has(neighbor.node)) continue;

        const tentativeGScore = gScore[current] + neighbor.weight;
        if (tentativeGScore < gScore[neighbor.node]) {
          gScore[neighbor.node] = tentativeGScore;
          fScore[neighbor.node] = gScore[neighbor.node] + heuristic[neighbor.node];
          prev[neighbor.node] = current;

          if (!openList.find(item => item.node === neighbor.node)) {
            openList.push({ node: neighbor.node, fScore: fScore[neighbor.node] });
          }
        }
      }

      printLists();
    }

    const path = [];
    let u = end;
    while (prev[u]) {
      path.unshift(u);
      u = prev[u]!;
    }
    path.unshift(start);

    console.log("Caminho mínimo:", path.join(" -> "));
  }
}