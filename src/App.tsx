import React from 'react';
import logo from './logo.svg';
import './App.css';
import GraphNode from './Components/Graph/GraphNode';
import VisualizationSpace from './Components/VisualizationSpace'

function App() {
  return (
    <div className="App">
      <VisualizationSpace/>

      <GraphNode label='A'/>
    </div>
  );
}

export default App;
