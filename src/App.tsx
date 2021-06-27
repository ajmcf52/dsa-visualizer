import React from 'react';
import logo from './logo.svg';
import './App.css';
import GraphNode from './Components/Graph/GraphNode';
import NodeGridColumn from './Components/NodeGrid/NodeGridColumn';
import VisualizationSpace from './Components/VisualizationSpace'

function App() {

  return (
    <div className="App">
      <VisualizationSpace>
        <NodeGridColumn size={5} startingLabelCode={1}/>
      </VisualizationSpace>
    </div>
  );
}

export default App;
