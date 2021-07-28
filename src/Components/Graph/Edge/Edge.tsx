import React from 'react'
import Vertex from '../Vertex'

interface EdgeProps {
    id: string,
    to: Vertex,
    from: Vertex,
    weight: number
}

interface EdgeState {
    traversed: boolean
}

class Edge extends React.Component<EdgeProps, EdgeState> {
    constructor(props: EdgeProps) {
        super(props)
        this.state = {traversed: false}
    }
    handleTraversal = () => {
        this.setState({traversed: true})
    }
    resetState = () => {
        this.setState({traversed: false})
    }
    render() {
        return <></>
    }
}

export default Edge