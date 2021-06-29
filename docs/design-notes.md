## overview
herein, we have a data visualization web app built with React and Redux, implemented in TypeScript. For the purpose of this app, we are mostly interested in searching and sorting. Search algorithms will at a minimum include Djikstra's Algorithm, A*, DFS, and BFS, while sorting algorithms will include QuickSort, MergeSort, InsertionSort, HeapSort, and BubbleSort.

## user goals
the goal of a user of this system is really just to learn from and enjoy the visualization of included searching and sorting algorithms.

## features
- seamless setup and customization of data structures to be searched or sorted.
- real-time animation of data structures being worked on.
- intuitive and user-friendly interface for interacting with the application.

## requirements
to provide the desired experience for customizing and setting up search algorithms in-action, our control panel will need to consist of the following elements:

- a 3-way radio button for selecting a small, medium, or large graph.
- hoverable text buttons for selecting which algorithm we want.
- a text box to allow the user to input the starting and ending node.
  - if selecting DFS or BFS, preset the selection to be 0 for the tree root.
- radio buttons for selecting whether or not the graph should be:
  - directed/undirected
  - weighted/unweighted

we will start with these requirements for now. Depending how difficult this proves to be will determine whether or not we implement a custom graph builder.

Sorting requirements TBD