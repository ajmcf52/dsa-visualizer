import { ControlSettingsEventType } from "../Actions/ControlSettingsEvent";
import { AnyAction } from 'redux'

const initState = {
    startNode: '',
    goalNode: ''
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
        default:
            return state
    }
}