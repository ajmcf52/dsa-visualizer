import React from 'react'
import { ArrowHeadType, getBezierPath, getMarkerEnd, Position } from 'react-flow-renderer'

interface CustomEdgeProps {
    id: string,
    sourceX: number,
    sourceY: number,
    targetX: number,
    targetY: number,
    sourcePosition: Position,
    targetPosition: Position,
    style: {},
    data: {text: string, traversed: boolean},
    arrowHeadType: ArrowHeadType,
    markerEndId: string
}

class CustomEdge extends React.Component<CustomEdgeProps> {
    componentDidUpdate() {
        var dPath: SVGGeometryElement | null = document.querySelector('.defaultPath path'),
        tPath: SVGGeometryElement | null = document.querySelector('.traversedPath path')

        if (dPath !== null && tPath !== null) { // animating edge traversal in orange.
            var len = dPath.getTotalLength()
            tPath.style.transition = 'none'
            tPath.style.strokeDasharray = len + ' ' + len
            tPath.style.strokeDashoffset = len + ''
            tPath.getBoundingClientRect()
            tPath.style.transition = 'stroke-dashoffset 2s ease-in-out'
            tPath.style.strokeDashoffset = '0'
        }
    }
    render() {
        const { sourceX, 
            sourceY, 
            sourcePosition, 
            targetX, 
            targetY, 
            targetPosition,
            arrowHeadType,
            markerEndId,
            id,
            style,
            data } = this.props
        
        const edgePath = getBezierPath({sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition})
        const markerEnd = getMarkerEnd(arrowHeadType, markerEndId)

        return (
        <>
            <path id={id} style={style} className='defaultPath' d={edgePath} markerEnd={markerEnd} />
            <path id={id} style={style} className='traversedPath' d={edgePath} markerEnd={markerEnd} />
            <text>
                <textPath href={`#${id}`} style={{fontSize: '12px'}} startOffset='50%' textAnchor='middle'>
                    {data.text}
                </textPath>
            </text>
        </>
    )
    }
}

export default CustomEdge