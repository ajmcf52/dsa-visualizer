import Graph from '../Components/Graph'
import Vertex from '../Components/Graph/Vertex'
import { Elements, Edge, Node, FlowElement, ArrowHeadType} from 'react-flow-renderer'
import { NODE_WIDTH, GRID_DIMS, ASCII_A, NODE_OFFSET, EDGE_FACTOR} from '../Constants'

const generateXYPosition = (pos: number, width: number) => {
    return {
        x: Math.floor(pos / width) * (NODE_WIDTH + NODE_OFFSET),
        y: (pos % width) * (NODE_WIDTH + NODE_OFFSET)
    }
}

const generateWeight = (numElts: number) => {
    return Math.floor(Math.random() * numElts) + 1
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
    let { width, height } = GRID_DIMS[size]

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
        let label = String.fromCharCode(i + ASCII_A)
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
            if (roll <= EDGE_FACTOR) {
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