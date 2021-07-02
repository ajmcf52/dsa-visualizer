import React from 'react'

const DIMENSION_MAP = {
    'small': [4,3],
    'medium': [6,4],
    'large': [8,6]
}

function getXYPosition(rasterPos, width, height) {
    return {
        x: rasterPos % width, 
        y: Math.floor(rasterPos / width)
    }
}

function generatePositions(size, count) {
    let dims = DIMENSION_MAP[size]
    let width = dims[0]
    let height = dims[1]
    let nodePositions = new Set()
    let result = []
    for (var i = 0; i < size; i++) {
        while (true) {
            // generating random xy position in raster format
            var rasterPos = Math.floor(Math.random() * width * height)
            if (!nodePositions.has(rasterPos)) {
                nodePositions.add(rasterPos)
                result.add(getXYPosition(rasterPos, width, height))
                break
            }
        }
    }
    return result
}

let elements = []

export default elements