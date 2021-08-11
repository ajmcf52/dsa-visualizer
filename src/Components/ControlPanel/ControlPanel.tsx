import './ControlPanel.css'
import TabControl from './TabControl'
import SearchControl from './SearchControl'

interface ControlPanelProps {
    algorithms: {
        searching: string[]
        sorting: string[]
    }
    selectedAlgorithmType: 'string'
    selectedAlgorithm: number
    controlSettings: {
        searching: {
            startingNodeLabel: string
            endingNodeLabel: string
            graphSizeSelection: string
            directed: boolean
            weighted: boolean
        }
        sorting: {}
    }
}

function ControlPanel() {
    return (
        <div className='controlContainer'>
            <SearchControl />
            <TabControl />
        </div>
    )
}

export default ControlPanel
