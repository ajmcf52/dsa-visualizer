import './SearchControl.css'
import React, { useState } from 'react'
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
    chooseStartNode: (startNode: string) => {},
    chooseGoalNode: (goalNode: string) => {},
    vertexList: string[],
}

interface SearchControlState {
    startNode: string,
    goalNode: string
}

const SearchControl = (props: SearchControlProps) => {
    const { chooseStartNode, chooseGoalNode, vertexList } = props
    const [startNode, setStartNode] = useState('')
    const [goalNode, setGoalNode] = useState('')
    const classes = useStyles()
    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id='selectNodeLabel'>Start</InputLabel>
                <Select
                    labelId='selectNodeLabel'
                    id='selectStartNode'
                    value={startNode}
                    label='Start'
                    onChange={(e) => {
                        console.log(e.target.value)
                        chooseStartNode(e.target.value as string) // app state push for graph solver
                        setStartNode(e.target.value as string) // component state
                    }}
                    input={<BootstrapInput />}
                >
                    {vertexList.filter(value => value !== goalNode).map((value) => {
                        return<MenuItem key={value} value={value}>{value}</MenuItem>
                    })}
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel id='selectNodeLabel'>Goal</InputLabel>
                <Select
                    labelId='selectNodeLabel'
                    id='selectGoalNode'
                    value={goalNode}
                    label='Goal'
                    onChange={(e) => {
                        chooseGoalNode(e.target.value as string)
                        setGoalNode(e.target.value as string)
                    }}
                    input={<BootstrapInput />}
                >
                    {vertexList.filter(value => value !== startNode).map((value) => {
                        return <MenuItem key={value} value={value}>{value}</MenuItem>
                    })}
                </Select>
            </FormControl>
        </div>

    )
}

const mapStateToProps = (state: RootState, props: SearchControlProps) => ({
    chosenStartNode: state && state.controlSettings && state.controlSettings.startNode,
    chosenGoalNode: state && state.controlSettings && state.controlSettings.goalNode,
    vertexList: state && state.graphDetails && state.graphDetails.vertexList
})

const mapDispatchToProps = {
    chooseStartNode: ControlSettingsEventCreator.selectStartNode,
    chooseGoalNode: ControlSettingsEventCreator.selectGoalNode
}

const connectedComp = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchControl)

export default connectedComp

