import './SearchControl.css'
import React from 'react'
import { connect } from 'react-redux'
import { ControlSettingsEventCreator } from '../../../Actions/ControlSettingsEvent'
import { FormControl, InputLabel, Select, MenuItem, Box } from '@material-ui/core'
import { RootState } from '../../../store'

interface SearchControlProps {
    startNode: string,
    goalNode: string,
    chooseStartNode: (startNode: string) => {}
}

const SearchControl = (props: SearchControlProps) => {
    const { startNode, goalNode, chooseStartNode } = props
    
    return (<Box className='selectStartNodeBox'>
        <FormControl fullWidth>
            <InputLabel id='selectStartNodeLabel'>Start Node</InputLabel>
            <Select
                labelId='selectStartNodeLabel'
                id='selectStartNode'
                value={startNode}
                label='Start Node'
                onChange={(e) => chooseStartNode(e.currentTarget.value as string)}
            >
                {/**
                 * placeholder values being used for now until we get our built graph
                 * linked up with the app state.
                 */}
                <MenuItem value={'A'}>A</MenuItem>
                <MenuItem value={'B'}>B</MenuItem>
                <MenuItem value={'C'}>C</MenuItem>
            </Select>
        </FormControl>
    </Box>)
}

const mapStateToProps = (state: RootState, props: SearchControlProps) => ({
    chosenStartNode: state && state.controlSettings && state.controlSettings.startNode,
    chosenGoalNode: state && state.controlSettings && state.controlSettings.goalNode
})

const mapDispatchToProps = {
    chooseStartNode: ControlSettingsEventCreator.selectStartNode
}

const connectedComp = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchControl)

export default connectedComp

