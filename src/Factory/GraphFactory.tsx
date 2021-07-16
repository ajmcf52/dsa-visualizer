import Graph from '../Components/Graph'
import { Elements, Edge, Node, FlowElement, ArrowHeadType, Position } from 'react-flow-renderer'
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
            if (i === j) // don't want nodes with edges pointing to themselves
                continue
            let roll = Math.random()
            if (roll <= EdgeFactor) {
                let weight = weighted ? generateWeight(V) : 1
                let from = String.fromCharCode(i + AsciiA),
                to = String.fromCharCode(j + AsciiA)
                adjMap.edgeLists.get(from)!.push({to: to, weight: weight})
                if (!directed) { // if not directed, edge should be two-way
                    adjMap.edgeLists.get(to)!.push({to: from, weight: weight})
                }
            }
        }
    }

    return adjMap
}

interface XYPosition {
    x: number,
    y: number
}

interface PositionMap {
    positions: Map<string, XYPosition>
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

interface EdgeAnchorList {
    anchors: string[]
}

const edgeDescriptorMappings = {
    'left': 'l',
    'right': 'r',
    'top': 't',
    'bottom': 'b'
}

/**
 * helper function for generating edge labels.
 * 
 * @param toID the 'to' vertex ID string
 * @param fromID 'from' vertex ID string
 * @param toPos 'to' vertex position enum
 * @param fromPos 'from' vertex position enum
 * @returns a string describing the edge connecting said vertices.
 */
const getEdgeDescriptor = (toID: string, fromID: string, toPos: Position, fromPos: Position) => {
    let toPosDescriptor = edgeDescriptorMappings[toPos],
    fromPosDescriptor = edgeDescriptorMappings[fromPos]
    return `${toID}${toPosDescriptor}-${fromID}${fromPosDescriptor}`
}

/**
 * factory method for generating a list of edge labels for a given graph. These labels conveniently 
 * describe which positional anchors will be used on either side of an edge as well.
 * @param adjMap adjacency map of our graph
 * @param pMap position mappings of the vertices
 * @returns a list of edge labels describing their to/from anchor positions
 */
export const generateEdgeAnchors = (adjMap: AdjacencyMap, pMap: PositionMap) => {
    let edgeAnchors: EdgeAnchorList = {
        anchors: []
    }
    adjMap.edgeLists.forEach((value: {to: string, weight: number}[], key: string) => {
        value.forEach((value: {to: string, weight: number}) => {
            let from: XYPosition = pMap.positions.get(key)!
            let to: XYPosition = pMap.positions.get(value.to)!
            let xDiff = from.x - to.x,
            yDiff = from.y - to.y

            let edgeDescriptor = ''
            if (Math.abs(yDiff) <= Math.abs(xDiff)) { // use left and right anchorings of the nodes
                if (xDiff < 0) { // occurs when the "from" node is left of the "to" node
                    edgeDescriptor = getEdgeDescriptor(value.to, key, Position.Left, Position.Right)
                }
                else {
                    edgeDescriptor = getEdgeDescriptor(value.to, key, Position.Right, Position.Left)
                }
            }
            else { // use top and bottom anchorings of the nodes
                if (yDiff < 0) { // occurs when the 'from' node is above the 'to' node
                    edgeDescriptor = getEdgeDescriptor(value.to, key, Position.Top, Position.Bottom)
                }
                else {
                    edgeDescriptor = getEdgeDescriptor(value.to, key, Position.Bottom, Position.Top)
                }
            }
            edgeAnchors.anchors.push(edgeDescriptor)
        })
    })

    return edgeAnchors
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