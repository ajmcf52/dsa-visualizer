interface HeapNode {
    id: string,
    distance: number,
    via: string
}

class MinHeap {
    A: HeapNode[] = []
    N: number = 0
    I: {[id: string] : number} = {}

    constructor(nodes: HeapNode[] = [], size: number = 0) {
        this.A = nodes
        this.N = size
        for (let i = 0; i < this.N; i++) {
            this.I[this.A[i].id] = i
        }
    }

    left(i: number) {
        if (i < 0 || i >= this.N) {
            return -1
        }
        else {
            return 2 * i + 1
        }
    }

    right(i: number) {
        if (i < 0 || i >= this.N) {
            return -1
        }
        else {
            return 2 * i + 2
        }
    }

    parent(i: number) {
        if (i <= 0 || i >= this.N) {
            return -1
        }
        else {
            return Math.floor((i - 1) / 2)
        }
    }

    heapify(i: number) {
        while (true) {
            if (i < 0 || i >= Math.floor(this.N / 2)) { // out of bounds or no children
                break
            }
            let smallest = i
            let left = this.left(i)
            if (left < this.N && this.A[left].distance < this.A[smallest].distance ) {
                smallest = left
            }
            let right = this.right(i)
            if (right < this.N && this.A[right].distance < this.A[smallest].distance) {
                smallest = right
            }
            if (smallest === i) {
                break
            }
            let temp = this.A[smallest]
            this.A[smallest] = this.A[i]
            this.A[i] = temp
            i = smallest
        }
    }

    heapifyUp(i: number) {
        while (i >= 0) {
            this.heapify(i)
            i = this.parent(i)
        }
    }

    setValueOf(id: string, val: number, from: string) {
        let index = this.I[id]
        this.A[index].distance = val
        this.A[index].via = from
        // determine if we need to heapify up or down
        let parent = this.parent(index)
        if (parent >= 0 && this.A[index].distance < this.A[parent].distance) {
            this.heapifyUp(parent)
        }
        else {
            this.heapify(index)
        }
    }

    put(node: HeapNode) {
        this.N += 1
        this.A.push(node)
        this.heapifyUp(this.parent(this.N - 1))
    }

    remove() {
        if (this.N === 0) {
            return null
        }
        let temp = this.A[0]
        this.A[0] = this.A[this.N - 1]
        this.A[this.N - 1] = temp
        let result = this.A.pop()
        this.N -= 1
        this.heapify(0)
        return result

    }

}

class PriorityQueue {
    heap: MinHeap = new MinHeap()

    add(id: string, cost: number, via: string) {
        let node: HeapNode = {
            id: id,
            distance: cost,
            via: via
        }
        this.heap.put(node)
    }

    setCostOf(id: string, cost: number, via: string) {
        this.heap.setValueOf(id, cost, via)
    }

    removeHead() {
        let result = this.heap.remove()
        return result
    }
}

export default PriorityQueue