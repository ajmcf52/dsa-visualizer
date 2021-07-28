import Vertex from '../Components/Graph/Vertex'
import Edge from '../Components/Graph/Edge'


const GraphEventType = {
    vertexMapPush: 'VERTEX_MAP_PUSH',
    edgeMapPush: 'EDGE_MAP_PUSH'
}

const GraphEventCreator = {
    vertexMapPush: (vertexMap: {[vertexId: string] : Vertex}) => ({
        type: GraphEventType.vertexMapPush,
        vertexMap
    }),
    edgeMapPush: (edgeMap: {[edgeId: string] : Edge}) => ({
        type: GraphEventType.edgeMapPush,
        edgeMap
    })
}

export {
    GraphEventType,
    GraphEventCreator
}