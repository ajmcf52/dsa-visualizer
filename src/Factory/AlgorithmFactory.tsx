import { AdjacencyMap } from "./GraphFactory"
import { Elements } from "react-flow-renderer"
import React from "react"
import { RootState } from "../store"

/**
 * this is an implementation of Djikstra's algorithm. The elements and elemIndexMap
 * parameters are used to trigger visual animations when vertices and edges are visited/traversed.
 * 
 * NOTE some kind of visual traversal table will likely also be in our interest.
 * 
 * @param adjMap adjacency map that will be used to traverse the graph.
 * @param elemIndexMap an index table used to look up element indices.
 * @param elements vertex and edge elements of the visual graph component.
 */
export const djikstra = (adjMap: AdjacencyMap, elemIndexMap: Map<string, number>, elements: Elements) => {

}

interface DjikstraProps {
    adjMap: AdjacencyMap,
    elemIndexMap: Map<string, number>,
    elements: Elements,

}

interface PQElement {
    current: string,
    last: string,
    distance: number
}

interface PQState {
    minHeap: PQElement[],
    N: number
}

class PQ extends React.Component<{}, PQState> {
    constructor(props = {}) {
        super(props)
        this.state = {
            minHeap: [],
            N: this.state.minHeap.length
        }
    }

    left = (index: number) => {
        const res = 2 * index + 1
        if (res < 0 || res >= this.state.N) {
            return -1
        }
        return res
    }

    right = (index: number) => {
        const res = 2 * index + 2
        if (res < 0 || res >= this.state.N) {
            return -1
        }
        return res
    }

    parent = (index: number) => {
        if (index <= 0 || index >= this.state.N) {
            return -1
        }
        return (index - 1) / 2
    }

    heapify = (index: number) => {
        const { minHeap } = this.state

        while (true) {
            let ind = index
            const leftChild = this.left(ind)
            const rightChild = this.right(ind)
            if (leftChild === -1) {
                break
            }
            let smallest = minHeap[ind].distance > minHeap[leftChild].distance ? leftChild : ind
            if (rightChild !== -1 && minHeap[rightChild].distance < minHeap[smallest].distance) {
                smallest = rightChild
            }
            if (smallest === ind) {
                break
            }
            this.setState(state => {
                const heap = state.minHeap
                const temp = heap[smallest]
                heap[smallest] = heap[ind]
                heap[ind] = temp
                return {
                    minHeap: heap,
                    N: state.N
                }
            })
            const temp = minHeap[smallest]
            minHeap[smallest] = minHeap[ind]
            minHeap[ind] = temp
            ind = smallest
        }
    }

    enqueue = (node: string, last: string, dist: number) => {
        const pqElem: PQElement = {
            current: node,
            last: last,
            distance: dist
        }
        this.setState(state => {
            const minHeap = state.minHeap.concat(pqElem)
            const N = state.N + 1
            return {
                N: N,
                minHeap: minHeap
            }
        })
        let par = this.parent(this.state.N - 1)
        while (par !== -1) {
            this.heapify(par)
            par = this.parent(par)
        }
    }
}

class Djikstra extends React.Component<DjikstraProps> {
    render() {
        return <></>
    }
    run = () => {
        const { adjMap, elemIndexMap, elements } = this.props

    }
}

const mapStateToProps = (state: RootState, props: DjikstraProps) => ({
    // TODO figure out who is publishing elements to state.   
})