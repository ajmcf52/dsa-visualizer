import './App.css';
import {
    buildElementList,
    buildAdjacencyMap,
    buildPositionMap,
    generateEdgeAnchors,
} from './Factory/GraphFactory';
import ControlPanel from './Components/ControlPanel';
import { store } from './store';
import { Provider } from 'react-redux';
import ConfigLoader from './Config';
import Graph from './Components/Graph';
import DjikstraSolver from './Components/GraphSolver/DjikstraSolver';

function App() {
    let adjMap = buildAdjacencyMap('small', true, true);
    let plainEdgeLists: { [key: string]: { to: string; weight: number }[] } =
        {};
    adjMap.edgeLists.forEach((value, key) => {
        plainEdgeLists[key] = value;
    });

    let vertexList = Array.from(adjMap.edgeLists.keys());
    let posMap = buildPositionMap(adjMap);
    let anchorMap = generateEdgeAnchors(adjMap, posMap);
    let results = buildElementList(adjMap, posMap, anchorMap);
    let elements = results.elements;
    let graphComponent = (
        <Graph
            initialElementList={elements}
            adjMap={adjMap}
            plainEdgeLists={plainEdgeLists}
            indexMap={results.indices}
            vertexList={vertexList}
        />
    );
    console.log(adjMap);
    return (
        <div className='App'>
            <Provider store={store}>
                <ConfigLoader />
                <ControlPanel />
                {graphComponent}
                <DjikstraSolver G={adjMap} graph={graphComponent} />
            </Provider>
        </div>
    );
}

export default App;
