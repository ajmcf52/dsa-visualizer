import './SearchControl.css'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { ControlSettingsEventCreator } from '../../../Actions/ControlSettingsEvent'
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    FormControlLabel,
    Button,
} from '@material-ui/core'
import {
    createStyles,
    makeStyles,
    Theme,
    withStyles,
} from '@material-ui/core/styles'
import { RootState } from '../../../store'
import classNames from 'classnames'
import { blue } from '@material-ui/core/colors'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: '10px 0px 2px 10px',
            minWidth: 60,
            textAlignLast: 'center',
            color: 'white',
            '& .MuiSelect-root': {
                color: 'white',
            },
        },
        formControlLabel: {
            marginTop: '25px',
        },
        menuSelect: {
            '& .MuiPaper-root': {
                backgroundColor: 'lightblue',
            },
        },
        checkBoxes: {
            '& .MuiFormControlLabel-root': {
                justifyContent: 'flex-start',
                display: 'flex',
                flexDirection: 'row',
                marginLeft: '-5px',
            },
        },
        controlButton: {
            margin: '-20px 15px 25px 0px',
            zIndex: 1,
        },
    })
)

const CustomButton = withStyles((theme: Theme) => ({
    root: {
        color: theme.palette.getContrastText(blue[500]),
        backgroundColor: blue[500],
        '&:hover': {
            backgroundColor: blue[700],
        },
    },
}))(Button)

interface SearchControlProps {
    chooseStartNode: (startNode: string) => {}
    chooseGoalNode: (goalNode: string) => {}
    chooseSearchAlgorithm: (algorithm: string) => {}
    chooseGraphSize: (graphSize: string) => {}
    toggleWeighted: (isWeighted: boolean) => {}
    toggleDirected: (isDirected: boolean) => {}
    vertexList: string[]
    searchAlgorithms: string[]
    chosenSearchAlgorithm: string
    graphSize: string
    isWeighted: boolean
    isDirected: boolean
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
        graphSizeOptions,
    } = props
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
    } else {
        return (
            <div className='containerFlow'>
                <div className='controlsContainer'>
                    <div className='settingsList'>
                        <FormControl className={classes.formControl}>
                            <InputLabel
                                style={{ color: 'white' }}
                                id='selectAlgorithmLabel'
                            >
                                Algorithm
                            </InputLabel>
                            <Select
                                MenuProps={{ className: classes.menuSelect }}
                                style={{ minWidth: '100px' }}
                                labelId='selectAlgorithmLabel'
                                id='selectAlgorithm'
                                value={chosenSearchAlgorithm}
                                label='Algorithm'
                                onChange={(e) =>
                                    chooseSearchAlgorithm(
                                        e.target.value as string
                                    )
                                }
                            >
                                <MenuItem value='' style={{ color: 'white' }}>
                                    <em>None</em>
                                </MenuItem>
                                {searchAlgorithms.map((value) => {
                                    return (
                                        <MenuItem
                                            style={{ color: 'white' }}
                                            key={value}
                                            value={value}
                                        >
                                            {value}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel
                                style={{ color: 'white' }}
                                id='selectNodeLabel'
                            >
                                Start
                            </InputLabel>
                            <Select
                                MenuProps={{ className: classes.menuSelect }}
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
                                <MenuItem value='' style={{ color: 'white' }}>
                                    <em>None</em>
                                </MenuItem>
                                {vertexList
                                    .filter((value) => value !== goalNode)
                                    .map((value) => {
                                        return (
                                            <MenuItem
                                                key={value}
                                                value={value}
                                                style={{ color: 'white' }}
                                            >
                                                {value}
                                            </MenuItem>
                                        )
                                    })}
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel
                                style={{ color: 'white' }}
                                id='selectNodeLabel'
                            >
                                Goal
                            </InputLabel>
                            <Select
                                MenuProps={{ className: classes.menuSelect }}
                                labelId='selectNodeLabel'
                                id='selectGoalNode'
                                value={goalNode}
                                label='Goal'
                                onChange={(e) => {
                                    chooseGoalNode(e.target.value as string) // to app state
                                    setGoalNode(e.target.value as string) // to component state
                                }}
                            >
                                <MenuItem value='' style={{ color: 'white' }}>
                                    <em>None</em>
                                </MenuItem>
                                {vertexList
                                    .filter((value) => value !== startNode)
                                    .map((value) => {
                                        return (
                                            <MenuItem
                                                key={value}
                                                value={value}
                                                style={{ color: 'white' }}
                                            >
                                                {value}
                                            </MenuItem>
                                        )
                                    })}
                            </Select>
                        </FormControl>
                    </div>
                    <div
                        className={classNames(
                            'settingsList',
                            'graphSettingsList'
                        )}
                    >
                        <FormControl
                            style={{ minWidth: 90 }}
                            className={classes.formControl}
                        >
                            <InputLabel
                                style={{ color: 'white' }}
                                id='selectGraphSizeLabel'
                            >
                                Graph Size
                            </InputLabel>
                            <Select
                                style={{ minWidth: '110px' }}
                                MenuProps={{ className: classes.menuSelect }}
                                labelId='selectGraphSizeLabel'
                                id='selectGraphSize'
                                value={graphSize}
                                label='Graph Size'
                                onChange={(e) =>
                                    chooseGraphSize(e.target.value as string)
                                }
                            >
                                <MenuItem value='' style={{ color: 'white' }}>
                                    <em>None</em>
                                </MenuItem>
                                {graphSizeOptions.map((value) => {
                                    return (
                                        <MenuItem
                                            key={value}
                                            value={value}
                                            style={{ color: 'white' }}
                                        >
                                            {value}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                        <div
                            className={classNames(
                                classes.checkBoxes,
                                'checkBoxFlow'
                            )}
                        >
                            <FormControlLabel
                                className={classNames(
                                    classes.formControl,
                                    classes.formControlLabel
                                )}
                                control={
                                    <Checkbox
                                        checked={isWeighted}
                                        onChange={() =>
                                            toggleWeighted(!isWeighted)
                                        }
                                        name='toggleWeighted'
                                        color='primary'
                                    />
                                }
                                label='Weighted'
                            />
                            <FormControlLabel
                                className={classes.formControl}
                                control={
                                    <Checkbox
                                        checked={isDirected}
                                        onChange={() =>
                                            toggleDirected(!isDirected)
                                        }
                                        name='toggleDirected'
                                        color='primary'
                                    />
                                }
                                label='Directed'
                            />
                        </div>
                    </div>
                </div>
                <div className='buttonControls'>
                    <CustomButton
                        type='button'
                        className={classes.controlButton}
                        variant='contained'
                        color='primary'
                        onClick={() => console.log('click')}
                    >
                        New Graph
                    </CustomButton>
                    <Button
                        className={classes.controlButton}
                        variant='contained'
                    >
                        Start
                    </Button>
                    <Button
                        className={classes.controlButton}
                        variant='contained'
                    >
                        Reset
                    </Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: RootState, props: SearchControlProps) => ({
    searchAlgorithms:
        state &&
        state.loadConfig &&
        state.loadConfig.searching &&
        state.loadConfig.searching.searchSettings &&
        state.loadConfig.searching.searchSettings.algorithm &&
        state.loadConfig.searching.searchSettings.algorithm.options,
    vertexList: state && state.graphDetails && state.graphDetails.vertexList,
    chosenSearchAlgorithm:
        state && state.controlSettings && state.controlSettings.algorithm,
    graphSize:
        state && state.controlSettings && state.controlSettings.graphSize,
    isWeighted:
        state && state.controlSettings && state.controlSettings.isWeighted,
    isDirected:
        state && state.controlSettings && state.controlSettings.isDirected,
    graphSizeOptions:
        state &&
        state.loadConfig &&
        state.loadConfig.searching &&
        state.loadConfig.searching.graphSettings &&
        state.loadConfig.searching.graphSettings.graphSizeOptions,
})

const mapDispatchToProps = {
    chooseStartNode: ControlSettingsEventCreator.selectStartNode,
    chooseGoalNode: ControlSettingsEventCreator.selectGoalNode,
    chooseSearchAlgorithm: ControlSettingsEventCreator.selectAlgorithm,
    chooseGraphSize: ControlSettingsEventCreator.selectGraphSize,
    toggleWeighted: ControlSettingsEventCreator.toggleWeighted,
    toggleDirected: ControlSettingsEventCreator.toggleDirected,
}

const connectedComp = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchControl)

export default connectedComp
