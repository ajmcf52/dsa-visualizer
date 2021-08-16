import { Handle, Position } from 'react-flow-renderer'
import React from 'react'
import { NodeHandleColor, NodeBackgroundColor } from '../../Constants'
import './CustomNode.css'

interface CustomNodeProps {
    data: { label: string; visited: boolean }
}

const nodeStyle = {
    background: NodeBackgroundColor,
}

class CustomNode extends React.Component<CustomNodeProps> {
    componentDidUpdate() {
        var node: HTMLDivElement | null =
            document.querySelector('.customNode div')
        const { data } = this.props
        if (node !== null && data.visited) {
            // appending to className to trigger visitation animation
            node.className += ' visited'
        }
    }

    render() {
        const { data } = this.props

        /**
         * TODO
         * - assign correct IDs to each of the handles ... DONE.
         * - verify that we have all the props required for this class ... DONE.
         * - verify structural integrity of the component ... DONE.
         *
         * and later... test!
         */

        /**
         * NOTE may need to mess around with HOW we assign background color with respect to node
         * visitation...
         */

        return (
            <div className='customNode' style={nodeStyle}>
                <p className='nodeText'>{data.label}</p>
                <Handle
                    type='target'
                    position={Position.Left}
                    style={{ backgroundColor: NodeHandleColor, top: '50%' }}
                    id='lt'
                />
                <Handle
                    type='target'
                    position={Position.Right}
                    style={{ backgroundColor: NodeHandleColor, top: '50%' }}
                    id='rt'
                />
                <Handle
                    type='target'
                    position={Position.Bottom}
                    style={{ backgroundColor: NodeHandleColor, left: '50%' }}
                    id='bt'
                />
                <Handle
                    type='target'
                    position={Position.Top}
                    style={{ backgroundColor: NodeHandleColor, left: '50%' }}
                    id='tt'
                />
                <Handle
                    type='source'
                    position={Position.Left}
                    style={{ backgroundColor: NodeHandleColor, top: '50%' }}
                    id='ls'
                />
                <Handle
                    type='source'
                    position={Position.Right}
                    style={{ backgroundColor: NodeHandleColor, top: '50%' }}
                    id='rs'
                />
                <Handle
                    type='source'
                    position={Position.Bottom}
                    style={{ backgroundColor: NodeHandleColor, left: '50%' }}
                    id='bs'
                />
                <Handle
                    type='source'
                    position={Position.Top}
                    style={{ backgroundColor: NodeHandleColor, left: '50%' }}
                    id='ts'
                />
            </div>
        )
    }
}

export default CustomNode
