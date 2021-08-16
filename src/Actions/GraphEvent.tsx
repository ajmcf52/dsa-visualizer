const GraphEventType = {
    vertexListPush: 'VERTEX_LIST_PUSH',
    adjMapPush: 'ADJ_MAP_PUSH',
    startSolution: 'SOLVE_GRAPH',
}

const GraphEventCreator = {
    vertexListPush: (vertexList: string[]) => ({
        type: GraphEventType.vertexListPush,
        vertexList,
    }),
    adjMapPush: (adjMap: {
        [key: string]: { to: string; weight: number }[]
    }) => ({
        type: GraphEventType.adjMapPush,
        adjMap,
    }),
    startSolution: () => ({
        type: GraphEventType.startSolution,
    }),
}

export { GraphEventType, GraphEventCreator }
