import React from 'react';
import { AdjacencyMap } from '../../Factory/GraphFactory';
import PriorityQueue from './PriorityQueue';
import Graph from '../Graph';
import { animateTraversal, animateVisit } from '../Graph/Graph';
import { RootState } from '../../store';
import { connect } from 'react-redux';
import { GraphEventCreator } from '../../Actions/GraphEvent';

/**
 * pseudocode:
 *
 * def djikstra(G, start, end):
 *  make a set of all nodes in the graph, assigning them a distance of infinity. Find the starting node
 *  and assign its distance to be 0.
 *
 *  declare a PQ<Node>, where each Node in the PQ is ordered by distance. Each Node will also carry
 *  an id string, as well as a 'last' Node, as in the Node from which this Node was visited.
 *
 *  put the starting node into the PQ, and start your loop (while PQ is not empty)...
 *      pull the topmost node out of the PQ
 *      if the node is the goal node, we're done (re-trace the path)
 *
 *      for each neighbor that is unvisited:
 *          set its distance as the minimum between its current known distance and the topmost node's
 *          distance plus the cost of the connecting edge.
 *
 *          if the node is not already in the PQ, add it in now. Otherwise, if the new distance is smaller than
 *          its current distance, update it (as well as the 'via' field)
 */

interface DjikstraSolverProps {
    G: AdjacencyMap;
    graph: React.RefObject<InstanceType<typeof Graph>>;
    start?: string;
    end?: string;
    solvingStarted?: boolean;
    animateEdge: (edgeId: string) => {};
    animateNode: (nodeId: string) => {};
}

interface DjikstraSolverState {}

class DjikstraSolver extends React.Component<
    DjikstraSolverProps,
    DjikstraSolverState
> {
    render() {
        // TODO render a visual priority queue.
        return <div />;
    }
    componentDidUpdate() {
        console.log('update');
        let { solvingStarted, start, end } = this.props;
        if (solvingStarted && start && end) {
            this.run();
        }
    }
    run() {
        console.log('running');
        let { G, start, end, animateEdge, animateNode } = this.props;
        let unvisited = new Set<string>();
        let distances: { [id: string]: number } = {};
        G.edgeLists.forEach((value, key) => {
            if (key === start) {
                distances[key] = 0;
            } else {
                distances[key] = Number.POSITIVE_INFINITY;
            }
            unvisited.add(key);
        });
        let pq: PriorityQueue = new PriorityQueue();
        pq.add(start!, 0, '-');
        let prevCurrent = null;
        while (!pq.isEmpty()) {
            let current = pq.removeHead()!;

            if (prevCurrent) {
                G.edgeLists
                    .get(prevCurrent.id)!
                    .filter((value) => value.to === current.id)
                    .forEach((value) => {
                        animateEdge(value.edgeId);
                        //animateTraversal(graph.current, value.edgeId);
                    });
            }
            animateNode(current.id);
            //animateVisit(graph.current, current.id);

            if (current.id === end) {
                // we're done!
                // TODO add in visual backtracking of the shortest path found
                return 'success';
            }
            // we only want to process edges to nodes that are still unvisited
            G.edgeLists
                .get(current.id)!
                .filter((value) => unvisited.has(value.to))
                .forEach((value) => {
                    let costToNeighbor = distances[current.id] + value.weight;
                    if (distances[value.to] === Number.POSITIVE_INFINITY) {
                        distances[value.to] = costToNeighbor;
                        // TODO add in an animation here
                        pq.add(value.to, costToNeighbor, current.id);
                    } else if (distances[value.to] > costToNeighbor) {
                        distances[value.to] = costToNeighbor;
                        // TODO add in an animation here
                        pq.setCostOf(value.to, costToNeighbor, current.id);
                    }
                });
            // mark the node that we have visited
            unvisited.delete(current.id);
            prevCurrent = current;
        }
    }
}

const mapStateToProps = (state: RootState, props: DjikstraSolverProps) => ({
    start: state && state.controlSettings && state.controlSettings.startNode,
    end: state && state.controlSettings && state.controlSettings.goalNode,
    solvingStarted:
        state && state.graphDetails && state.graphDetails.solveGraph,
});

const mapDispatchToProps = {
    animateEdge: GraphEventCreator.animateEdge,
    animateNode: GraphEventCreator.animateNode,
};

const connectedComp = connect(
    mapStateToProps,
    mapDispatchToProps
)(DjikstraSolver);

export default connectedComp;
