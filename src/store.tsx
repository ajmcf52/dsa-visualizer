import { configureStore } from '@reduxjs/toolkit'
import TabClickReducer from './Reducers/TabClickReducer'
import ControlSettingsReducer from './Reducers/ControlSettingsReducer'
import LoadConfigReducer from './Reducers/LoadConfigReducer'
import GraphReducer from './Reducers/GraphReducer'

export const store = configureStore({
    reducer: {
        tabClicks: TabClickReducer,
        controlSettings: ControlSettingsReducer,
        loadConfig: LoadConfigReducer,
        graphDetails: GraphReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch