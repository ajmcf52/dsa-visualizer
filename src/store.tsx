import { configureStore } from '@reduxjs/toolkit'
import TabClickReducer from './Reducers/TabClickReducer'
import ControlSettingsReducer from './Reducers/ControlSettingsReducer'
import LoadConfigReducer from './Reducers/LoadConfigReducer'

export const store = configureStore({
    reducer: {
        tabClicks: TabClickReducer,
        controlSettings: ControlSettingsReducer,
        loadConfig: LoadConfigReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch