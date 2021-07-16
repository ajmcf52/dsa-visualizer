import { connect } from 'react-redux'
import React from 'react'
import { RootState } from '../store'

interface ControlFactoryProps {
    graphNodeLabels: string[],
    configJson: Object,
    pushGraphSettings: (size: string, 
                        isWeighted: boolean, 
                        isDirected: boolean) => {},
    
}

class ControlFactory extends React.Component<ControlFactoryProps> {
    render() {
        return <div />
    }


}

const mapStateToProps = (state: RootState, props: ControlFactoryProps) => ({
    
})

export const generateSearchControls = (configJson: Object) => {
    /**
     * parse the JSON object, keying on fields
     */
    return (
        <div className='searchControlsContainer'>
            {
                <div />
            // Object.keys(configJson.searching)
            }
        </div>
    )
}
