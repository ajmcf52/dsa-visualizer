const ControlSettingsEventType = {
    selectStartNode: 'SELECT_START_NODE',
    selectGoalNode: 'SELECT_GOAL_NODE'
}

const ControlSettingsEventCreator = {
    selectStartNode: (startNode: string) => ({
        type: ControlSettingsEventType.selectStartNode,
        startNode
    }),
    selectGoalNode: (goalNode: string) => ({
        type: ControlSettingsEventType.selectGoalNode,
        goalNode
    })
}

export {
    ControlSettingsEventType,
    ControlSettingsEventCreator
}