import React from 'react'
import Vertex from '../../Graph/Vertex'
import { numToLabelCode } from '../../../Utility/NodeLabelCoder'
import './NodeGridColumn.css'
import { useCallback } from 'react'
import { useState } from 'react'

interface NodeGridColumnProps {
    size: number,
    startingLabelCode: number,
    fillRate: number,
    visibilityHook: () => void
}

interface NodeGridColumnState {
    visibleCount: number
}

function NodeGridColumn ({size, startingLabelCode, fillRate, visibilityHook} : NodeGridColumnProps) {
    var [visibleCount, setVisibleCount] = useState(0)
    
    const incrementVisibleCount = useCallback(() => {
        setVisibleCount((v) => v + 1);
    }, []);

        let nodes: JSX.Element[] = []
        for (var i = 0; i < size; i++) {
            let isVisible = Math.random() < fillRate
            let nodeLabel = ''
            if (!isVisible) {
                nodeLabel = '$'
            }
            else {
                nodeLabel = numToLabelCode(startingLabelCode + visibleCount)
                visibleCount += 1
                visibilityHook()
            }
            nodes.push(<Vertex visible={isVisible} 
            label={nodeLabel}></Vertex>)
        }
        return <div className="nodeGridColumn">{nodes}</div>
    
}

export default NodeGridColumn