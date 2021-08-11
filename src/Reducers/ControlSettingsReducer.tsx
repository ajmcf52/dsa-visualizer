import { ControlSettingsEventType } from "../Actions/ControlSettingsEvent";
import { AnyAction } from 'redux'

const initState = {
    startNode: '',
    goalNode: '',
    algorithm: '',
    graphSize: '',
    isWeighted: true,
    isDirected: true
}

export default function ControlSettingsReducer(state = initState, action: AnyAction) {
    switch (action.type) {
        case ControlSettingsEventType.selectStartNode:
            return {
                ...state,
                startNode: action.startNode
            }
        case ControlSettingsEventType.selectGoalNode:
            return {
                ...state,
                goalNode: action.goalNode
            }
        case ControlSettingsEventType.selectAlgorithm:
            return {
                ...state,
                algorithm: action.algorithmName
            }
        case ControlSettingsEventType.selectGraphSize:
            return {
                ...state,
                graphSize: action.graphSize
            }
        case ControlSettingsEventType.toggleWeighted:
            return {
                ...state,
                isWeighted: action.isWeighted
            }
        case ControlSettingsEventType.toggleDirected:
            return {
                ...state,
                isDirected: action.isDirected
            }
        default:
            return state
    }
}