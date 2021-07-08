import { configureStore } from '@reduxjs/toolkit'
import TabClickReducer from './Reducers/TabClickReducer'
import ControlSettingsReducer from './Reducers/ControlSettingsReducer'

export const store = configureStore({
    reducer: {
        tabClicks: TabClickReducer,
        controlSettings: ControlSettingsReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch