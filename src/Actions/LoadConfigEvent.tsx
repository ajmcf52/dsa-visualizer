const LoadConfigEventType = {
    configLoad: 'CONFIG_LOAD'
}

const LoadConfigActionCreator = {
    dataRef: (jsonData: Object) => ({
        type: LoadConfigEventType.configLoad,
        jsonData
    })
}

export {
    LoadConfigActionCreator,
    LoadConfigEventType
}