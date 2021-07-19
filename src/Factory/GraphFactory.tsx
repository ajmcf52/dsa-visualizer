import { Elements, FlowElement, ArrowHeadType, Position } from 'react-flow-renderer'
import { NodeWidth, GridDimensions, AsciiA, NodeOffset, EdgeFactor } from '../Constants'
import CustomEdge from '../Components/CustomFlow/CustomEdge'
import CustomNode from '../Components/CustomFlow/CustomNode'

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

interface EdgeAnchorMap {
    anchorMap: Map<string, string>
}

const edgeDescriptorMappings = {
    'left': 'l',
    'right': 'r',
    'top': 't',
    'bottom': 'b'
}

/**
 * helper function for generating edge IDs.
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
    return `${fromID}${fromPosDescriptor}-${toID}${toPosDescriptor}`
}

/**
 * factory method for generating a list of edge labels for a given graph. These labels conveniently 
 * describe which positional anchors will be used on either side of an edge as well.
 * @param adjMap adjacency map of our graph
 * @param pMap position mappings of the vertices
 * @returns a list of edge labels describing their to/from anchor positions
 */
export const generateEdgeAnchors = (adjMap: AdjacencyMap, pMap: PositionMap) => {
    let edgeAnchors: EdgeAnchorMap = {
        anchorMap: new Map<string,string>()
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
            edgeAnchors.anchorMap.set(`${key}${value.to}`, edgeDescriptor)
        })
    })

    return edgeAnchors
}

const nodeTypes = {
    customNode: CustomNode
}
const edgeTypes = {
    customEdge: CustomEdge
}

/**
 * factory method responsible for generating the list of vertex/edge elements for a ReactFlow element.
 * 
 * @param adjMap graph's adjacency list in the form of a map. Source node ID strings are used as keys.
 * @param posMap XY position mappings for each node, where node IDs are used as keys.
 * @param anchors anchor ID strings for each edge. Edge IDs are used as keys.
 * @returns an element list to be used for rendering a ReactFlow element.
 */
export const buildElementList = (adjMap: AdjacencyMap, posMap: PositionMap, anchors: EdgeAnchorMap) => {
    let elements: Elements = []
    let numV = adjMap.edgeLists.size

    // forming and pushing in the vertex elements
    for (var i = 0; i < numV; i++) {
        let id = String.fromCharCode(i + AsciiA)
        let element: FlowElement = {
            id: id,
            type: 'customNode',
            data: { label: id, visited: false },
            position: posMap.positions.get(id)!
        }
        elements.push(element)
    }
    
    // forming and pushing in the edge elements
    for (i = 0; i < numV; i++) {
        let fromID = String.fromCharCode(i + AsciiA)
        let edgeList = adjMap.edgeLists.get(fromID)!

        edgeList.forEach((value) => {
            let toID = value.to
            let edgeAnchorKey = `${fromID}${toID}`
            let edgeID = anchors.anchorMap.get(edgeAnchorKey)!
            let edgeAnchorComponents = edgeID.split('-')
            let sourcePosChar = edgeAnchorComponents[0].charAt(edgeAnchorComponents[0].length - 1)
            let targetPosChar = edgeAnchorComponents[1].charAt(edgeAnchorComponents[1].length - 1)
            let sourceHandleID = `${sourcePosChar}s`
            let targetHandleID = `${targetPosChar}t`

            let edgeElement: FlowElement = {
                id: edgeID,
                source: fromID,
                target: toID,
                sourceHandle: sourceHandleID,
                targetHandle: targetHandleID,
                data: {text: value.weight, traversed: false},
                type: 'customEdge'
            }
            if (adjMap.isDirected) {
                edgeElement.arrowHeadType = ArrowHeadType.ArrowClosed
            }
            elements.push(edgeElement)
        })
    }
    return elements
}