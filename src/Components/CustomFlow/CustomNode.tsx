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
    componentDidUpdate() {
        var node: HTMLDivElement | null = document.querySelector('.customNode div')
        if (node !== null) { // appending to className to trigger visitation animation
            node.className += ' visited'
        }
    }

    render() {
        const { label } = this.props

        /**
         * TODO 
         * - assign correct IDs to each of the handles
         * - verify that we have all the props required for this class
         * - verify structural integrity of the component
         * 
         * and later... test!
         */

        return <div className='customNode' style={nodeStyle}>
            <p className='nodeText'>{label}</p>
            <Handle type='target' position={Position.Left} style={handleStyle}/>
            <Handle type='target' position={Position.Right} style={handleStyle}/>
            <Handle type='target' position={Position.Bottom} style={handleStyle}/>
            <Handle type='target' position={Position.Top} style={handleStyle}/>
            <Handle type='source' position={Position.Left} style={handleStyle}/>
            <Handle type='source' position={Position.Right} style={handleStyle}/>
            <Handle type='source' position={Position.Bottom} style={handleStyle}/>
            <Handle type='source' position={Position.Top} style={handleStyle}/>
        </div>
    }
}

export default CustomNode