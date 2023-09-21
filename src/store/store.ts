import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import geoLocationReducer from '../features/location/geoLocationSlice'
import flashMessageReducer from'../features/flashmessage/flashMessageSlice'
import astroidsReducer from '../features/astroids/astroidsSlice'
import { blogApi } from './blogApi'

const store = configureStore({
    reducer:{
        location:geoLocationReducer,
        flashMessage:flashMessageReducer,
        astroids:astroidsReducer,
       // weather:weatherReducer,
        [blogApi.reducerPath]: blogApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store