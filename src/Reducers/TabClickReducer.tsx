import { TabClickEventType} from "../Actions/TabClickEvent";
import { AnyAction } from 'redux'

const initState = {
    currentTab: 'searching'
}

export default function TabClickReducer(state = initState, action: AnyAction) {
    switch (action.type) {
        case TabClickEventType.swapTab:
            return {
                ...state,
                currentTab: action.tabString
            }
        default:
            return state
    }
}