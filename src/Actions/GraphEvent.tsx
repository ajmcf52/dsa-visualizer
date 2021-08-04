
const GraphEventType = {
    vertexListPush: 'VERTEX_LIST_PUSH',
    adjMapPush: 'ADJ_MAP_PUSH'
}

const GraphEventCreator = {
    vertexListPush: (vertexList: string[]) => ({
        type: GraphEventType.vertexListPush,
        vertexList
    }),
    adjMapPush: (adjMap: {[key: string]: {to: string, weight: number}[]}) => ({
        type: GraphEventType.adjMapPush,
        adjMap
    })
}

export {
    GraphEventType,
    GraphEventCreator
}