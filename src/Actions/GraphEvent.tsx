const GraphEventType = {
    vertexListPush: 'VERTEX_LIST_PUSH',
    adjMapPush: 'ADJ_MAP_PUSH',
    startSolution: 'SOLVE_GRAPH',
    animateEdge: 'ANIMATE_EDGE',
    animateNode: 'ANIMATE_NODE',
};

const GraphEventCreator = {
    vertexListPush: (vertexList: string[]) => ({
        type: GraphEventType.vertexListPush,
        vertexList,
    }),
    adjMapPush: (adjMap: {
        [key: string]: { to: string; weight: number }[];
    }) => ({
        type: GraphEventType.adjMapPush,
        adjMap,
    }),
    startSolution: () => ({
        type: GraphEventType.startSolution,
    }),
    animateEdge: (edgeId: string) => ({
        type: GraphEventType.animateEdge,
        edgeId,
    }),
    animateNode: (nodeId: string) => ({
        type: GraphEventType.animateNode,
        nodeId,
    }),
};

export { GraphEventType, GraphEventCreator };
