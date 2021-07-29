import React from 'react'
import { connect } from 'react-redux'
import { GraphEventCreator } from '../../Actions/GraphEvent'
import { AdjacencyMap } from '../../Factory/GraphFactory'
import { Elements, useZoomPanHelper } from 'react-flow-renderer'
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
    elementList: Elements,
    indexMap: Map<string, number>
}



class Graph extends React.Component<GraphProps> {

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
        >
        </ReactFlow>
        </div>)
    }
}

export default Graph