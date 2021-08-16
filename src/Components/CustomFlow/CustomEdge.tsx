import React from 'react'
import {
    ArrowHeadType,
    getBezierPath,
    getMarkerEnd,
    Position,
    getEdgeCenter,
    EdgeText,
} from 'react-flow-renderer'

interface CustomEdgeProps {
    id: string
    sourceX: number
    sourceY: number
    targetX: number
    targetY: number
    sourcePosition: Position
    targetPosition: Position
    style: {}
    data: { text: string; traversed: boolean }
    arrowHeadType: ArrowHeadType
    markerEndId: string
}

class CustomEdge extends React.Component<CustomEdgeProps> {
    componentDidUpdate() {
        var dPath: SVGGeometryElement | null =
                document.querySelector('.defaultPath path'),
            tPath: SVGGeometryElement | null = document.querySelector(
                '.traversedPath path'
            )
        let { data } = this.props
        if (dPath !== null && tPath !== null && data.traversed) {
            // animating edge traversal in orange.
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
        const {
            sourceX,
            sourceY,
            sourcePosition,
            targetX,
            targetY,
            targetPosition,
            arrowHeadType,
            markerEndId,
            id,
            style,
            data,
        } = this.props

        const edgePath = getBezierPath({
            sourceX,
            sourceY,
            sourcePosition,
            targetX,
            targetY,
            targetPosition,
        })
        const markerEnd = getMarkerEnd(arrowHeadType, markerEndId)
        const [centerX, centerY] = getEdgeCenter({
            sourceX,
            sourceY,
            targetX,
            targetY,
            sourcePosition,
            targetPosition,
        })

        return (
            <>
                <path
                    id={id}
                    style={style}
                    className='defaultPath'
                    d={edgePath}
                    markerEnd={markerEnd}
                    strokeWidth='1px'
                    stroke='black'
                    fill='none'
                />
                <path
                    id={id}
                    style={style}
                    className='traversedPath'
                    d={edgePath}
                    markerEnd={markerEnd}
                    strokeWidth='2px'
                    strokeDasharray={1000}
                    strokeDashoffset={1000}
                    stroke='orange'
                    fill='none'
                />
                <EdgeText x={centerX} y={centerY} label={data.text} />
            </>
        )
    }
}

export default CustomEdge
