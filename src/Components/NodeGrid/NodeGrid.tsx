import React from 'react';
import { useState } from 'react';
import './NodeGrid.css'
import NodeGridColumn from './NodeGridColumn'

interface NodeGridProps {
    width: number,
    height: number,
    fillRate: number
}

interface NodeGridState {
    visibleCount: number
}

function NodeGrid ({width, height, fillRate} : NodeGridProps) {

    var [visibleCount, setVisibleCount] = useState(0)

    const onVisibleCountChange: () => void = () => 
    { 
        setVisibleCount(visibleCount + 1);
        console.log(visibleCount)
        
    }

    let columns : JSX.Element[] = []
    let code = 1
    for (var i = 0; i < width; i++) {
        columns.push(<NodeGridColumn visibilityHook={onVisibleCountChange} fillRate={fillRate}
                        startingLabelCode={code} size={height}></NodeGridColumn>)
        code = 1 + visibleCount
    }
    return <div className="nodeGrid">{columns}</div>
    
}

export default NodeGrid;