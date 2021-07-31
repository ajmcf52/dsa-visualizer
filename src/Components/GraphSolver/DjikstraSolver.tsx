export {}
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
 *      for each neighbor:
 *          set its distance as the minimum between its current known distance and the topmost node's
 *          distance plus the cost of the connecting edge.
 *          
 *          if the node is not already in the PQ, add it in now.
 */