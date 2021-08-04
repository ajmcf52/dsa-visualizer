import './SearchControl.css'
import React from 'react'
import { connect } from 'react-redux'
import { ControlSettingsEventCreator } from '../../../Actions/ControlSettingsEvent'
import { FormControl, InputLabel, Select, MenuItem, InputBase, Input } from '@material-ui/core'
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles'
import { RootState } from '../../../store'
import { relative } from 'path/posix'

const BootstrapInput = withStyles((theme: Theme) => 
    createStyles({
        root: {
            'label + &': {
                marginTop: theme.spacing(3),
            }
        },
        input: {
            borderRadius: 4,
            fontSize: 16,
            border: '1px solid #ced4da',
            position: 'relative',
            backgroundColor: theme.palette.background.paper,
            padding: '10px 26px 10px 12px',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            fontFamily: ['Courier New'].join(','),
            '&:focus': {
                borderColor: '#80bdff',
                boxShadow: '0 0 0 0.2rem rgba(0,123,255,0.25)'
            }
        }
    }))(InputBase)

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 60
        },
        selection: {
            padding: '10px 26px 10px 12px'
        }
    })

)

interface SearchControlProps {
    startNode: string,
    goalNode: string,
    chooseStartNode: (startNode: string) => {},
    vertexList: string[],
}

const SearchControl = (props: SearchControlProps) => {
    const { startNode, goalNode, chooseStartNode, vertexList } = props
    const classes = useStyles()
    return (
        <FormControl className={classes.formControl}>
            <InputLabel id='selectStartNodeLabel'>Start</InputLabel>
            <Select
                labelId='selectStartNodeLabel'
                id='selectStartNode'
                value={startNode}
                label='Start'
                onChange={(e) => chooseStartNode(e.currentTarget.value as string)}
                input={<BootstrapInput />}
            >
            {vertexList.map((value) => {
                return<MenuItem value={value}>{value}</MenuItem>
            })}

            </Select>
        </FormControl>
    )
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

