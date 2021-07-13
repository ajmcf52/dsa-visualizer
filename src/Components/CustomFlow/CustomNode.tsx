import { Handle, Position } from 'react-flow-renderer'
import React from 'react'
import { NodeHandleColor, NodeBackgroundColor } from '../../Constants'
import './CustomNode.css'

interface CustomNodeProps {
    label: string,
    visited: boolean
}

const nodeStyle = {
    background: NodeBackgroundColor
}

const handleStyle = {
    background: NodeHandleColor
}

class CustomNode extends React.Component<CustomNodeProps> {
    /**
     * we write a CustomNode class for a couple of reasons:
     * 
     * 1. It allows us to write node visit animations
     * 2. We can use state to 
     */

    render() {
        const { label } = this.props

        return <div className='customNode' style={nodeStyle}>
            <p className='nodeText'>{label}</p>
            <Handle type='target' position={Position.Left} style={handleStyle}/>
            <Handle type='source' position={Position.Right} style={handleStyle}/>
            <Handle type='source' position={Position.Bottom} style={handleStyle}/>
            <Handle type='target' position={Position.Top} style={handleStyle}/>
        </div>
    }
}