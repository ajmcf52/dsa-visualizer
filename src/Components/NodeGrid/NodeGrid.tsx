import { number } from 'prop-types';
import React from 'react';

interface NodeGridProps {
    width: number,
    height: number
}

interface NodeGridState {

}

class NodeGrid extends React.Component<NodeGridProps, NodeGridState> {
    render() {
        return <div></div>
    }
}

export default NodeGrid;