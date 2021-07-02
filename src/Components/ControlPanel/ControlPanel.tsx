
interface ControlPanelProps {
    algorithms: {
        'searching': string[],
        'sorting': string[]
    }
    selectedAlgorithmType: 'string',
    selectedAlgorithm: number,
    controlSettings: {
        'searching': {
            startingNodeLabel: string,
            endingNodeLabel: string,
            graphSizeSelection: string,
            directed: boolean,
            weighted: boolean
        },
        'sorting': {}
    }
}

function ControlPanel ({controlSettings} : ControlPanelProps) {

}

export default ControlPanel;