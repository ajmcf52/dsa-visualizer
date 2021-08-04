import { AdjacencyMap } from "../Factory/GraphFactory"


const GraphEventType = {
    vertexListPush: 'VERTEX_LIST_PUSH',
    adjMapPush: 'ADJ_MAP_PUSH'
}

const GraphEventCreator = {
    vertexListPush: (vertexList: string[]) => ({
        type: GraphEventType.vertexListPush,
        vertexList
    }),
    adjMapPush: (adjMap: AdjacencyMap) => ({
        type: GraphEventType.adjMapPush,
        adjMap
    })
}

export {
    GraphEventType,
    GraphEventCreator
}