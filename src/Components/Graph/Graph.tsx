import React from 'react'
import { connect } from 'react-redux'
import { GraphEventCreator } from '../../Actions/GraphEvent'
import { AdjacencyMap } from '../../Factory/GraphFactory'
import { Elements, OnLoadParams } from 'react-flow-renderer'
import ReactFlow from 'react-flow-renderer'
import CustomEdge from '../CustomFlow/CustomEdge'
import CustomNode from '../CustomFlow/CustomNode'
import './Graph.css'

const nodeTypes = {
    customNode: CustomNode,
}
const edgeTypes = {
    customEdge: CustomEdge,
}

interface GraphProps {
    adjMap: AdjacencyMap
    plainEdgeLists: { [key: string]: { to: string; weight: number }[] }
    vertexList: string[]
    initialElementList: Elements
    indexMap: Map<string, number>
    pushVertexIDs: (vertexIDs: string[]) => {}
    pushAdjacencyMap: (edgeLists: {
        [key: string]: { to: string; weight: number }[]
    }) => {}
}

interface GraphState {
    elementList: Elements
}

export const animateVisit = (graph: Graph, nodeId: string) => {
    graph.visitNode(nodeId)
}

export const animateTraversal = (graph: Graph, edgeId: string) => {
    graph.traverseEdge(edgeId)
}

const onLoad = (reactFlowInstance: OnLoadParams) => {
    reactFlowInstance.fitView({ padding: 1, includeHiddenNodes: true })
}

class Graph extends React.Component<GraphProps, GraphState> {
    state = {
        elementList: this.props.initialElementList,
    }

    componentDidMount() {
        const { pushVertexIDs, pushAdjacencyMap, vertexList, plainEdgeLists } =
            this.props
        pushVertexIDs(vertexList)
        pushAdjacencyMap(plainEdgeLists)
    }

    visitNode(nodeId: string) {
        const { indexMap } = this.props
        var index = indexMap.get(nodeId)!
        this.setState((prevState) => {
            let elts = prevState.elementList
            elts[index].data.visited = true
            return { elementList: elts }
        })

        //TODO include synchronization here to wait for visit animation to stop
    }
    traverseEdge(edgeId: string) {
        const { indexMap } = this.props
        var index = indexMap.get(edgeId)!
        this.setState((prevState) => {
            let elts = prevState.elementList
            elts[index].data.traversed = true
            return { elementList: elts }
        })

        //TODO include synchronization here to wait for traversal animation to stop
    }

    render() {
        return (
            <div className='flowContainer'>
                <ReactFlow
                    className='reactFlow'
                    elements={this.state.elementList}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    onLoad={onLoad}
                ></ReactFlow>
            </div>
        )
    }
}

const mapDispatchToProps = {
    pushVertexIDs: GraphEventCreator.vertexListPush,
    pushAdjacencyMap: GraphEventCreator.adjMapPush,
}

const connectedComp = connect(null, mapDispatchToProps)(Graph)

export default connectedComp
