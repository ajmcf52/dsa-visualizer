import React from 'react'
import Vertex from '../Vertex'

interface EdgeProps {
    to: Vertex,
    from: Vertex
}

function Edge({to, from}: EdgeProps) {
    return <div></div>
}

export default Edge