import './SearchControl.css'
import React from 'react'
import { connect } from 'react-redux'
import { ControlSettingsEventCreator } from '../../../Actions/ControlSettingsEvent'
import { FormControl, InputLabel, Select, MenuItem, Box } from '@material-ui/core'
import { RootState } from '../../../store'

interface SearchControlProps {
    startNode: string,
    goalNode: string,
    chooseStartNode: (startNode: string) => {},
    vertexList: string[],
}

const SearchControl = (props: SearchControlProps) => {
    const { startNode, goalNode, chooseStartNode, vertexList } = props
    
    return (<Box className='selectStartNodeBox'>
        <FormControl>
            <InputLabel id='selectStartNodeLabel'>Start Node</InputLabel>
            <Select
                labelId='selectStartNodeLabel'
                id='selectStartNode'
                value={startNode}
                label='Start Node'
                onChange={(e) => chooseStartNode(e.currentTarget.value as string)}
            >
            {vertexList.map((value) => {
                return<MenuItem value={value}>{value}</MenuItem>
            })}

            </Select>
        </FormControl>
    </Box>)
}

const mapStateToProps = (state: RootState, props: SearchControlProps) => ({
    chosenStartNode: state && state.controlSettings && state.controlSettings.startNode,
    chosenGoalNode: state && state.controlSettings && state.controlSettings.goalNode,
    vertexList: state && state.graphDetails && state.graphDetails.vertexList
})

const mapDispatchToProps = {
    chooseStartNode: ControlSettingsEventCreator.selectStartNode
}

const connectedComp = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchControl)

export default connectedComp

