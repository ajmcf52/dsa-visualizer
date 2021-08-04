import { GraphEventType } from "../Actions/GraphEvent";
import { AnyAction } from "redux";

const initState = {
    vertexList: [],
    adjMap: {}
}

export default function GraphReducer(state = initState, action: AnyAction) {
    switch (action.type) {
        case GraphEventType.vertexListPush:
            return {
                ...state,
                vertexList: action.vertexList
            }
        case GraphEventType.adjMapPush:
            return {
                ...state,
                adjMap: action.adjMap
            }
        default:
            return state
    }
}