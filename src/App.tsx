import './App.css';
import NodeGrid from './Components/NodeGrid'
import VisualizationSpace from './Components/VisualizationSpace'
import ReactFlow, { Elements } from 'react-flow-renderer'
import { getGraphElements } from './Factory/GraphFactory'

function App() {
  let elements: Elements = getGraphElements('small', true, true).elements
  return (
    <div className="App">
      <VisualizationSpace>
        <div style={{height: 300, width: 500}}>
          <ReactFlow elements={elements}>

          </ReactFlow>
        </div>
      </VisualizationSpace>
    </div>
  );
}

export default App;
