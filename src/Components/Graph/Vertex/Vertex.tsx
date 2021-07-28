import React from 'react'
import './Vertex.css'

interface VertexProps {
    id: string
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
    handleVisit = () => {
        this.setState({visited: true})
    }
    resetState = () => {
        this.setState({visited: false})
    }
    /**
     * eventually, we will get rid of the span that is rendered here.
     * this component should not be visible.
     */
    render() {
        return <span className='vertex'>
                <p className='nodeText'>{this.props.id}</p>
            </span> 
    }
}


export default Vertex;