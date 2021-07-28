import jsonFile from '../Config/config.json'
import RadioButtonsGroup from '../Components/Misc/RadioButtonsGroup'
import NodeSelect from '../Components/Misc/NodeSelect'
import { Checkbox, FormControlLabel} from '@material-ui/core'

export function createControlOptions(settingsType: string) {
    var options: Object = {}
    var result: JSX.Element[] = []
    if (settingsType === 'searchSettings'){
        options = jsonFile.searching.searchSettings
    }

    // optionsArr.forEach(option => {
    //     if (option.inputType === 'radio') {
    //         // enforce non-null assertion
    //         let options = option.options!
    //         if (options === undefined) {
    //             result.push(<div>undefined</div>) // if it is null, we push this (which it should never be)
    //         }
    //         else {
    //             result.push(<RadioButtonsGroup label={option.label} options={options}/>)
    //         }
    //     }
    //     else if (option.inputType === 'boolean'){
    //         result.push(<FormControlLabel 
    //         value={option.label}
    //         control={<Checkbox color="primary"/>}
    //         label={option.label}
    //         labelPlacement="start"
    //         />)
    //     }
    //     else if (option.inputType === 'select') {
    //         result.push(<NodeSelect label={option.label} options={option.options}/>)
    //     }

    // })

}