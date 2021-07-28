const ControlSettingsEventType = {
    selectStartNode: 'SELECT_START_NODE',
    selectGoalNode: 'SELECT_GOAL_NODE',
    selectAlgorithm: 'SELECT_ALGORITHM',
    selectGraphSize: 'SELECT_GRAPH_SIZE',
    toggleWeighted: 'TOGGLE_WEIGHTED',
    toggleDirected: 'TOGGLE_DIRECTED'
}

const ControlSettingsEventCreator = {
    selectStartNode: (startNode: string) => ({
        type: ControlSettingsEventType.selectStartNode,
        startNode
    }),
    selectGoalNode: (goalNode: string) => ({
        type: ControlSettingsEventType.selectGoalNode,
        goalNode
    }),
    selectAlgorithm: (algorithmName: string) => ({
        type: ControlSettingsEventType.selectAlgorithm,
        algorithmName
    }),
    selectGraphSize: (graphSize: string) => ({
        type: ControlSettingsEventType.selectGraphSize,
        graphSize
    }),
    toggleWeighted: (isWeighted: boolean) => ({
        type: ControlSettingsEventType.toggleWeighted,
        isWeighted
    }),
    toggleDirected: (isDirected: boolean) => ({
        type: ControlSettingsEventType.toggleDirected,
        isDirected
    })
}


export {
    ControlSettingsEventType,
    ControlSettingsEventCreator
}