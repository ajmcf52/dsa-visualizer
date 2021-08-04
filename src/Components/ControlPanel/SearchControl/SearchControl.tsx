import './SearchControl.css'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { ControlSettingsEventCreator } from '../../../Actions/ControlSettingsEvent'
import { FormControl, InputLabel, Select, MenuItem, InputBase, Input } from '@material-ui/core'
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles'
import { RootState } from '../../../store'



const BootstrapInput = withStyles((theme: Theme) => 
    createStyles({
        root: {
            'label + &': {
                marginTop: theme.spacing(3),
            }
        },
        input: {
            borderRadius: 4,
            textAlignLast: 'center',
            fontSize: 16,
            border: '1px solid #ced4da',
            position: 'relative',
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
            margin: '0px 0px 2px 10px',
            minWidth: 60,
            textAlignLast: "center"
        },
        selection: {
            padding: '10px 26px 10px 12px'
        }
    })

)

interface SearchControlProps {
    chooseStartNode: (startNode: string) => {},
    chooseGoalNode: (goalNode: string) => {},
    chooseSearchAlgorithm: (algorithm: string) => {},
    vertexList: string[],
    searchAlgorithms: string[],
    chosenSearchAlgorithm: string
}

interface SearchControlState {
    startNode: string,
    goalNode: string
}

const SearchControl = (props: SearchControlProps) => {
    const { chooseStartNode, chooseGoalNode, chooseSearchAlgorithm, vertexList, searchAlgorithms, chosenSearchAlgorithm } = props
    const [startNode, setStartNode] = useState('')
    const [startSelectOpen, setStartSelectOpen] = useState(false)
    const [goalNode, setGoalNode] = useState('')
    const classes = useStyles()

    const handleStartSelectOpen = () => {
        setStartSelectOpen(true)
    }
    const handleStartSelectClose = () => {
        setStartSelectOpen(false)
    }

    if (!searchAlgorithms) {
        return <div />
    }
    else {
        return (
            <div className='searchSettings'>
                <FormControl className={classes.formControl}>
                    <InputLabel id='selectAlgorithmLabel'>Algorithm</InputLabel>
                    <Select
                        style={{minWidth:'100px'}}
                        labelId='selectAlgorithmLabel'
                        id='selectAlgorithm'
                        value={chosenSearchAlgorithm}
                        label='Algorithm'
                        onChange={(e) => chooseSearchAlgorithm(e.target.value as string)}
                    >
                        <MenuItem value=''>
                            <em>None</em>
                        </MenuItem>
                        {searchAlgorithms.map((value) => {
                            return <MenuItem key={value} value={value}>{value}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel id='selectNodeLabel'>Start</InputLabel>
                    <Select
                        open={startSelectOpen}
                        onOpen={handleStartSelectOpen}
                        onClose={handleStartSelectClose}
                        labelId='selectNodeLabel'
                        id='selectStartNode'
                        value={startNode}
                        label='Start'
                        onChange={(e) => {
                            chooseStartNode(e.target.value as string) // to app state (for graph solver)
                            setStartNode(e.target.value as string) // to component state
                        }}
                    >
                        <MenuItem value=''>
                            <em>None</em>
                        </MenuItem>
                        {vertexList.filter(value => value !== goalNode).map((value) => {
                            return <MenuItem key={value} value={value}>{value}</MenuItem>
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
                            chooseGoalNode(e.target.value as string) // to app state
                            setGoalNode(e.target.value as string) // to component state
                        }}
                    >
                        <MenuItem value=''>
                            <em>None</em>
                        </MenuItem>
                        {vertexList.filter(value => value !== startNode).map((value) => {
                            return <MenuItem key={value} value={value}>{value}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </div>
        )
    }
}

const mapStateToProps = (state: RootState, props: SearchControlProps) => ({
    searchAlgorithms: state && state.loadConfig && state.loadConfig.searching && state.loadConfig.searching.searchSettings
    && state.loadConfig.searching.searchSettings.algorithm && state.loadConfig.searching.searchSettings.algorithm.options,
    vertexList: state && state.graphDetails && state.graphDetails.vertexList,
    chosenSearchAlgorithm: state && state.controlSettings && state.controlSettings.algorithm
})

const mapDispatchToProps = {
    chooseStartNode: ControlSettingsEventCreator.selectStartNode,
    chooseGoalNode: ControlSettingsEventCreator.selectGoalNode,
    chooseSearchAlgorithm: ControlSettingsEventCreator.selectAlgorithm
}

const connectedComp = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchControl)

export default connectedComp

