interface Node {
    id: number
}

class Node {
    id: number
    constructor(id: number){
        this.id = id
    }
}

interface Edge {
    to: Node,
    from: Node,
    weight: number
}

class Edge {
    to: Node
    from: Node
    weight: number = 0
    constructor(to: Node, from: Node, weight?: number) {
        this.to = to
        this.from = from
        this.weight = weight ? weight : 1
    }
}

interface Graph {
    adjList: Edge[][],
    vertices: Node[],
    size: number
}

class Graph {
    adjList: Edge[][] = []
    vertices: Node[] = []
    size: number
    constructor(size: number) {
        this.size = size
        for (var i = 0; i < this.size; i++) {
            this.vertices.push(new Node(i))
            let edgeList: Edge[] = []
            this.adjList.push(edgeList)
        }
    }
}

function generateWeight(size: string) {
    if (size === 'small') {
        return Math.floor(Math.random() * 6) + 1
    }
    else if (size === 'medium') {
        return Math.floor(Math.random() * 12) + 1
    }
    else {
        return Math.floor(Math.random() * 24) + 1
    }
}

let EDGE_PROBABILITY = 0.4

export function buildGraph(size: string, directed: boolean, weighted: boolean) {
    // can build 3 different sizes
    let V: number = 0
    if (size === 'small') {
        // small graphs will contain 5 or 6 vertices
        V = Math.floor(Math.random() * 2) + 5
    }
    else if (size === 'medium') {
        // medium graphs will contain 10 to 12 vertices
        V = Math.floor(Math.random() * 3) + 10
    }
    else {
        // large graphs will contain 20 to 24 vertices
        V = Math.floor(Math.random() * 5) + 20
    }
    let g: Graph = new Graph(V)
    
    for (var i = 0; i < V; i++) {
        for (var j = 0; j < V; j++) {
            if (i === j)
                continue
            let roll = Math.random()
            if (roll <= EDGE_PROBABILITY) {
                let weight = weighted ? generateWeight(size) : 1
                g.adjList[i].push(new Edge(g.vertices[i], g.vertices[j], weight))
            }
        }
    }
    return g;
}