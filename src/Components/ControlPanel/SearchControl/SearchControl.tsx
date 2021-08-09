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
            margin: '0px 0px 2px 10px',
            minWidth: 60,
            textAlignLast: 'center',
            color: 'white'
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
    vertexList: string[],
    searchAlgorithms: string[],
    chosenSearchAlgorithm: string
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
                <FormControl className={classNames(classes.formControl, classes.menuSelect)}>
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
                        <MenuItem value=''>
                            <em>None</em>
                        </MenuItem>
                        {searchAlgorithms.map((value) => {
                            return <MenuItem style={{backgroundColor:'lightblue'}} key={value} value={value}>{value}</MenuItem>
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
                        <MenuItem value=''>
                            <em>None</em>
                        </MenuItem>
                        {vertexList.filter(value => value !== goalNode).map((value) => {
                            return <MenuItem key={value} value={value}>{value}</MenuItem>
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

