import Graph from '../Components/Graph'
import { Elements, Edge, Node, FlowElement, ArrowHeadType } from 'react-flow-renderer'
import { NodeWidth, GridDimensions, AsciiA, NodeOffset, EdgeFactor } from '../Constants'

interface AdjacencyMap {
    edgeLists: Map<string, {to: string, weight: number}[]>,
    isWeighted: boolean,
    isDirected: boolean,
    sizeEnum: string
}

const generateXYPosition = (pos: number, width: number) => {
    return {
        x: Math.floor(pos / width) * (NodeWidth + NodeOffset),
        y: (pos % width) * (NodeWidth + NodeOffset)
    }
}

const generateWeight = (numElts: number) => {
    return Math.floor(Math.random() * numElts) + 1
}

/**
 * builds a graph adjacency list in map format.
 * 
 * @param size enum string (either 'small', 'medium', or 'large')
 * @param weighted true for random weights, false for weights that are all 1
 * @param directed true will produce 1-way edges, false means all edges are two-way
 * @returns graph adjacency list in map form.
 */
export const buildAdjacencyMap = (size: string, weighted: boolean, directed: boolean) => {
    // NOTE will need to track visited nodes and traversed edges in the traversal algorithms.
    /**
     * 'small' corresponds to 5-6
     * 'medium' corresponds to 10-12
     * 'large' corresponds to 20-24
     */
    let V = (size === 'small') ? Math.floor(Math.random() * 2) + 5 :
        (size === 'medium') ? Math.floor(Math.random() * 3) + 10 :
            Math.floor(Math.random() * 5) + 20
    let adjMap: AdjacencyMap = {
        edgeLists: new Map<string, {to: string, weight: number}[]>(),
        isWeighted: weighted,
        isDirected: directed,
        sizeEnum: size
    }
    for (var i = 0; i < V; i++) {
        let from = String.fromCharCode(i + AsciiA)
        adjMap.edgeLists.set(from, [])
    }
    for (i = 0; i < V; i++) {
        for (var j = 0; j < V; j++) {
            if (i === j)
                continue // don't want nodes with edges pointing to themselves
            let roll = Math.random()
            if (roll <= EdgeFactor) {
                let weight = weighted ? generateWeight(V) : 1
                let from = String.fromCharCode(i + AsciiA),
                to = String.fromCharCode(j + AsciiA)
                adjMap.edgeLists.get(from)!.push({to: to, weight: weight})
            }
        }
    }

    return adjMap
}

interface PositionMap {
    positions: Map<string, {x: number, y: number}>
}

/**
 * derives random XY positions for each of the vertices in our graph, map format.
 * vertex IDs (i.e., labels) are used as keys.
 * 
 * @param adjMap the graph's adjacency list in a map format (vertex IDs used as keys)
 * @returns position mappings for each vertex.
 */
export const buildPositionMap = (adjMap: AdjacencyMap) => {
    let V = adjMap.edgeLists.size
    let pMap: PositionMap = {
        positions: new Map()
    }
    let usedPositions = new Set()
    let { width, height } = GridDimensions[adjMap.sizeEnum]
    for (var i = 0; i < V; i++) {
        while (true) {
            var pos = Math.floor(Math.random() * width * height)
            if (!usedPositions.has(pos)) {
                usedPositions.add(pos)
                let nodeId = String.fromCharCode(i + AsciiA)
                pMap.positions.set(nodeId, generateXYPosition(pos, width))
                break
            }
        }
    }
    return pMap
}

export const getGraphElements = (size: string, weighted: boolean, directed: boolean) => {
    let elements: Elements = []
    /**
     * 'small' corresponds to 5-6
     * 'medium' corresponds to 10-12
     * 'large' corresponds to 20-24
     */
    let numElts = (size === 'small') ? Math.floor(Math.random() * 2) + 5 :
        (size === 'medium') ? Math.floor(Math.random() * 3) + 10 : 
            Math.floor(Math.random() * 5) + 20
    let { width, height } = GridDimensions[size]

    // generate grid positions for each vertex
    let positionTracker = new Set()
    let positions: {x: number, y: number}[] = []
    for (var i = 0; i < numElts; i++) {
        while (true) {
            var pos = Math.floor(Math.random() * width * height)
            if (!positionTracker.has(pos)) {
                positionTracker.add(pos)
                positions.push(generateXYPosition(pos, width))
                break
            }
        }
    }
    // pushing in the vertices
    for (i = 0; i < numElts; i++) {
        let id = i + 1
        let label = String.fromCharCode(i + AsciiA)
        let element = {
            id: id.toString(),
            type: 'default',
            data: { label: label },
            position: positions[i]
        }
        elements.push(element)
    }
    
    // generating edges for the graph
    let adjMap: Map<string, {
        id: string,
        source: string,
        target: string,
        weight: number}[]> = new Map<string, 
        {id: string, 
        source: string,
        target: string,
        weight: number}[]>()
    for (i = 0; i < numElts; i++) {
        adjMap.set(i.toString(), [])
        for (var j = 0; j < numElts; j++) {
            if (i === j)
                continue
            if (!adjMap.has(j.toString())) {
                adjMap.set(j.toString(), [])
            }
            let roll = Math.random()
            if (roll <= EdgeFactor) {
                let weight = weighted ? generateWeight(numElts) : 1
                let id = `${i}-${j}`
                let element: FlowElement = {id: '', source: '', target: ''}
                if (directed) {
                    element = {
                        id: id,
                        source: i.toString(),
                        target: j.toString(),
                        label: weight.toString(),
                        arrowHeadType: ArrowHeadType.ArrowClosed
                    }
                    adjMap.get(j.toString())!.push({
                        id: id,
                        source: j.toString(),
                        target: i.toString(),
                        weight: weight
                    })
                }
                else {
                    element = {
                        id: id,
                        source: i.toString(),
                        target: j.toString(),
                        label: weight.toString(),
                    }
                }
                elements.push(element)
                adjMap.get(i.toString())!.push({
                    id: id,
                    source: i.toString(),
                    target: j.toString(),
                    weight: weight
                })
            }
        }
    }

    return {
        'adjMap': adjMap,
        'elements': elements
    }
}