import data from './config.json'
import React from 'react'
import { connect } from 'react-redux'
import { LoadConfigActionCreator } from '../Actions/LoadConfigEvent'

interface ConfigLoaderProps {
    loadConfig: (dataObj: Object) => {}
}

class ConfigLoader extends React.Component<ConfigLoaderProps> {
    render() {
        return <div id='loader' />
    }
    componentDidMount() {
        this.props.loadConfig(data)
    }
}

const mapDispatchToProps = {
    loadConfig: LoadConfigActionCreator.dataRef,
}

export default connect(null, mapDispatchToProps)(ConfigLoader)
