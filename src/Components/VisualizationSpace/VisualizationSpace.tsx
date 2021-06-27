import React from 'react'
import './VisualizationSpace.css'

class VisualizationSpace extends React.Component {
    render() {
        return <div className='visualizationSpace'>
                {this.props.children}
            </div>;
    }
}

export default VisualizationSpace;