import React from 'react'
import GraphNode from '../../Graph/GraphNode'
import { numToLabelCode } from '../../../Utility/NodeLabelCoder'
import './NodeGridColumn.css'

interface NodeGridColumnProps {
    size: number,
    startingLabelCode: number
}

class NodeGridColumn extends React.Component<NodeGridColumnProps> {
    render() {
        let nodes: JSX.Element[] = []
        for (var i = 0; i < this.props.size; i++) {
            nodes.push(<GraphNode label={numToLabelCode(this.props.startingLabelCode + i)}></GraphNode>)
        }
        return <div className="nodeGridColumn">{nodes}</div>
    }
}

export default NodeGridColumn