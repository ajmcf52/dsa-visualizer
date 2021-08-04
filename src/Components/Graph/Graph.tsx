import React from 'react'
import { connect } from 'react-redux'
import { GraphEventCreator, GraphEventType } from '../../Actions/GraphEvent'
import { AdjacencyMap } from '../../Factory/GraphFactory'
import { Elements, OnLoadParams } from 'react-flow-renderer'
import ReactFlow from 'react-flow-renderer'
import CustomEdge from '../CustomFlow/CustomEdge'
import CustomNode from '../CustomFlow/CustomNode'
import { buildAdjacencyMap, buildPositionMap, buildElementList, generateEdgeAnchors } from '../../Factory/GraphFactory'
import './Graph.css'

const nodeTypes = {
    customNode: CustomNode
}
const edgeTypes = {
    customEdge: CustomEdge
}

interface GraphProps {
    adjMap: AdjacencyMap,
    vertexList: string[],
    elementList: Elements,
    indexMap: Map<string, number>,
    pushVertexIDs: (vertexIDs: string[]) => {},
    pushAdjacencyMap: (adjMap: AdjacencyMap) => {}
}

const onLoad = (reactFlowInstance: OnLoadParams) => {
    reactFlowInstance.fitView({padding: 1, includeHiddenNodes: true})
    
}

class Graph extends React.Component<GraphProps> {

    componentDidMount() {
        const { pushVertexIDs, pushAdjacencyMap, vertexList, adjMap } = this.props
        pushVertexIDs(vertexList)
        pushAdjacencyMap(adjMap)
    }

    visitNode(nodeId: string) {
        const {elementList, indexMap } = this.props
        var index = indexMap.get(nodeId)!
        elementList[index].data.visited = true
        //TODO include synchronization here to wait for visit animation to stop
    }
    traverseEdge(edgeId: string) {
        const { elementList, indexMap } = this.props
        var index = indexMap.get(edgeId)!
        elementList[index].data.traversed = true
        //TODO include synchronization here to wait for traversal animation to stop
    }

    render() {
        const { elementList } = this.props
        return (
        <div className="flowContainer">
        <ReactFlow 
            className="reactFlow" 
            elements={elementList} 
            nodeTypes={nodeTypes} 
            edgeTypes={edgeTypes}
            onLoad={onLoad}
        >
        </ReactFlow>
        </div>)
    }
}

const mapDispatchToProps = {
    pushVertexIDs: GraphEventCreator.vertexListPush,
    pushAdjacencyMap: GraphEventCreator.adjMapPush
}

const connectedComp = connect(
    null,
    mapDispatchToProps
)(Graph)

export default connectedComp