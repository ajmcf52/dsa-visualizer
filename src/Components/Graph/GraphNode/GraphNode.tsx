import React from 'react'
import './GraphNode.css'

interface GraphNodeProps {
    label: string
}

interface GraphNodeState {
    visited: boolean
}

class GraphNode extends React.Component<GraphNodeProps, GraphNodeState> {
    constructor(props: GraphNodeProps) {
        super(props)
        this.state = {
            visited: false
        }
    }
    
    render() {
        return <span className='graphNode'>
                <p className='nodeText'>{this.props.label}</p>
            </span>
    }
}


export default GraphNode;