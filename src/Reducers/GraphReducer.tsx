import { GraphEventType } from "../Actions/GraphEvent";
import { AnyAction } from "redux";

const initState = {
    vertexMap: {},
    edgeMap: {}
}

export default function GraphReducer(state = initState, action: AnyAction) {
    switch (action.type) {
        case GraphEventType.vertexMapPush:
            return {
                ...state,
                vertexMap: action.vertexMap
            }
        case GraphEventType.edgeMapPush:
            return {
                ...state,
                edgeMap: action.edgeMap
            }
        default:
            return state
    }
}