import React from 'react'

interface EdgeData {
    to: string,
    from: string
}

interface GraphProps {
    vertices: string[],
    adjList: EdgeData[]
}

class Graph<GraphProps> extends React.Component {

}

export default Graph