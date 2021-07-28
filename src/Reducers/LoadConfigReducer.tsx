import { LoadConfigEventType } from "../Actions/LoadConfigEvent";
import { AnyAction } from "redux";

export default function LoadConfigReducer(state = {}, action: AnyAction) {
    switch(action.type) {
        case LoadConfigEventType.configLoad:
            return {
                ...state,
                ...(action.jsonData)
            }
        default:
            return state
    }
}