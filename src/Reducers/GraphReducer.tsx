import { GraphEventType } from '../Actions/GraphEvent';
import { AnyAction } from 'redux';

const initState = {
    vertexList: [],
    adjMap: {},
    solveGraph: false,
    animateEdge: '',
    animateNode: '',
};

export default function GraphReducer(state = initState, action: AnyAction) {
    switch (action.type) {
        case GraphEventType.vertexListPush:
            return {
                ...state,
                vertexList: action.vertexList,
            };
        case GraphEventType.adjMapPush:
            return {
                ...state,
                adjMap: action.adjMap,
            };
        case GraphEventType.startSolution:
            return {
                ...state,
                solveGraph: true,
            };
        case GraphEventType.animateEdge:
            return {
                ...state,
                animateEdge: action.edgeId,
            };
        case GraphEventType.animateNode:
            return {
                ...state,
                animateNode: action.nodeId,
            };
        default:
            return state;
    }
}
