import { configureStore } from '@reduxjs/toolkit'
import TabClickReducer from './Reducers/TabClickReducer'

export const store = configureStore({
    reducer: {
        tabClicks: TabClickReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch