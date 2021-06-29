import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

interface RadioButtonsGroupProps {
    label: string,
    options: string[]
}

function RadioButtonsGroup({label, options}: RadioButtonsGroupProps) {
    const [value, setValue] = React.useState(0)
    const handleChange = (event: any) => {
        setValue(event.target.value)
    }

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup aria-label={label} name={label + '1'} value={value} onChange={handleChange} row>
                {options.map(option => {
                    return <FormControlLabel value={option} control={<Radio/>} label={option} labelPlacement="start"/>
                })}
            </RadioGroup>
        </FormControl>
    )
}

export default RadioButtonsGroup;