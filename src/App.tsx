import './App.css';
import NodeGrid from './Components/NodeGrid'
import VisualizationSpace from './Components/VisualizationSpace'
import ReactFlow, { Elements } from 'react-flow-renderer'
import { getGraphElements } from './Factory/GraphFactory'
import ControlPanel from './Components/ControlPanel';
import { store } from './store'
import { Provider } from 'react-redux'

function App() {
  let elements: Elements = getGraphElements('small', true, true).elements
  return (
    <div className="App">
      <Provider store={store}>
        <ControlPanel />
      </Provider>
    </div>
  );
}

export default App;
