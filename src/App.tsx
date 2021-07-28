import './App.css';
import NodeGrid from './Components/NodeGrid'
import VisualizationSpace from './Components/VisualizationSpace'
import ReactFlow, { Elements } from 'react-flow-renderer'
import { buildElementList, buildAdjacencyMap, buildPositionMap, generateEdgeAnchors } from './Factory/GraphFactory'
import ControlPanel from './Components/ControlPanel';
import { store } from './store'
import { Provider } from 'react-redux'
import ConfigLoader from './Config'
import Graph from './Components/Graph';

function App() {
  let adjMap = buildAdjacencyMap('small', true, true)
  let posMap = buildPositionMap(adjMap)
  let anchorMap = generateEdgeAnchors(adjMap, posMap)
  let results = buildElementList(adjMap, posMap, anchorMap)
  let elements = results.elements
  return (
    <div className="App">
      <Provider store={store}>
        <ConfigLoader />
        <ControlPanel />
        <Graph elementList={elements} adjMap={adjMap} indexMap={results.indices}></Graph>
      </Provider>
    </div>
  );
}

export default App;
