import React from 'react'
import './Vertex.css'

interface VertexProps {
    label: string,
    visible: boolean
}

interface VertexState {
    visited: boolean
}

class Vertex extends React.Component<VertexProps, VertexState> {
    constructor(props: VertexProps) {
        super(props)
        this.state = {
            visited: false
        }
    }
    
    render() {
        return <span className='vertex' 
        style={this.props.visible ? {display: 'flex'}:{display:'none'}}>
                <p className='nodeText'>{this.props.label}</p>
            </span>
    }
}


export default Vertex;