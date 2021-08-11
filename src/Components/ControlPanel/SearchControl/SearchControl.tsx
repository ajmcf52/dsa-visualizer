import './SearchControl.css'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { ControlSettingsEventCreator } from '../../../Actions/ControlSettingsEvent'
import { FormControl, InputLabel, Select, MenuItem, InputBase, Input } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { RootState } from '../../../store'
import classNames from 'classnames'

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        formControl: {
            margin: '10px 0px 2px 10px',
            minWidth: 60,
            textAlignLast: 'center',
            color: 'white',
            '& .MuiSelect-root': {
                color: 'white'
            }
        },
        selection: {
            padding: '10px 26px 10px 12px'
        },
        menuSelect: {
            '& .MuiPaper-root': {
                backgroundColor: 'lightblue'
            }
        }
    })

)

interface SearchControlProps {
    chooseStartNode: (startNode: string) => {},
    chooseGoalNode: (goalNode: string) => {},
    chooseSearchAlgorithm: (algorithm: string) => {},
    chooseGraphSize: (graphSize: string) => {},
    toggleWeighted: (isWeighted: boolean) => {},
    toggleDirected: (isDirected: boolean) => {},
    vertexList: string[],
    searchAlgorithms: string[],
    chosenSearchAlgorithm: string,
    graphSize: string,
    isWeighted: boolean,
    isDirected: boolean,
    graphSizeOptions: string[]
}

const SearchControl = (props: SearchControlProps) => {
    const { 
        chooseStartNode, 
        chooseGoalNode, 
        chooseSearchAlgorithm,
        chooseGraphSize,
        toggleWeighted,
        toggleDirected,
        vertexList, 
        searchAlgorithms, 
        chosenSearchAlgorithm,
        graphSize,
        isWeighted,
        isDirected,
        graphSizeOptions } = props
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
            <div className='controlsContainer'>
                <div className='settingsList'>
                    <FormControl className={classes.formControl}>
                        <InputLabel style={{color: 'white'}} id='selectAlgorithmLabel'>Algorithm</InputLabel>
                        <Select
                            MenuProps={{className: classes.menuSelect}}
                            style={{minWidth:'100px'}}
                            labelId='selectAlgorithmLabel'
                            id='selectAlgorithm'
                            value={chosenSearchAlgorithm}
                            label='Algorithm'
                            onChange={(e) => chooseSearchAlgorithm(e.target.value as string)}
                        >
                            <MenuItem value='' style={{color: 'white'}}>
                                <em>None</em>
                            </MenuItem>
                            {searchAlgorithms.map((value) => {
                                return <MenuItem style={{color: 'white'}} key={value} value={value}>{value}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel style={{color: 'white'}} id='selectNodeLabel'>Start</InputLabel>
                        <Select
                            MenuProps={{className: classes.menuSelect}}
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
                            <MenuItem value='' style={{color: 'white'}}>
                                <em>None</em>
                            </MenuItem>
                            {vertexList.filter(value => value !== goalNode).map((value) => {
                                return <MenuItem key={value} value={value} style={{color: 'white'}}>{value}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel style={{color: 'white'}} id='selectNodeLabel'>Goal</InputLabel>
                        <Select
                            MenuProps={{className: classes.menuSelect}}
                            labelId='selectNodeLabel'
                            id='selectGoalNode'
                            value={goalNode}
                            label='Goal'
                            onChange={(e) => {
                                chooseGoalNode(e.target.value as string) // to app state
                                setGoalNode(e.target.value as string) // to component state
                            }}
                        >
                            <MenuItem value='' style={{color: 'white'}}>
                                <em>None</em>
                            </MenuItem>
                            {vertexList.filter(value => value !== startNode).map((value) => {
                                return <MenuItem key={value} value={value} style={{color: 'white'}}>{value}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </div>
                <div className='settingsList'>
                    <FormControl style={{minWidth: 90}} className={classes.formControl}>
                        <InputLabel style={{color: 'white'}} id='selectGraphSizeLabel'>Graph Size</InputLabel>
                        <Select
                            MenuProps={{className: classes.menuSelect}}
                            labelId='selectGraphSizeLabel'
                            id='selectGraphSize'
                            value={graphSize}
                            label='Graph Size'
                            onChange={(e) => chooseGraphSize(e.target.value as string)}
                        >
                            {graphSizeOptions.map((value) => {
                                return <MenuItem key={value} value={value} style={{color: 'white'}}>{value}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state: RootState, props: SearchControlProps) => ({
    searchAlgorithms: state && state.loadConfig && state.loadConfig.searching && state.loadConfig.searching.searchSettings
    && state.loadConfig.searching.searchSettings.algorithm && state.loadConfig.searching.searchSettings.algorithm.options,
    vertexList: state && state.graphDetails && state.graphDetails.vertexList,
    chosenSearchAlgorithm: state && state.controlSettings && state.controlSettings.algorithm,
    graphSize: state && state.controlSettings && state.controlSettings.graphSize,
    isWeighted: state && state.controlSettings && state.controlSettings.isWeighted,
    isDirected: state && state.controlSettings && state.controlSettings.isDirected,
    graphSizeOptions: state && state.loadConfig && state.loadConfig.searching && state.loadConfig.searching.graphSettings
    && state.loadConfig.searching.graphSettings.graphSizeOptions
})

const mapDispatchToProps = {
    chooseStartNode: ControlSettingsEventCreator.selectStartNode,
    chooseGoalNode: ControlSettingsEventCreator.selectGoalNode,
    chooseSearchAlgorithm: ControlSettingsEventCreator.selectAlgorithm,
    chooseGraphSize: ControlSettingsEventCreator.selectGraphSize,
    toggleWeighted: ControlSettingsEventCreator.toggleWeighted,
    toggleDirected: ControlSettingsEventCreator.toggleDirected
}

const connectedComp = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchControl)

export default connectedComp

