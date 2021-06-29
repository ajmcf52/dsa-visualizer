import { Select, InputLabel, MenuItem, FormControl} from '@material-ui/core'
import React from 'react'

interface NodeSelectProps {
    label: string,
    options: string[]
}

interface NodeSelectState {
    selected: string
}

function NodeSelect({label, options}: NodeSelectProps) {
    const [state, setState] = React.useState<NodeSelectState>({
        selected: ''
    })

    const handleChange = (event: React.ChangeEvent<{name?: string, value: unknown}>) => {
        const name = event.target.name as keyof typeof state;
        setState({
            ...state,
            [name]: event.target.value as string
        })
    }

    return (<div>
        <FormControl>
            <InputLabel>{label}</InputLabel>
            <Select native 
            value={state.selected}
            onChange={handleChange}
            inputProps={{
                name: 'selected',
                id: 'node-select'
            }}
            >
            {options.map(option => {
                return <option value={option}>{option}</option>
            })}
            </Select>
        </FormControl>
    </div>)

}